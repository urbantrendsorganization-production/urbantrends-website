import express from 'express'
import connectDb from '../../config/database.js';
import { cacheMiddleware } from '../middleware/cache.js';
import { addProducts, getAllProducts, getProductsById } from '../products/Products.js';

const router = express.Router();

// relevant routes
router.post('/add-products', addProducts);
router.get('/products', cacheMiddleware('products', 300), async (req, res) => {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
});
router.get('/products/:id', cacheMiddleware('product', 300), async (req, res) => {
    const [product] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(product);
});


export default router
