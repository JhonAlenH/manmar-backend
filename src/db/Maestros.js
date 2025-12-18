import sql from "mssql";
import { Sequelize, DataTypes,  Op, where } from 'sequelize';
import sequelize from '../config/database.js';
import insert from "../utilities/insert.js";
import initModels  from "../models/init-models.js";
import moment from "moment/moment.js";
// import moment from "moment";
const models = initModels(sequelize)

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

const Paises = models.mapaises;
const Bancos = models.mabancos;
const MetodologiaPago = models.mametodologiapago;
const Monedas = models.mamonedas;
const Cedentes = models.macedentes;
const Personas = models.mapersonas;
const Productores = models.maproductores;
const Productos = models.maproductos;
const Ramos = models.maramos;
const Ciudades = models.maciudades;
const Estados = models.maestados;
const Vehiculos = models.mainma;
const Usuarios = models.seusuarios;

const getMaMonedas = async() => {
  try {
    const items = await Monedas.findAll({
      attributes: ['cmoneda', 'xmoneda', 'xabreviatura'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCedentes = async() => {
  try {
    const items = await Cedentes.findAll({
      attributes: ['ccedente'],
      include: [
        {association: 'persona', attributes: ['xnombre']}
      ]
    });
    const result = items.map((item) => {
      const get = item.get({ plain: true })
      get.xcedente = get.persona?.xnombre; 
      return get
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCiudades = async(estado) => {
  try {
    const items = await Ciudades.findAll({
      where: {cestado:  estado},
      attributes: ['cciudad', 'xciudad'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaEstados = async(pais) => {
  try {
    const items = await Estados.findAll({
      where: {cpais:  pais},
      attributes: ['cestado', 'xestado'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaBancos = async() => {
  try {
    const items = await Bancos.findAll({
      attributes: ['cbanco', 'xbanco'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaMarcas = async() => {
  try {
    const items = await Vehiculos.findAll({
      attributes: ['cmarca', 'xmarca'],
      group: ['cmarca', 'xmarca'],
      order: [['xmarca', 'DESC']]
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaModelos = async(cmarca) => {
  try {
    const items = await Vehiculos.findAll({
      where: {cmarca},
      attributes: ['cmodelo', 'xmodelo'],
      group: ['cmodelo', 'xmodelo'],
      order: [['xmodelo', 'DESC']]
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaVersiones = async(cmarca,cmodelo) => {
  try {
    const items = await Vehiculos.findAll({
      where: {cmarca,cmodelo},
      attributes: ['cversion', 'xversion'],
      group: ['cversion', 'xversion'],
      order: [['xversion', 'DESC']]
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaMetodologiapago = async() => {
  try {
    const items = await Bancos.findAll({
      attributes: ['cmetodologiapago', 'xmetodologiapago', 'cpais'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
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
const searchPaisById = async (id) => {
  try {
    const result = await Paises.findOne({
      where:{cpais: id},
      attributes: ['cpais', 'xpais'],
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createPais = async(body) => {
  const data = setAuItems(body)
  try {
    const pais = Paises.create(data)
    return { result: pais };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updatePaises = async(id, data) => {
  try {
    const result = await Paises.update(data, {
      where: {cpais: id}
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchBancos = async () => {
  try {
    const items = await Bancos.findAll({
      attributes: ['cbanco', 'xbanco', 'cod_bancario'],
      include:[
        {association: 'moneda', attributes: ['xmoneda']},
        {association: 'pais', attributes: ['xpais']}
      ]
    });
    const result = items.map((item) => {
      const get = item.get({ plain: true })
      get.xmoneda = get.moneda.xmoneda; get.xpais = get.pais.xpais; 
      return get
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchBancoById = async (id) => {
  try {
    const result = await Bancos.findOne({
      where:{cbanco: id},
      attributes: ['cbanco', 'xbanco', 'cod_bancario', 'cpais', 'cmoneda'],
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createBanco = async(body) => {

  const data = setAuItems(body)
  try {
    const banco = Bancos.create(data)
    return { result: banco };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateBanco = async(id, data) => {
  try {
    const result = await Bancos.update(data, {
      where: {cbanco: id}
    });
    return result;
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
const createMoneda = async(body) => {

  const data = setAuItems(body)
  try {
    const moneda = Monedas.create(data)
    return { result: moneda };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateMoneda = async(id, data) => {
  try {
    const result = await Monedas.update(data, {
      where: {cmoneda: id}
    });
    return result;
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

const searchClientes = async () => {
  try {
    const items = await Personas.findAll({
      where: {itipo_persona: 'C'},
      attributes: ['id', 'cci_rif', 'xnombre', 'xapellido', 'fnacimiento'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchClienteById = async (id) => {
  try {
    let result = await Personas.findOne({
      where: {id},
      attributes: ['id', 'cci_rif', 'xnombre', 'xapellido', 'fnacimiento', 'xtelefono', 'xdireccion', 'xcorreo', 'isexo', 'iestado_civil','cciudad'],
      include: [
        {association: 'ciudad', attributes: [], include: [
          {association: 'estado', attributes: ['cestado'], include: [
            {association: 'pais', attributes: ['cpais']}
          ]}
        ]}
      ]
    });

    result.dataValues.itipodoc = result.cci_rif.split('-')[0]; result.dataValues.cci_rif = result.cci_rif.split('-')[1];
    result.dataValues.cestado = result.estado?.cestado; result.dataValues.cpais = result.estado?.pais?.cpais;

    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createCliente = async(body) => {
  
  const data = setAuItems(body)
  data.cci_rif = `${data.itipodoc}-${data.cci_rif}`
  data.itipo_persona = 'C'

  delete data.itipodoc
  delete data.cestado
  delete data.cpais
  // const rData = insert.formatCreateData(data)

  try {
    const client = Personas.create(data)
    return { result: client };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateCliente = async(id, data) => {

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

const searchRamos = async () => {
  try {
    const items = await Ramos.findAll({
      attributes: ['id','xramo']
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchRamoById = async (id) => {
  try {
    const result = await Ramos.findOne({
      where:{id},
      attributes: ['xramo'],
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createRamo = async(body) => {
  const data = setAuItems(body)
  try {
    const ramo = Ramos.create(data)
    return { result: ramo };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateRamo = async(id, data) => {
  try {
    const result = await Ramos.update(data, {
      where: {id}
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchProductos = async () => {
  try {
    const items = await Productos.findAll({
      attributes: ['id','xproducto'],
      include:[
        {association: 'cedente', attributes: ['ccedente'], include:[
          {association: 'persona', attributes: ['xnombre']}
        ]},
        {association: 'ramo', attributes: ['xramo']}
      ]
    });
    const result = items.map((item) => {
      const get = item.get({ plain: true })
      get.xramo = get.ramo?.xramo; get.xcedente = get.cedente?.persona?.xnombre; 
      return get
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchProductoById = async (id) => {
  try {
    const result = await Productos.findOne({
      where:{id},
      attributes: ['id','xproducto','cmoneda','cramo','ccedente','pcomision'],
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createProducto = async(body) => {
  const data = setAuItems(body)
  const usuario = await Usuarios.findOne({
    where: {cusuario: data.cusuario_creacion},
    attributes: ['cproductor']
  })
  data.cproductor = usuario.cproductor

  try {
    const producto = Productos.create(data)
    return { result: producto };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateProducto = async(id, data) => {
  try {
    const result = await Productos.update(data, {
      where: {id}
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchVehiculos = async () => {
  try {
    const items = await Vehiculos.findAll({
      attributes: ['ccodigo','cmarca','xmarca','cmodelo', 'xmodelo','cversion','xversion','xtrans', 'xmotor','qano']
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchVehiculoById = async (id) => {
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
const createVehiculo = async(data) => {

  const dataArray = Object.entries(data)
  for (const item of dataArray) {
    const key = item[0]
    const valueNoTrimmed = item[1]
    const value = valueNoTrimmed.split('[]')[0]

    if(value === ''){
      if(key === 'cmarca') {
        const check = await checkItem(data['xmarca'].split('[]')[0], 'xmarca', key, 'MAINMA')
        if(check.error){
          return { error: error.message };
        } else {
          data[key] = check.value +'[]'+ valueNoTrimmed.split('[]')[1]
        }
      }
      if(key === 'cmodelo') {
        const check = await checkItem(data['xmodelo'].split('[]')[0], 'xmodelo', key, 'MAINMA')
        if(check.error){
          return { error: error.message };
        } else {
          data[key] = check.value +'[]'+ valueNoTrimmed.split('[]')[1]
        }
      }
      if(key === 'cversion') {
        const check = await checkItem(data['xversion'].split('[]')[0], 'xversion', key, 'MAINMA')
        if(check.error){
          return { error: error.message };
        } else {
          data[key] = check.value +'[]'+ valueNoTrimmed.split('[]')[1]
        }
      }
      // data[key] = check.value
    }

  }

  const rData = insert.formatCreateData(data)
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`INSERT INTO MAINMA (${rData.keys}) VALUES (${rData.values})`)
    
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateVehiculos = async(id, data) => {
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

// Utils
const checkItem = async(otherValue, otherKey, key, table) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ${key} from ${table} WHERE ${otherKey} = '${otherValue}'`)
    if(result.recordset.length > 0){
      const valueReturn = result.recordset[0][key]
      return { exists: true, value: valueReturn }
    } else {
      let result = await pool.request().query(`SELECT (max(CAST(${key} as int)) + 1) as ${key} from ${table}`)
      const valueReturn = result.recordset[0][key]
      return { exists: false, value: valueReturn}
    }
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const setAuItems = (data) => {
  const newData = {...data}

  newData.bactivo = 1;
  newData.fcreacion = new Date();

  return newData
}

export default {
  getMaMonedas,getMaCedentes,getMaEstados,getMaBancos,getMaCiudades,getMaMarcas,getMaModelos,getMaVersiones,getMaMetodologiapago,getMaBancos,
  searchPaises,searchPaisById,createPais,updatePaises,
  searchBancos,searchBancoById,createBanco,updateBanco,
  searchMetodologiapago,searchMetodologiapagoById,createMetodologiapago,updateMetodologiapago,
  searchMonedas,searchMonedasById,createMoneda,updateMoneda,
  searchCedentes,searchCedentesById,createCedentes,updateCedentes,
  searchClientes,searchClienteById,createCliente,updateCliente,
  searchProductores,searchProductoresById,createProductores,updateProductores,
  searchRamos,searchRamoById,createRamo,updateRamo,
  searchProductos,searchProductoById,createProducto,updateProducto,
  searchVehiculos,searchVehiculoById,createVehiculo,updateVehiculos
}