import { Router } from "express"


import { ProductsControllers } from '../infraestructure/product.controllers';
import { checkAuth } from "../../../../helpers/checkAuth";

const router = Router()

router

  .get('/', ProductsControllers.getAllProducts)
  .get('/table', ProductsControllers.getAllProductsTable)
  .get('/select', ProductsControllers.getProductsSelect)

  .get('/:id', ProductsControllers.getProductsById)

  .post('/', ProductsControllers.saveProduct)

  .delete('/:id', ProductsControllers.deleteProduct)
  .get('/',checkAuth, ProductsControllers.getAllProducts)
  .get('/table', checkAuth, ProductsControllers.getAllProductsTable)
  .get('/select',checkAuth, ProductsControllers.getProductsSelect)
  .get('/:id',checkAuth, ProductsControllers.getProductsById)
  .post('/', checkAuth, ProductsControllers.saveProduct)
  .put('/:Id',checkAuth, ProductsControllers.updateProduct)
  .delete('/:Id',checkAuth, ProductsControllers.deleteProduct)
  .put('/:Id', ProductsControllers.updateProduct)

  .delete('/:Id', ProductsControllers.deleteProduct)

export const ProductsRouter = router
