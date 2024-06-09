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
exports.AlmacenesManager = void 0;
const config_1 = require("../../../../database/config");
function AlmacenesManager(action, Datos) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error("Failed to establish a database connection.");
        }
        let query = "";
        let result = null;
        switch (action) {
            case "Select":
                query = `Select *, IsNull((Select Id From EntidadAreas Where Id in (Select IdAreaEntidad From AlmacenAreasEntidad Where IdAlmacen = A.Id)),-1) as IdAreaEntidad 
                From Almacenes A
                Where IdEntidad = @IdEntidad And ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)`;
                result = yield pool
                    .request()
                    .input("Activo", Datos.Activo)
                    .input("IdEntidad", Datos.IdEntidad)
                    .input("IdAreaEntidad", Datos.IdAreaEntidad)
                    .input("Validado", Datos.Validado)
                    .query(query);
                break;
            case "SelectAll":
                query = `Select * From Almacenes`;
                result = yield pool.request().query(query);
                break;
            case "Insert":
                query = `Declare @Id bigint
                BEGIN TRAN
                    Set @Id = (Select Count(Id) From Almacenes Where Nombre = @Nombre)
                    If @Id = 0 Begin
                        Set @Id = IsNull((Select Max(Id)+1 From Almacenes),(Select Top 1 IdServer From ServerID))
                        Insert Into Almacenes(Id, Nombre, Activo, Validado, IdEntidad, IdUsuario)
                        Values(@Id, @Nombre, @Activo, @Validado, @IdEntidad, @IdUsuario)
                    End
                COMMIT TRAN`;
                result = yield pool
                    .request()
                    .input("Nombre", Datos.Nombre)
                    .input("Activo", Datos.Activo)
                    .input("Validado", Datos.Validado)
                    .input("IdEntidad", Datos.IdEntidad)
                    .input("IdUsuario", Datos.IdUsuario)
                    .query(query);
                break;
            case "Import":
                query = `BEGIN TRAN
                Insert Into Almacenes(Id,  Nombre,  Activo, Validado,  IdEntidad, IdUsuario)
                Values(@Id, @Nombre, @Activo, @Validado, @IdEntidad, @IdUsuario)
            COMMIT TRAN`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Nombre", Datos.Nombre)
                    .input("Activo", Datos.Activo)
                    .input("Validado", Datos.Validado)
                    .input("IdEntidad", Datos.IdEntidad)
                    .input("IdUsuario", Datos.IdUsuario)
                    .query(query);
                break;
            case "Update":
                query = `Update Almacenes
                Set  Nombre = @Nombre,  Activo = 1, IdEntidad = @IdEntidad, Validado = @Validado
                Where Id = @Id`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Nombre", Datos.Nombre)
                    .input("IdEntidad", Datos.IdEntidad)
                    .input("Validado", Datos.Validado)
                    .query(query);
                break;
            case "Borrar":
                query = `Update Almacenes Set Activo = 0, Validado = @Validado Where Id = @Id`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Validado", Datos.Validado)
                    .query(query);
                break;
            case "Eliminar":
                query = `Delete From Almacenes Where Id = @Id And Activo = 0`;
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
exports.AlmacenesManager = AlmacenesManager;
