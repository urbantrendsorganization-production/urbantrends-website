import express from 'express'
import { addTiers } from '../services/serviceTiers.js';

const router = express.Router();

router.post('/add-tiers', addTiers);



export default router;