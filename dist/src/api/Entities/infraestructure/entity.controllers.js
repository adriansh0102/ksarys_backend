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
exports.EntityControllers = void 0;
const send_res_1 = require("../../../helpers/send.res");
const entity_querys_1 = require("./entity-querys");
class EntityControllers {
    static getAllEntities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield (0, entity_querys_1.EntitiesManager)('Select');
                for (const entity of entities) {
                    const areaEntidad = yield (0, entity_querys_1.EntitiesManager)('SelectAreaEntidad', { Id: entity.Id });
                    entity.AreaEntidades = areaEntidad;
                }
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', entities);
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
    static getAllEntitiesArea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { entity_id } = req.params;
                const entity = yield (0, entity_querys_1.EntitiesManager)('SelectAreaEntidad', { Id: entity_id });
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', entity);
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
    static getEntitiesById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                const user = yield (0, entity_querys_1.EntitiesManager)('SelectById', { Id: id });
                if (!user)
                    return (0, send_res_1.sendRes)(res, 500, false, 'Entidad no encontrada', '');
                return (0, send_res_1.sendRes)(res, 500, false, 'Resultado de la búsqueda', user);
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
    static saveEntity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const fetchedEntity = (yield (0, entity_querys_1.EntitiesManager)('SelectByName', { Nombre: data.Nombre }))[0];
                if (fetchedEntity) {
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ya existe una entidad con ese nombre', '');
                }
                yield (0, entity_querys_1.EntitiesManager)('Insert', data);
                return (0, send_res_1.sendRes)(res, 200, true, 'Entidad Creada Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static editEntity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield (0, entity_querys_1.EntitiesManager)('Update', data);
                return (0, send_res_1.sendRes)(res, 200, true, 'Entidad Editada Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static deleteEntity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                yield (0, entity_querys_1.EntitiesManager)('Delete', { Id: id });
                return (0, send_res_1.sendRes)(res, 200, true, 'Entidad Eliminada Correctamente', '');
            }
            catch (error) {
                if (error instanceof Error) {
                    return (0, send_res_1.sendRes)(res, 500, false, 'Error Interno', '');
                }
                else {
                    return (0, send_res_1.sendRes)(res, 500, false, 'Error Interno', '');
                }
            }
        });
    }
}
exports.EntityControllers = EntityControllers;
