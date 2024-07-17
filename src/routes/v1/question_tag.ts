import express from "express";
import {
  createNewQuestionTag,
  getAllQuestionTags,
  updateQuestionTag,
} from "../../controllers/v1/question_tag_controller";

const router = express.Router();


router.get("/get/all", getAllQuestionTags);
router.post("/create/new", createNewQuestionTag);
router.put("/update/:id", updateQuestionTag);

export default router;