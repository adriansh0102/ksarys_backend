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
exports.DPAManager = void 0;
const config_1 = require("../../../database/config");
function DPAManager(Accion) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error('Failed to establish a database connection.');
        }
        const lst = [];
        let query;
        switch (Accion) {
            case "Select":
                query = `SELECT * FROM Dpa WHERE Id > 100`;
                break;
            case "SelectAll":
                query = `SELECT * FROM Dpa`;
                break;
            default:
                throw new Error("Invalid action");
        }
        const request = pool.request();
        const result = yield request.query(query);
        result.recordset.forEach(record => {
            const dat = {
                Id: record.ID,
                Nombre: record.Nombre.toUpperCase().trim(),
                Siglas: record.Siglas ? record.Siglas.toUpperCase().trim() : ''
            };
            lst.push(dat);
        });
        yield pool.close();
        return lst;
    });
}
exports.DPAManager = DPAManager;
