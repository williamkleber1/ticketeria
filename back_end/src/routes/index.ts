import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import event from "./event";
import institute from "./institute";
import tpEvent from "./tpEvent"
import ticket from "./ticket"
import certification from "./certification"


const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/institute", institute);
routes.use("/event", event);
routes.use("/tpevent", tpEvent);
routes.use("/ticket", ticket);
routes.use("/certification", certification);

export { routes};