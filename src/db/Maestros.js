import sql from "mssql";
import insert from "../utilities/insert.js";
import { Sequelize, DataTypes,  Op, where } from 'sequelize';
import sequelize from '../config/database.js';
import initModels  from "../models/init-models.js";
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
const TipoProductor = models.matipo_produc;
const DatosBancarios = models.madatos_bancarios;
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
const getMaBancos = async(cmoneda) => {
  try {
    const items = await Bancos.findAll({
      where:{cmoneda},
      attributes: ['cbanco', 'xbanco'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaTipoProducto = async() => {
  try {
    const items = await TipoProductor.findAll({
      attributes: ['ctipo_produc', 'xtipo'],
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
      order: [['xmarca', 'ASC']]
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
      order: [['xmodelo', 'ASC']]
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
      order: [['xversion', 'ASC']]
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

const searchEstados = async () => {
  try {
    const items = await Estados.findAll({
      attributes: ['cestado', 'xestado', 'cpais'],
      include: [
        {association: 'pais', attributes: ['xpais']}
      ]
    });
    const result = items.map((item) => {
      const get = item.get({ plain: true })
      get.xpais = get.pais.xpais; 
      return get
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchEstadoById = async (id) => {
  try {
    const result = await Estados.findOne({
      where:{cestado: id},
      attributes: ['cpais', 'cestado','xestado'],
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createEstado = async(body) => {
  console.log(body)
  const data = setAuItems(body)
  try {
    const estado = Estados.create(data)
    return { result: estado };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateEstado = async(id, data) => {
  try {
    console.log(data)
    const result = await Estados.update(data, {
      where: {cestado: id}
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchCiudades = async () => {
  try {
    const items = await Ciudades.findAll({
      attributes: ['cciudad', 'xciudad', 'cestado'],
      include: [
        {association: 'estado', attributes: ['xestado'], include:[
          {association: 'pais', attributes: ['xpais']}
        ]}
      ]
    });
    const result = items.map((item) => {
      const get = item.get({ plain: true })
      get.xestado = get.estado?.xestado; 
      get.xpais = get.estado?.pais?.xpais; 
      return get
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchCiudadById = async (id) => {
  try {
    const result = await Ciudades.findOne({
      where:{cciudad: id},
      attributes: ['cciudad','xciudad'],
      include: [
        {association: 'estado', attributes: ['cestado'], include:[
          {association: 'pais', attributes: ['cpais']}
        ]}
      ]
    });

    result.dataValues.cestado = result.estado?.cestado;
    result.dataValues.cpais = result.estado?.pais?.cpais;

    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createCiudad = async(body) => {
  console.log(body)
  const data = setAuItems(body)
  delete data.cpais
  try {
    const estado = Ciudades.create(data)
    return { result: estado };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateCiudad = async(id, data) => {
  try {
    console.log(data)
    delete data.cpais
    const result = await Ciudades.update(data, {
      where: {cciudad: id}
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
    const result = await Monedas.findOne({
      where:{cmoneda: id},
      attributes: ['cmoneda', 'xmoneda', 'xabreviatura', 'xrepresentacion'],
    });
    return result;
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
      attributes: ['ccedente'],
      include: [
        {association: 'persona', attributes: ['xnombre', 'cci_rif', 'xtelefono', 'xcorreo']}
      ]
    });
    const result = items.map((item) => {
      const get = item.get({ plain: true })
      get.xcedente = get.persona?.xnombre; 
      get.cci_rif = get.persona?.cci_rif;
      get.xtelefono = get.persona?.xtelefono;
      get.xcorreo = get.persona?.xcorreo;

      return get
    });
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};
const searchCedentesById = async (id) => {
  try {
    const result = await Cedentes.findOne({
      where:{ccedente: id},
      attributes: ['ccedente', 'csuper'],
      include: [
        {association: 'persona', attributes: ['xnombre', 'cci_rif', 'xtelefono', 'xcorreo', 'xdireccion'],
          include:[
            {association: 'ciudad', attributes: ['cciudad'], include: [
              {association: 'estado', attributes: ['cestado'], include: [
                {association: 'pais', attributes: ['cpais']}
              ]}
            ]}
          ]
        }
      ]
    });

    result.dataValues.itipodoc = result.persona?.cci_rif.split('-')[0];
    result.dataValues.cci_rif = result.persona?.cci_rif.split('-')[1];
    result.dataValues.xcedente = result.persona?.xnombre;
    result.dataValues.xcorreo = result.persona?.xcorreo;
    result.dataValues.xdireccion = result.persona?.xdireccion;
    result.dataValues.cciudad = result.persona?.ciudad?.cciudad;
    result.dataValues.cestado = result.persona?.ciudad?.estado?.cestado;
    result.dataValues.cpais = result.persona?.ciudad?.estado?.pais?.cpais;

    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createCedentes = async(body) => {

  const data = setAuItems(body)

  const persona = {
    cci_rif: `${data.itipodoc}-${data.cci_rif}`,
    xnombre: data.xcedente,
    xcorreo: data.xcorreo,
    xtelefono: data.xtelefono,
    xdireccion: data.xdireccion,
    cciudad: data.cciudad,
    itipo_persona: 'E',
  }

  delete data.itipodoc
  delete data.cci_rif
  delete data.xcedente
  delete data.xcorreo
  delete data.xtelefono
  delete data.xdireccion
  delete data.cestado
  delete data.cpais
  delete data.cciudad
  // const rData = insert.formatCreateData(data)

  try {
    const personaC = Personas.create(persona)
    data.cpersona = personaC.cpersona
    const cedente = Cedentes.create(data)
    return { result: cedente };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateCedentes = async(id, data) => {

  const persona = {
    cci_rif: `${data.itipodoc}-${data.cci_rif}`,
    xnombre: data.xcedente,
    xcorreo: data.xcorreo,
    xtelefono: data.xtelefono,
    xdireccion: data.xdireccion,
    cciudad: data.cciudad,
    itipo_persona: 'E',
  }

  delete data.itipodoc
  delete data.cci_rif
  delete data.xcedente
  delete data.xcorreo
  delete data.xtelefono
  delete data.xdireccion
  delete data.cestado
  delete data.cpais
  delete data.cciudad

  try {
    const cedenteUp = await Cedentes.update(data, {where: {ccedente: id}})
    const cedente =  await Cedentes.findOne({
      where: {ccedente: id},
      attributes: ['ccedente', 'cpersona'],
    })
    console.log(cedente)
   const personaC = await Personas.update(persona, {where: {cpersona: cedente.cpersona}})
    return { 
      result: cedente
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
      attributes: ['cpersona', 'cci_rif', 'xnombre', 'xapellido', 'fnacimiento'],
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
      where: {cpersona: id},
      attributes: ['cpersona', 'cci_rif', 'xnombre', 'xapellido', 'fnacimiento', 'xtelefono', 'xdireccion', 'xcorreo', 'isexo', 'iestado_civil', 'cciudad'],
      include: [
        {association: 'ciudad', attributes: ['cciudad'], include: [
          {association: 'estado', attributes: ['cestado'], include: [
            {association: 'pais', attributes: ['cpais']}
          ]}
        ]}
      ]
    });
    
    result.dataValues.itipodoc = result.cci_rif.split('-')[0];
    result.dataValues.cci_rif = result.cci_rif.split('-')[1];
    result.dataValues.cestado = result.ciudad?.estado?.cestado;
    result.dataValues.cpais = result.ciudad?.estado?.pais?.cpais;

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

  try {
    const result = await Personas.update(data, {
      where: {cpersona: id}
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchProductores = async () => {
  try {
    const items = await Productores.findAll({
      attributes: ['cproductor', 'cusuario', 'ctipo_productor'],
      include:[
        {association: 'tipo_productor', attributes: ['xtipo']},
        {association: 'usuario', attributes: ['cpersona'], include:[
          {association: 'persona', attributes: ['xnombre', 'cci_rif']}
        ]}
      ]
    });
    const result = items.map((item) => {
      const get = item.get({ plain: true })
      get.xtipo = get.tipo_productor?.xtipo;
      get.xproductor = get.usuario?.persona?.xnombre;
      get.cci_rif = get.usuario?.persona?.cci_rif;

      return get
    });
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchProductoresById = async (id) => {
  try {
    const result = await Productores.findOne({
      where:{cproductor: id},
      attributes: ['cproductor', 'csuper', 'ctipo_productor'],
      include: [
        {association: 'datos_bancarios', attributes: ['cbanco','xtelefono','cci_rif','xcuenta','itipo_cuenta'], include: [
          {association: 'banco', attributes: ['cbanco', 'cmoneda']}
        ]},
        {association: 'usuario', attributes: ['cpersona', 'xusuario', 'xcontrasena', 'xobservacion'], include:[
          {association: 'persona', attributes: ['xnombre', 'cci_rif', 'xtelefono', 'xcorreo', 'xdireccion'],
            include:[
              {association: 'ciudad', attributes: ['cciudad'], include: [
                {association: 'estado', attributes: ['cestado'], include: [
                  {association: 'pais', attributes: ['cpais']}
                ]}
              ]}
            ]
          }
        ]}
      ]
    });

    result.dataValues.xproductor = result.usuario?.persona?.xnombre;
    result.dataValues.xtelefono = result.usuario?.persona?.xtelefono;
    result.dataValues.xcorreo = result.usuario?.persona?.xcorreo;
    result.dataValues.xdireccion = result.usuario?.persona?.xdireccion;
    result.dataValues.itipodoc = result.usuario?.persona?.cci_rif.split('-')[0];
    result.dataValues.cci_rif = result.usuario?.persona?.cci_rif.split('-')[1];

    result.dataValues.cciudad = result.usuario?.persona?.ciudad?.cciudad;
    result.dataValues.cestado = result.usuario?.persona?.ciudad?.estado?.cestado;
    result.dataValues.cpais = result.usuario?.persona?.ciudad?.estado?.pais?.cpais;
    
    result.dataValues.cmoneda = result.datos_bancarios?.banco?.cmoneda;
    result.dataValues.cbanco = result.datos_bancarios?.cbanco;
    result.dataValues.xtelefono_banco = result.datos_bancarios?.xtelefono;
    result.dataValues.cci_rif_banco = result.datos_bancarios?.cci_rif;
    result.dataValues.xcuenta = result.datos_bancarios?.xcuenta;
    result.dataValues.itipo_cuenta = result.datos_bancarios?.itipo_cuenta;
    
    result.dataValues.xusuario = result.usuario?.xusuario;
    result.dataValues.xcontrasena = result.usuario?.xcontrasena;
    result.dataValues.xobservacion = result.usuario?.xobservacion;

    return result
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createProductor = async(body) => {

  const data = setAuItems(body)

  const persona = {
    cci_rif: `${data.itipodoc}-${data.cci_rif}`,
    xnombre: data.xcedente,
    xcorreo: data.xcorreo,
    xtelefono: data.xtelefono,
    xdireccion: data.xdireccion,
    cciudad: data.cciudad,
    itipo_persona: 'S',
  }

  const datos_bancarios = {
    cbanco: data.cbanco,
    xtelefono: data.xtelefono_banco,
    cci_rif: data.cci_rif_banco,
    xcuenta: data.xcuenta,
    itipo_cuenta: data.itipo_cuenta,
  }

  const usuario = {
    cbanco: data.cbanco,
    xtelefono: data.xtelefono_banco,
    cci_rif: data.cci_rif_banco,
    xcuenta: data.xcuenta,
    itipo_cuenta: data.itipo_cuenta,
  }

  try {
    const personaC = await Personas.create(persona)
    
    usuario.cpersona = personaC.cpersona
    
    const usuarioC = await Usuarios.create(usuario)

    const datos_bancariosC = await DatosBancarios.create(datos_bancarios)

    const productor = await Productores.create({
      csuper: data.csuper,
      ctipo_productor: data.ctipo_productor,
      cusuario: usuarioC.cusuario,
      cdatos_bancarios: datos_bancariosC.cdatos_bancarios
    })
    return {result: productor} 
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateProductores = async(id, data) => {
  const data = setAuItems(body)

  const persona = {
    cci_rif: `${data.itipodoc}-${data.cci_rif}`,
    xnombre: data.xcedente,
    xcorreo: data.xcorreo,
    xtelefono: data.xtelefono,
    xdireccion: data.xdireccion,
    cciudad: data.cciudad,
    itipo_persona: 'S',
  }

  const datos_bancarios = {
    cbanco: data.cbanco,
    xtelefono: data.xtelefono_banco,
    cci_rif: data.cci_rif_banco,
    xcuenta: data.xcuenta,
    itipo_cuenta: data.itipo_cuenta,
  }

  const usuario = {
    cbanco: data.cbanco,
    xtelefono: data.xtelefono_banco,
    cci_rif: data.cci_rif_banco,
    xcuenta: data.xcuenta,
    itipo_cuenta: data.itipo_cuenta,
  }

  try {
    const productorU = await Productores.update({
      csuper: data.csuper,
      ctipo_productor: data.ctipo_productor,
    }, {where: {cproductor:id}})

    const productor = await Productores.findOne({
      where: {cproductor: id},
      attributes:['cproductor','cdatos_bancarios','cusuario'], include:[
        {association: 'usuario', attributes: ['cpersona']}
      ]
    })
    const datos_bancariosU = await DatosBancarios.update(datos_bancarios, {where: {cdatos_bancarios: productor.cdatos_bancarios}})
    const usuarioU = await Usuarios.update(usuario, {where: {cusuario: productor.cusuario}})
    const personaU = await Personas.update(persona, {where: {cpersona: productor?.usuario.cpersona}})

    return {result: productor} 
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
const searchRamoById = async (id) => {
  try {
    const result = await Ramos.findOne({
      where:{id},
      attributes: ['cramo'],
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
      attributes: ['cproducto','xproducto'],
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
      attributes: ['cproducto','xproducto','cmoneda','cramo','ccedente','pcomision'],
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
    const item = await Vehiculos.findOne({
      where:{ccodigo: id},
      attributes: ['ccodigo','cmarca','xmarca','cmodelo', 'xmodelo','cversion','xversion','xtrans', 'xmotor','qano']
    });
    return item
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
    const value = valueNoTrimmed.toString().split('[]')[0]
    if(value.toString() == '' ){
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
    }
  }
  try {
    const result = await Vehiculos.create(data);
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateVehiculos = async(id, data) => {
  const dataArray = Object.entries(data)
  for (const item of dataArray) {
    const key = item[0]
    const valueNoTrimmed = item[1]
    const value = valueNoTrimmed.toString().split('[]')[0]
    if(value.toString() == '' ){
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
  // const rData = insert.formatEditData(data)
  try {
    const result = await Vehiculos.update(data, {
      where: {ccodigo: id}
    });
    return result;
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
  getMaMonedas,getMaCedentes,getMaEstados,getMaBancos,getMaCiudades,getMaMarcas,getMaTipoProducto,getMaModelos,getMaVersiones,getMaMetodologiapago,getMaBancos,
  searchPaises,searchPaisById,createPais,updatePaises,
  searchEstados,searchEstadoById,createEstado,updateEstado,
  searchCiudades,searchCiudadById,createCiudad,updateCiudad,
  searchBancos,searchBancoById,createBanco,updateBanco,
  searchMetodologiapago,searchMetodologiapagoById,createMetodologiapago,updateMetodologiapago,
  searchMonedas,searchMonedasById,createMoneda,updateMoneda,
  searchCedentes,searchCedentesById,createCedentes,updateCedentes,
  searchClientes,searchClienteById,createCliente,updateCliente,
  searchProductores,searchProductoresById,createProductor,updateProductores,
  searchRamos,searchRamoById,createRamo,updateRamo,
  searchProductos,searchProductoById,createProducto,updateProducto,
  searchVehiculos,searchVehiculoById,createVehiculo,updateVehiculos
}