import { Router } from "express"

import { DependentsControllers } from '../infraestructure/dependents.controllers';
import { checkAuth } from "../../../helpers/checkAuth";

const router = Router()

router

  .get('/', checkAuth, DependentsControllers.getAllDependents)
  .get('/:id', checkAuth, DependentsControllers.getDependentsById)

  .post('/', checkAuth, DependentsControllers.saveDependents)
  .post('/changeActive', checkAuth, DependentsControllers.changeActive)

  .delete('/:id', checkAuth, DependentsControllers.deleteDependents)

export const DependentsRouter = router
