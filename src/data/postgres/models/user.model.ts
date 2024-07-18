import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { bcryptAdapter } from "../../../config";

enum UserRol {
  EMPLOYEE = "EMPLOYEE",
  CLIENT = "CLIENT",
}

enum Status {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
    length: 100,
  })
  name: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 120,
  })
  email: string;

  @Column({
    type: "boolean",
    default: false,
  })
  emailValidated: boolean;

  @Column({
    type: "varchar",
    nullable: false,
    length: 255,
  })
  password: string;

  @Column({
    type: "enum",
    enum: UserRol,
    default: UserRol.CLIENT,
  })
  rol: UserRol;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn({})
  created_at: Date;

  @UpdateDateColumn({})
  updated_at: Date;

  @BeforeInsert()
  encryptPassword() {
    this.password = bcryptAdapter.hash(this.password);
  }
}
