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
exports.AlmacenControllers = void 0;
const almacen_query_1 = require("./almacen-query");
const send_res_1 = require("../../../../helpers/send.res");
class AlmacenControllers {
    static getAllAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Activo, IdEntidad, IdAreaEntidad, Validado } = req.query;
            const data = {
                Activo: true,
                IdEntidad,
                IdAreaEntidad,
                Validado: 1
            };
            try {
                const result = yield (0, almacen_query_1.AlmacenesManager)('Select', data);
                return (0, send_res_1.sendRes)(res, 200, true, "Peticion Get Ok", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internal Server Error");
                }
            }
        });
    }
    //TODO:Revisar la implementacion de la query haber lo que hace 
    static getAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Validado, IdEntidad, IdAreaEntidad } = req.body;
                //IdEntidad si viene-> busca por este id
                // if( !IdAreaEntidad || !IdEntidad ) return sendRes(res, 400, false, "Faltan datos" , [] );
                const data = {
                    Activo: true,
                    Validado: (Validado) ? Validado : true,
                    IdEntidad: (IdEntidad) ? IdEntidad : '2500000000',
                    IdAreaEntidad
                };
                const result = yield (0, almacen_query_1.AlmacenesManager)('Select', data);
                return (0, send_res_1.sendRes)(res, 200, true, "Peticion Get Ok", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internal Server Error");
                }
            }
        });
    }
    static addAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Codigo, Nombre, Validado, IdEntidad } = req.body;
                if (!Codigo || !IdEntidad || !Nombre)
                    return (0, send_res_1.sendRes)(res, 400, false, "Faltan datos", []);
                const data = {
                    Codigo,
                    Nombre,
                    Activo: true,
                    Validado: (Validado) ? Validado : true,
                    IdEntidad: (IdEntidad) ? IdEntidad : '2500000000',
                    IdUsuario: '2500000000'
                };
                const result = yield (0, almacen_query_1.AlmacenesManager)('Insert', data);
                return (0, send_res_1.sendRes)(res, 200, true, "Insertado Correctamente", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internal Server Error");
                }
            }
        });
    }
    static UpdateAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Id } = req.params;
                const { Nombre, Validado, IdEntidad } = req.body;
                if (!IdEntidad || !Nombre)
                    return (0, send_res_1.sendRes)(res, 400, false, "Faltan datos", []);
                const data = {
                    Id,
                    Nombre,
                    Activo: true,
                    Validado: (Validado) ? Validado : true,
                    IdEntidad: (IdEntidad) ? IdEntidad : '2500000000',
                    IdUsuario: '2500000000'
                };
                const result = yield (0, almacen_query_1.AlmacenesManager)('Update', data);
                return (0, send_res_1.sendRes)(res, 200, true, "Actualizado Correctamente", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internal Server Error");
                }
            }
        });
    }
    static deleteAlmacen(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, almacen_query_1.AlmacenesManager)('Borrar', { Id: req.params.Id, Validado: req.body.Validado });
                return (0, send_res_1.sendRes)(res, 200, true, "Borrado Correctamente", result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", error.message);
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, "Error Grave", "Internal Server Error");
                }
            }
        });
    }
}
exports.AlmacenControllers = AlmacenControllers;
