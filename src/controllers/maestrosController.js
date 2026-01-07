import Maestros from '../db/Maestros.js';

// Data para maestros
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
    const formatData = gettedMonedas.map(item => {
      return{
        text: item.xmoneda,
        value: `${item.cmoneda}`
      }
    })
    formatData.unshift({text:'Seleccione una opcion...',value:''})
    res.status(201).send({
      status: true, 
      message: 'Monedas Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaRamos = async (req, res) => {
  try {
    const gettedRamos = await Maestros.searchRamos();
    // console.log(gettedMonedas.result.recordset)
    if (gettedRamos.error) {
      return res.status(gettedRamos.code).send({
        status: false,
        message: gettedRamos.error
      });
    }
    const formatData = gettedRamos.map(item => {
      return{
        text: item.xramo,
        value: `${item.cramo}`
      }
    })
    formatData.unshift({text:'Seleccione una opcion...',value:''})
    res.status(201).send({
      status: true, 
      message: 'Ramos Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaCedentes = async (req, res) => {
  try {
    const gettedCedentes = await Maestros.getMaCedentes();
    if (gettedCedentes.error) {
      return res.status(gettedCedentes.code).send({
        status: false,
        message: gettedCedentes.error
      });
    }
    const formatData = gettedCedentes.map(item => {
      return{
        text: item.xcedente,
        value: `${item.ccedente}`
      }
    })
    formatData.unshift({text:'Seleccione una opcion...',value:''})
    res.status(201).send({
      status: true, 
      message: 'Cedentes Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaPaises = async (req, res) => {
  try {
    const gettedPaises = await Maestros.searchPaises();
    // console.log(gettedPaises.result)
    if (gettedPaises.error) {
      return res.status(gettedPaises.code).send({
        status: false,
        message: gettedPaises.error
      });
    }
    const formatData = gettedPaises.map(item => {
      return{
        text: item.xpais.toLowerCase(),
        value: `${item.cpais}`
      }
    })
    formatData.unshift({text:'Seleccione una opcion...',value:''})
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
    const gettedCiudades = await Maestros.getMaCiudades(req.params.estado);
    // console.log(gettedCiudades.result)
    if (gettedCiudades.error) {
      return res.status(gettedCiudades.code).send({
        status: false,
        message: gettedCiudades.error
      });
    }
    const formatData = gettedCiudades.map(item => {
      return{
        text: item.xciudad,
        value: `${item.cciudad}`
      }
    })
    formatData.unshift({text:'Seleccione una opcion...',value:''})
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
    const formatData = gettedEstados.map(item => {
      return{
        text: item.xestado,
        value: `${item.cestado}`
      }
    })
    formatData.unshift({text:'Seleccione una opcion...',value:''})
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
const getMaBancos = async (req, res) => {
  try {
    const gettedBancos = await Maestros.getMaBancos(req.params.cmoneda);
    // console.log(gettedPaises.result)
    if (gettedBancos.error) {
      return res.status(gettedBancos.code).send({
        status: false,
        message: gettedBancos.error
      });
    }
    const formatData = gettedBancos.map(item => {
      return{
        text: item.xbanco,
        value: `${item.cbanco}`
      }
    })
    formatData.unshift({text:'Seleccione una opcion...',value:''})
    res.status(201).send({
      status: true, 
      message: 'Bancos Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaTipoProducto = async (req, res) => {
  try {
    const gettedTipos = await Maestros.getMaTipoProducto();
    // console.log(gettedPaises.result)
    if (gettedTipos.error) {
      return res.status(gettedTipos.code).send({
        status: false,
        message: gettedTipos.error
      });
    }
    const formatData = gettedTipos.map(item => {
      return{
        text: item.xtipo,
        value: `${item.ctipo_produc}`
      }
    })
    formatData.unshift({text:'Seleccione una opcion...',value:''})
    res.status(201).send({
      status: true, 
      message: 'Bancos Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaMarcas = async (req, res) => {
  try {
    const gettedMarcas = await Maestros.getMaMarcas();
    // console.log(gettedProveedores.result)
    if (gettedMarcas.error) {
      return res.status(gettedMarcas.code).send({
        status: false,
        message: gettedMarcas.error
      });
    }
    const formatData = gettedMarcas.map(item => {
      return{
        text: item.xmarca,
        value: `${item.cmarca}`
      }
    })
    formatData.unshift({text:'Nueva Marca...',value:''})
    res.status(201).send({
      status: true, 
      message: 'Marcas Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaModelos = async (req, res) => {
  try {
    const gettedModelos = await Maestros.getMaModelos(req.params.cmarca);
    // console.log(gettedProveedores.result)
    if (gettedModelos.error) {
      return res.status(gettedModelos.code).send({
        status: false,
        message: gettedModelos.error
      });
    }
    const formatData = gettedModelos.map(item => {
      return{
        text: item.xmodelo,
        value: `${item.cmodelo}`
      }
    })
    formatData.unshift({text:'Nuevo Modelo...',value:''})
    res.status(201).send({
      status: true, 
      message: 'Modelos Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaVersiones = async (req, res) => {
  try {
    const gettedVersiones = await Maestros.getMaVersiones(req.params.cmarca, req.params.cmodelo);
    // console.log(gettedProveedores.result)
    if (gettedVersiones.error) {
      return res.status(gettedVersiones.code).send({
        status: false,
        message: gettedVersiones.error
      });
    }
    const formatData = gettedVersiones.map(item => {
      return{
        text: item.xversion,
        value: `${item.cversion}`
      }
    })
    formatData.unshift({text:'Nueva Versión...',value:''})
    res.status(201).send({
      status: true, 
      message: 'Versiones Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

// Paises
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
const createPais = async (req, res) => {
  try {
    const createdPaises = await Maestros.createPais(req.body);
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
    const findedPais = await Maestros.searchPaisById(req.params.id);
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

// Estados
const searchEstados = async (req, res) => {
//  console.log('holaaa')
  try {
    const estados = await Maestros.searchEstados();
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
const createEstado = async (req, res) => {
  try {
    const createdEstado = await Maestros.createEstado(req.body);
    if (createdEstado.error) {
      return res.status(createdEstado.code).send({
        status: false,
        message: createdEstado.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Creado',
      data: createdEstado
    });
    
  } catch (error) {
    
  }
}
const searchEstado = async (req, res) => {
  try {
    const findedEstado = await Maestros.searchEstadoById(req.params.id);
    if (findedEstado.error) {
      return res.status(findedEstado.code).send({
        status: false,
        message: findedEstado.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Obtenido',
      data: findedEstado
    });
    
  } catch (error) {
    
  }
}
const updateEstado = async (req, res) => {
  try {
    const updatedEstado = await Maestros.updateEstado(req.params.id, req.body);
    if (updatedEstado.error) {
      return res.status(updatedEstado.code).send({
        status: false,
        message: updatedEstado.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Actualizado',
      data: updatedEstado
    });
    
  } catch (error) {
    
  }
}

// Ciudades
const searchCiudades = async (req, res) => {
//  console.log('holaaa')
  try {
    const ciudades = await Maestros.searchCiudades();
    if (ciudades.error) {
      return res.status(ciudades.code).send({
        status: false,
        message: ciudades.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Ciudades Obtenidas',
      data: ciudades
    });
  } catch (error){

  }
}
const createCiudad = async (req, res) => {
  try {
    const createdCiudad = await Maestros.createCiudad(req.body);
    if (createdCiudad.error) {
      return res.status(createdCiudad.code).send({
        status: false,
        message: createdCiudad.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ciudada Creada',
      data: createdCiudad
    });
    
  } catch (error) {
    
  }
}
const searchCiudad = async (req, res) => {
  try {
    const findedCiudad = await Maestros.searchCiudadById(req.params.id);
    if (findedCiudad.error) {
      return res.status(findedCiudad.code).send({
        status: false,
        message: findedCiudad.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ciudad Obtenida',
      data: findedCiudad
    });
    
  } catch (error) {
    
  }
}
const updateCiudad = async (req, res) => {
  try {
    const updatedCiudad = await Maestros.updateCiudad(req.params.id, req.body);
    if (updatedCiudad.error) {
      return res.status(updatedCiudad.code).send({
        status: false,
        message: updatedCiudad.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ciudad Actualizada',
      data: updatedCiudad
    });
    
  } catch (error) {
    
  }
}

// Bancos
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
const createBanco = async (req, res) => {
  try {
    const createdBancos = await Maestros.createBanco(req.body);
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
    const findedBancos = await Maestros.searchBancoById(req.params.id);
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
const updateBanco = async (req, res) => {
  try {
    const updatedBancos = await Maestros.updateBanco(req.params.id, req.body);
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

// Metodologias de Pago
const searchMetodologiapagos = async (req, res) => {
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
const searchMetodologiapago = async (req, res) => {
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

// Monedas
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
const createMoneda = async (req, res) => {
  try {
    const createdMonedas = await Maestros.createMoneda(req.body);
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
const updateMoneda = async (req, res) => {
  try {
    const updatedMonedas = await Maestros.updateMoneda(req.params.id, req.body);
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

// Cedentes
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

// Clientes
const searchClientes = async (req, res) => {
  try {
    const clientes = await Maestros.searchClientes();
    if (clientes.error) {
      return res.status(clientes.code).send({
        status: false,
        message: clientes.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Clientes Obtenidos',
      data: clientes
    });
  } catch (error){

  }
}
const createCliente = async (req, res) => {
  try {
    const createdCliente = await Maestros.createCliente(req.body);
    if (createdCliente.error) {
      return res.status(createdCliente.code).send({
        status: false,
        message: createdCliente.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cliente Creado',
      data: createdCliente
    });
    
  } catch (error) {
    
  }
}
const searchCliente = async (req, res) => {
  try {
    const findedClient = await Maestros.searchClienteById(req.params.id);
    if (findedClient.error) {
      return res.status(findedClient.code).send({
        status: false,
        message: findedClient.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cliente Obtenido',
      data: findedClient
    });
    
  } catch (error) {
    
  }
}
const updateCliente = async (req, res) => {
  try {
    const updatedCliente = await Maestros.updateCliente(req.params.id, req.body);
    if (updatedCliente.error) {
      return res.status(updatedCliente.code).send({
        status: false,
        message: updatedCliente.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cliente Actualizado',
      data: updatedCliente
    });
    
  } catch (error) {
    
  }
}

// Productores
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
const createProductor = async (req, res) => {
  try {
    const createdProductores = await Maestros.createProductor(req.body);
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

// Ramos
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
const createRamo = async (req, res) => {
  try {
    const createdRamo = await Maestros.createRamo(req.body);
    if (createdRamo.error) {
      return res.status(createdRamo.code).send({
        status: false,
        message: createdRamo.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ramo Creado',
      data: createdRamo
    });
    
  } catch (error) {
    
  }
}
const searchRamo = async (req, res) => {
console.log('buscar Ramo')
  try {
    const findedRamos = await Maestros.searchRamoById(req.params.id);
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
const updateRamo = async (req, res) => {
  try {
    const updatedRamos = await Maestros.updateRamo(req.params.id, req.body);
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

// Productos
const searchProductos = async (req, res) => {
  try {
    const productos = await Maestros.searchProductos();
    if (productos.error) {
      return res.status(productos.code).send({
        status: false,
        message: productos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Productos Obtenidos',
      data: productos
    });
  } catch (error){

  }
}
const createProducto = async (req, res) => {
  try {
    const createdProducto = await Maestros.createProducto(req.body);
    if (createdProducto.error) {
      return res.status(createdProducto.code).send({
        status: false,
        message: createdProducto.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Producto Creado',
      data: createdProducto
    });
    
  } catch (error) {
    
  }
}
const searchProducto = async (req, res) => {
  try {
    const findedProducto = await Maestros.searchProductoById(req.params.id);
    if (findedProducto.error) {
      return res.status(findedProducto.code).send({
        status: false,
        message: findedProducto.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Producto Obtenido',
      data: findedProducto
    });
    
  } catch (error) {
    
  }
}
const updateProducto = async (req, res) => {
  try {
    const updatedProducto = await Maestros.updateProducto(req.params.id, req.body);
    if (updatedProducto.error) {
      return res.status(updatedProducto.code).send({
        status: false,
        message: updatedProducto.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Producto Actualizado',
      data: updatedProducto
    });
    
  } catch (error) {
    
  }
}

// Vehiculos
const searchVehiculos = async (req, res) => {
  try {
    const vehiculos = await Maestros.searchVehiculos();
    if (vehiculos.error) {
      return res.status(vehiculos.code).send({
        status: false,
        message: vehiculos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Vehículos Obtenidos',
      data: vehiculos
    });
  } catch (error){

  }
}
const createVehiculo = async (req, res) => {
  try {
    const createdVehiculo = await Maestros.createVehiculo(req.body);
    if (createdVehiculo.error) {
      return res.status(createdVehiculo.code).send({
        status: false,
        message: createdVehiculo.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Vehículo Creado',
      data: createdVehiculo
    });
    
  } catch (error) {
    
  }
}
const searchVehiculo = async (req, res) => {
  try {
    const findedVehiculo = await Maestros.searchVehiculoById(req.params.id);
    console.log(findedVehiculo)
    if (findedVehiculo.error) {
      return res.status(findedVehiculo.code).send({
        status: false,
        message: findedVehiculo.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Vehículo Obtenido',
      data: findedVehiculo
    });
    
  } catch (error) {
    
  }
}
const updateVehiculos = async (req, res) => {
  try {
    const updatedVehiculos = await Maestros.updateVehiculos(req.params.id, req.body);
    if (updatedVehiculos.error) {
      return res.status(updatedVehiculos.code).send({
        status: false,
        message: updatedVehiculos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Vehículo Actualizado',
      data: updatedVehiculos
    });
    
  } catch (error) {
    
  }
}


export default {
  getMaMonedas,getMaRamos,getMaCedentes,getMaPaises,getMaCiudades,getMaEstados,getMaBancos,getMaTipoProducto,getMaMarcas,getMaModelos,getMaVersiones,getMaMetodologiapago, 
  searchPaises,searchPais,createPais,updatePaises,
  searchEstados,searchEstado,createEstado,updateEstado,
  searchCiudades,searchCiudad,createCiudad,updateCiudad,
  searchBancos,searchBanco,createBanco,updateBanco,
  searchMetodologiapagos,searchMetodologiapago,createMetodologiapago,updateMetodologiapago,
  searchMonedas,searchMoneda,createMoneda,updateMoneda,
  searchCedentes,searchCedente,createCedentes,updateCedentes,
  searchClientes,searchCliente,createCliente,updateCliente,
  searchProductores,searchProductor,createProductor,updateProductores,
  searchRamos,searchRamo,createRamo,updateRamo,
  searchProductos,searchProducto,createProducto,updateProducto,
  searchVehiculos,searchVehiculo,createVehiculo,updateVehiculos
}