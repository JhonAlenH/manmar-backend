import sql from "mssql";
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import insert from "../utilities/insert.js";

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

const Paises = sequelize.define('mapaises', {});
const Bancos = sequelize.define('mabancos', {});
const MetodologiaPago = sequelize.define('mametodologiapago', {}, {tableName: 'mametodologiapago'});
const Monedas = sequelize.define('mamonedas', {});
const Cedentes = sequelize.define('macedentes', {});
const Asegurados = sequelize.define('maasegurados', {});
const Agentes = sequelize.define('maVagentes', {});
const Ejecutivos = sequelize.define('maejecutivos', {},{tableName: 'maejecutivos'});
const Productores = sequelize.define('maproductores', {},{tableName: 'maproductores'});
const Tomadores = sequelize.define('matomadores', {});
const Ramos = sequelize.define('maramos', {});
const Marcas = sequelize.define('mainma', {},{tableName: 'mainma'});

const getMaMonedas = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT cmoneda, xmoneda, xabreviatura from MAMONEDAS')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const getMaPaises = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT cpais, xpais from MAPAISES')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCiudades = async(pais, estado) => {
  try {
    let pool = await sql.connect(sqlConfig);
    // console.log(pais)
    let result = await pool.request().query(`SELECT cciudad, xdescripcion_l from MACIUDADES where cpais = ${pais.toString()} and cestado = ${estado.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaEstados = async(pais) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cpais, cestado, xestado from MAESTADOS where cestado = ${pais.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaBancos = async(getMaBancos) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cbanco, xbanco from MABANCO where cbanco = ${getMaBancos.cbanco}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const getMaMarcas = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT id, cmarca,xmarca, cmodelo,xmodelo,cversion, xversion,xtrans,xmotor,qano, npasajero from MAINMA where id = ${id.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCedentes = async(id) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let result = await pool.request().query(`SELECT ccedente, xrif, xcedente, cestado, cciudad, xdireccion, xtelefono1, xtelefono2, xcorreo, xportal, xusuario, xlogin from MACEDENTES where ccedente = ${id.toString()}`)
      await pool.close();
      return { 
        result: result
      };
    } catch (error) {
      console.log(error.message)
      return { error: error.message };
    }
  }

  const getMaMetodologiapago = async(id) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let result = await pool.request().query(`SELECT cmetodologiapago,xmetodologiapago,cpais from MAMETODOLOGIAPAGO where cmetodologiapago = ${id.toString()}`)
      await pool.close();
      return { 
        result: result
      };
    } catch (error) {
      console.log(error.message)
      return { error: error.message };
    }
  }

const searchPaises = async () => {
  try {
    const items = await Paises.findAll({
      attributes: ['cpais', 'xpais'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchPaisesById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cpais, xpais from MAPAISES WHERE cpais = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createPaises = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAPAISES (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updatePaises = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAPAISES SET ${rData} where cpais = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchBancos = async () => {
  try {
    const items = await Bancos.findAll({
      attributes: ['cbanco', 'xbanco','itipo', 'cpais'],
    });
    console.log(items)
    const result = items.map((item) => item.get({ plain: true }));
    console.log(result)
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchBancosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cbanco, xbanco, itipo, cpais from MABANCOS WHERE cbanco = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};


const createBancos = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MABANCOS (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateBancos = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
 
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchMetodologiapago = async () => {
  try {
    const items = await MetodologiaPago.findAll({
      attributes: ['cmetodologiapago', 'xmetodologiapago', 'cpais'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};
const searchMetodologiapagoById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cmetodologiapago, xmetodologiapago, cpais from MAMETODOLOGIAPAGO WHERE cmetodologiapago = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};


const createMetodologiapago = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAMETODOLOGIAPAGO (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateMetodologiapago = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAMETODOLOGIAPAGO SET ${rData} where cmetodologiapago = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchMonedas = async () => {
  try {
    const items = await Monedas.findAll({
      attributes: ['cmoneda', 'xmoneda', 'xabreviatura'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};

const searchMonedasById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cmoneda, xmoneda, xabreviatura from MAMONEDAS WHERE cmoneda = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createMonedas = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAMONEDAS (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateMonedas = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAMONEDAS SET ${rData} where cmoneda = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchCedentes = async () => {
  try {
    const items = await Cedentes.findAll({
      attributes: ['ccedente', 'xrif', 'xcedente', 'cestado', 'cciudad', 'xdireccion', 'xtelefono1', 'xtelefono2', 'xcorreo', 'xportal', 'xusuario', 'xlogin'],
    });''
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};
const searchCedentesById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ccedente, xrif, xcedente, cestado, cciudad, xdireccion, xtelefono1, xtelefono2, xcorreo, xportal, xusuario, xlogin from MACEDENTES WHERE ccedente = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createCedentes = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MACEDENTES (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateCedentes = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MACEDENTES SET ${rData} where ccedente = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchAsegurados = async () => {
  try {
    const items = await Asegurados.findAll({
      attributes: ['casegurado', 'xcedula', 'xnombre', 'xapellido', 'fnacimiento', 'iestado_civil', 'isexo', 'xtelefono1', 'xtelefono2', 'xdireccion', 'xcorreo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchAseguradosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT casegurado, xcedula, xnombre, xapellido, fnacimiento, iestado_civil, isexo, xtelefono1, xtelefono2, xdireccion, xcorreo from MAASEGURADOS WHERE casegurado = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createAsegurados = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAASEGURADOS (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateAsegurados = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAASEGURADOS SET ${rData} where casegurado = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchAgentes = async () => {
  try {
    const items = await Agentes.findAll({
      attributes: ['cagente', 'xejecutivo','xagente','xrif'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    console.log(result)
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchAgentesById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cagente, cejecutivo, xagente, xrif, xdireccion, xtelefono, xcorreo, xcta_nacional, xcta_extranjero,pcomision from MAAGENTES WHERE cagente = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createAgentes = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAAGENTES (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateAgentes = async(id, data) => {
console.log('Actalizacionnnn')
  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAAGENTES SET ${rData} where cagente = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchEjecutivos = async () => {
  try {
    const items = await Ejecutivos.findAll({
      attributes: ['cejecutivo', 'xejecutivo', 'xrif', 'xdireccion', 'xtelefono1','xtelefono2', 'xcorreo', 'xcta_nacional', 'xcta_extranjero', 'pcomision'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchEjecutivosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cejecutivo, xejecutivo, xrif, xdireccion, xtelefono1,xtelefono2, xcorreo, xcta_nacional, xcta_extranjero, pcomision from MAEJECUTIVOS WHERE cejecutivo = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createEjecutivos = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAEJECUTIVOS (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateEjecutivos = async(id, data) => {
  console.log('Modificar')
  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAEJECUTIVOS SET ${rData} where cejecutivo = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchProductores = async () => {
  try {
    const items = await Productores.findAll({
      attributes: ['cproductor','xproductor','xrif','csuper','cpais','cestado','cciudad','xdireccion','xtelefono','xcorreo','pcomision','xcta_nacional','xcta_extranjero']
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchProductoresById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cproductor,xproductor,xrif,csuper,cpais,cestado,cciudad,xdireccion,xtelefono,xcorreo,pcomision,xcta_nacional,xcta_extranjero from MAPRODUCTORES WHERE cproductor = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createProductores = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAPRODUCTORES (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateProductores = async(id, data) => {
  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAPRODUCTORES SET ${rData} where cproductor = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchTomadores = async () => {
  try {
    const items = await Tomadores.findAll({
      attributes: ['ctomador','xtomador','xcedula','xtelefono','xdireccion','xcorreo']
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchTomadoresById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ctomador,xtomador,xcedula,xtelefono,xdireccion,xcorreo from MATOMADORES WHERE ctomador = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createTomadores = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MATOMADORES (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateTomadores = async(id, data) => {
  console.log("Actualiza T")
  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MATOMADORES SET ${rData} where ctomador = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchRamos = async () => {
  try {
    const items = await Ramos.findAll({
      attributes: ['cramo','xramo']
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchRamosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cramo,xramo from MARAMOS WHERE cramo = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createRamos = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MARAMOS (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateRamos = async(id, data) => {
  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MARAMOS SET ${rData} where cramo = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchMarcas = async () => {
  try {
    const items = await Marcas.findAll({
      attributes: ['ccodigo','cmarca','xmarca','cmodelo', 'xmodelo','cversion','xversion','xtrans', 'xmotor','qano']
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchMarcasById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ccodigo,cmarca,xmarca,cmodelo, xmodelo,cversion,xversion,xtrans, xmotor,qano from MAINMA WHERE ccodigo = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createMarcas = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAINMA (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateMarcas = async(id, data) => {
  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAINMA SET ${rData} where ccodigo = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
export default {
  getMaMonedas,
  getMaPaises,
  getMaEstados,
  getMaBancos,
  getMaCedentes,
  getMaCiudades,
  getMaMarcas,
  getMaCedentes,
  getMaMetodologiapago,
  createPaises,
  updatePaises,
  searchPaisesById,
  searchPaises,
  getMaBancos,
  updateBancos,
  createBancos,
  searchBancosById,
  searchBancos,
  updateMetodologiapago,
  createMetodologiapago,
  searchMetodologiapagoById,
  searchMetodologiapago,
  createMonedas,
  searchMonedas,
  updateMonedas,
  searchMonedasById,
  createCedentes,
  searchCedentes,
  updateCedentes,
  searchCedentesById,
  createAsegurados,
  searchAsegurados,
  updateAsegurados,
  searchAseguradosById,
  createAgentes,
  searchAgentes,
  updateAgentes,
  searchAgentesById,
  searchEjecutivos,
  createEjecutivos,
  updateEjecutivos,
  searchEjecutivosById,
  searchProductores,
  createProductores,
  updateProductores,
  searchProductoresById,
  searchTomadores,
  createTomadores,
  updateTomadores,
  searchTomadoresById,
  searchRamos,
  createRamos,
  updateRamos,
  searchRamosById,
  searchMarcas,
  createMarcas,
  updateMarcas,
  searchMarcasById
}