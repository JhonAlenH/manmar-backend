import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cedents = sequelize.define('macedentes', {});
const Trade = sequelize.define('maramos', {});
const Coin = sequelize.define('mamonedas', {});
const Clients = sequelize.define('maclientes', {});
const Color = sequelize.define('macolores', {});
const Payment = sequelize.define('mametodologiapago', {}, { tableName: 'mametodologiapago' });
const Executive = sequelize.define('maejecutivos', {});
const Agents = sequelize.define('maagentes', {});
const Insurance = sequelize.define('maasegurados', {});
const Takers = sequelize.define('maVtomadores', 
{  ctomador: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  allowNull: true,
},});
const Brand = sequelize.define('mainma', {  
  qano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xmarca: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'mainma' });

const Model = sequelize.define('mainma', {
  qano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xmarca: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  xmodelo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'mainma' });

const Version = sequelize.define('mainma', {
  qano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xmarca: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  xmodelo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  xversion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  npasajero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'mainma' });
const State = sequelize.define('maestados', {
  cestado: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cpais: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xestado: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},);
const City = sequelize.define('maciudades', {
  cciudad: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cpais: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cestado: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xciudad: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},);


const getCedents = async () => {
  try {
    const cedent = await Cedents.findAll({
      attributes: ['ccedente', 'xcedente'],
    });
    const cedents = cedent.map((item) => item.get({ plain: true }));
    return cedents;
  } catch (error) {
    return { error: error.message };
  }
};

const getTrade = async () => {
  try {
    const trade = await Trade.findAll({
      attributes: ['cramo', 'xramo'],
    });
    const trades = trade.map((item) => item.get({ plain: true }));
    return trades;
  } catch (error) {
    return { error: error.message };
  }
};

const getCoins = async () => {
  try {
    const coin = await Coin.findAll({
      attributes: ['cmoneda', 'xmoneda'],
    });
    const coins = coin.map((item) => item.get({ plain: true }));
    return coins;
  } catch (error) {
    return { error: error.message };
  }
};

const getClients = async () => {
  try {
    const client = await Clients.findAll({
      attributes: ['ccliente', 'xcliente', 'itipodoc', 'xdoc_identificacion'],
    });
    const clients = client.map((item) => item.get({ plain: true }));
    return clients;
  } catch (error) {
    return { error: error.message };
  }
};

const getBrand = async (getBrand) => {
  try {
    const marca = await Brand.findAll({
      where: getBrand,
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('xmarca')), 'xmarca']]
    });
    const brand = marca.map((item) => item.get({ plain: true }));
    return brand;
  } catch (error) {
    return { error: error.message };
  }
};

const getModel = async (getModel) => {
  try {
    const modelo = await Model.findAll({
      where: getModel,
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('xmodelo')), 'xmodelo']]
    });
    const model = modelo.map((item) => item.get({ plain: true }));
    return model;
  } catch (error) {
    return { error: error.message };
  }
};

const getVersion = async (getVersion) => {
  try {
    const versions = await Version.findAll({
      where: getVersion,
      attributes: ['xversion', 'npasajero', 'xclasificacion', 'id', 'xclase_rcv', 'msum', 'ctarifa_exceso', 'xuso', 'npesovacio', 'ncapcarga'],
    });
    const version = versions.map((item) => item.get({ plain: true }));
    return version;
  } catch (error) {
    return { error: error.message };
  }
};

const getColor = async () => {
  try {
    const colores = await Color.findAll({
      attributes: ['ccolor', 'xcolor'],
    });
    const color = colores.map((item) => item.get({ plain: true }));
    return color;
  } catch (error) {
    return { error: error.message };
  }
};

const getMethodOfPayment = async () => {
  try {
    const metodologia = await Payment.findAll({
      attributes: ['cmetodologiapago', 'xmetodologiapago'],
    });
    const result = metodologia.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getTakers = async () => {
  try {
    const tomador = await Takers.findAll({
      attributes: ['ctomador', 
                   'xtomador', 
                   'xprofesion', 
                   'icedula', 
                   'xcedula', 
                   'xrif', 
                   'xdomicilio', 
                   'xpais', 
                   'xestado',
                   'xciudad',
                   'xzona_postal',
                   'xdireccion',
                   'xcorreo'],
    });
    const result = tomador.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getTakersId = async (getTakersId) => {
  console.log(getTakersId)
  try {
    const result = await Takers.findOne({
      where: {xcedula: getTakersId},
      attributes: ['ctomador', 
                   'xtomador', 
                   'xprofesion', 
                   'icedula', 
                   'xcedula', 
                   'xrif', 
                   'xdomicilio', 
                   'xpais', 
                   'xestado',
                   'xciudad',
                   'xzona_postal',
                   'xdireccion',
                   'xcorreo'],
    });

    return result ? result.get({ plain: true }) : null;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getState = async (getState) => {
  try {
    const items = await State.findAll({
      where: getState,
      attributes: ['cestado', 'xestado'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getCity = async (getCity) => {
  try {
    const items = await City.findAll({
      where: getCity,
      attributes: ['cciudad', 'xciudad'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getExecutive = async () => {
  try {
    const exec = await Executive.findAll({
      attributes: ['cejecutivo', 'xejecutivo', 'pcomision'],
    });
    const executive = exec.map((item) => item.get({ plain: true }));
    return executive;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getAgents = async (cejecutivo) => {
  try {
    const agent = await Agents.findAll({
      where: {cejecutivo: cejecutivo},
      attributes: ['cagente', 'xagente', 'pcomision'],
    });
    const agents = agent.map((item) => item.get({ plain: true }));
    return agents;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getInsurance = async () => {
  try {
    const asegurados = await Insurance.findAll({
      attributes: ['casegurado', 'xnombre', 'xapellido', 'itipodoc', 'xcedula'],
    });
    const insurances = asegurados.map((item) => item.get({ plain: true }));
    return insurances;
  } catch (error) {
    return { error: error.message };
  }
};

export default {
  getCedents,
  getTrade,
  getCoins,
  getClients,
  getBrand,
  getModel,
  getVersion,
  getColor,
  getMethodOfPayment,
  getTakers,
  getTakersId,
  getState,
  getCity,
  getExecutive,
  getAgents,
  getInsurance
};