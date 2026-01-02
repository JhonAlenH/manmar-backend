import express from 'express';

import reportsController from '../../src/controllers/reportsController.js';

const router = express.Router();

router

    .post("/emissions/get", reportsController.generateReport)

export default router;