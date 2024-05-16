import { Router } from "express"
import { UtensiliosControllers } from "../infraestructure/utensilios.controllers";
import { UtensiliosTiposControllers } from "../../utensiliosTipo/infraestructure/utensiliosTipos.controllers";

const router = Router()

router

  .get('/',  UtensiliosControllers.getAllUtensilios )
  .post('/' , UtensiliosControllers.AdicionarUtensilios )




export const UtensiliosRouter = router;
