import express from 'express'
import { addTiers, getTiers } from '../services/serviceTiers.js';

const router = express.Router();

router.post('/add-tiers', addTiers);
router.get('/tiers', getTiers);



export default router;