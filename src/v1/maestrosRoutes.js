import express from 'express';

import maestrosController from '../../src/controllers/maestrosController.js';

const router = express.Router();

router
.post("/bancos/search", maestrosController.searchBancos)
.post("/bancos/create", maestrosController.createBancos)
.get("/bancos/get/:id", maestrosController.searchBanco)
.post("/bancos/edit/:id", maestrosController.updateBancos)

.post("/paises/search", maestrosController.searchPaises)
.post("/paises/create", maestrosController.createPaises)
.get("/paises/get/:id", maestrosController.searchPais)
.post("/paises/edit/:id", maestrosController.updatePaises)

.post("/metodologiapago/search", maestrosController.searchMetodologiapago)
.post("/metodologiapago/create", maestrosController.createMetodologiapago)
.get("/metodologiapago/get/:id", maestrosController.searchMetodologiapago1)
.post("/metodologiapago/edit/:id", maestrosController.updateMetodologiapago)

.post("/monedas/search", maestrosController.searchMonedas)
.post("/monedas/create", maestrosController.createMonedas)
.get("/monedas/get/:id", maestrosController.searchMoneda)
.post("/monedas/edit/:id", maestrosController.updateMonedas)

.post("/paises", maestrosController.getMaPaises)
.post("/bancos", maestrosController.getMaBancos)
.get("/metodologiapago", maestrosController.getMaMetodologiapago)
.post("/monedas", maestrosController.getMaMonedas)

.post("/cedentes/search", maestrosController.searchCedentes)
.post("/cedentes/create", maestrosController.createCedentes)
.get("/cedentes/get/:id", maestrosController.searchCedente)
.post("/cedentes/edit/:id", maestrosController.updateCedentes)

.post("/asegurados/search", maestrosController.searchAsegurados)
.post("/asegurados/create", maestrosController.createAsegurados)
.get("/asegurados/get/:id", maestrosController.searchAsegurado)
.post("/asegurados/edit/:id", maestrosController.updateAsegurados)

.post("/agentes/search", maestrosController.searchAgentes)
.post("/agentes/create", maestrosController.createAgentes)
.get("/agentes/get/:id", maestrosController.searchAgente)
.post("/agentes/edit/:id", maestrosController.updateAgentes)

.post("/ejecutivos/search", maestrosController.searchEjecutivos)
.post("/ejecutivos/create", maestrosController.createEjecutivos)
.get("/ejecutivos/get/:id", maestrosController.searchEjecutivo)
.post("/ejecutivos/edit/:id", maestrosController.updateEjecutivos)
.get("/ejecutivos/searchMaestros", maestrosController.searchEjecutivosMaestros)

.post("/productores/search", maestrosController.searchProductores)
.post("/productores/create", maestrosController.createProductores)
.get("/productores/get/:id", maestrosController.searchProductor)
.post("/productores/edit/:id", maestrosController.updateProductores)

.post("/tomadores/search", maestrosController.searchTomadores)
.post("/tomadores/create", maestrosController.createTomadores)
.get("/tomadores/get/:id", maestrosController.searchTomador)
.post("/tomadores/edit/:id", maestrosController.updateTomadores)

.post("/ramos/search", maestrosController.searchRamos)
.post("/ramos/create", maestrosController.createRamos)
.get("/ramos/get/:id", maestrosController.searchRamo)
.post("/ramos/edit/:id", maestrosController.updateRamos)

.post("/marcas/search", maestrosController.searchMarcas)
.post("/marcas/create", maestrosController.createMarcas)
.get("/marcas/get/:id", maestrosController.searchMarca)
.post("/marcas/edit/:id", maestrosController.updateMarcas)

.get("/ciudades/:estado/:pais", maestrosController.getMaCiudades)
.get("/estados/:pais", maestrosController.getMaEstados)
    


    
export default router;