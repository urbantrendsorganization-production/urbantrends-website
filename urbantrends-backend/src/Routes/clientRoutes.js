import express from 'express';
import { addClientsTestimony, DeleteMessage, getClientsMessage, getMessageById } from '../Customers/Testimonials.js';


const router = express.Router();

// main routes
router.post('/add-client', addClientsTestimony),
router.get('/clients', getClientsMessage),
router.get('/client/:id', getMessageById),
router.delete('/clients/:id', DeleteMessage)

export default router;