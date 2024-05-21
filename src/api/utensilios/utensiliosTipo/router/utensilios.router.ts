import { Router } from "express"

import { UtensiliosTiposControllers } from "../../utensiliosTipo/infraestructure/utensiliosTipos.controllers";

const router = Router()

router
  .get('/',UtensiliosTiposControllers.getAllUtensiliosTipos)
  .post('/' , UtensiliosTiposControllers.SaveAllUtensiliosTipos)
  .put('/:Id',UtensiliosTiposControllers.putUtensiliosTipos)
  .delete('/:Id' , UtensiliosTiposControllers.deleteUtensiliosTipos)

export const utensiliosTipoRouter = router;
