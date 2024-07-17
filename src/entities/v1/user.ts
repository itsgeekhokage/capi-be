/** @format */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Role } from "./role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @Column()
  password: string;

  @Column()
  is_active: boolean;

  @Column()
  org_id: number;

  @Column()
  updated_by: number;

  @Column()
  vendor : string;

  @ManyToOne(() => Role, { cascade: true, eager : true })
  @JoinColumn({ name: "role_id" })
  role: Role;
}
