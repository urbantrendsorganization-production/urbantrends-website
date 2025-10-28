import express from 'express'
import { addTiers, getTiers, getTiersBySlug } from '../services/serviceTiers.js';

const router = express.Router();

router.post('/add-tiers', addTiers);
router.get('/tiers', getTiers);
router.get('/tier/:slug', getTiersBySlug);



export default router;