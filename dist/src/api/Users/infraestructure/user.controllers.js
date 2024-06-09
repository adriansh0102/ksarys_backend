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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const send_res_1 = require("../../../helpers/send.res");
const users_querys_1 = require("./users-querys");
class UsersControllers {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, users_querys_1.UsersManager)('Select');
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', users);
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
    static getUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { clientId } = req.params;
                if (!clientId)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                const user = yield (0, users_querys_1.UsersManager)('SelectById', { ID: clientId });
                if (!user)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Usuario no encontrado', '');
                return (0, send_res_1.sendRes)(res, 200, true, 'Resultado de la búsqueda', user);
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
    static saveUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const fetchedUser = yield (yield (0, users_querys_1.UsersManager)('SelectByName', { Nombre: data.Nombre })).at(0);
                if (fetchedUser) {
                    yield (0, users_querys_1.UsersManager)('Update', data);
                    return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Editado Correctamente', '');
                }
                const hashPassword = bcrypt_1.default.hashSync(data.ClaveAcceso, 10);
                data.ClaveAcceso = hashPassword;
                yield (0, users_querys_1.UsersManager)('Insert', data);
                return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Creado Exitosamente', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'Ha ocurrido algo grave', error);
            }
        });
    }
    static sign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, entity, area } = req.body;
                const user = yield (yield (0, users_querys_1.UsersManager)('SelectByName', { Nombre: username })).at(0);
                if (!user) {
                    return (0, send_res_1.sendRes)(res, 200, false, 'Ese usuario no está registrado en nuestro sistema', '');
                }
                const compare = bcrypt_1.default.compareSync(password, user.ClaveAcceso.trim());
                if (!compare)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Contraseña incorrecta', '');
                const token = jsonwebtoken_1.default.sign({
                    username: user.Nombre,
                    user_id: user.ID,
                    enable: user.Activo,
                    entity,
                    area
                }, process.env.JWT_KEY_APP, { expiresIn: '1d' });
                return (0, send_res_1.sendRes)(res, 200, true, 'Inicio de sesión correcto', {
                    user: {
                        userID: user.ID,
                        role: user.Cargo.toLocaleLowerCase()
                    },
                    token,
                    entity
                });
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'mess_0', '');
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return (0, send_res_1.sendRes)(res, 200, false, 'Faltan datos para realizar esta acción', '');
                yield (0, users_querys_1.UsersManager)('Delete', { ID: id });
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
    static changeActive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield (0, users_querys_1.UsersManager)('Erease', data);
                return (0, send_res_1.sendRes)(res, 200, true, 'Usuario Editado', '');
            }
            catch (error) {
                return (0, send_res_1.sendRes)(res, 500, false, 'Error Interno', '');
            }
        });
    }
}
exports.UsersControllers = UsersControllers;
