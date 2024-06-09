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
exports.UtensiliosControllers = void 0;
const send_res_1 = require("../../../../helpers/send.res");
const query_1 = require("./query");
class UtensiliosControllers {
    static getAllUtensilios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { Activo, Validado } = req.body;
            if (!Validado)
                Validado = true;
            if (!Activo)
                Activo = true;
            try {
                const result = yield (0, query_1.Utensilios)("Select", { Activo, Validado });
                return (0, send_res_1.sendRes)(res, 200, true, "GET All Ok", result);
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
    static AdicionarUtensilios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdEntidad = '2500000000', IdTipo = '2500000001', Nombre = 'perdwwwwwwwwwwododod', Cantidad = 0, Precio = 2222, Activo = true, Validado = 1, IdUsuario = '2500000000' } = req.body;
            const data = { IdEntidad, IdTipo, Nombre, Cantidad, Precio, Activo, Validado, IdUsuario };
            try {
                const result = yield (0, query_1.Utensilios)("Insert", data);
                return (0, send_res_1.sendRes)(res, 200, true, "Insertado Correctamente", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error BD", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internsl Server Error");
                }
            }
        });
    }
    static putUtensilios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id } = req.params;
            let { Nombre, IdTipo, Precio, Cantidad, Validado } = req.body;
            try {
                const utensilio = yield (0, query_1.Utensilios)('SelectId', { Id });
                if (!Validado)
                    Validado = 1;
                if (!Nombre)
                    Nombre = utensilio[0].Nombre;
                if (!IdTipo)
                    IdTipo = utensilio[0].IdTipo;
                if (!Precio)
                    Precio = utensilio[0].Precio;
                if (!Cantidad)
                    Cantidad = utensilio[0].Cantidad;
                const tipo = yield (0, query_1.Utensilios)('Update', { Id, Nombre, IdTipo, Precio, Cantidad, Validado });
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
    static deleteUtensilios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipo = yield (0, query_1.Utensilios)('Borrar', { Id: req.params.Id, Validado: 1 });
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
exports.UtensiliosControllers = UtensiliosControllers;
