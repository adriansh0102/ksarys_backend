import { Router } from "express"

import { ProductsControllers } from '../infraestructure/product.controllers';

const router = Router()

router

  .get('/', ProductsControllers.getAllProducts)
  .get('/table', ProductsControllers.getAllProductsTable)
  .get('/select', ProductsControllers.getProductsSelect)

  .get('/:id', ProductsControllers.getProductsById)

  .post('/', ProductsControllers.saveProduct)

  .put('/:Id', ProductsControllers.updateProduct)

  .delete('/:Id', ProductsControllers.deleteProduct)





export const ProductsRouter = router
