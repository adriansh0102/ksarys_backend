import { Router } from "express"


import { ProductsControllers } from '../infraestructure/product.controllers';
import { checkAuth } from "../../../../helpers/checkAuth";

const router = Router()

router

<<<<<<< Updated upstream
  .get('/', ProductsControllers.getAllProducts)
  .get('/:id', ProductsControllers.getProductsById)

  .post('/', ProductsControllers.saveProduct)
  // .put('/:wokerId', ProductsControllers.updateUsers)

  .delete('/:id', ProductsControllers.deleteProduct)
=======
  .get('/',checkAuth, ProductsControllers.getAllProducts)
  .get('/table', checkAuth, ProductsControllers.getAllProductsTable)
  .get('/select',checkAuth, ProductsControllers.getProductsSelect)
  .get('/:id',checkAuth, ProductsControllers.getProductsById)
  .post('/', checkAuth, ProductsControllers.saveProduct)
  .put('/:Id',checkAuth, ProductsControllers.updateProduct)
  .delete('/:Id',checkAuth, ProductsControllers.deleteProduct)




>>>>>>> Stashed changes

export const ProductsRouter = router
