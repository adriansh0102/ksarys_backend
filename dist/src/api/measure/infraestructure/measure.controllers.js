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
exports.MeansureControllers = void 0;
const send_res_1 = require("../../../helpers/send.res");
const measure_query_1 = require("./measure-query");
class MeansureControllers {
    static getAllMeansure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, measure_query_1.MeasureManager)('Select', { Activo: true });
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
}
exports.MeansureControllers = MeansureControllers;
