import { Router } from "express"
import { ClasificacionControllers } from "../infraestructure/clasificacion.controllers"

const router = Router()

router

  .get('/', ClasificacionControllers.getClasificacion)
  .post('/', ClasificacionControllers.addClasificacion)
  .put('/:Id', ClasificacionControllers.updateClasificacion)
  .delete('/:Id', ClasificacionControllers.deleteClasificacion)

 
export const ClasificacionRouter = router
