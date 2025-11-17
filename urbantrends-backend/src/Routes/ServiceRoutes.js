import express from 'express';
import connectDb from '../../config/database.js';
import { cacheMiddleware } from '../middleware/cache.js';
import { addMiniminalService, deleteMinimalService, getMinimalServiceById, getMinimalServices, updateServiceById } from '../services/minimalServices.js';


const router = express.Router();
const db = await connectDb()

// routes
router.post('/add-ser',  addMiniminalService);
router.get('/services', cacheMiddleware('minimal_services', 300), async (req, res) => {
    const [services] = await db.query('SELECT * FROM urbantrends_showcase');
    res.json(services);
});
router.get('/service/:id', cacheMiddleware('minimal_service', 300), async (req, res) => {
    const [service] = await db.query('SELECT * FROM urbantrends_showcase WHERE id = ?', [req.params.id]);
    res.json(service);
});
router.put('/services/:id', updateServiceById);
router.delete('/service/:id', deleteMinimalService);

export default router;