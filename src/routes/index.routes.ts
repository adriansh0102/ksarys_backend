import express from 'express';
export const api = express.Router()

import { COLLECTIONS } from "../helpers/collections";

import { UsersRouter } from "../api/Users/router/user.router";
import { UtensiliosRouter } from '../api/utensilios/utensilios/router/utensilios.router';
import { utensiliosTipoRouter } from '../api/utensilios/utensiliosTipo/router/utensilios.router';
import { ConceptoRouter } from '../api/ConceptoClasIFicacionAlmacenes/concepto/router/concepto.router';

// import { ConceptsRouter } from '../api/Concepts/router/concepts.router';
// import { ClasificationsRouter } from '../api/Clasifications/router/clasifications.router';
// import { MeasuresRouter } from '../api/Measure/router/measure.router';
// import { ProductsRouter } from '../api/Products/router/product.router';

api.use(`/${COLLECTIONS.USERS}`, UsersRouter)

api.use(`/${COLLECTIONS.UTENSILIOS.utencilios}`, UtensiliosRouter)
api.use(`/${COLLECTIONS.UTENSILIOS.utenciliosTipos}` , utensiliosTipoRouter )

api.use(`/${COLLECTIONS.CONCEPTOCLASIFICACIONALMACEN.conceptos}` ,ConceptoRouter )
// api.use(`/${COLLECTIONS.CONCEPTS}`, ConceptsRouter)
// api.use(`/${COLLECTIONS.CLASIFICATION}`, ClasificationsRouter)
// api.use(`/${COLLECTIONS.MEASURE}`, MeasuresRouter)
// api.use(`/${COLLECTIONS.PRODUCTS}`, ProductsRouter)
