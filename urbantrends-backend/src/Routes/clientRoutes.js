import express from 'express';
import connectDb from '../../config/database.js';
import { cacheMiddleware } from '../middleware/cache.js';
import { addClientsTestimony, DeleteMessage, getClientsMessage, getMessageById } from '../Customers/Testimonials.js';


const router = express.Router();

// main routes
router.post('/add-client', addClientsTestimony),
router.get('/clients', cacheMiddleware('clients', 300), async (req, res) => {
    const [clients] = await db.query('SELECT * FROM clients');
    res.json(clients);
});
router.get('/client/:id', cacheMiddleware('client', 300), async (req, res) => {
    const [client] = await db.query('SELECT * FROM clients WHERE id = ?', [req.params.id]);
    res.json(client);
});
router.delete('/clients/:id', DeleteMessage)

export default router;