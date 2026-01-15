import initModels  from "../models/init-models.js";
import sequelize from "../config/database.js";
const models = initModels(sequelize)


const verifyUser = async (data) => {
  try {
    const user = await models.seusuarios.findOne({
      attributes: ['cusuario', 'xusuario', 'crol', 'cproductor'],
      where: {
        xusuario: data.username,
        xcontrasena: data.password
      },
      include: [
        'productor',
        {
          model: models.mapersonas,
          as: 'persona',
          attributes: ['xnombre','xapellido']
        },
        'productor_usuario',
        'rol'
      ]
    });
    if(user){
      return user;
    } else {
      return { error: 'Usuario o Contraseña invalidos' }
    } 
  }
  catch (error) {
    console.log(await error)
    return { error: error.parent.message };
  }
}
const getProductor = async (cusuario) => {
  try {
    const data = await models.maproductores.findOne({
      attributes: ['cproductor', 'csuper', 'ctipo'],
      where: {
        cusuario: cusuario
      },
      include: ['tipo_produc']
    });
    if(data){
      return data;
    } else {
      return { error: 'Codigo errado' };
    }
  }
  catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getExecutive = async (cusuario) => {
  try {
    const data = await models.maejecutivos.findOne({
      attributes: ['cejecutivo', 'csuper'],
      where: {
          cusuario: cusuario
      },
      include: ['productor']
    });
    if(data){
      return data;
    } else {
      return { error: 'Codigo errado' };
    }
  }
  catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getAgent = async (cusuario) => {
  try {
    const data = await models.maagentes.findOne({
      attributes: ['cagente'],
      where: {
        cusuario: cusuario
      },
      include: [{
        association: 'ejecutivo',
        include: ['productor'],
      }]
    });
    if(data){
      return data;
    } else {
      return { error: 'Codigo errado' };
    }
  }
  catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

export default {
  verifyUser,
  getProductor,
  getExecutive,
  getAgent
}