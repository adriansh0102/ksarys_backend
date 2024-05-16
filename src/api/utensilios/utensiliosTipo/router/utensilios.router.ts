import { Router } from "express"

import { UtensiliosTiposControllers } from "../../utensiliosTipo/infraestructure/utensiliosTipos.controllers";

const router = Router()

router
  .get('/',UtensiliosTiposControllers.getAllUtensiliosTipos);

export const utensiliosTipo = router;
