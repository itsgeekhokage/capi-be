/** @format */

import "reflect-metadata";
import express from "express";
import cors from "cors"
import { AppDataSource } from "./db/typeorm";
import access_control_route from "./routes/access_control";
import role_route from "./routes/role";
import project_route from "./routes/project";
import question_tag_route from "./routes/question_tag";
import project_tag_route from "./routes/project_tag";
import user_route from "./routes/user";
import vendor_route from "./routes/vendor";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/controls", access_control_route);
app.use("/roles", role_route);
app.use("/projects", project_route);
app.use("/questiontags", question_tag_route);
app.use("/projecttags", project_tag_route);
app.use("/user", user_route);
app.use("/vendor", vendor_route);


AppDataSource.initialize()
  .then(() => {
    console.log("database connected successfully...");
    app.listen(port, () => {});
  })
  .catch((err) => console.log("error connecting database", err));
