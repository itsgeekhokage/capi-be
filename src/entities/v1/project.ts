/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user";
import { Project_tag } from "./project_tag";


export enum ProjectStatus {
  ONGOING = "ongoing",
  YET_TO_START = "yet to start",
  COMPLETED = "completed",
  CLOSED = "closed",
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  project_name: string;

  @Column({ default: "" })
  project_code: string;

  @Column({ default: "" })
  type: string;

  @Column({
    type: "enum",
    enum: ProjectStatus,
    default: ProjectStatus.YET_TO_START,
  })
  status: ProjectStatus;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  deadline: Date;

  @Column({ default: 0 })
  updated_by: number;

  @ManyToMany(() => User, { cascade: true, eager: true })
  @JoinTable({ name: "project_user" })
  users: User[];

  @ManyToMany(() => Project_tag, { cascade: true, eager: true })
  @JoinTable({ name: "project_project_tags" })
  project_tags: Project_tag[];
}
