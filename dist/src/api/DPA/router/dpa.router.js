"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DPARouter = void 0;
const express_1 = require("express");
const dpa_controllers_1 = require("../infraestructure/dpa.controllers");
const checkAuth_1 = require("../../../helpers/checkAuth");
const router = (0, express_1.Router)();
router
    .get('/', checkAuth_1.checkAuth, dpa_controllers_1.UsersControllers.getDPA100)
    .get('/all', checkAuth_1.checkAuth, dpa_controllers_1.UsersControllers.getAllDPA);
exports.DPARouter = router;
