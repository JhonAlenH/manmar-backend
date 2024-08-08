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
      const keys = Object.keys(data);
      const values = keys.map(key => data[key] === '' ? null : data[key]);

      const request = pool.request();
  
      const placeholders = keys.map((_, i) => `@param${i + 1}`).join(',');
      const query = `INSERT INTO tmsuscripcion_polizas (${keys.join(',')}) VALUES (${placeholders})`;
  
      keys.forEach((key, index) => {
        request.input(`param${index + 1}`, values[index]);
      });
  
      const create = await request.query(query);
  
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
    console.log(data);
    let pool;
    try {
        pool = await sql.connect(sqlConfig);
        const keys = Object.keys(data).filter(key => key !== 'id');
        console.log(keys);

        // Construir la cláusula SET
        const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');
        console.log(setClause);

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


export default {
    getReceipt,
    getReceiptUpdate,
    getProducers,
    getTariffs,
    searchContract,
    createContract,
    detailContract,
    updateContract
}