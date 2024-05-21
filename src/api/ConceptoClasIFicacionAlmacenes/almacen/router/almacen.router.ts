import { Router } from "express"
import { AlmacenControllers } from "../infraestructure/almacen.controllers"

const router = Router()

router

.get('/', AlmacenControllers.getAlmacen)
  .get('/all', AlmacenControllers.getAllAlmacen)
  .post('/', AlmacenControllers.addAlmacen)
  .put('/:Id', AlmacenControllers.UpdateAlmacen)
  .delete('/:Id', AlmacenControllers.deleteAlmacen)

 
export const AlmacenRouter = router
