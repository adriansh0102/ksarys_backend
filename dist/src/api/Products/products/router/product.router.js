"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRouter = void 0;
const express_1 = require("express");
const product_controllers_1 = require("../infraestructure/product.controllers");
const checkAuth_1 = require("../../../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', product_controllers_1.ProductsControllers.getAllProducts)
    .get('/table', product_controllers_1.ProductsControllers.getAllProductsTable)
    .get('/select', product_controllers_1.ProductsControllers.getProductsSelect)
    .get('/:id', product_controllers_1.ProductsControllers.getProductsById)
    .post('/', product_controllers_1.ProductsControllers.saveProduct)
    .delete('/:id', product_controllers_1.ProductsControllers.deleteProduct)
    .get('/', checkAuth_1.checkAuth, product_controllers_1.ProductsControllers.getAllProducts)
    .get('/table', checkAuth_1.checkAuth, product_controllers_1.ProductsControllers.getAllProductsTable)
    .get('/select', checkAuth_1.checkAuth, product_controllers_1.ProductsControllers.getProductsSelect)
    .get('/:id', checkAuth_1.checkAuth, product_controllers_1.ProductsControllers.getProductsById)
    .post('/', checkAuth_1.checkAuth, product_controllers_1.ProductsControllers.saveProduct)
    .put('/:Id', checkAuth_1.checkAuth, product_controllers_1.ProductsControllers.updateProduct)
    .delete('/:Id', checkAuth_1.checkAuth, product_controllers_1.ProductsControllers.deleteProduct)
    .put('/:Id', product_controllers_1.ProductsControllers.updateProduct)
    .delete('/:Id', product_controllers_1.ProductsControllers.deleteProduct);
exports.ProductsRouter = router;
