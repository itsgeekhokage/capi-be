/** @format */

import express from "express";
import {
  createNewRole,
  deleteRole,
  getAllRoles,
  updateRole,
  verifyRoles,
} from "../../controllers/v1/role_controller";
const router = express.Router();

router.get("/get/all", getAllRoles);
router.post("/create/new", createNewRole);
router.post("/verify/roles", verifyRoles);
router.put("/update/:id", updateRole);
router.delete("/delete/:id", deleteRole);

export default router;
