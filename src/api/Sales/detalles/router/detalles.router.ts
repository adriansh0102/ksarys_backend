import { Router } from "express"

import { ComandaDControllers } from '../infraestructure/detalles.controllers';
import { checkAuth } from "../../../../helpers/checkAuth";

const router = Router()

router

  .get('/', checkAuth, ComandaDControllers.getAllCDetalles)
  .get('/:id', checkAuth, ComandaDControllers.getCDetallesById)
  .get('/cdetalle/:id', checkAuth, ComandaDControllers.getComandaDetalleByComanda)

  .post('/', checkAuth, ComandaDControllers.saveCDetalle)

  .delete('/:id', checkAuth, ComandaDControllers.deleteCDetalle)

export const ComandaDRouter = router
