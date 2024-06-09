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
exports.UtensiliosTipos = void 0;
const config_1 = require("../../../../database/config");
function UtensiliosTipos(action, Datos) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error("Failed to establish a database connection.");
        }
        let query = "";
        let result = null;
        switch (action) {
            case "Select":
                query = `Select * From UtensiliosTipos Where (Activo = @Activo)`;
                result = yield pool.request()
                    .input("Activo", true)
                    .query(query);
                break;
        }
        yield pool.close();
        if (result === null) {
            throw new Error("No sse completo la.");
        }
        return result.recordset;
    });
}
exports.UtensiliosTipos = UtensiliosTipos;
