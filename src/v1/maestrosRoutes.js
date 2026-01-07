import express from 'express';

import maestrosController from '../../src/controllers/maestrosController.js';

const router = express.Router();

router
.post("/bancos/search", maestrosController.searchBancos)
.post("/bancos/create", maestrosController.createBanco)
.get("/bancos/get/:id", maestrosController.searchBanco)
.post("/bancos/edit/:id", maestrosController.updateBanco)

.post("/paises/search", maestrosController.searchPaises)
.post("/paises/create", maestrosController.createPais)
.get("/paises/get/:id", maestrosController.searchPais)
.post("/paises/edit/:id", maestrosController.updatePaises)

.post("/estados/search", maestrosController.searchEstados)
.post("/estados/create", maestrosController.createEstado)
.get("/estados/get/:id", maestrosController.searchEstado)
.post("/estados/edit/:id", maestrosController.updateEstado)

.post("/ciudades/search", maestrosController.searchCiudades)
.post("/ciudades/create", maestrosController.createCiudad)
.get("/ciudades/get/:id", maestrosController.searchCiudad)
.post("/ciudades/edit/:id", maestrosController.updateCiudad)

.post("/metodologiapago/search", maestrosController.searchMetodologiapagos)
.post("/metodologiapago/create", maestrosController.createMetodologiapago)
.get("/metodologiapago/get/:id", maestrosController.searchMetodologiapago)
.post("/metodologiapago/edit/:id", maestrosController.updateMetodologiapago)

.post("/monedas/search", maestrosController.searchMonedas)
.post("/monedas/create", maestrosController.createMoneda)
.get("/monedas/get/:id", maestrosController.searchMoneda)
.post("/monedas/edit/:id", maestrosController.updateMoneda)

// Rutas para obtener los maestros en formulario de item
.get("/metodologiapago", maestrosController.getMaMetodologiapago)
.get("/monedas", maestrosController.getMaMonedas)
.get("/bancos/:cmoneda", maestrosController.getMaBancos)
.get("/ramos", maestrosController.getMaRamos)
.get("/cedentes", maestrosController.getMaCedentes)
.get("/tipo_produc", maestrosController.getMaTipoProducto)

.get("/paises", maestrosController.getMaPaises)
.get("/ciudades/:estado", maestrosController.getMaCiudades)
.get("/estados/:pais", maestrosController.getMaEstados)

.get("/marcas", maestrosController.getMaMarcas)
.get("/modelos/:cmarca", maestrosController.getMaModelos)
.get("/versiones/:cmarca/:cmodelo", maestrosController.getMaVersiones)
// 

.post("/cedentes/search", maestrosController.searchCedentes)
.post("/cedentes/create", maestrosController.createCedentes)
.get("/cedentes/get/:id", maestrosController.searchCedente)
.post("/cedentes/edit/:id", maestrosController.updateCedentes)

.post("/clientes/search", maestrosController.searchClientes)
.post("/clientes/create", maestrosController.createCliente)
.get("/clientes/get/:id", maestrosController.searchCliente)
.post("/clientes/edit/:id", maestrosController.updateCliente)

.post("/productores/search", maestrosController.searchProductores)
.post("/productores/create", maestrosController.createProductor)
.get("/productores/get/:id", maestrosController.searchProductor)
.post("/productores/edit/:id", maestrosController.updateProductores)

.post("/ramos/search", maestrosController.searchRamos)
.post("/ramos/create", maestrosController.createRamo)
.get("/ramos/get/:id", maestrosController.searchRamo)
.post("/ramos/edit/:id", maestrosController.updateRamo)

.post("/productos/search", maestrosController.searchProductos)
.post("/productos/create", maestrosController.createProducto)
.get("/productos/get/:id", maestrosController.searchProducto)
.post("/productos/edit/:id", maestrosController.updateProducto)

//Rutas de Vehiculos (Luego Cambio marcas por vehiculos)
.post("/vehiculos/search", maestrosController.searchVehiculos)
.post("/vehiculos/create", maestrosController.createVehiculo)
.get("/vehiculos/get/:id", maestrosController.searchVehiculo)
.post("/vehiculos/edit/:id", maestrosController.updateVehiculos)
// 

    


    
export default router;