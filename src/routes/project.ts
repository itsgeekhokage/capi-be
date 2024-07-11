import express from "express";
import { createNewProject, getAllProjects, getProject } from "../controllers/project_controller";

const router = express.Router();

router.get("/get/all", getAllProjects);
router.get("/get/:id", getProject);
router.post("/create/new", createNewProject);

export default router;