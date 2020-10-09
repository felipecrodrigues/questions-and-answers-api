import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "question" })
export class Question {
    @PrimaryGeneratedColumn({ type: "int" })
    Id: number;

    @Column({ type: "varchar" })
    Question: string;
    
    @Column({ type: "varchar", nullable: true  })
    Answer: string;
}