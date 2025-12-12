import express from 'express';

import renovationsController from '../../src/controllers/renovationsController.js';

const router = express.Router();

router

    .post("/search", renovationsController.searchRenovations)
    .post("/receipt", renovationsController.getReceipt)
    .post("/distribution/:id", renovationsController.getDistribution)
    .post("/create/:id", renovationsController.createRenovation)

export default router;