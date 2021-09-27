import { type } from "os";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, ManyToOne, JoinTable, getRepository } from "typeorm";
import { Certification } from "./Certification";
import { Institute } from "./Institute";
import { Ticket } from "./Ticket";
import { ITimeStamp } from "./TimeStamp";
import { TpEvent } from "./TpEvent";
import * as bcrypt from "bcryptjs";


@Entity()
export class Event extends ITimeStamp {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 300
    })
    title: string;

    @Column({
        length: 300
    })
    subtitle: string;

    @Column({
        length: 300
    })
    description: string;

    @Column()
    date: Date

    @Column()
    capacity: number

    @Column({
        length: 500
    })
    adress: string


    @Column()
    certification: boolean


    @ManyToOne(type => Institute)
    @JoinTable()
    institute: Institute

    @ManyToOne(type => TpEvent)
    @JoinTable()
    tp_event: TpEvent


    @Column({
        default: 0,
        type: "float"
    })
    price: number

    /* event status:
        1 - ticket sales,
        2 - start of the event,
        3 - issuance of certificates,
        4 - finished
    */
    @Column({
        default: 1,
    })
    status: number



    async tickets_available() {
        const TicketRepository = getRepository(Ticket);
        const ticket = await TicketRepository.find({
            where:{
                 event: this.id 
                }
        });

        return this.capacity - ticket.length
    }

    async generate_certificate() {
        const TicketRepository = getRepository(Ticket);
        const tickets = await TicketRepository.find({
            relations:["user"],
            where:{
                 event: this.id 
                }
        });
        const CerfiticationRepository = getRepository(Certification);
        
            
        for(var tickect of tickets){
            const cert = new Certification();
            cert.ticket = tickect;
            cert.observation = "certificate of participation in the event "+ this.title +", to "+ tickect.user.name;
            cert.hash = bcrypt.hashSync(this.title + tickect.user.name, 8);
            await CerfiticationRepository.save(cert);
        }

        
    }

    constructor() {
        super();
    }


}
