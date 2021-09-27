import { Router } from "express";
import {InstituteController} from "../database/controllers/InstituteController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

  const router = Router();

  //Get all institute
  router.get("/", [checkJwt, checkRole(["ADMIN"])], InstituteController.listAll);

  // Get one institute
  router.get(
    "/:id",
    [checkJwt, checkRole(["ADMIN"])],
    InstituteController.getOneById
  );

  //Create a new institute
  router.post("/", InstituteController.newInstitute);

  //Edit one institute
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    InstituteController.editInstitute
  );

  //Delete one institute
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    InstituteController.deleteInsitute
  );

  export default router;