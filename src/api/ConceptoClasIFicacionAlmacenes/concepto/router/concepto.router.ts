import { Router } from "express"
import { ConceptoControllers } from "../infraestructure/concepto.controllers"

const router = Router()

router

  .post('/', ConceptoControllers.AdicionarConcepto)
 
export const ConceptoRouter = router
