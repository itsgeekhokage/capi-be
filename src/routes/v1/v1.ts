/** @format */

import express from "express";
import access_control_route from "./access_control";
import role_route from "./role";
import project_route from "./project";
import question_tag_route from "./question_tag";
import project_tag_route from "./project_tag";
import user_route from "./user";
import vendor_route from "./vendor";
const router = express.Router();

router.use("/controls", access_control_route);
router.use("/roles", role_route);
router.use("/projects", project_route);
router.use("/questiontags", question_tag_route);
router.use("/projecttags", project_tag_route);
router.use("/user", user_route);
router.use("/vendor", vendor_route);

export default router;