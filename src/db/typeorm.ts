/** @format */

import { DataSource } from "typeorm";
import { AccessControl } from "../entities/v1/access_control";
import { Project } from "../entities/v1/project";
import { Project_tag } from "../entities/v1/project_tag";
import { Question_tag } from "../entities/v1/question_tag";
import { User } from "../entities/v1/user";
import { Role } from "../entities/v1/role";
import { Vendor } from "../entities/v1/vendor";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: 'root',
  password: '@Shivam123',
  database: "capi",
  synchronize: true,
  logging: true,
  entities: [
    AccessControl,
    Project,
    Project_tag,
    Question_tag,
    User,
    Role,
    Vendor,
  ],
});
