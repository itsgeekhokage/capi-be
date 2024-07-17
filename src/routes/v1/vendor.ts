import express from "express";
import {
  createNewVendor,
  getAllVendors,
} from "../../controllers/v1/vendor_controller";

const router = express.Router();

router.get("/get/all", getAllVendors);
router.post("/create/new", createNewVendor);

export default router;