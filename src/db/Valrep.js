import { Sequelize, DataTypes, Op, where } from 'sequelize';
import sequelize from '../config/database.js';
import initModels  from "../models/init-models.js";
const models = initModels(sequelize)


const Trade =  models.maramos //sequelize.define('maramos', {});
const User = models.seusuarios
const Coin =  models.mamonedas //sequelize.define('mamonedas', {});
const Clients = models.mapersonas;
const Color = models.macolores //sequelize.define('macolores', {});
const Payment = models.mametodologiapago //sequelize.define('mametodologiapago', {}, { tableName: 'mametodologiapago' });
const Intermediaries = models.maintermediarios //sequelize.define('mametodologiapago', {}, { tableName: 'mametodologiapago' });
const Executive = sequelize.define('maejecutivos', {});
const Agents = sequelize.define('maagentes', {});
const Producers = models.maproductores //sequelize.define('maasegurados', {});
const Products = models.maproductos //sequelize.define('maasegurados', {});
const Cedents = models.macedentes //sequelize.define('maasegurados', {});
const Insurance = models.mapersonas //sequelize.define('maasegurados', {});
const Persons = models.mapersonas //sequelize.define('maasegurados', {});
const Bank = models.mabancos //sequelize.define('mabancos', {});
const Takers = models.matomadores 
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
const State = models.maestados
const City = models.maciudades
const Coverage = models.macoberturas


const getCedents = async (data) => {
  try {
    console.log(data)
    const cedentes = await Cedents.findAll({
      attributes: ['ccedente'],
      include: [
        // {association: 'productores', attributes: [], where: data},
        {association: 'persona', attributes: ['xnombre', 'xapellido']}
      ]
    })
    const cedents = cedentes.map((item) => item.get({ plain: true }));
    return cedents;
  } catch (error) {
    console.log(error)
    return { error: await error.parent.message };
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
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getProduct = async (data) => {
  try {
    const product = await Products.findAll({
      where: data,
      attributes: ['cproducto', 'xproducto'],
    });
    const products = product.map((item) => item.get({ plain: true }));
    return products;
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
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getClients = async () => {
  try {
    const client = await Clients.findAll({
      where: {itipo_persona: 'C'},
      attributes: ['cpersona', 'cci_rif', 'xnombre', 'xapellido'],
    });
    const clients = client.map((item) => item.get({ plain: true }));
    return clients;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getBrand = async (data) => {
  try {
    const marca = await Brand.findAll({
      where: data,
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('xmarca')), 'xmarca']]
    });
    const brand = marca.map((item) => item.get({ plain: true }));
    return brand;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getModel = async (data) => {
  try {
    const modelo = await Model.findAll({
      where: data,
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('xmodelo')), 'xmodelo']]
    });
    const model = modelo.map((item) => item.get({ plain: true }));
    return model;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getVersion = async (data) => {
  try {
    const versions = await Version.findAll({
      where: data,
      attributes: ['xversion', 'cversion'],
    });
    const version = versions.map((item) => item.get({ plain: true }));
    return version;
  } catch (error) {
    // let errors = []

    return { error: error}
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
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
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
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getTakers = async () => {
  try {
    const tomador = await Persons.findAll({
      attributes: ['cpersona', 'xnombre', 'xapellido', 'cci_rif'],
      include: [{
        association: 'usuario',
      }],
      where: {
        [Op.or]: {
          '$usuario.cusuario$': null,
          '$usuario.crol$': {
            [Op.not]: 1
          }
        }
      }
    });
    const result = tomador.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getTakersId = async (data) => {
  try {
    const result = await Takers.findOne({
      where: {xcedula: data},
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
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getState = async (data) => {
  try {
    const items = await State.findAll({
      where: data,
      attributes: ['cestado', 'xestado'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getCity = async (data) => {
  try {
    const items = await City.findAll({
      where: data,
      attributes: ['cciudad', 'xciudad'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
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
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
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
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getInsurance = async () => {
  try {
    const asegurados = await Persons.findAll({
      attributes: ['cpersona', 'xnombre', 'xapellido', 'cci_rif'],
      include: [{
        association: 'usuario',
      }],
      where: {
        [Op.or]: {
          '$usuario.cusuario$': null,
          '$usuario.crol$': {
            [Op.not]: 1
          }
        }
      }
      
    });
    const insurances = asegurados.map((item) => item.get({ plain: true }));
    return insurances;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getCoverage = async (cramo) => {
  try {
    const coberturas = await Coverage.findAll({
      where: {cramo: cramo},
      attributes: ['ccobertura', 'xcobertura'],
    });
    const coverage = coberturas.map((item) => item.get({ plain: true }));
    return coverage;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getBank = async () => {
  try {
    const bancos = await Bank.findAll({
      attributes: ['cbanco', 'xbanco', 'cmoneda'],
    });
    const bank = bancos.map((item) => item.get({ plain: true }));
    return bank;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

const getBankProductor = async (data) => {
  try {
    const banco = await Intermediaries.findOne({
      where: {
        id: data.cintermediario
      },
      attributes: ['id', 'cprod_rel'],
      include: [
        {
          association: 'usuario',
          attributes: ['cusuario','cpersona', 'crol'],
          include:['persona']
        },
        {
          association: 'datos_bancarios',
          include:['banco']
        }
      ]
    });
    return banco;
  } catch (error) {

    return { error: error};
  }
};
const getDataUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        cusuario: data.cusuario
      },
      attributes: ['cbanco', 'xbanco', 'cmoneda'],
      include: [
        {
          association: 'intermediario',
          include: [
            {
              association: 'datos_bancarios',
              include:['banco']
            }
          ],
        },
      ]
    });
    return user;
  } catch (error) {
    let errors = []
    for (const errorA of await error.parent.errors) {
      errors.push(errorA)
    }
    return { error: errors.join(`
    `) };
  }
};

export default {
  getCedents,
  getTrade,
  getProduct,
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
  getInsurance,
  getCoverage,
  getBank,
  getBankProductor,
  getDataUser
};