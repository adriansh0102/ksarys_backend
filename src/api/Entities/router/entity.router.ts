import { Router } from "express"

import { EntityControllers } from '../infraestructure/entity.controllers';
import { checkAuth } from "../../../helpers/checkAuth";

const router = Router()

router

  .get('/',EntityControllers.getAllEntities)

  .get('/area/:entity_id',EntityControllers.getAllEntitiesArea)


  .get('/:id', checkAuth, EntityControllers.getEntitiesById)

  .post('/', checkAuth, EntityControllers.saveEntity)

  .put('/', checkAuth, EntityControllers.editEntity)

  .delete('/:id', checkAuth, EntityControllers.deleteEntity)

export const EntitiesRouter = router
