"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComandaDControllers = void 0;
const send_res_1 = require("../../../../helpers/send.res");
const oferta_detalle_querys_1 = require("../query/oferta-detalle.querys");
class ComandaDControllers {
    static getAllCDetalles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield (0, oferta_detalle_querys_1.ComandaDetallesQuerys)('getAll', { IdComanda: req.params.id });
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', sales);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, 'Error Grave', error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, 'Error Grave', '');
                }
            }
        });
    }
    static getComandaDetalleByComanda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sales = yield (0, oferta_detalle_querys_1.ComandaDetallesQuerys)('getComandaDetalleByComanda', { IdComanda: req.params.id });
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', sales);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, 'Error Grave', error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, 'Error Grave', '');
                }
            }
        });
    }
    static getCDetallesById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                const sales = yield (0, oferta_detalle_querys_1.ComandaDetallesQuerys)('SelectById', { Id: id });
                if (!sales)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Usuario no encontrado', '');
                return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', sales);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, 'mess_0', error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, 'mess_0', '');
                }
            }
        });
    }
    static saveCDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cdetalles = req.body;
                yield (0, oferta_detalle_querys_1.ComandaDetallesQuerys)('Insert', cdetalles);
                return (0, send_res_1.sendRes)(res, 200, true, 'ComandaDetallesQuerys Creada Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static deleteCDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                yield (0, oferta_detalle_querys_1.ComandaDetallesQuerys)('Eliminar', { Id: id });
                return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Eliminado Correctamente', '');
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, 'Error Interno', error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, 'Error Interno', '');
                }
            }
        });
    }
}
exports.ComandaDControllers = ComandaDControllers;
