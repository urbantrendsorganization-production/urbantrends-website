import express from 'express';
import { addDeveloper, getAllDevelopers } from '../developers/developers.js';

const router = express.Router();

// relevant routes here
router.post('/add-dev', addDeveloper);
router.get('/developers', getAllDevelopers);

export default router;