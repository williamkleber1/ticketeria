import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";
import { ITimeStamp } from "./TimeStamp";

@Entity()
export class Certification extends ITimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 300,
        nullable: true
    })
    observation: string;

    @Column({
        length: 300,
        nullable: true
    })
    hash: string

    @ManyToOne(() => Ticket)
    @JoinColumn()
    ticket :  Ticket

    constructor() {
        super();
    }

}
