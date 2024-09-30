import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import multer from 'multer';
import sql from "mssql";
import xlsx from "xlsx"

const sqlConfig = {
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    server: process.env.SERVER_BD,
    database: process.env.NAME_BD,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

const workbook = xlsx.readFile('C:/Users/jalen/Desktop/cargar2.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

const { diskStorage } = multer;
const app = express();
dotenv;

if (process.env.AMBIENTE == 'LOCAL') {
  app.use(cors())
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n API is listening on port ${PORT}`);
});

async function insertData() {
    function excelDateToJSDate(excelDate) {
        const date = new Date((excelDate - 25569) * 86400 * 1000);
        const dateOffset = date.getTimezoneOffset() * 60 * 1000; // Ajuste de la zona horaria
        return new Date(date.getTime() + dateOffset);
    }

    try {
        // Conectar a la base de datos
        await sql.connect(sqlConfig);

        // Truncar la tabla antes de insertar nuevos datos
        await new sql.Request().query('TRUNCATE TABLE tmsuscripcion_polizas');
        console.log('Tabla truncada exitosamente.');

        // Consultar la tasa de cambio desde la API
        let tasaCambio = null;
        try {
            const response = await fetch('https://apisys2000.lamundialdeseguros.com/api/v1/valrep/tasaBCV');
            const data = await response.json();
            const dolarData = data.data.find(item => item.cmoneda === '$');
            tasaCambio = dolarData ? dolarData.ptasamon : null;
        } catch (error) {
            console.error('Error al consultar la API para la tasa de cambio:', error);
            process.exit(1);
        }

        if (tasaCambio === null) {
            console.error('No se pudo obtener la tasa de cambio.');
            process.exit(1);
        }

        console.log('Tasa de cambio obtenida:', tasaCambio);

        // Procesar las filas de datos
        for (const row of data) {
            console.log(row)
            // Crear un nuevo request para cada fila
            const request = new sql.Request();

            // Hacer el SELECT para obtener el pcomision de la tabla maaranceles
            const result = await request
                .input('ccedente', sql.Int, parseInt(row.ccedente))
                .input('cramo', sql.Int, row.cramo)
                .query(`
                    SELECT pcomision 
                    FROM maaranceles 
                    WHERE ccedente = @ccedente AND cramo = @cramo;
                `);

            const pcomision = result.recordset[0]?.pcomision;
            if (pcomision === null || pcomision === undefined) {
                console.error('No se encontró pcomision para ccedente y cramo:', row.ccedente, row.cramo);
                continue; // O lanzar un error si es necesario
            }

            // Calcular mcomisionext utilizando la tasa de cambio
            const mcomisionext = row.mprimaext ? row.mprimaext * (pcomision / 100) : null;
            const mcomision = mcomisionext ? mcomisionext * tasaCambio: null

            // Crear otro nuevo request para la inserción
            const insertRequest = new sql.Request();

            // Definir parámetros para evitar inyección SQL
            insertRequest.input('ccedente', sql.VarChar(50), row.ccedente ? row.ccedente.toString() : null);
            insertRequest.input('icedula_tomador', sql.VarChar(50), row.icedula_tomador ? row.icedula_tomador : null);
            insertRequest.input('xcedula_tomador', sql.VarChar(50), row.xcedula_tomador ? row.xcedula_tomador.trim().replace(/\r?\n/g, '') : null);
            insertRequest.input('xnombre_tomador', sql.VarChar(100), row.xnombre_tomador ? row.xnombre_tomador : null);
            insertRequest.input('xcorreo_tomador', sql.VarChar(250), row.xcorreo_tomador ? row.xcorreo_tomador : null);
            insertRequest.input('xtelefono_tomador', sql.VarChar(50), row.xtelefono_tomador ? row.xtelefono_tomador.toString() : null);
            insertRequest.input('icedula_asegurado', sql.VarChar(50), row.icedula_asegurado ? row.icedula_asegurado : null);
            insertRequest.input('xcedula_asegurado', sql.VarChar(50), row.xcedula_asegurado ? row.xcedula_asegurado.toString() : null);
            insertRequest.input('xnombre_asegurado', sql.VarChar(100), row.xnombre_asegurado ? row.xnombre_asegurado : null);
            insertRequest.input('xtelefono_asegurado', sql.VarChar(50), row.xtelefono_asegurado ? row.xtelefono_asegurado.toString() : null);
            insertRequest.input('xcorreo_asegurado', sql.VarChar(100), row.xcorreo_asegurado ? row.xcorreo_asegurado : null);
            insertRequest.input('cmoneda', sql.Int, row.cmoneda ? row.cmoneda : null);
            insertRequest.input('cramo', sql.Int, row.cramo ? parseInt(row.cramo) : null);
            insertRequest.input('xpoliza', sql.VarChar(50), row.xpoliza ? row.xpoliza : null);
            insertRequest.input('fdesde_pol', sql.Date, row.fdesde_pol ? excelDateToJSDate(row.fdesde_pol) : null);
            insertRequest.input('fhasta_pol', sql.Date, row.fhasta_pol ? excelDateToJSDate(row.fhasta_pol) : null);
            insertRequest.input('femision', sql.Date, row.femision ? excelDateToJSDate(row.femision) : null);
            insertRequest.input('cmetodologiapago', sql.Int, row.cmetodologiapago ? parseInt(row.cmetodologiapago) : null);
            insertRequest.input('ptasa_cambio', sql.Float, tasaCambio); // Usar la tasa de cambio obtenida
            insertRequest.input('msuma', sql.Numeric(18, 2), row.msuma ? row.msuma : null);
            insertRequest.input('msumaext', sql.Numeric(18, 2), row.msumaext ? row.msumaext : null);
            insertRequest.input('mprima', sql.Numeric(18, 2), row.mprima ? row.mprima : null);
            insertRequest.input('mprimaext', sql.Numeric(18, 2), row.mprimaext ? row.mprimaext : null);
            insertRequest.input('pcomision', sql.Int, pcomision ? pcomision : null);
            insertRequest.input('mcomision', sql.Numeric(18, 2), mcomision);
            insertRequest.input('mcomisionext', sql.Numeric(18, 2), mcomisionext); // Calcular y usar mcomisionext
            insertRequest.input('cproductor', sql.Int, 1);
            insertRequest.input('pcomision_p', sql.Int, 100);

            // Ejecutar la consulta SQL para insertar datos
            await insertRequest.query(`
                INSERT INTO tmsuscripcion_polizas 
                (ccedente, icedula_tomador, xcedula_tomador, xnombre_tomador, xcorreo_tomador, xtelefono_tomador, icedula_asegurado, 
                 xcedula_asegurado, xnombre_asegurado, xtelefono_asegurado, xcorreo_asegurado, cmoneda, cramo, xpoliza, 
                 fdesde_pol, fhasta_pol, femision, cmetodologiapago, ptasa_cambio, msuma, msumaext, mprima, mprimaext, pcomision, mcomision, mcomisionext, cproductor,
                 pcomision_p)
                VALUES 
                (@ccedente, @icedula_tomador, @xcedula_tomador, @xnombre_tomador, @xcorreo_tomador, @xtelefono_tomador, @icedula_asegurado, 
                 @xcedula_asegurado, @xnombre_asegurado, @xtelefono_asegurado, @xcorreo_asegurado, @cmoneda, @cramo, @xpoliza, 
                 @fdesde_pol, @fhasta_pol, @femision, @cmetodologiapago, @ptasa_cambio, @msuma, @msumaext, @mprima, @mprimaext, @pcomision, @mcomision, @mcomisionext, @cproductor,
                 @pcomision_p);
            `);
        }

        console.log('Datos insertados exitosamente.');
        process.exit(0);  // Cerrar el proceso de Node.js
    } catch (err) {
        console.error('Error al insertar los datos: ', err);
        process.exit(1);  // Cerrar el proceso con error
    } finally {
        // Cerrar la conexión a la base de datos
        await sql.close();
    }
}



  insertData();