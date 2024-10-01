import sql from "mssql";
import { Sequelize, Op } from 'sequelize';
import sequelize from '../config/database.js';

const Renovations = sequelize.define('poVpolizas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: true,
    },
});

const searchRenovations = async (data) => {
  console.log(data);
  try {
    // Inicializa el objeto de condiciones
    const conditions = {
      fhasta: {
        [Sequelize.Op.lt]: new Date(), // Solo contratos vencidos
      },
    };

    // Solo agrega ccedente y cramo si están presentes
    if (data.ccedente) {
      conditions.ccedente = data.ccedente;
    }

    if (data.cramo) {
      conditions.cramo = data.cramo;
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
        'id', 'ccedente', 'xcedente', 'cramo', 'xramo', 'casegurado', 'xasegurado', 'fdesde', 'fhasta', 'xpoliza'
      ],
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

export default {
    searchRenovations 
}