import Estados from '../db/Estados.js';

const searchEstados = async (req, res) => {
  try {
    const estados = await Estados.searchEstados();
    if (estados.error) {
      return res.status(estados.code).send({
        status: false,
        message: estados.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Estados Obtenidos',
      data: estados
    });
  } catch (error){

  }
}

const createEstados = async (req, res) => {
  try {
    const createdEstados = await Estados.createEstados(req.body);
    if (createdEstados.error) {
      return res.status(createdEstados.code).send({
        status: false,
        message: createdEstados.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Creado',
      data: createdEstados
    });
    
  } catch (error) {
    
  }
}
const searchEstado = async (req, res) => {
  try {
    const findedEstados = await Estados.searchEstadosById(req.params.id);
    if (findedEstados.error) {
      return res.status(findedEstados.code).send({
        status: false,
        message: findedEstados.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Obtenido',
      data: findedEstados
    });
    
  } catch (error) {
    
  }
}
const updateEstados = async (req, res) => {
  try {
    const updatedEstados = await Estados.updateEstados(req.params.id, req.body);
    if (updatedEstados.error) {
      return res.status(updatedEstados.code).send({
        status: false,
        message: updatedEstados.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Actualizado',
      data: updatedEstados
    });
    
  } catch (error) {
    
  }
}

export default {
  createEstados,
  searchEstados,
  searchEstado,
  updateEstados
}