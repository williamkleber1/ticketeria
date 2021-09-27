import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Event } from "./Event";
import { Institute } from "./Institute";
import { ITimeStamp } from "./TimeStamp";
import { User } from "./User";

@Entity()
export class Ticket extends ITimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 300,
        nullable: true
    })
    observation: string;

    @Column({
        nullable: true
    })
    lote: number

    @Column({
        nullable: true,
        type: "float"
    })
    price: number

    @ManyToOne(() => Event)
    @JoinColumn()
    event: Event

    @ManyToOne(() => User)
    @JoinColumn()
    user: User

    constructor() {
        super();
    }

}
