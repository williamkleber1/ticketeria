import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany} from "typeorm";
import { Institute } from "./Institute";
import { ITimeStamp } from "./TimeStamp";

@Entity()
export class Event extends ITimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:300
    })
    title : string;

    @Column({
        length:300
    })
    subtitle : string;

    @Column({
        length:300
    })
    description : string;

    @Column()
    date: Date

    @Column()
    capacity: number

    @ManyToMany(()=>Institute)
    @JoinColumn()
    institute: Institute

    constructor() {
        super();
      }
    

}
