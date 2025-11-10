import express from "express";
import { addProjects, getAllProjects, getProjectsByDeveloper } from "../projects/projects.js";

const router = express.Router();

// relevant routes
router.post('/add', addProjects);
router.get('/projects/:developer_id', getProjectsByDeveloper);
router.get('/projects', getAllProjects);

export default router;