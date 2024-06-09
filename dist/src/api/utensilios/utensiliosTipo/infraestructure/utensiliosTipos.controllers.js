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
exports.UtensiliosTiposControllers = void 0;
const send_res_1 = require("../../../../helpers/send.res");
const utensiliosTypos_query_1 = require("./utensiliosTypos.query");
class UtensiliosTiposControllers {
    static getAllUtensiliosTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const utensilios = yield (0, utensiliosTypos_query_1.UtensiliosTipos)("Select");
                return (0, send_res_1.sendRes)(res, 200, true, "Datos Obtenidos", utensilios);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "");
                }
            }
        });
    }
    static SaveAllUtensiliosTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Nombre } = req.body;
            if (!Nombre)
                return (0, send_res_1.sendRes)(res, 400, false, "Bad Request", "El nombre es Oblidatorio");
            const data = {
                Id: '',
                Nombre,
                Activo: true,
                IdUsuario: '2500000000'
            };
            try {
                const tipo = yield (0, utensiliosTypos_query_1.UtensiliosTipos)('Insert', data);
                return (0, send_res_1.sendRes)(res, 200, true, "Datos Obtenidos", tipo);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "");
                }
            }
        });
    }
    static putUtensiliosTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id } = req.params;
            const { Nombre } = req.body;
            if (Nombre.length === 0 || !Nombre)
                return (0, send_res_1.sendRes)(res, 400, false, "Nombre tiene valor vacio", []);
            try {
                const tipo = yield (0, utensiliosTypos_query_1.UtensiliosTipos)('Update', { Id, Nombre });
                return (0, send_res_1.sendRes)(res, 200, true, "Update ok", tipo);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "");
                }
            }
        });
    }
    static deleteUtensiliosTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipo = yield (0, utensiliosTypos_query_1.UtensiliosTipos)('Borrar', { Id: req.params.Id });
                return (0, send_res_1.sendRes)(res, 200, true, "Borrar ok", tipo);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "");
                }
            }
        });
    }
}
exports.UtensiliosTiposControllers = UtensiliosTiposControllers;
