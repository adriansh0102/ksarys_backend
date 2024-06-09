"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utensiliosTipoRouter = void 0;
const express_1 = require("express");
const utensiliosTipos_controllers_1 = require("../../utensiliosTipo/infraestructure/utensiliosTipos.controllers");
const router = (0, express_1.Router)();
router
    .get('/', utensiliosTipos_controllers_1.UtensiliosTiposControllers.getAllUtensiliosTipos)
    .post('/', utensiliosTipos_controllers_1.UtensiliosTiposControllers.SaveAllUtensiliosTipos)
    .put('/:Id', utensiliosTipos_controllers_1.UtensiliosTiposControllers.putUtensiliosTipos)
    .delete('/:Id', utensiliosTipos_controllers_1.UtensiliosTiposControllers.deleteUtensiliosTipos);
exports.utensiliosTipoRouter = router;
