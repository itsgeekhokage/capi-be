import express from "express"
import {
  createNewUser,
  createUsersInBulk,
  getAllUsers,
  getUsersByVendor,
  loginAuth,
  updateUser,
} from "../../controllers/v1/user_controller";

const router = express.Router();

router.get("/get/all", getAllUsers);
router.post("/get/auth", loginAuth);
router.get("/get/:vendor", getUsersByVendor);
router.post("/create/manual", createNewUser);
router.post("/create/excel", createUsersInBulk);
router.put("/update/:id", updateUser);

export default router;