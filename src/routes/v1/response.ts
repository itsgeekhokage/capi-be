/** @format */

import express from "express";
import assignResponsesToUsers, {
  updateResponseById,
  createResponse,
  deleteResponseById,
  getResponseById,
  getResponsesByUserId,
} from "../../controllers/v1/response_controllers";

const router = express.Router();

router.get("/get/:id", getResponsesByUserId);
router.put("/update/:response_id", updateResponseById);
router.post("/create/new", createResponse);
router.post("/assign/users", assignResponsesToUsers);
router.delete("/delete/:response_id", deleteResponseById);
router.get("/audit/single/:response_id", getResponseById);

export default router;
