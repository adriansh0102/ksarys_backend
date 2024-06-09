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
exports.CuentasContables = void 0;
const config_1 = require("../../../../database/config");
function CuentasContables(Accion, Datos) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error("Failed to establish a database connection.");
        }
        let query = "";
        let result = null;
        switch (Accion) {
            case "Select":
                query = `Select * From CuentasContables Where (Activo = @Activo Or @Activo = 0)`;
                result = yield pool
                    .request()
                    .input("Activo", Datos.Activo)
                    .query(query);
                break;
            case "SelectCuentas":
                query = `Select Id, RTrim(Cuenta)  + '.' + RTrim(SubCuenta) as Cuenta, RTrim(Cuenta) + '.' + RTrim(SubCuenta) + '.' + RTrim(Nombre) as Nombre, 
                Activo From CuentasContables Where (Activo = @Activo Or @Activo = 0) Order by Cuenta`;
                result = yield pool
                    .request()
                    .input("Activo", Datos.Activo)
                    .query(query);
                break;
            case "SelectSoloCuentas":
                query = `Select Distinct RTrim(Cuenta) as Cuenta From CuentasContables Where (Activo = @Activo Or @Activo = 0) Order by Cuenta`;
                result = yield pool
                    .request()
                    .input("Activo", Datos.Activo)
                    .query(query);
                break;
            case "SelectOne":
                query = `Select * From CuentasContables Where Cuenta = @Cuenta`;
                result = yield pool
                    .request()
                    .input("Cuenta", Datos.Cuenta)
                    .query(query);
                break;
            case "SelectId":
                query = `Select * From CuentasContables Where Id = @Id`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .query(query);
                break;
            case "Insert":
                query = `BEGIN TRAN
                    Declare @Id bigint
                    Set @Id = (Select Count(Id) From CuentasContables Where Cuenta = @Cuenta And SubCuenta = @SubCuenta)
                    If @Id = 0 Begin
                        Set @Id = IsNull((Select Max(Id)+1 From CuentasContables),(Select Top 1 IdServer From ServerID))
                        Insert Into CuentasContables(Id, Cuenta,  SubCuenta, Nombre, IdTipo, Activo, IdUsuario)
                        Values(@Id, @Cuenta, @SubCuenta, @Nombre, @IdTipo, @Activo, @IdUsuario)
                    End
                COMMIT TRAN`;
                result = yield pool
                    .request()
                    .input("Cuenta", Datos.Cuenta)
                    .input("Nombre", Datos.Nombre)
                    .input("SubCuenta", Datos.SubCuenta)
                    .input("IdTipo", Datos.IdTipo)
                    .input("Activo", Datos.Activo)
                    .input("IdUsuario", Datos.IdUsuario)
                    .query(query);
                break;
            case "Import":
                query = `BEGIN TRAN
                    Insert Into CuentasContables(Id, Cuenta,  SubCuenta, Nombre, IdTipo, Activo, IdUsuario)
                    Values(@Id, @Cuenta, @SubCuenta, @Nombre, @IdTipo, @Activo, @IdUsuario)
                COMMIT TRAN`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Cuenta", Datos.Cuenta)
                    .input("Nombre", Datos.Nombre)
                    .input("SubCuenta", Datos.SubCuenta)
                    .input("IdTipo", Datos.IdTipo)
                    .input("Activo", Datos.Activo)
                    .input("IdUsuario", Datos.IdUsuario)
                    .query(query);
                break;
            case "Borrar":
                query = `Update CuentasContables Set Activo = 0 Where Id = @Id`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .query(query);
                break;
            case "Eliminar":
                query = `Delete From CuentasContables Where Id = @Id`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .query(query);
                break;
            case "Update":
                query = `Update CuentasContables
                    Set Cuenta = @Cuenta, Nombre = @Nombre, IdTipo = @IdTipo, SubCuenta = @SubCuenta, Activo = 1
                    Where Id = @Id`;
                result = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Cuenta", Datos.Cuenta)
                    .input("Nombre", Datos.Nombre)
                    .input("SubCuenta", Datos.SubCuenta)
                    .input("IdTipo", Datos.IdTipo)
                    .query(query);
                break;
        }
        yield pool.close();
        return result.recordset;
    });
}
exports.CuentasContables = CuentasContables;
