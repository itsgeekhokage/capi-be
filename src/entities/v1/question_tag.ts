/** @format */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Desposition_Type {
  STATIC = "static",
  DYNAMIC = "dynamic",
  STATIC2 = "static2",
}

@Entity()
export class Question_tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  default: boolean;

  @Column()
  placeholder: string;

  @Column()
  tag: string;

  @Column({
    type: "enum",
    enum: Desposition_Type,
  })
  desposition_type: Desposition_Type;

  @Column("text") 
  desposition: string;
}
