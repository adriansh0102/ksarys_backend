"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConceptoRouter = void 0;
const express_1 = require("express");
const concepto_controllers_1 = require("../infraestructure/concepto.controllers");
const router = (0, express_1.Router)();
router
    .get('/', concepto_controllers_1.ConceptoControllers.getAllConcepto)
    .post('/', concepto_controllers_1.ConceptoControllers.addConcepto)
    .put('/:Id', concepto_controllers_1.ConceptoControllers.updateConcepto)
    .delete('/:Id', concepto_controllers_1.ConceptoControllers.deleteConcepto);
exports.ConceptoRouter = router;
