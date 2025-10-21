import express from 'express';
import { createService, deleteServiceById, getAllServices, getServiceById, updateServiceById } from '../controllers/Service_Controllers.js';

const router = express.Router();

router.post('/create', createService);
router.get('/services-showcase', getAllServices);
router.get('/serviceId/:id', getServiceById);
router.put('/update-service/:id', updateServiceById);
router.delete('/delete-service/:id', deleteServiceById);

export default router;