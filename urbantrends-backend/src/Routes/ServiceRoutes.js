import express from 'express';
import { addMiniminalService, deleteMinimalService, getMinimalServiceById, getMinimalServices } from '../services/minimalServices.js';


const router = express.Router();

// routes
router.post('/add-ser', addMiniminalService);
router.get('/services', getMinimalServices);
router.get('/service/:id', getMinimalServiceById);
router.delete('/service/:id', deleteMinimalService);

export default router;