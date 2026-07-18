import express from 'express';
import { getTopSellingToday } from '../controllers/recommendationController.js';

const router = express.Router();

router.get('/top-today', getTopSellingToday);

export default router;
