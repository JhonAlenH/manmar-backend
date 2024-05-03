import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cedents = sequelize.define('macedentes', {});
const Trade = sequelize.define('maramos', {});
const Coin = sequelize.define('mamonedas', {});
const Clients = sequelize.define('maclientes', {});
const Color = sequelize.define('macolores', {});
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

export default {
  getCedents,
  getTrade,
  getCoins,
  getClients,
  getBrand,
  getModel,
  getVersion,
  getColor
};