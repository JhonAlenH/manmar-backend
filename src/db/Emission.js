import sql from "mssql";
import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import cron from 'node-cron';
import nodemailer from 'nodemailer';

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

  const Producers = sequelize.define('maproductores', {
      cproductor: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true,
      },
  });

  const Tariffs = sequelize.define('maaranceles', {
    carancel: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
  });

  const DetailContract = sequelize.define('poVpolizasDetalle', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
  }, {tableName: 'poVpolizasDetalle'});

  const Contracts = sequelize.define('poVpolizas', {});

  const Policy = sequelize.define('poVpolizasDetalle', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
  }, {tableName: 'poVpolizasDetalle'});

  const getReceipt = async (getReceipt) => {
      const strPrecio = getReceipt.mprima; // El string que contiene el precio
      const precioNumerico = parseFloat(strPrecio.replace(',', '.')); // Convertir a número con decimales
      try{

          let pool = await sql.connect(sqlConfig);
          let result = await pool.request()
          .input('fdesde_pol', sql.DateTime, getReceipt.fdesde)
          .input('fhasta_pol', sql.DateTime, getReceipt.fhasta)
          .input('mprima', sql.Numeric(18, 2), precioNumerico)
          .input('cmetodologiapago', sql.Int, getReceipt.cmetodologiapago)
          .execute('tmBRecibos');
          const receipt= await pool.request()
          .query('select * from tmrecibos');
          await pool.close();
          return receipt
                
      }catch(err){
        console.log(err.message)
          return { error: err.message };
          }
  }

  const getReceiptUpdate = async (getReceiptUpdate) => {
    const strPrecio = getReceiptUpdate.mprima; // El string que contiene el precio
    const precioNumerico = parseFloat(strPrecio.replace(',', '.')); // Convertir a número con decimales
    try{
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
        .input('id', sql.Int, getReceiptUpdate.id)
        .input('mmonto', sql.Numeric(18, 2), precioNumerico)
        .input('fdesde', sql.DateTime, getReceiptUpdate.fdesde)
        .execute('pobconsulta_prima');
        const receipt= await pool.request()
        .query('select * from tmconsulta_prima');
        await pool.close();
        return receipt
              
    }catch(err){
      console.log(err.message)
        return { error: err.message };
        }
}

  const getProducers = async () => {
    try {
      const producers = await Producers.findOne({
        attributes: ['cproductor', 'xproductor', 'pcomision'],
      });
      return producers ? producers.get({ plain: true }) : {};;
    } catch (error) {
      return { error: error.message };
    }
  };

  const getTariffs = async (getTariffs) => {
    try {
      const tariffs = await Tariffs.findOne({
        where:{
                ccedente: getTariffs.ccedente, 
                cramo: getTariffs.cramo
              },
        attributes: ['pcomision'],
      });
      return tariffs ? tariffs.get({ plain: true }) : {};;
    } catch (error) {
      return { error: error.message };
    }
  };

  const searchContract = async (searchContract) => {
    try {
      const whereClause = {};
  
      if (searchContract.ccedente) {
        whereClause.ccedente = searchContract.ccedente;
      }
  
      if (searchContract.cramo) {
        whereClause.cramo = searchContract.cramo;
      }
  
      const contratos = await Contracts.findAll({
        where: whereClause,
        attributes: ['id', 'xpoliza', 'xcedente', 'xramo', 'xasegurado', 'fdesde', 'fhasta'],
      });
  
      const contracts = contratos.map((item) => item.get({ plain: true }));
      return contracts;
    } catch (error) {
      console.log(error.message)
      return { error: error.message };
    }
  };

  const createContract = async (data) => {
    let pool;
    try {
      pool = await sql.connect(sqlConfig);
      const keys = Object.keys(data).filter(key => key != 'documentos');

      const values = keys.map(key => data[key] === '' ? null : data[key]);

      const request = pool.request();
  
      const placeholders = keys.map((_, i) => `@param${i + 1}`).join(',');
      const query = `INSERT INTO tmsuscripcion_polizas (${keys.join(',')}) VALUES (${placeholders})`;
  
      keys.forEach((key, index) => {
        request.input(`param${index + 1}`, values[index]);
      });
  
      const create = await request.query(query);

      if (create.rowsAffected[0] > 0) {
        const selectPoliza = await request.query`SELECT id FROM popolizas ORDER BY id DESC`
        const selectedPoliza = selectPoliza.recordset[0]
        console.log(selectedPoliza.id);
        await pool.close();
        for (const document of data.documentos) {
          pool = await sql.connect(sqlConfig);
          const request2 = pool.request();
          let request21 = await request2.query`INSERT INTO podocumentos (id_poliza, xtitulo, xruta, bactivo) VALUES (${selectedPoliza.id}, '${document.xtitulo}', '${document.xruta}', 1)`
          console.log(request21);
          await pool.close();

        }
      }
  
      return create;
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    } finally {
      if (pool) {
        await pool.close();
      }
    }
  };

  const detailContract = async (id) => {
    try {
      const contract = await DetailContract.findOne({
        where: {
          id: id
        },
        attributes: [
          'id', 'ccedente', 'xcedente', 'casegurado', 'xnombre', 
          'cramo', 'xramo', 'xpoliza', 'fdesde_pol', 'fhasta_pol', 
          'cmetodologiapago', 'xmetodologiapago', 'msumaext', 'msuma', 
          'mprimaext', 'mprima', 'xtomador', 'cmoneda', 'xmoneda'
        ],
      });
      return contract ? contract.get({ plain: true }) : {};;
    } catch (error) {
      return { error: error.message };
    }
  };

  const updateContract = async (data) => {
    let pool;
    try {
        pool = await sql.connect(sqlConfig);
        const keys = Object.keys(data).filter(key => key !== 'id');

        // Construir la cláusula SET
        const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');

        const query = `UPDATE popolizas SET ${setClause} WHERE id = @id`;

        const updateRequest = pool.request();

        // Asignar los valores correspondientes desde data
        keys.forEach((key, index) => {
            updateRequest.input(`param${index + 1}`, data[key]);
        });
        updateRequest.input('id', data.id);

        const update = await updateRequest.query(query);

        return update;
    } catch (error) {
        console.error(error.message);
        return { error: error.message };
    } finally {
        if (pool) {
            await pool.close();
        }
    }
};

const searchPolicy = async (xpoliza) => {
  try {
    const producers = await Policy.findOne({
      where:{ xpoliza: xpoliza},
      attributes: ['xpoliza'],
    });
    return producers ? producers.get({ plain: true }) : {};;
  } catch (error) {
    return { error: error.message };
  }
};

// async function checkExpiringContracts() {
//   let pool;
//   try {
//       pool = await sql.connect(sqlConfig);

//       const currentMonth = new Date().getMonth() + 1;
//       const currentYear = new Date().getFullYear();

//       const query = `
//           SELECT * FROM poVpolizasDetalle 
//           WHERE MONTH(fhasta_pol) = @currentMonth
//           AND YEAR(fhasta_pol) = @currentYear
//       `;

//       const result = await pool.request()
//           .input('currentMonth', sql.Int, currentMonth)
//           .input('currentYear', sql.Int, currentYear)
//           .query(query);

//       const contracts = result.recordset;

//       if (contracts.length > 0) {
//           let emailHtml = `
//               <h2>Contratos que vencen en ${currentMonth}/${currentYear}:</h2>
//               <table border="1" cellpadding="5" cellspacing="0">
//                   <thead>
//                       <tr>
//                           <th>ID</th>
//                           <th>Póliza</th>
//                           <th>Fecha de Vencimiento</th>
//                           <th>Asegurado</th>
//                           <th>Tomador</th>
//                       </tr>
//                   </thead>
//                   <tbody>
//           `;
//           contracts.forEach(contract => {
//             const formattedDate = new Date(contract.fhasta_pol).toLocaleDateString('es-ES');
//               emailHtml += `
//                   <tr>
//                       <td>${contract.id}</td>
//                       <td>${contract.xpoliza}</td>
//                       <td>${formattedDate}</td>
//                       <td>${contract.xnombre}</td>
//                       <td>${contract.xtomador}</td>
//                   </tr>
//               `;
//           });
//           emailHtml += `
//                   </tbody>
//               </table>
//           `;
//           await sendEmail(`Contratos Vencen en ${currentMonth}/${currentYear}`, emailHtml);
//       } else {
//           console.log('No hay contratos que venzan este mes.');
//       }

//   } catch (error) {
//       console.error('Error ejecutando la consulta:', error.message);
//   } finally {
//       if (pool) {
//           await pool.close();
//       }
//   }
// }

// // Configuración de nodemailer
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // o cualquier otro servicio de correo (e.g., 'yahoo', 'outlook')
//   auth: {
//         user: 'alenjhon9@gmail.com',
//         pass: 'nnvwygxnvdpjegbj'
//   }
// });

// // Función para enviar correos
// async function sendEmail(subject, html) {
//   const mailOptions = {
//       from: 'Manmar Corretaje de Seguros',
//       to: 'alenjhon9@gmail.com', // Cambia esto por la dirección de destino
//       subject: subject,
//       html: html
//   };

//   try {
//       await transporter.sendMail(mailOptions);
//       console.log('Correo enviado correctamente');
//   } catch (error) {
//       console.error('Error al enviar el correo:', error.message);
//   }
// }


// // Programar el demonio para que se ejecute cada 2 minutos
// cron.schedule('*/1 * * * *', () => {
//   console.log('Ejecutando el demonio para verificar contratos que vencen...');
//   checkExpiringContracts();
// });

export default {
    getReceipt,
    getReceiptUpdate,
    getProducers,
    getTariffs,
    searchContract,
    createContract,
    detailContract,
    updateContract,
    searchPolicy
}