"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasuresRouter = void 0;
const express_1 = require("express");
const measure_controllers_1 = require("../infraestructure/measure.controllers");
const router = (0, express_1.Router)();
router
    .get('/', measure_controllers_1.MeansureControllers.getAllMeansure);
exports.MeasuresRouter = router;
