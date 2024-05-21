import express from 'express';

import emissionController from '../../src/controllers/emissionController.js';

const router = express.Router();

router

    .post("/receipt", emissionController.getReceipt)

export default router;