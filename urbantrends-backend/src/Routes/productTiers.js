import express from 'express';
import connectDb from '../../config/database.js';
import { cacheMiddleware } from '../middleware/cache.js';
import { addProductTiers, getAllTiers, getTierBySlug } from '../products/productsTiers.js';

const router = express.Router();

// relevant routes here
router.post('/add-tier', addProductTiers);
router.get('/product-tiers', cacheMiddleware('product_tiers', 300), async (req, res) => {
    const db = await connectDb();
    const [tiers] = await db.query('SELECT * FROM urbantrends_product_tiers');
    res.json(tiers);
});
router.get('/products-tiers/:products_slug', cacheMiddleware('product_tier', 300), async (req, res) => {
    const db = await connectDb();
    const [tier] = await db.query('SELECT * FROM urbantrends_product_tiers WHERE products_slug = ?', [req.params.products_slug]);
    res.json(tier);
});

export default router;