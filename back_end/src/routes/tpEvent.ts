import { Router } from "express";
import {TpEventController} from "../database/controllers/TpEventController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

  const router = Router();

  //Get all TpEvent
  router.get("/", [checkJwt,], TpEventController.listAll);

 

  //Create a new TpEvent
  router.post("/",[checkJwt, checkRole(["ADMIN"])], TpEventController.newTpEvent);

  //Edit one event
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    TpEventController.editTpEvent
  );

  //Delete one event
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    TpEventController.deleteTpEvent
  );

  export default router;