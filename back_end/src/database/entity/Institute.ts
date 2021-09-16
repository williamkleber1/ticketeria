import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ITimeStamp } from "./TimeStamp";

@Entity()
export class Institute extends ITimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length:300
    })
    denomination : string;

    @Column({
        unique:true,
        length:300
        
    })
    corporate_name : string;

    @Column({
        unique: true
    })
    cnpj: string; 
 

    @Column()
    adress: string

    @Column()
    email: string

    @Column()
    phone: string


}
