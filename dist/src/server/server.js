"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
/* eslint-disable no-undef */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = require("../routes/index.routes");
const config_1 = require("../database/config");
class ExpressServer {
    constructor() {
        this.app = (0, express_1.default)();
        // Middlewares
        this.middlewares();
        this.routes();
    }
    listen() {
        (0, config_1.getConnection)();
        this.app.listen(process.env.PORT, () => {
            console.clear();
            console.log('Servidor corriendo en el puerto', process.env.PORT);
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        // Lectura y parseo a formato JSON del body
        this.app.use(express_1.default.json());
        // Ruta publica para ver el html
        this.app.use(express_1.default.static('src/public'));
    }
    routes() { this.app.use(process.env.ROUTES_PREFIX, index_routes_1.api); }
}
exports.ExpressServer = ExpressServer;
