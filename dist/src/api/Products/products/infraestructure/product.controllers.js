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
exports.ProductsControllers = void 0;
const send_res_1 = require("../../../../helpers/send.res");
const product_query_1 = require("./product-query");
class ProductsControllers {
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Activo = true, Validado = 1 } = req.query;
            const { IdEntidad = '' } = req.body;
            try {
                const products = yield (0, product_query_1.Products)("Select", { Activo, IdEntidad, Validado });
                return (0, send_res_1.sendRes)(res, 200, true, "Productos Obtenidos", products);
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
    static getAllProductsTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield (0, product_query_1.Products)("SelectTable");
                return (0, send_res_1.sendRes)(res, 200, true, "Productos Obtenidos", products);
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
    static getProductsSelect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield (0, product_query_1.Products)("SelectSelect");
                return (0, send_res_1.sendRes)(res, 200, true, "Productos Select Obtenidos", products);
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
    //no se que hace esta consulta
    static getProductsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { Id } = req.params;
            try {
                const product = yield (0, product_query_1.Products)('SelectOneId', { Id });
                return (0, send_res_1.sendRes)(res, 200, true, "Producto Obtenido", product);
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
    static saveProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let prod = req.body;
                prod.IdEntidad = res.entity;
                prod.IdUsuario = (_a = res.userData) === null || _a === void 0 ? void 0 : _a.id;
                const productNew = yield (0, product_query_1.Products)('Insert', prod);
                return (0, send_res_1.sendRes)(res, 200, true, "Nuevo Producto", productNew);
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
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prod = req.body;
                const product = yield (0, product_query_1.Products)("Update", prod);
                return (0, send_res_1.sendRes)(res, 200, true, "Productos Actualizado", product);
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
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { Validado } = req.body;
            const { Id } = req.params;
            if (!Validado)
                Validado = 1;
            try {
                const product = yield (0, product_query_1.Products)("Borrar", { Id, Activo: false, Validado });
                return (0, send_res_1.sendRes)(res, 200, true, "Productos Borrado", product);
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
exports.ProductsControllers = ProductsControllers;
