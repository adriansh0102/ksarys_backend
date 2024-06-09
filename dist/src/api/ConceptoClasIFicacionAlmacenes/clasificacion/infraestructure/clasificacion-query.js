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
exports.ClasificacionManager = void 0;
const config_1 = require("../../../../database/config");
function ClasificacionManager(action, Datos) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error("Failed to establish a database connection.");
        }
        let query = "";
        let result = null;
        switch (action) {
            case "Select":
                query = `Select * From ProductosClasificacion Where ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)`;
                result = yield pool
                    .request()
                    .input("Activo", Datos.Activo)
                    .input("Validado", Datos.Validado)
                    .query(query);
                break;
            case "Insert":
                query = `Declare @Id bigint
        BEGIN TRAN
            Set @Id = (Select Count(Id) From ProductosClasificacion Where Nombre = @Nombre)
            If @Id = 0 Begin
                Set @Id = IsNull((Select Max(Id)+1 From ProductosClasificacion),(Select Top 1 IdServer From ServerID))
                Insert Into ProductosClasificacion(Id, IdConcepto,  Nombre, Activo, Validado, IdUsuario)
                Values(@Id, @IdConcepto, @Nombre, @Activo, @Validado, @IdUsuario)
            End
        COMMIT TRAN`;
                result = yield pool
                    .request()
                    .input("Nombre", Datos.Nombre)
                    .input("Activo", Datos.Activo)
                    .input("Validado", Datos.Validado)
                    .input("IdConcepto", Datos.IdConcepto)
                    .input("IdUsuario", Datos.IdUsuario)
                    .query(query);
                break;
            case "Import":
                query = `BEGIN TRAN
                  Insert Into ProductosClasificacion(Id,  IdConcepto,  Nombre, Activo,  Validado, IdUsuario)
                  Values(@Id, @IdConcepto, @Nombre, @Activo, @Validado, @IdUsuario)
              COMMIT TRAN`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Nombre", Datos.Nombre)
                    .input("Activo", Datos.Activo)
                    .input("Validado", Datos.Validado)
                    .input("IdConcepto", Datos.IdConcepto)
                    .input("IdUsuario", Datos.IdUsuario)
                    .query(query);
                break;
            case "Update":
                query = ` Update ProductosClasificacion
                  Set  Nombre = @Nombre,  IdConcepto = @IdConcepto, Activo = 1, Validado = @Validado
                  Where Id = @Id`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Nombre", Datos.Nombre)
                    .input("IdConcepto", Datos.IdConcepto)
                    .input("Validado", Datos.Validado)
                    .query(query);
                break;
            case "Borrar":
                query = ` Update ProductosClasificacion Set Activo = 0, Validado = @Validado Where Id = @Id`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Validado", Datos.Validado)
                    .query(query);
                break;
            case "Eliminar":
                query = ` Delete From ProductosClasificacion Where Id = @Id And Activo = 0`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .query(query);
                break;
        }
        yield pool.close();
        if (result === null) {
            throw new Error("Null");
        }
        return result.recordset;
    });
}
exports.ClasificacionManager = ClasificacionManager;
