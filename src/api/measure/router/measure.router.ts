import { Router } from "express"
import { MeansureControllers } from "../infraestructure/measure.controllers"

const router = Router()

router

  .get('/', MeansureControllers.getAllMeansure)
 
export const MeasuresRouter = router
