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
exports.ConceptoControllers = void 0;
const send_res_1 = require("../../../../helpers/send.res");
const concepto_query_1 = require("./concepto-query");
class ConceptoControllers {
    static getAllConcepto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    Id: '',
                    Nombre: '',
                    Activo: true,
                    Validado: true,
                    IdUsuario: '2500000000'
                };
                const result = yield (0, concepto_query_1.ConceptoManager)('Select', data);
                return (0, send_res_1.sendRes)(res, 200, true, "Peticion Get Ok", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internsl Server Error");
                }
            }
        });
    }
    static addConcepto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Nombre = '' } = req.body;
                const data = {
                    Id: '',
                    Nombre,
                    Activo: true,
                    Validado: true,
                    IdUsuario: '2500000000'
                };
                const result = yield (0, concepto_query_1.ConceptoManager)('Insert', data);
                return (0, send_res_1.sendRes)(res, 200, true, "Insertado Correctamente", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internsl Server Error");
                }
            }
        });
    }
    static updateConcepto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id } = req.params;
                const { Nombre, Validado } = req.body;
                if (!Nombre)
                    (0, send_res_1.sendRes)(res, 400, false, "Faltan Datos { Nombre }", undefined);
                const data = {
                    Id,
                    Nombre,
                    Validado: (Validado) ? Validado : true
                };
                const result = yield (0, concepto_query_1.ConceptoManager)("Update", data);
                return (0, send_res_1.sendRes)(res, 200, true, "Actualizado Correctamente", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internsl Server Error");
                }
            }
        });
    }
    static deleteConcepto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id } = req.params;
                if (!Id)
                    (0, send_res_1.sendRes)(res, 400, false, "Faltan Datos { Id }", undefined);
                const data = {
                    Id,
                    Validado: true,
                };
                const result = yield (0, concepto_query_1.ConceptoManager)("Borrar", data);
                return (0, send_res_1.sendRes)(res, 200, true, "Borrado Correctamente", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internsl Server Error");
                }
            }
        });
    }
}
exports.ConceptoControllers = ConceptoControllers;
