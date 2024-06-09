"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfertasRouter = void 0;
const express_1 = require("express");
const ofertas_controllers_1 = require("../infraestructure/ofertas.controllers");
const router = (0, express_1.Router)();
router
    .get('/', ofertas_controllers_1.OfertasControllers.getAllOfertas);
exports.OfertasRouter = router;
