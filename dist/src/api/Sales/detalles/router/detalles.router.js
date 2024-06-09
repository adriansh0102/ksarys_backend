"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComandaDRouter = void 0;
const express_1 = require("express");
const detalles_controllers_1 = require("../infraestructure/detalles.controllers");
const checkAuth_1 = require("../../../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, detalles_controllers_1.ComandaDControllers.getAllCDetalles)
    .get('/:id', checkAuth_1.checkAuth, detalles_controllers_1.ComandaDControllers.getCDetallesById)
    .get('/cdetalle/:id', checkAuth_1.checkAuth, detalles_controllers_1.ComandaDControllers.getComandaDetalleByComanda)
    .post('/', checkAuth_1.checkAuth, detalles_controllers_1.ComandaDControllers.saveCDetalle)
    .delete('/:id', checkAuth_1.checkAuth, detalles_controllers_1.ComandaDControllers.deleteCDetalle);
exports.ComandaDRouter = router;
