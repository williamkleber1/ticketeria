import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Event } from "../entity/Event";



class EventController {

    static listAll = async (req: Request, res: Response) => {
        //Get event from database

        const EventRepository = getRepository(Event);
        const event = await EventRepository.find({
            relations: ['institute', 'tp_event'],
            select: ['id', 'title', 'date', 'price']
        });
        console.log(event, event.length)


        //Send the event object
        res.send(event);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = Number(req.params.id);

        //Get the event from database
        const EventRepository = getRepository(Event);
        try {
            const event = await EventRepository.findOneOrFail(id, {
                relations: ['institute', 'tp_event']
            });
            res.status(201).send(event)

            console.log(await event.tickets_available())

        } catch (error) {
            res.status(404).send({ "message": "Event not found" });
        }
    };

    static updateStatus = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = Number(req.params.id);

        //Get the event from database
        const EventRepository = getRepository(Event);
        try {

            const event = await EventRepository.findOneOrFail(id);

            if (event.status < 4) {
                event.status += 1;

                //Try to safe
                try {
                    await EventRepository.save(event);
                } catch (e) {
                    res.status(409).send(e);
                    return;
                }
                //checks if the event has come to an end, and generates the certificates
                if(event.status == 4 && event.certification)
                    event.generate_certificate();
                
                
            }

            res.status(201).send(event)



        } catch (error) {
            res.status(404).send({ "message": "Event not found" });
        }
    };

    static newEvent = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { title, subtitle, date, description, capacity, institute, certification, adress, tp_event, price } = req.body;
        let event = new Event();
        event.title = title;
        event.subtitle = subtitle;
        event.date = date;
        event.description = description;
        event.capacity = capacity;
        event.adress = adress
        event.tp_event = tp_event
        event.price = price
        event.institute = institute

        event.certification = certification

        console.log(event)
        //Validade if the parameters are ok
        const errors = await validate(event);
        if (errors.length > 0) {
            console.log(errors)
            res.status(400).send(errors);
            return;
        }


        //Try to save. If fails, the username is already in use
        const EventRepository = getRepository(Event);
        try {
            await EventRepository.save(event);
        } catch (e) {
            console.log(e)
            res.status(409).send(e);
            return;
        }

        //If all ok, send 201 response
        res.status(201).send(event);
    };

    static editEvent = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { title, subtitle, date, description, capacity, institute, certification, adress, tp_event, price } = req.body;

        //Try to find event on database
        const EventRepository = getRepository(Event);
        let event = new Event();
        try {
            event = await EventRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({ "message": "Event not found" });
            return;
        }

        //Validate the new values on model

        event.title = title;
        event.subtitle = subtitle;
        event.date = date;
        event.description = description;
        event.capacity = capacity;
        event.institute = institute;
        event.certification = certification
        event.adress = adress,
            event.tp_event = tp_event
        event.price = price

        const errors = await validate(event);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe
        try {
            await EventRepository.save(event);
        } catch (e) {
            res.status(409).send(e);
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteEvent = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const EventRepository = getRepository(Event);
        let event: Event;
        try {
            event = await EventRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({ "message": "Event not found" });
            return;
        }
        EventRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export { EventController };