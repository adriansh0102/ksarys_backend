import { Router } from "express"

import { UsersControllers } from '../infraestructure/user.controllers';
import { checkAuth } from "../../../helpers/checkAuth";

const router = Router()

router

  .get('/', checkAuth, UsersControllers.getAllUsers)
  .get('/:clientId', checkAuth, UsersControllers.getUsersById)

  .post('/', checkAuth, UsersControllers.saveUser)
  .post('/signIn', UsersControllers.sign)
  // .post('/changePassword', checkAuth, UsersControllers.changePassword)
  .post('/changeActive', checkAuth, UsersControllers.changeActive)

  .delete('/:id', checkAuth, UsersControllers.deleteUser)

export const UsersRouter = router
