import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class AccessControl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  path: string;

  @Column()
  updated_by: number;

  @Column()
  org_id: number;
}