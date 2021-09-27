import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Certification } from "../entity/Certification";

class CertificateController {

    static listAll = async (req: Request, res: Response) => {
        //Get certificate from database
        const CertificateRepository = getRepository(Certification);
        const certificate = await CertificateRepository.find();

        //Send the certificate object
        res.send(certificate);
    };

    //Get all certificates of logged user
    static listMe = async (req: Request, res: Response) => {
        const id_user = res.locals.jwtPayload.userId;
        //Get certificate from database
        const CertificateRepository = getRepository(Certification);
        const certificate = await CertificateRepository.find({
            relations:['ticket'],
            where:{
                ticket:{
                    user:id_user
                }
            },
            select:["ticket","observation","hash","createdAt", "updatedAt"]
        });

        //Send the certificate object
        res.send(certificate);
    };

}

export { CertificateController };
