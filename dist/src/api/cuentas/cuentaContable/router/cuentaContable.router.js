"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuentasContableRouter = void 0;
const express_1 = require("express");
const cuentaContable_controllers_1 = require("../infraestructure/cuentaContable.controllers");
const router = (0, express_1.Router)();
router
    .get('/:Activo', cuentaContable_controllers_1.CuentasContablesControllers.getAllCuentasContables)
    .post('/', cuentaContable_controllers_1.CuentasContablesControllers.addCuentasContables)
    .put('/:Id', cuentaContable_controllers_1.CuentasContablesControllers.updateCuentasContables)
    .delete('/:Id', cuentaContable_controllers_1.CuentasContablesControllers.deleteCuentasContables);
exports.CuentasContableRouter = router;
