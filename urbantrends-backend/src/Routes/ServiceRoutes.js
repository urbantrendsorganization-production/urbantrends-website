import express from 'express';
import { addMiniminalService, deleteMinimalService, getMinimalServiceById, getMinimalServices, updateServiceById } from '../services/minimalServices.js';


const router = express.Router();

// routes
router.post('/add-ser', addMiniminalService);
router.get('/services', getMinimalServices);
router.get('/service/:id', getMinimalServiceById);
router.put('/services/:id', updateServiceById);
router.delete('/service/:id', deleteMinimalService);

export default router;