import { Router } from "express";
import {TicketController} from "../database/controllers/TickectConroller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

  const router = Router();

  //Get all tickect
  router.get("/", [checkJwt,checkRole(["ADMIN"])], TicketController.listAll);

  router.get("/me", [checkJwt], TicketController.listMe);



  //Create a new tickect
  router.post("/",[checkJwt], TicketController.newTicket);

  //Edit one tickect
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    TicketController.editTicket
  );

  //Delete one tickect
  router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    TicketController.deleteTicket
  );

  export default router;