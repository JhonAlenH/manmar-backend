import sql from "mssql";
import Emission from "./Emission.js";
import { Sequelize, Op } from 'sequelize';
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

const Renovations = models.povigencias;
const Recibos = models.cbrecibos;
const Comisiones = models.cbcomisiones;

const Distribution = models.maproductos;

const searchRenovations = async (data) => {
  try {
    // Inicializa el objeto de condiciones
    const conditions = {
      fhasta: {
        [Sequelize.Op.lt]: new Date(), // Solo contratos vencidos
      },
    };

    // Solo agrega ccedente y cramo si están presentes
    const polizaData = { association: 'poliza', attributes: ['cpoliza', 'xpoliza'], include: [
      {association: 'asegurado', attributes: ['cpersona','xnombre', 'xapellido']},
    ]};
    if (data.ccedente || data.cramo) {
      if (data.ccedente) {
        polizaData.where = { ccedente: data.ccedente };
      }
      if (data.cramo) {
        polizaData.where = { cramo: data.cramo };
      }
    }

    // Verifica si se proporcionó mes y año
    if (data.mes && data.year) {
      // Determinar el primer y último día del mes
      const startOfMonth = new Date(data.year, data.mes - 1, 1); // Mes en formato 0-11
      const endOfMonth = new Date(data.year, data.mes, 0); // Último día del mes

      // Agregar condición para fhasta que esté dentro del rango del mes
      conditions.fhasta = {
        [Sequelize.Op.between]: [startOfMonth, endOfMonth],
      };
    }
    
    const renovaciones = await Renovations.findAll({
      where: conditions,
      attributes: [
        'cvigencia', 'fdesde', 'fhasta',
      ],
      include: [
        {association: 'producto', attributes: ['cproducto'], include: [
          {association: 'cedente', attributes: ['ccedente'], include: [
            {association: 'persona', attributes: ['xnombre']},
          ]},
          {association: 'ramo', attributes: ['cramo','xramo']},
        ]},
        polizaData
      ]
    });

    const renovations = renovaciones.map((item) => {
      const itemData = item.get({ plain: true });

      // Calcular cuántos días lleva vencido el contrato
      const today = new Date();
      const fhastaDate = new Date(itemData.fhasta); // Convertir fhasta a Date si no es ya un objeto Date
      const diffTime = today - fhastaDate; // Diferencia en milisegundos
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir a días

      // Agregar el nuevo campo nvencido
      itemData.nvencido = diffDays;

      return itemData;
    });

    return renovations;
  } catch (error) {
    return { error: error.message };
  }
};

const getReceipt = async (getReceipt) => {
  // Transformar el valor de mprima
    try {
      let pool = await sql.connect(sqlConfig);
      let result = await pool.request()
        .input('fdesde_pol', sql.DateTime, getReceipt.fdesde)
        .input('fhasta_pol', sql.DateTime, getReceipt.fhasta)
        .input('mprima', sql.Numeric(18, 2), getReceipt.mprima) // Ahora pasa el valor numérico correcto
        .input('pcomision', sql.Numeric(18, 2), getReceipt.pcomision) // Ahora pasa el valor numérico correcto
        .input('cmetodologiapago', sql.Int, getReceipt.cmetodologiapago)
        .execute('tmBRecibos');

      const receipt = await pool.request().query('select * from tmrecibos');
      await pool.close();

      return receipt;
    } catch (err) {
      console.log(err.message);
      return { error: err.message };
    }
};

const createRenovation = async (data,id) => {
  try {
    const updateVigencia = await Renovations.update(
      { iestado: 'R' },
      { where: { cpoliza: id } }
    );
    const renovacion = await Renovations.create(data)
    for (const recibo of data.recibos) {
      const receipt = await Recibos.create({...recibo, cvigencia: renovacion.cvigencia})
      console.log('recibo cre')
      for (const comision of recibo.comisiones) {
        const comitt = await Comisiones.create({...comision, crecibo: receipt.crecibo})
        console.log('comision cre')
      }
    }
    return true;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const getDistribution = async (cproducto) => {
  try {
    const distribution = await Distribution.findOne({
      where: {cproducto: cproducto},
      attributes: ['cproduct', 'pcomision'],
    });
    return distribution ? distribution.get({ plain: true }) : {};;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

export default {
    searchRenovations,
    getReceipt,
    getDistribution,
    createRenovation
}