"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependentsRouter = void 0;
const express_1 = require("express");
const dependents_controllers_1 = require("../infraestructure/dependents.controllers");
const checkAuth_1 = require("../../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, dependents_controllers_1.DependentsControllers.getAllDependents)
    .get('/:id', checkAuth_1.checkAuth, dependents_controllers_1.DependentsControllers.getDependentsById)
    .post('/', checkAuth_1.checkAuth, dependents_controllers_1.DependentsControllers.saveDependents)
    .post('/changeActive', checkAuth_1.checkAuth, dependents_controllers_1.DependentsControllers.changeActive)
    .delete('/:id', checkAuth_1.checkAuth, dependents_controllers_1.DependentsControllers.deleteDependents);
exports.DependentsRouter = router;
