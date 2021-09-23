import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Institute } from "../entity/Institute";


class InstituteController {

    static listAll = async (req: Request, res: Response) => {
        //Get institute from database
        const InstituteRepository = getRepository(Institute);
        const institute = await InstituteRepository.find();

        //Send the institute object
        res.send(institute);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = Number(req.params.id);




        //Get the institute from database
        const InstituteRepository = getRepository(Institute);
        try {
            const institute = await InstituteRepository.findOneOrFail(id);
            res.status(201).send(institute)

        } catch (error) {
            res.status(404).send("Institute not found");
        }
    };

    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { denomination, corporate_name, cnpj, adress, email, phone } = req.body;
        let institute = new Institute();
        institute.denomination = denomination;
        institute.corporate_name = corporate_name;
        institute.cnpj = cnpj;
        institute.adress = adress;
        institute.email = email;
        institute.phone = phone;

        //Validade if the parameters are ok
        const errors = await validate(institute);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }


        //Try to save. If fails, the username is already in use
        const InstituteRepository = getRepository(Institute);
        try {
            await InstituteRepository.save(institute);
        } catch (e) {
            res.status(409).send("cnpj already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("Institute created");
    };

    static editInstitute = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { denomination, corporate_name, adress, email, phone } = req.body;

        //Try to find institute on database
        const InstituteRepository = getRepository(Institute);
        let institute;
        try {
            institute = await InstituteRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Institute not found");
            return;
        }

        //Validate the new values on model
        institute.denomination = denomination;
        institute.corporate_name = corporate_name;
        institute.adress = adress;
        institute.email = email;
        institute.phone = phone;

        const errors = await validate(institute);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe
        try {
            await InstituteRepository.save(institute);
        } catch (e) {
            res.status(409).send(e);
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static deleteInsitute = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const InstituteRepository = getRepository(Institute);
        let institute: Institute;
        try {
            institute = await InstituteRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Institute not found");
            return;
        }
        InstituteRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export { InstituteController};