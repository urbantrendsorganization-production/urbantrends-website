import express from "express";
import { syncUser } from "../users/User.js";

const router = express.Router();

// relevant routes
router.post('/sync', syncUser);


export default router;