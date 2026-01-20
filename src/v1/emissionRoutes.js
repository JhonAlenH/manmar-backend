import express from 'express';

import emissionController from '../../src/controllers/emissionController.js';

const router = express.Router();

router

    .post("/receipt", emissionController.getReceipt)
    .post("/receipt-update", emissionController.getReceiptUpdate)
    .post("/producers", emissionController.getProducers)
    .post("/tariffs", emissionController.getTariffs)
    .post("/search", emissionController.searchContract)
    .post("/create", emissionController.createContract)
    .post("/detail/:id", emissionController.detailContract)
    .post("/update", emissionController.updateContract)
    .post("/disableContract/:cpoliza", emissionController.disableContract)
    .post("/disable/:cvigencia", emissionController.disablePolicy)
    .post("/policy/:xpoliza", emissionController.searchPolicy)
    .post("/search-receipt/:id", emissionController.searchReceipt)
    .post("/search-complement", emissionController.searchComplement)
    .post("/update-receipt", emissionController.updateReceipt)
    .post("/receipt-due", emissionController.searchDueReceipt)
    .post("/update-receipt-premium", emissionController.updateReceiptPremium)
    .post("/search-fertilizers", emissionController.searchFertilizers)
    .post("/fee-charged", emissionController.feeCharged)
    .post("/complement", emissionController.createComplement)
    .post("/add-abono", emissionController.createAbono)
    .post("/search-distribution", emissionController.searchDistribution)
    .post("/add-paymentProductor", emissionController.paymentProductor)
    .post("/add-paymentEjecutivo", emissionController.paymentEjecutivo)
    .post("/add-paymentAgente", emissionController.paymentAgente)
    .post("/tarifas/:id", emissionController.buscarTarifasDist)

export default router;