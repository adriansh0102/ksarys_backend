"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlmacenRouter = void 0;
const express_1 = require("express");
const almacen_controllers_1 = require("../infraestructure/almacen.controllers");
const router = (0, express_1.Router)();
router
    .get('/', almacen_controllers_1.AlmacenControllers.getAlmacen)
    .get('/all', almacen_controllers_1.AlmacenControllers.getAllAlmacen)
    .post('/', almacen_controllers_1.AlmacenControllers.addAlmacen)
    .put('/:Id', almacen_controllers_1.AlmacenControllers.UpdateAlmacen)
    .delete('/:Id', almacen_controllers_1.AlmacenControllers.deleteAlmacen);
exports.AlmacenRouter = router;
