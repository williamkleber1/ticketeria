import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {User} from "./database/entity/User";
import { Institute } from "./database/entity/Institute";
import { router } from "./routes";


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(router)

    
    
    // start express server
    app.listen(3000);

    // // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));

    // await connection.manager.save(connection.manager.create(Institute, {
    //    adress:"rua dos cornos numero 0",
    //    cnpj: "654736/0001-64",
    //    corporate_name: "Teste empresa546",
    //    denomination: "demo 1",
    //    email: "gdfuyw@mail.com",
    //    phone: "663-4233-2233",
    // }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
