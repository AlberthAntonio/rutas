import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum RepairsStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

@Entity()
export class Repairs extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "date",
        nullable: false,
    })
    date: string;

    @Column({
        enum : RepairsStatus,
        nullable: false,
        default: RepairsStatus.PENDING
    })
    status: RepairsStatus;
    
    @Column({
        type: "int",
        nullable: false,
    })
    user_id: number;
    
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