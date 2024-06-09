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
exports.ClasificacionControllers = void 0;
const send_res_1 = require("../../../../helpers/send.res");
const clasificacion_query_1 = require("./clasificacion-query");
class ClasificacionControllers {
    static getClasificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Activo = true, Validado = true } = req.body;
                const result = yield (0, clasificacion_query_1.ClasificacionManager)("Select", { Activo, Validado });
                return (0, send_res_1.sendRes)(res, 200, true, "GET Ok", result);
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
    static addClasificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Nombre = "", IdConcepto = "" } = req.body;
                const data = {
                    Id: "",
                    Nombre,
                    Activo: true,
                    Validado: true,
                    IdUsuario: "2500000000",
                    IdConcepto,
                };
                const result = yield (0, clasificacion_query_1.ClasificacionManager)("Insert", data);
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
    static updateClasificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id } = req.params;
                const { Nombre, IdConcepto, Validado } = req.body;
                if (!IdConcepto)
                    (0, send_res_1.sendRes)(res, 400, false, "Faltan Datos { IdConcepto }", []);
                const data = {
                    Id,
                    Nombre: (Nombre) ? Nombre : '',
                    IdConcepto,
                    Validado: (Validado) ? Validado : true
                };
                const result = yield (0, clasificacion_query_1.ClasificacionManager)("Update", data);
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
    static deleteClasificacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id } = req.params;
                if (!Id)
                    (0, send_res_1.sendRes)(res, 400, false, "Faltan Datos { Id }", undefined);
                const data = {
                    Id,
                    Validado: true,
                };
                const result = yield (0, clasificacion_query_1.ClasificacionManager)("Borrar", data);
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
exports.ClasificacionControllers = ClasificacionControllers;
