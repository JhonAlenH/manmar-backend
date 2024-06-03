import sql from "mssql";
import { Sequelize } from 'sequelize';
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

const Producers = sequelize.define('maproductores', {
    cproductor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
    },
});

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

export default {
    getReceipt,
    getProducers
}