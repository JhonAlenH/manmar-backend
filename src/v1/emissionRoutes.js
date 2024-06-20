import express from 'express';

import emissionController from '../../src/controllers/emissionController.js';

const router = express.Router();

router

    .post("/receipt", emissionController.getReceipt)
    .post("/producers", emissionController.getProducers)
    .post("/tariffs", emissionController.getTariffs)
    .post("/search", emissionController.searchContract)
    .post("/create", emissionController.createContract)

export default router;