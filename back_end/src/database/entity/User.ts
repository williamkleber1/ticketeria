import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ITimeStamp } from "./TimeStamp";

@Entity()
export class User extends ITimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
