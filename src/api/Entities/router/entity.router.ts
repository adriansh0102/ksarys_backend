import { Router } from "express"

import { EntityControllers } from '../infraestructure/entity.controllers';

const router = Router()

router

  .get('/', EntityControllers.getAllEntities)

  .get('/:clientId', EntityControllers.getEntitiesById)

  .post('/', EntityControllers.saveEntity)

  .delete('/:id', EntityControllers.deleteEntity)

export const EntitiesRouter = router
