import { where } from 'sequelize';
import sequelize from '../config/database.js';
import initModels  from "../models/init-models.js";

const models = initModels(sequelize)

const Operaciones = models.auoperaciones;

const createAuOperaciones = async (data) => {
  try {
    const operacion = await Operaciones.create(data);
    return operacion;
  } catch (error) {
    return { error: error.message };
  }
};

const editAuOperaciones = async (id, data) => {
  try {
    const operacion = await Operaciones.update({
      where: {coperacion: id}
    }, data);
    return {message: 'Actualizacion Exitosa'};
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

export default {
  createAuOperaciones,
  editAuOperaciones
}