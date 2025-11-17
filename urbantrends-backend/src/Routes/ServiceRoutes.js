import express from 'express';
import connectDb from '../../config/database.js';
import { cacheMiddleware } from '../middleware/cache.js';
import { addMiniminalService, deleteMinimalService, getMinimalServiceById, getMinimalServices, updateServiceById } from '../services/minimalServices.js';


const router = express.Router();
const db = await connectDb();

// routes
router.post('/add-ser',  addMiniminalService);
router.get('/services', cacheMiddleware('services', 300), async (req, res) => {
    const [services] = await db.query('SELECT * FROM services');
    res.json(services);
});
router.get('/service/:id', getMinimalServiceById);
router.put('/services/:id', updateServiceById);
router.delete('/service/:id', deleteMinimalService);

export default router;