import { Router } from "express"
import { ConceptoControllers } from "../infraestructure/concepto.controllers"

const router = Router()

router

  .get('/' , ConceptoControllers.getAllConcepto)
  .post('/', ConceptoControllers.addConcepto)
  .put('/:Id', ConceptoControllers.updateConcepto)
  .delete('/:Id', ConceptoControllers.deleteConcepto)

 
export const ConceptoRouter = router
