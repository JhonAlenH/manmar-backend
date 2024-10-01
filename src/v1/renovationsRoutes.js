import express from 'express';

import renovationsController from '../../src/controllers/renovationsController.js';

const router = express.Router();

router

    .post("/search", renovationsController.searchRenovations)


export default router;