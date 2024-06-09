"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtensiliosRouter = void 0;
const express_1 = require("express");
const utensilios_controllers_1 = require("../infraestructure/utensilios.controllers");
const router = (0, express_1.Router)();
router
    .get('/', utensilios_controllers_1.UtensiliosControllers.getAllUtensilios)
    .post('/', utensilios_controllers_1.UtensiliosControllers.AdicionarUtensilios)
    .put('/:Id', utensilios_controllers_1.UtensiliosControllers.putUtensilios)
    .delete('/:Id', utensilios_controllers_1.UtensiliosControllers.deleteUtensilios);
exports.UtensiliosRouter = router;
