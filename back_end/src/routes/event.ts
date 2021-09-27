import { Router } from "express";
import {EventController} from "../database/controllers/EventController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

  const router = Router();

  //Get all event
  router.get("/", [checkJwt, checkRole(["ADMIN"])], EventController.listAll);

  // Get one event
  router.get(
    "/:id",
    [checkJwt, checkRole(["ADMIN"])],
    EventController.getOneById
  );

  //Create a new event
  router.post("/", EventController.newEvent);

  //Update event status
  router.patch("/:id/update", EventController.updateStatus);

  //Edit one event
  router.patch(
    "/:id",
    [checkJwt, checkRole(["ADMIN"])],
    EventController.editEvent
  );

  //Delete one event
  router.delete(
    "/:id",
    [checkJwt, checkRole(["ADMIN"])],
    EventController.deleteEvent
  );

  export default router;