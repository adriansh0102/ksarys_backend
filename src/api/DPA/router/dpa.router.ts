import { Router } from "express"

import { UsersControllers } from '../infraestructure/dpa.controllers';
import { checkAuth } from "../../../helpers/checkAuth";

const router = Router()

router

  .get('/', checkAuth, UsersControllers.getDPA100)
  .get('/all', checkAuth, UsersControllers.getAllDPA)

export const DPARouter = router
