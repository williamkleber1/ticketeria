import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { TpEvent } from "../entity/TpEvent";


class TpEventController {

    static listAll = async (req: Request, res: Response) => {
        //Get event from database
        
        const TpEventRepository = getRepository(TpEvent);
        const tpevent = await TpEventRepository.find();
        

        //Send the event object
        res.send(tpevent);
    }


    static newTpEvent = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { tp_event } = req.body;
        let tpevent = new TpEvent();
        tpevent.tp_event = tp_event;
        
        //Validade if the parameters are ok
        const errors = await validate(tpevent);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }


        //Try to save. If fails, the username is already in use
        const TpEventRepository = getRepository(TpEvent);
        try {
            await TpEventRepository.save(tpevent);
        } catch (e) {
            res.status(409).send(e);
            return;
        }

        //If all ok, send 201 response
        res.status(201).send(tpevent);
    };

    static editTpEvent = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { tp_event } = req.body;

        //Try to find TpEvent on database
        const TpEventRepository = getRepository(TpEvent);
        let tpevent = new TpEvent();
        try {
            tpevent = await TpEventRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send({"message":"TpEvent not found"});
            return;
        }

        //Validate the new values on model
        
        tpevent.tp_event = tp_event;
        
        const errors = await validate(tpevent);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe
        try {
            await TpEventRepository.save(tpevent);
        } catch (e) {
            res.status(409).send(e);
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteTpEvent = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const TpEventRepository = getRepository(TpEvent);
        let tpevent: TpEvent;
        try {
            tpevent = await TpEventRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send({"message":"TpEvent not found"});
            return;
        }
        TpEventRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};



export { TpEventController}