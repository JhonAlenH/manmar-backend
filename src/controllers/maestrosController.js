import Maestros from '../db/Maestros.js';

const getMaMonedas = async (req, res) => {
  try {
    const gettedMonedas = await Maestros.getMaMonedas();
    // console.log(gettedMonedas.result.recordset)
    if (gettedMonedas.error) {
      return res.status(gettedMonedas.code).send({
        status: false,
        message: gettedMonedas.error
      });
    }
    const formatData = gettedMonedas.result.recordset.map(item => {
      return{
        text: item.xmoneda,
        value: `${item.cmoneda}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Monedas Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaPaises = async (req, res) => {
  try {
    const gettedPaises = await Maestros.getMaPaises();
    // console.log(gettedPaises.result)
    if (gettedPaises.error) {
      return res.status(gettedPaises.code).send({
        status: false,
        message: gettedPaises.error
      });
    }
    const formatData = gettedPaises.result.recordset.map(item => {
      return{
        text: item.xpais.toLowerCase(),
        value: `${item.cpais}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Países Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaCiudades = async (req, res) => {
  try {
    const gettedCiudades = await Maestros.getMaCiudades(req.params.pais, req.params.estado);
    // console.log(gettedCiudades.result)
    if (gettedCiudades.error) {
      return res.status(gettedCiudades.code).send({
        status: false,
        message: gettedCiudades.error
      });
    }
    const formatData = gettedCiudades.result.recordset.map(item => {
      return{
        text: item.xdescripcion_l,
        value: `${item.cciudad}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Ciudades Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaEstados = async (req, res) => {
  try {
    const gettedEstados = await Maestros.getMaEstados(req.params.pais);
    // console.log(gettedCiudades.result)
    if (gettedEstados.error) {
      return res.status(gettedEstados.code).send({
        status: false,
        message: gettedEstados.error
      });
    }
    const formatData = gettedEstados.result.recordset.map(item => {
      return{
        text: item.xestado,
        value: `${item.cestado}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Estados Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaMetodologiapago = async (req, res) => {
  try {
    const gettedMetodologiapago = await Maestros.getMaMetodologiapago();
  //  console.log(gettedMetodologiapago.result)
    if (gettedMetodologiapago.error) {
      return res.status(gettedMetodologiapago.code).send({
        status: false,
        message: gettedMetodologiapago.error
      });
    }
    const formatData = gettedMetodologiapago.result.recordset.map(item => {
      return{
        text: item.cmetodologiapago,
        value: `${item.xmetodologiapago}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Metodologías de Pago Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaCedentes = async (req, res) => {
  try {
    const gettedCedentes = await Maestros.getMaCedentes(58, 1);
    if (gettedCedentes.error) {
      return res.status(gettedCedentes.code).send({
        status: false,
        message: gettedCedentes.error
      });
    }
    const formatData = gettedCedentes.result.recordset.map(item => {
      return{
        text: item.xcedente,
        value: `${item.ccedente}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'cedentes Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaBancos = async (req, res) => {
  try {
    const gettedRepuestos = await Maestros.getMaBancos(req.body);
    // console.log(gettedPaises.result)
    if (gettedRepuestos.error) {
      return res.status(gettedPaises.code).send({
        status: false,
        message: gettedPaises.error
      });
    }
    const formatData = gettedRepuestos.result.recordset.map(item => {
      return{
        text: item.xrepuesto,
        value: `${item.crepuesto}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Repuestos Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

const getMaMarcas = async (req, res) => {
  try {
    const gettedMarcas = await Maestros.getMaMarcas(req.body);
    // console.log(gettedProveedores.result)
    if (gettedMarcas.error) {
      return res.status(gettedMarcas.code).send({
        status: false,
        message: gettedMarcas.error
      });
    }
    const formatData = gettedMarcas.result.recordset.map(item => {
      return{
        text: item.xmarca,
        value: `${item.id}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Marcas Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

const searchPaises = async (req, res) => {
//  console.log('holaaa')
  try {
    const paises = await Maestros.searchPaises();
    if (paises.error) {
      return res.status(paises.code).send({
        status: false,
        message: paises.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Paises Obtenidos',
      data: paises
    });
  } catch (error){

  }
}

const createPaises = async (req, res) => {
  try {
    const createdPaises = await Maestros.createPaises(req.body);
    if (createdPaises.error) {
      return res.status(createdPaises.code).send({
        status: false,
        message: createdPaises.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Pais Creado',
      data: createdPaises
    });
    
  } catch (error) {
    
  }
}
const searchPais = async (req, res) => {
  try {
    const findedPais = await Maestros.searchPaisesById(req.params.id);
    if (findedPais.error) {
      return res.status(findedPais.code).send({
        status: false,
        message: findedPais.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Pais Obtenido',
      data: findedPais
    });
    
  } catch (error) {
    
  }
}
const updatePaises = async (req, res) => {
  try {
    const updatedPaises = await Maestros.updatePaises(req.params.id, req.body);
    if (updatedPaises.error) {
      return res.status(updatedPaises.code).send({
        status: false,
        message: updatedPaises.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Pais Actualizado',
      data: updatedPaises
    });
    
  } catch (error) {
    
  }
}
 

const searchBancos = async (req, res) => {
  try {
    const bancos = await Maestros.searchBancos();
    if (bancos.error) {
      return res.status(bancos.code).send({
        status: false,
        message: bancos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Bancos Obtenidos',
      data: bancos
    });
  } catch (error){

  }
}

const createBancos = async (req, res) => {
  try {
    const createdBancos = await Maestros.createBancos(req.body);
    if (createdBancos.error) {
      return res.status(createdBancos.code).send({
        status: false,
        message: createdBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Creado',
      data: createdBancos
    });
    
  } catch (error) {
    
  }
}
const searchBanco = async (req, res) => {
  try {
    const findedBancos = await Maestros.searchBancosById(req.params.id);
    if (findedBancos.error) {
      return res.status(findedBancos.code).send({
        status: false,
        message: findedBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Obtenido',
      data: findedBancos
    });
    
  } catch (error) {
    
  }
}
const updateBancos = async (req, res) => {
  try {
    const updatedBancos = await Maestros.updateBancos(req.params.id, req.body);
    if (updatedBancos.error) {
      return res.status(updatedBancos.code).send({
        status: false,
        message: updatedBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Actualizado',
      data: updatedBancos
    });
    
  } catch (error) {
    
  }
}


const searchMetodologiapago = async (req, res) => {
  try {
    const metodologiapago = await Maestros.searchMetodologiapago();
    if (metodologiapago.error) {
      return res.status(metodologiapago.code).send({
        status: false,
        message: metodologiapago.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Metodologias de Pagos Obtenidas',
      data: metodologiapago
    });
  } catch (error){

  }
}

const createMetodologiapago = async (req, res) => {
  try {
    const createdMetodologiapago = await Maestros.createMetodologiapago(req.body);
    if (createdMetodologiapago.error) {
      return res.status(createdMetodologiapago.code).send({
        status: false,
        message: createdMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodologia de Pago Creada',
      data: createdMetodologiapago
    });
    
  } catch (error) {
    
  }
}
const searchMetodologiapago1 = async (req, res) => {
  try {
    const findedMetodologiapago = await Maestros.searchMetodologiapagoById(req.params.id);
    if (findedMetodologiapago.error) {
      return res.status(findedMetodologiapago.code).send({
        status: false,
        message: findedMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodologia de Pago Localizada',
      data: findedMetodologiapago
    });
    
  } catch (error) {
    
  }
}
const updateMetodologiapago = async (req, res) => {
  try {
    const updatedMetodologiapago = await Maestros.updateMetodologiapago(req.params.id, req.body);
    if (updatedMetodologiapago.error) {
      return res.status(updatedMetodologiapago.code).send({
        status: false,
        message: updatedMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodologia de Pago Actualizada',
      data: updatedMetodologiapago
    });
    
  } catch (error) {
    
  }
}

const searchMonedas = async (req, res) => {
  try {
    const monedas = await Maestros.searchMonedas();
    if (monedas.error) {
      return res.status(monedas.code).send({
        status: false,
        message: monedas.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Monedas Obtenidas',
      data: monedas
    });
  } catch (error){

  }
}

const createMonedas = async (req, res) => {
  try {
    const createdMonedas = await Maestros.createMonedas(req.body);
    if (createdMonedas.error) {
      return res.status(createdMonedas.code).send({
        status: false,
        message: createdMonedas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Moneda Creada',
      data: createdMonedas
    });
    
  } catch (error) {
    
  }
}
const searchMoneda = async (req, res) => {
  try {
    const findedMonedas = await Maestros.searchMonedasById(req.params.id);
    if (findedMonedas.error) {
      return res.status(findedMonedas.code).send({
        status: false,
        message: findedMonedas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Moneda Obtenida',
      data: findedMonedas
    });
    
  } catch (error) {
    
  }
}
const updateMonedas = async (req, res) => {
  try {
    const updatedMonedas = await Maestros.updateMonedas(req.params.id, req.body);
    if (updatedMonedas.error) {
      return res.status(updatedMonedas.code).send({
        status: false,
        message: updatedMonedas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Moneda Actualizada',
      data: updatedMonedas
    });
    
  } catch (error) {
    
  }
}

const searchCedentes = async (req, res) => {
  try {
    const cedentes = await Maestros.searchCedentes();
    if (cedentes.error) {
      return res.status(cedentes.code).send({
        status: false,
        message: cedentes.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Cedentes Obtenidas',
      data: cedentes
    });
  } catch (error){

  }
}

const createCedentes = async (req, res) => {
  try {
    const createdCedentes = await Maestros.createCedentes(req.body);
    if (createdCedentes.error) {
      return res.status(createdCedentes.code).send({
        status: false,
        message: createdCedentes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cedente Creada',
      data: createdCedentes
    });
    
  } catch (error) {
    
  }
}
const searchCedente = async (req, res) => {
  try {
    const findedCedentes = await Maestros.searchCedentesById(req.params.id);
    if (findedCedentes.error) {
      return res.status(findedCedentes.code).send({
        status: false,
        message: findedCedentes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cedente Obtenida',
      data: findedCedentes
    });
    
  } catch (error) {
    
  }
}
const updateCedentes = async (req, res) => {
  try {
    const updatedCedentes = await Maestros.updateCedentes(req.params.id, req.body);
    if (updatedCedentes.error) {
      return res.status(updatedCedentes.code).send({
        status: false,
        message: updatedCedentes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cedente Actualizada',
      data: updatedCedentes
    });
    
  } catch (error) {
    
  }
}

const searchAsegurados = async (req, res) => {
  try {
    const asegurados = await Maestros.searchAsegurados();
    if (asegurados.error) {
      return res.status(asegurados.code).send({
        status: false,
        message: asegurados.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Asegurados Obtenidos',
      data: asegurados
    });
  } catch (error){

  }
}

const createAsegurados = async (req, res) => {
  try {
    const createdAsegurados = await Maestros.createAsegurados(req.body);
    if (createdAsegurados.error) {
      return res.status(createdAsegurados.code).send({
        status: false,
        message: createdAsegurados.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Asegurado Creado',
      data: createdAsegurados
    });
    
  } catch (error) {
    
  }
}
const searchAsegurado = async (req, res) => {
  try {
    const findedAsegurados = await Maestros.searchAseguradosById(req.params.id);
    if (findedAsegurados.error) {
      return res.status(findedAsegurados.code).send({
        status: false,
        message: findedAsegurados.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Asegurado Obtenido',
      data: findedAsegurados
    });
    
  } catch (error) {
    
  }
}
const updateAsegurados = async (req, res) => {
  try {
    const updatedAsegurados = await Maestros.updateAsegurados(req.params.id, req.body);
    if (updatedAsegurados.error) {
      return res.status(updatedAsegurados.code).send({
        status: false,
        message: updatedAsegurados.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Asegurado Actualizado',
      data: updatedAsegurados
    });
    
  } catch (error) {
    
  }
}

const searchAgentes = async (req, res) => {
  try {
    const agentes = await Maestros.searchAgentes();
    if (agentes.error) {
      return res.status(agentes.code).send({
        status: false,
        message: agentes.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Agentes Obtenidos',
      data: agentes
    });
  } catch (error){

  }
}
const createAgentes = async (req, res) => {
  try {
    const createdAgentes = await Maestros.createAgentes(req.body);
    if (createdAgentes.error) {
      return res.status(createdAgentes.code).send({
        status: false,
        message: createdAgentes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Agente Creado',
      data: createdAgentes
    });
    
  } catch (error) {
    
  }
}
const searchAgente = async (req, res) => {
  console.log('buscar')
  try {
    const findedAgentes = await Maestros.searchAgentesById(req.params.id);
    if (findedAgentes.error) {
      return res.status(findedAgentes.code).send({
        status: false,
        message: findedAgentes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Agente Obtenido',
      data: findedAgentes
    });
    
  } catch (error) {
    
  }
}
const updateAgentes = async (req, res) => {
  console.log('modificar')
  try {
    const updatedAgentes = await Maestros.updateAgentes(req.params.id, req.body);
    if (updatedAgentes.error) {
      return res.status(updatedAgentes.code).send({
        status: false,
        message: updatedAgentes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Agente Actualizado',
      data: updatedAgentes
    });
    
  } catch (error) {
    
  }
}


const searchEjecutivos = async (req, res) => {
  try {
    const ejecutivos = await Maestros.searchEjecutivos();
    if (ejecutivos.error) {
      return res.status(ejecutivos.code).send({
        status: false,
        message: ejecutivos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Ejecutivos Obtenidos',
      data: ejecutivos
    });
  } catch (error){

  }
}
const searchEjecutivosMaestros = async (req, res) => {
  try {
    const ejecutivos = await Maestros.searchEjecutivos();
    if (ejecutivos.error) {
      return res.status(ejecutivos.code).send({
        status: false,
        message: ejecutivos.error
      });
      
    }
    const formData = ejecutivos.map(item => {
      return {
        text: item.xejecutivo,
        value: item.cejecutivo
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Ejecutivos Obtenidos',
      data: formData
    });
  } catch (error){

  }
}
const createEjecutivos = async (req, res) => {
  try {
    const createdEjecutivos = await Maestros.createEjecutivos(req.body);
    if (createdEjecutivos.error) {
      return res.status(createdEjecutivos.code).send({
        status: false,
        message: createdEjecutivos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ejecutivo Creado',
      data: createdEjecutivos
    });
    
  } catch (error) {
    
  }
}
const searchEjecutivo = async (req, res) => {

  try {
    const findedEjecutivos = await Maestros.searchEjecutivosById(req.params.id);
    if (findedEjecutivos.error) {
      return res.status(findedEjecutivos.code).send({
        status: false,
        message: findedEjecutivos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ejecutivo Obtenido',
      data: findedEjecutivos
    });
    
  } catch (error) {
    
  }
}
const updateEjecutivos = async (req, res) => {
  try {
    const updatedEjecutivos = await Maestros.updateEjecutivos(req.params.id, req.body);
    if (updatedEjecutivos.error) {
      return res.status(updatedEjecutivos.code).send({
        status: false,
        message: updatedEjecutivos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ejecutivo Actualizado',
      data: updatedEjecutivos
    });
    
  } catch (error) {
    
  }
}
const searchProductores = async (req, res) => {
  try {
    const productores = await Maestros.searchProductores();
    if (productores.error) {
      return res.status(productores.code).send({
        status: false,
        message: productores.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Productores Obtenidos',
      data: productores
    });
  } catch (error){

  }
}
const createProductores = async (req, res) => {
  try {
    const createdProductores = await Maestros.createProductores(req.body);
    if (createdProductores.error) {
      return res.status(createdProductores.code).send({
        status: false,
        message: createdProductores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Productor Creado',
      data: createdProductores
    });
    
  } catch (error) {
    
  }
}
const searchProductor = async (req, res) => {

  try {
    const findedProductores = await Maestros.searchProductoresById(req.params.id);
    if (findedProductores.error) {
      return res.status(findedProductores.code).send({
        status: false,
        message: findedProductores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Productor Obtenido',
      data: findedProductores
    });
    
  } catch (error) {
    
  }
}
const updateProductores = async (req, res) => {
  try {
    const updatedProductores = await Maestros.updateProductores(req.params.id, req.body);
    if (updatedProductores.error) {
      return res.status(updatedProductores.code).send({
        status: false,
        message: updatedProductores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Productor Actualizado',
      data: updatedProductores
    });
    
  } catch (error) {
    
  }
}
const searchTomadores = async (req, res) => {
  try {
    const tomadores = await Maestros.searchTomadores();
    if (tomadores.error) {
      return res.status(tomadores.code).send({
        status: false,
        message: tomadores.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Tomadores Obtenidos',
      data: tomadores
    });
  } catch (error){

  }
}
const createTomadores = async (req, res) => {
  try {
    const createdTomadores = await Maestros.createTomadores(req.body);
    if (createdTomadores.error) {
      return res.status(createdTomadores.code).send({
        status: false,
        message: createdTomadores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tomador Creado',
      data: createdTomadores
    });
    
  } catch (error) {
    
  }
}
const searchTomador = async (req, res) => {

  try {
    const findedTomadores = await Maestros.searchTomadoresById(req.params.id);
    if (findedTomadores.error) {
      return res.status(findedTomadores.code).send({
        status: false,
        message: findedTomadores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tomador Obtenido',
      data: findedTomadores
    });
    
  } catch (error) {
    
  }
}
const updateTomadores = async (req, res) => {
  try {
    const updatedTomadores = await Maestros.updateTomadores(req.params.id, req.body);
    if (updatedTomadores.error) {
      return res.status(updatedTomadores.code).send({
        status: false,
        message: updatedTomadores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tomador Actualizado',
      data: updatedTomadores
    });
    
  } catch (error) {
    
  }
}
const searchRamos = async (req, res) => {
  try {
    const ramos = await Maestros.searchRamos();
    if (ramos.error) {
      return res.status(ramos.code).send({
        status: false,
        message: ramos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Ramos Obtenidos',
      data: ramos
    });
  } catch (error){

  }
}
const createRamos = async (req, res) => {
  try {
    const createdRamos = await Maestros.createRamos(req.body);
    if (createdRamos.error) {
      return res.status(createdRamos.code).send({
        status: false,
        message: createdRamos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ramo Creado',
      data: createdRamos
    });
    
  } catch (error) {
    
  }
}
const searchRamo = async (req, res) => {
console.log('buscar Ramo')
  try {
    const findedRamos = await Maestros.searchRamosById(req.params.id);
    if (findedRamos.error) {
      return res.status(findedRamos.code).send({
        status: false,
        message: findedRamos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ramo Obtenido',
      data: findedRamos
    });
    
  } catch (error) {
    
  }
}
const updateRamos = async (req, res) => {
  try {
    const updatedRamos = await Maestros.updateRamos(req.params.id, req.body);
    if (updatedRamos.error) {
      return res.status(updatedRamos.code).send({
        status: false,
        message: updatedRamos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ramo Actualizado',
      data: updatedRamos
    });
    
  } catch (error) {
    
  }
}
const searchMarcas = async (req, res) => {
  try {
    const marcas = await Maestros.searchMarcas();
    if (marcas.error) {
      return res.status(marcas.code).send({
        status: false,
        message: marcas.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Marcas Obtenidas',
      data: marcas
    });
  } catch (error){

  }
}
const createMarcas = async (req, res) => {
  try {
    const createdMarcas = await Maestros.createMarcas(req.body);
    if (createdMarcas.error) {
      return res.status(createdMarcas.code).send({
        status: false,
        message: createdMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marca Creada',
      data: createdMarcas
    });
    
  } catch (error) {
    
  }
}
const searchMarca = async (req, res) => {
  try {
    const findedMarcas = await Maestros.searchMarcasById(req.params.id);
    console.log(findedMarcas)
    if (findedMarcas.error) {
      return res.status(findedMarcas.code).send({
        status: false,
        message: findedMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marca Obtenida',
      data: findedMarcas
    });
    
  } catch (error) {
    
  }
}
const updateMarcas = async (req, res) => {
  try {
    const updatedMarcas = await Maestros.updateMarcas(req.params.id, req.body);
    if (updatedMarcas.error) {
      return res.status(updatedMarcas.code).send({
        status: false,
        message: updatedMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marca Actualizado',
      data: updatedMarcas
    });
    
  } catch (error) {
    
  }
}
export default {
  getMaMonedas,
  getMaPaises,
  getMaCiudades,
  getMaEstados, 
  getMaCedentes,
  getMaBancos,
  getMaMarcas, 
  getMaMetodologiapago, 
  searchPais,
  updatePaises,
  createPaises,
  searchPaises,
  updateBancos,
  searchBanco,
  createBancos,
  searchBancos,
  updateMetodologiapago,
  searchMetodologiapago1,
  createMetodologiapago,
  searchMetodologiapago,
  createMonedas,
  searchMonedas,
  searchMoneda,
  updateMonedas,
  createCedentes,
  searchCedentes,
  searchCedente,
  updateCedentes,
  createAsegurados,
  searchAsegurados,
  searchAsegurado,
  updateAsegurados,
  createAgentes,
  searchAgentes,
  searchAgente,
  updateAgentes,
  createEjecutivos,
  searchEjecutivos,
  searchEjecutivosMaestros,
  searchEjecutivo,
  updateEjecutivos,
  createProductores,
  searchProductores,
  searchProductor,
  updateProductores,
  createTomadores,
  searchTomadores,
  searchTomador,
  updateTomadores,
  createRamos,
  searchRamos,
  searchRamo,
  updateRamos,
  createMarcas,
  searchMarcas,
  searchMarca,
  updateMarcas
}