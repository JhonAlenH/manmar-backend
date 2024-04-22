import express from 'express';

import valrepController from '../../src/controllers/valrepController.js';

const router = express.Router();

router

    .post("/cedents", valrepController.getCedents)
    .post("/trade", valrepController.getTrade)
    .post("/coins", valrepController.getCoins)
    .post("/clients", valrepController.getClients)

export default router;