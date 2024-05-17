import { Router } from "express"

import { UtensiliosTiposControllers } from "../../utensiliosTipo/infraestructure/utensiliosTipos.controllers";

const router = Router()

router
  .get('/',UtensiliosTiposControllers.getAllUtensiliosTipos)
  .post('/' , UtensiliosTiposControllers.SaveAllUtensiliosTipos)

export const utensiliosTipoRouter = router;
