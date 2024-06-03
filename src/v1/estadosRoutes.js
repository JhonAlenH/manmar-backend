import express from 'express';

import estadosController from '../controllers/estadosController.js';

const router = express.Router();

router
    .get("/search/:ccompania", estadosController.searchEstados)
    .post("/create", estadosController.createEstados)
    .get("/get/:id", estadosController.searchEstado)
    .post("/edit/:id", estadosController.updateEstados)
    
export default router;