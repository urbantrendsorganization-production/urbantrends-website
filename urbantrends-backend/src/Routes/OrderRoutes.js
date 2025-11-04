import express from "express";
import { createOrder, getUsersOrder } from "../orders/Orders.js";

const router = express.Router();

// relevant routes

router.post('/create', createOrder);
router.get('/order:auth0_id', getUsersOrder);


export default router;