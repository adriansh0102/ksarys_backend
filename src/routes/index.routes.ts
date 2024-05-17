import express from 'express';
export const api = express.Router()

import { COLLECTIONS } from "../helpers/collections";

import { UsersRouter } from "../api/Users/router/user.router";
import { EntitiesRouter } from '../api/Entities/router/entity.router';
import { DPARouter } from '../api/DPA/router/dpa.router';
// import { ConceptsRouter } from '../api/Concepts/router/concepts.router';
// import { ClasificationsRouter } from '../api/Clasifications/router/clasifications.router';
// import { MeasuresRouter } from '../api/Measure/router/measure.router';
// import { ProductsRouter } from '../api/Products/router/product.router';

api.use(`/${COLLECTIONS.USERS}`, UsersRouter)
api.use(`/${COLLECTIONS.ENTITY}`, EntitiesRouter)
api.use(`/${COLLECTIONS.DPA}`, DPARouter)
// api.use(`/${COLLECTIONS.CONCEPTS}`, ConceptsRouter)
// api.use(`/${COLLECTIONS.CLASIFICATION}`, ClasificationsRouter)
// api.use(`/${COLLECTIONS.MEASURE}`, MeasuresRouter)
// api.use(`/${COLLECTIONS.PRODUCTS}`, ProductsRouter)
