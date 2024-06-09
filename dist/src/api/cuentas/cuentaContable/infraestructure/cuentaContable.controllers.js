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
exports.CuentasContablesControllers = void 0;
const cuentaContable_query_1 = require("./cuentaContable-query");
const send_res_1 = require("../../../../helpers/send.res");
class CuentasContablesControllers {
    static getAllCuentasContables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Activo } = req.params;
                const utensilios = yield (0, cuentaContable_query_1.CuentasContables)("Select", { Activo });
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
    static addCuentasContables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Cuenta, SubCuenta, Nombre, IdTipo } = req.body;
            if (!Nombre || !Cuenta || !IdTipo)
                return (0, send_res_1.sendRes)(res, 400, false, "Bad Request", "falta alguno de estos datos { Nombre, Cuenta , IdTipo}");
            const data = {
                Cuenta,
                Nombre,
                SubCuenta: (SubCuenta) ? SubCuenta : '',
                IdTipo,
                Activo: true,
                IdUsuario: '2500000000',
            };
            try {
                const tipo = yield (0, cuentaContable_query_1.CuentasContables)("Insert", data);
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
    static updateCuentasContables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id } = req.params;
            const { Nombre, Cuenta, SubCuenta, IdTipo } = req.body;
            try {
                const cuentaContables = yield (0, cuentaContable_query_1.CuentasContables)('SelectId', { Id });
                const data = {
                    Id,
                    Nombre: (Nombre) ? Nombre : cuentaContables[0].Nombre,
                    Cuenta: (Cuenta) ? Cuenta : cuentaContables[0].Cuenta,
                    SubCuenta: (SubCuenta) ? SubCuenta : cuentaContables[0].SubCuenta,
                    IdTipo: (IdTipo) ? IdTipo : cuentaContables[0].IdTipo
                };
                const tipo = yield (0, cuentaContable_query_1.CuentasContables)("Update", data);
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
    static deleteCuentasContables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tipo = yield (0, cuentaContable_query_1.CuentasContables)("Borrar", { Id: req.params.Id });
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
exports.CuentasContablesControllers = CuentasContablesControllers;
