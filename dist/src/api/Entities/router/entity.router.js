"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitiesRouter = void 0;
const express_1 = require("express");
const entity_controllers_1 = require("../infraestructure/entity.controllers");
const checkAuth_1 = require("../../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', entity_controllers_1.EntityControllers.getAllEntities)
    .get('/area/:entity_id', entity_controllers_1.EntityControllers.getAllEntitiesArea)
    .get('/:id', checkAuth_1.checkAuth, entity_controllers_1.EntityControllers.getEntitiesById)
    .post('/', checkAuth_1.checkAuth, entity_controllers_1.EntityControllers.saveEntity)
    .put('/', checkAuth_1.checkAuth, entity_controllers_1.EntityControllers.editEntity)
    .delete('/:id', checkAuth_1.checkAuth, entity_controllers_1.EntityControllers.deleteEntity);
exports.EntitiesRouter = router;
