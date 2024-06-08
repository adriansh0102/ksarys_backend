import { Router } from "express"
import { OfertasControllers } from "../infraestructure/ofertas.controllers"

const router = Router()

router

  .get('/', OfertasControllers.getAllOfertas)
  
export const OfertasRouter = router
