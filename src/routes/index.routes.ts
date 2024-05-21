import express from 'express';
export const api = express.Router()

import { COLLECTIONS } from "../helpers/collections";

import { UsersRouter } from "../api/Users/router/user.router";
import { EntitiesRouter } from '../api/Entities/router/entity.router';
import { DPARouter } from '../api/DPA/router/dpa.router';
import { DependentsRouter } from '../api/Dependents/router/dependents.router';
import { UtensiliosRouter } from '../api/utensilios/utensilios/router/utensilios.router';
import { utensiliosTipoRouter } from '../api/utensilios/utensiliosTipo/router/utensilios.router';
import { ConceptoRouter } from '../api/ConceptoClasIFicacionAlmacenes/concepto/router/concepto.router';
import { ClasificacionRouter } from '../api/ConceptoClasIFicacionAlmacenes/clasificacion/router/clasificacion.router';
import { AlmacenRouter } from '../api/ConceptoClasIFicacionAlmacenes/almacen/router/almacen.router';
import { CuentasContableRouter } from '../api/cuentas/cuentaContable/router/cuentaContable.router';
import { ProductsRouter } from '../api/Products/products/router/product.router';


import { SalesRouter } from '../api/Sales/router/sales.router';
// import { ConceptsRouter } from '../api/Concepts/router/concepts.router';
// import { ClasificationsRouter } from '../api/Clasifications/router/clasifications.router';
// import { MeasuresRouter } from '../api/Measure/router/measure.router';
// import { ProductsRouter } from '../api/Products/router/product.router';

api.use(`/${COLLECTIONS.USERS}`, UsersRouter)
api.use(`/${COLLECTIONS.ENTITY}`, EntitiesRouter)
api.use(`/${COLLECTIONS.DPA}`, DPARouter)
api.use(`/${COLLECTIONS.DEPEND}`, DependentsRouter)



api.use(`/${COLLECTIONS.UTENSILIOS.utencilios}`, UtensiliosRouter)
api.use(`/${COLLECTIONS.UTENSILIOS.utenciliosTipos}` , utensiliosTipoRouter )


api.use(`/${COLLECTIONS.CONCEPTOCLASIFICACIONALMACEN.conceptos}` ,ConceptoRouter )
api.use(`/${COLLECTIONS.CONCEPTOCLASIFICACIONALMACEN.clasificacion}` ,ClasificacionRouter )
api.use(`/${COLLECTIONS.CONCEPTOCLASIFICACIONALMACEN.almacen}` ,AlmacenRouter )


api.use(`/${COLLECTIONS.CUENTAS.cuentasContables}`, CuentasContableRouter)


api.use(`/${COLLECTIONS.PRODUCTS.product}`, ProductsRouter)

api.use(`/${COLLECTIONS.SALES}`, SalesRouter)
api.use(`/${COLLECTIONS.PRODUCTS}`, ProductsRouter)
// api.use(`/${COLLECTIONS.CONCEPTS}`, ConceptsRouter)
// api.use(`/${COLLECTIONS.CLASIFICATION}`, ClasificationsRouter)
// api.use(`/${COLLECTIONS.MEASURE}`, MeasuresRouter)
// api.use(`/${COLLECTIONS.PRODUCTS}`, ProductsRouter)
