import { Router } from "express"
import { UtensiliosControllers } from "../infraestructure/utensilios.controllers";
import { UtensiliosTiposControllers } from "../../utensiliosTipo/infraestructure/utensiliosTipos.controllers";

const router = Router()

router

  .get('/',  UtensiliosControllers.getAllUtensilios )
  .post('/' , UtensiliosControllers.AdicionarUtensilios )
  .put('/:Id', UtensiliosControllers.putUtensilios)
  .delete('/:Id' , UtensiliosControllers.deleteUtensilios)




export const UtensiliosRouter = router;
