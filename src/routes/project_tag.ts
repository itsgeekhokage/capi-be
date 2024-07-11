import express from "express";
import { createNewProjectTags, getAllProjectTags, updateProjectTag } from "../controllers/project_tag_contoller";

const router = express.Router();

router.get("/get/all", getAllProjectTags);
router.post("/create/new", createNewProjectTags);
router.put("/update/:id", updateProjectTag);

export default router;