import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cedents = sequelize.define('macedentes', {});
const Trade = sequelize.define('maramos', {});
const Coin = sequelize.define('mamonedas', {});
const Clients = sequelize.define('maclientes', {});


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
      attributes: ['ccliente', 'xcliente'],
    });
    const clients = client.map((item) => item.get({ plain: true }));
    return clients;
  } catch (error) {
    return { error: error.message };
  }
};

export default {
  getCedents,
  getTrade,
  getCoins,
  getClients
};