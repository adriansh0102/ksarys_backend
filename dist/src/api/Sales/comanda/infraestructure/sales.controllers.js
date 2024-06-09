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
exports.SalesControllers = void 0;
const send_res_1 = require("../../../../helpers/send.res");
const sales_querys_1 = require("../querys/sales-querys");
class SalesControllers {
    static getAllSales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sales = yield (0, sales_querys_1.SalesManager)('SelectAll');
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
    static getSalesById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                const sales = yield (0, sales_querys_1.SalesManager)('SelectById', { Id: id });
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
    static saveSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const sale = req.body;
                sale.Numero = generateRandomNumber();
                sale.IdAreaEntidad = res.area;
                sale.IdUsuario = (_a = res.userData) === null || _a === void 0 ? void 0 : _a.id;
                yield (0, sales_querys_1.SalesManager)('Insert', sale);
                return (0, send_res_1.sendRes)(res, 200, true, 'Comanda Creada Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static deleteSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                yield (0, sales_querys_1.SalesManager)('Eliminar', { Id: id });
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
exports.SalesControllers = SalesControllers;
function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    const formattedNumber = `675${randomNumber}`;
    return parseInt(formattedNumber, 10);
}
