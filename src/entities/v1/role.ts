/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import { AccessControl } from "./access_control";
import { User } from "./user";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  org_id: string;

  @Column()
  updated_by: number;

  @ManyToMany(() => AccessControl, { cascade: true, eager: true })
  @JoinTable({ name: "role_controls" })
  access_controls: AccessControl[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
