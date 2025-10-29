import express from 'express'
import { addProducts, getAllProducts, getProductsById } from '../products/products.js';

const router = express.Router();

// relevant routes
router.post('/add-products', addProducts);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductsById);


export default router
