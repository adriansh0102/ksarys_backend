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
exports.UsersControllers = void 0;
const send_res_1 = require("../../../helpers/send.res");
const dpa_querys_1 = require("./dpa-querys");
class UsersControllers {
    static getDPA100(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dpas = yield (0, dpa_querys_1.DPAManager)('Select');
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', dpas);
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
    static getAllDPA(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dpas = yield (0, dpa_querys_1.DPAManager)('SelectAll');
                return (0, send_res_1.sendRes)(res, 200, true, 'Datos Obtenidos', dpas);
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
}
exports.UsersControllers = UsersControllers;
