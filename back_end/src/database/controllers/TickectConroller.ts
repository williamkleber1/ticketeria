import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Ticket } from "../entity/Ticket";
import { Event } from "../entity/Event";


class TicketController {

    static listAll = async (req: Request, res: Response) => {
        //Get ticket from database
        const TicketRepository = getRepository(Ticket);
        const ticket = await TicketRepository.find();

        //Send the ticket object
        res.send(ticket);
    };

    //Get all tickets of logged user
    static listMe = async (req: Request, res: Response) => {
        const id_user = res.locals.jwtPayload.userId;
        //Get ticket from database
        const TicketRepository = getRepository(Ticket);
        const ticket = await TicketRepository.find({
            relations:['event'],
            where:{user:id_user}
        });

        //Send the ticket object
        res.send(ticket);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = Number(req.params.id);

        //Get the ticket from database
        const TicketRepository = getRepository(Ticket);
        try {
            const ticket = await TicketRepository.findOneOrFail(id);
            res.status(201).send(ticket)

        } catch (error) {
            res.status(404).send("Ticket not found");
        }
    };

    static newTicket = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { lote, price, event} = req.body;
        const user = res.locals.jwtPayload.userId;
        const TicketRepository = getRepository(Ticket);



        //check if there is already the user's ticket for this event
        const user_tickets = await TicketRepository.find({
            where:{
                user:user,
                event:event
            }
        });

        if(user_tickets.length > 0){
            res.status(400).send({"message":"You already have a ticket for this event"});
            return;
        }
        
        
        //Get Event instance
        const EventRepository = getRepository(Event);
        const event_obj = await EventRepository.findOneOrFail(event)

        //check if there are tickets available
        if(await event_obj.tickets_available() < 1 && event_obj.status > 1){
            res.status(400).send({"message":"Tickets Sold Out"});
            return;
        }


        let ticket = new Ticket();
        ticket.lote = lote;
        ticket.price = event_obj.price;
        ticket.event = event;
        ticket.user = user;

        //Validade if the parameters are ok
        const errors = await validate(ticket);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }


        //Try to save. If fails, the username is already in use
        try {
            await TicketRepository.save(ticket);
        } catch (e) {
            res.status(409).send(e);
            return;
        }

        //If all ok, send 201 response
        res.status(201).send({"message":"Ticket created"});   
    };

    static editTicket = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        let { lote, price, event, user} = req.body;

        //Try to find ticket on database
        const TicketRepository = getRepository(Ticket);
        let ticket = new Ticket();
        try {
            ticket = await TicketRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"message":"Ticket not found"});
            return;
        }

        //Validate the new values on model
        
        ticket.lote = lote;
        ticket.price = price;
        ticket.event = event;
        ticket.user = user;

        const errors = await validate(ticket);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe
        try {
            await TicketRepository.save(ticket);
        } catch (e) {
            res.status(409).send(e);
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteTicket = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const TicketRepository = getRepository(Ticket);
        let ticket: Ticket;
        try {
            ticket = await TicketRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({"message":"Ticket not found"});
            return;
        }
        TicketRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export { TicketController};