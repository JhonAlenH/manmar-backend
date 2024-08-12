import express from 'express';

import valrepController from '../../src/controllers/valrepController.js';

const router = express.Router();

router

    .post("/cedents", valrepController.getCedents)
    .post("/trade", valrepController.getTrade)
    .post("/coins", valrepController.getCoins)
    .post("/clients", valrepController.getClients)
    .post("/takers", valrepController.getTakers)
    .get("/takers/:xcedula", valrepController.getTakersId)
    .post("/brand", valrepController.getBrand)
    .post("/model", valrepController.getModel)
    .post("/version", valrepController.getVersion)
    .post("/color", valrepController.getColor)
    .post("/method-of-payment", valrepController.getMethodOfPayment)
    .post("/state", valrepController.getState)
    .post("/city", valrepController.getCity)
    .post("/executive", valrepController.getExecutive)
    .get("/agents/:cejecutivo", valrepController.getAgents)
    .post("/insurance", valrepController.getInsurance)
    .post("/coverage/:cramo", valrepController.getCoverage)
    .post("/bank", valrepController.getBank)

export default router;