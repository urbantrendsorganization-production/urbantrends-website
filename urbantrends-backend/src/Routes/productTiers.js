import express from 'express';
import { addProductTiers, getAllTiers, getTierBySlug } from '../products/productsTiers.js';

const router = express.Router();

// relevant routes here
router.post('/add-tier', addProductTiers);
router.get('/product-tiers', getAllTiers);
router.get('/products-tiers/:products_slug', getTierBySlug);

export default router;