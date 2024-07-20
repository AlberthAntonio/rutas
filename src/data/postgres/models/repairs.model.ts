import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.model";

enum RepairsStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

@Entity()
export class Repairs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "date",
    nullable: false,
  })
  date: string | Date;

  @Column({
    enum: RepairsStatus,
    nullable: false,
    default: RepairsStatus.PENDING,
  })
  status: RepairsStatus;

  @ManyToOne(() => User, (user) => user.repairs)
  user: User

  @Column({
    type: "int",
    nullable: false,
  })
  motorsNumber: number;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;

  @CreateDateColumn({})
  created_at: Date;

  @UpdateDateColumn({})
  updated_at: Date;
}
