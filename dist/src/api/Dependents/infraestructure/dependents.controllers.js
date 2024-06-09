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
exports.DependentsControllers = void 0;
const send_res_1 = require("../../../helpers/send.res");
const dependents_querys_1 = require("./dependents-querys");
class DependentsControllers {
    static getAllDependents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dependents = yield (0, dependents_querys_1.DependentsManager)('Select');
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', dependents);
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
    static getDependentsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                const dependent = yield (0, dependents_querys_1.DependentsManager)('SelectById', { Id: id });
                if (!dependent)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Dependiente no encontrado', '');
                return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', dependent);
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
    static saveDependents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const fetchedDependents = yield (yield (0, dependents_querys_1.DependentsManager)('SelectByName', { Nombre: data.Nombre })).at(0);
                if (fetchedDependents) {
                    yield (0, dependents_querys_1.DependentsManager)('Update', data);
                    return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Editado Correctamente', '');
                }
                yield (0, dependents_querys_1.DependentsManager)('Insert', data);
                return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Creado Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static deleteDependents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                yield (0, dependents_querys_1.DependentsManager)('Delete', { Id: id });
                return (0, send_res_1.sendRes)(res, 200, true, 'Dependiente Eliminado Correctamente', '');
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
    static changeActive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield (0, dependents_querys_1.DependentsManager)('Erease', data);
                return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Editado', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'Error Interno', '');
            }
        });
    }
}
exports.DependentsControllers = DependentsControllers;
