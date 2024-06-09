"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClasificacionRouter = void 0;
const express_1 = require("express");
const clasificacion_controllers_1 = require("../infraestructure/clasificacion.controllers");
const router = (0, express_1.Router)();
router
    .get('/', clasificacion_controllers_1.ClasificacionControllers.getClasificacion)
    .post('/', clasificacion_controllers_1.ClasificacionControllers.addClasificacion)
    .put('/:Id', clasificacion_controllers_1.ClasificacionControllers.updateClasificacion)
    .delete('/:Id', clasificacion_controllers_1.ClasificacionControllers.deleteClasificacion);
exports.ClasificacionRouter = router;
