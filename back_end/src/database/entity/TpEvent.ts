import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TpEvent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({

        length:300
    })
    tp_event : string;
}