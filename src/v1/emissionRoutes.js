import express from 'express';

import emissionController from '../../src/controllers/emissionController.js';

const router = express.Router();

router

    .post("/receipt", emissionController.getReceipt)
    .post("/producers", emissionController.getProducers)
    .post("/tariffs", emissionController.getTariffs)
    .post("/search", emissionController.searchContract)
    .post("/create", emissionController.createContract)
    .post("/detail/:id", emissionController.detailContract)

export default router;