import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany} from "typeorm";
import { Event } from "./Event";
import { Institute } from "./Institute";
import { ITimeStamp } from "./TimeStamp";
import { User } from "./User";

@Entity()
export class Ticket extends ITimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:300
    })
    observation : string;

    @Column()
    lote: number

    @Column()
    price: number

    @ManyToMany(()=> Event)
    @JoinColumn()
    event: Event

    @ManyToMany(()=> User)
    @JoinColumn()
    user: User

    constructor() {
        super();
      }
    
}
