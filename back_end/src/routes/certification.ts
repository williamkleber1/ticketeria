import { Router } from "express";
import { CertificateController } from "../database/controllers/CertificationController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

  //Get all tickect
  router.get("/", [checkJwt,checkRole(["ADMIN"])], CertificateController.listAll);

  router.get("/me", [checkJwt], CertificateController.listMe);

  export default router;