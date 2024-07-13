import { DataSource } from "typeorm";
import { AccessControl } from "../entities/access_control";
import { Project } from "../entities/project";
import { Project_tag } from "../entities/project_tag";
import { Question_tag } from "../entities/question_tag";
import { User } from "../entities/user";
import { Role } from "../entities/role";
import { Vendor } from "../entities/vendor";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "@Shivam123",
  database: "capi",
  synchronize: true,
  logging: true,
  entities: [AccessControl, Project, Project_tag, Question_tag, User, Role, Vendor],
});


