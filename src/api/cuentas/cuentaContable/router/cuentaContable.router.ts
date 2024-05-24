import { Router } from "express"
import { CuentasContablesControllers } from "../infraestructure/cuentaContable.controllers"

const router = Router()

router

  .get('/:Activo', CuentasContablesControllers.getAllCuentasContables)
  .post('/', CuentasContablesControllers.addCuentasContables)
  .put('/:Id', CuentasContablesControllers.updateCuentasContables)
  .delete('/:Id', CuentasContablesControllers.deleteCuentasContables)

 
export const CuentasContableRouter = router
