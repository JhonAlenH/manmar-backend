import sql from "mssql";
import { Sequelize, Op } from 'sequelize';
import sequelize from '../config/database.js';

const sqlConfig = {
  user: process.env.USER_BD,
  password: process.env.PASSWORD_BD,
  server: process.env.SERVER_BD,
  database: process.env.NAME_BD,
  requestTimeout: 60000,
  options: {
      encrypt: true,
      trustServerCertificate: true
  }
}

const Renovations = sequelize.define('poVpolizas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
    },
});

const Distribution = sequelize.define('poVdistribuciones', {
  id_poliza: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
  },
});

const searchRenovations = async (data) => {
  try {
    // Inicializa el objeto de condiciones
    const conditions = {
      fhasta: {
        [Sequelize.Op.lt]: new Date(), // Solo contratos vencidos
      },
    };

    // Solo agrega ccedente y cramo si están presentes
    if (data.ccedente) {
      conditions.ccedente = data.ccedente;
    }

    if (data.cramo) {
      conditions.cramo = data.cramo;
    }

    // Verifica si se proporcionó mes y año
    if (data.mes && data.year) {
      // Determinar el primer y último día del mes
      const startOfMonth = new Date(data.year, data.mes - 1, 1); // Mes en formato 0-11
      const endOfMonth = new Date(data.year, data.mes, 0); // Último día del mes

      // Agregar condición para fhasta que esté dentro del rango del mes
      conditions.fhasta = {
        [Sequelize.Op.between]: [startOfMonth, endOfMonth],
      };
    }

    const renovaciones = await Renovations.findAll({
      where: conditions,
      attributes: [
        'id', 'ccedente', 'xcedente', 'cramo', 'xramo', 'casegurado', 'xasegurado', 'fdesde', 'fhasta', 'xpoliza'
      ],
    });

    const renovations = renovaciones.map((item) => {
      const itemData = item.get({ plain: true });

      // Calcular cuántos días lleva vencido el contrato
      const today = new Date();
      const fhastaDate = new Date(itemData.fhasta); // Convertir fhasta a Date si no es ya un objeto Date
      const diffTime = today - fhastaDate; // Diferencia en milisegundos
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir a días

      // Agregar el nuevo campo nvencido
      itemData.nvencido = diffDays;

      return itemData;
    });

    return renovations;
  } catch (error) {
    return { error: error.message };
  }
};

const getReceipt = async (getReceipt) => {
  // Transformar el valor de mprima
  const mprimaString = getReceipt.mprima.toString();

  const parts = mprimaString.split('.');

  // Eliminar todos los puntos menos el último
  if (parts.length > 1) {
    // Tomar todas las partes excepto el último y unirlas sin puntos
    const wholeNumber = parts.slice(0, parts.length - 1).join('');
    const decimalPart = parts[parts.length - 1];

    // Combinar de nuevo en la forma correcta
    const mprimaNumericString = wholeNumber + '.' + decimalPart;

    // Convertir a número
    const mprimaNumeric = parseFloat(mprimaNumericString);

    try {
      let pool = await sql.connect(sqlConfig);
      let result = await pool.request()
        .input('fdesde_pol', sql.DateTime, getReceipt.fdesde)
        .input('fhasta_pol', sql.DateTime, getReceipt.fhasta)
        .input('mprima', sql.Numeric(18, 2), mprimaNumeric) // Ahora pasa el valor numérico correcto
        .input('cmetodologiapago', sql.Int, getReceipt.cmetodologiapago)
        .execute('tmBRecibos');

      const receipt = await pool.request().query('select * from tmrecibos');
      await pool.close();

      return receipt;
    } catch (err) {
      console.log(err.message);
      return { error: err.message };
    }
  } else {
    // Manejo de caso si no hay puntos
    const mprimaNumeric = parseFloat(mprimaString.replace(',', '.'));
    console.log('Valor de mprima sin puntos:', mprimaNumeric); // Ver el valor sin puntos
    
    try {
      let pool = await sql.connect(sqlConfig);
      let result = await pool.request()
        .input('fdesde_pol', sql.DateTime, getReceipt.fdesde)
        .input('fhasta_pol', sql.DateTime, getReceipt.fhasta)
        .input('mprima', sql.Numeric(18, 2), mprimaNumeric) // Ahora pasa el valor numérico correcto
        .input('cmetodologiapago', sql.Int, getReceipt.cmetodologiapago)
        .execute('tmBRecibos');

      const receipt = await pool.request().query('select * from tmrecibos');
      await pool.close();

      return receipt;
    } catch (err) {
      console.log(err.message);
      return { error: err.message };
    }
  }
};

const getDistribution = async (id_poliza) => {
  try {
    const distribution = await Distribution.findOne({
      where: {id_poliza},
      attributes: ['id_poliza', 
                   'cproductor', 
                   'xproductor',
                   'pcomision_p',
                   'mcomision_p',
                   'mcomision_pext',
                   'cejecutivo',
                   'xejecutivo',
                   'pcomision_e',
                   'mcomision_e',
                   'mcomision_eext',
                   'cagente',
                   'xagente',
                   'pcomision_a',
                   'mcomision_a',
                   'mcomision_aext',
                   ],
    });
    return distribution ? distribution.get({ plain: true }) : {};;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

export default {
    searchRenovations,
    getReceipt,
    getDistribution
}