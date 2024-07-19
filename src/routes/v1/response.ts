/** @format */

import express from "express";
import {
  getResponsesByUserIdAndProjectCode,
  updateResponseById,
  createResponse,
  deleteResponseById,
  getResponseById,
} from "../../controllers/v1/response_controllers";

const router = express.Router();

router.get("/audit/:user_id/:project_code", getResponsesByUserIdAndProjectCode);
router.put("/update/:response_id", updateResponseById);
router.post("/create", createResponse);
router.delete("/delete/:response_id", deleteResponseById);
router.get("/audit/single/:response_id", getResponseById);

export default router;
