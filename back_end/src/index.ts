import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import { routes } from "./routes/index";
import { User } from "./database/entity/User"


//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     username: "william",
    //     password: "1234",
    //     role: "ADMIN",
    //     name: "William Kleber Alves Dos Santos",
    //     email: "william@mail.com"
    // }));
  })
  .catch(error => console.log(error));