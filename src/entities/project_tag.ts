/** @format */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Desposition_Type {
  STATIC = "static",
  DYNAMIC = "dynamic",
  STATIC2 = "static2",
}

@Entity()
export class Project_tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @Column()
  placeholder: string;

  @Column({
    type: "enum",
    enum: Desposition_Type,
  })
  desposition_type: Desposition_Type;

  @Column({
    nullable: true,
    type : "text"
  })
  desposition: string;

  @Column()
  project_code: string;

  @Column({
    nullable: true,
  })
  question_tag_id: number;

  @Column({ default: true })
  is_active: boolean;
}
