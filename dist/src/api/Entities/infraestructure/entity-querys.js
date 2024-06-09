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
exports.EntitiesManager = void 0;
const mssql_1 = require("mssql");
const config_1 = require("../../../database/config");
function EntitiesManager(Accion, Datos) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error('Failed to establish a database connection.');
        }
        const lst = [];
        let query;
        let result = null;
        switch (Accion) {
            case 'SelectAreaEntidad':
                query = `Select * from EntidadAreas where CAST(IdEntidad AS VARCHAR(MAX)) = @Id and activo = 1`;
                result = yield pool.request()
                    .input('Id', Datos.Id)
                    .query(query);
                break;
            case "Select":
                query = `select e.*, dpa.Nombre as Municipio from Entidad e, Dpa dpa where dpa.Id = e.IdDpa;`;
                const resultSelect = yield pool.request()
                    .query(query);
                resultSelect.recordset.forEach(record => {
                    const dat = {
                        Id: record.Id,
                        Codigo: record.Codigo.trim(),
                        Nombre: record.Nombre.trim(),
                        IdDpa: record.IdDpa,
                        Municipio: record.Municipio.trim(),
                        Direccion: record.Direccion.trim(),
                        Director: record.Director.trim(),
                        Actividad: record.Actividad.trim(),
                        Cuenta: record.Cuenta.trim(),
                        NIT: record.NIT.trim(),
                        Activo: record.Activo,
                        Validado: record.Validado,
                        IdUsuario: record.IdUsuario
                    };
                    lst.push(dat);
                });
                break;
            case 'SelectByName':
                query = `SELECT Nombre FROM Entidad WHERE Nombre = @Nombre;`;
                const exist = yield pool.request()
                    .input('Nombre', (0, mssql_1.VarChar)(200), Datos.Nombre)
                    .query(query);
                if (exist.recordset[0]) {
                    lst.push({
                        Nombre: exist.recordset[0].Nombre.trim(),
                    });
                }
                break;
            case 'SelectById':
                query = `SELECT Nombre FROM Entidad WHERE CAST(Id AS VARCHAR(MAX)) = @Id;`;
                const byId = yield pool.request()
                    .input('Id', (0, mssql_1.VarChar)(200), Datos.Id)
                    .query(query);
                if (byId.recordset[0]) {
                    lst.push(byId.recordset[0]);
                }
                break;
            case "Insert":
                query = `Declare @Id bigint
          BEGIN TRAN
            Set @Id = (Select Count(Id) From Entidad Where Nombre = @Nombre);
            Set @IdDpa = (Select Id From Dpa dpa Where dpa.Nombre = @Municipio and Id > 100);
            If @Id = 0 Begin
            Set @Id = IsNull((Select Max(Id)+1 From Entidad),(Select Top 1 IdServer From ServerID))
              Insert Into Entidad(Id, IdDpa, Codigo, Nombre, Direccion, Cuenta,  NIT, Actividad, Activo, Validado, IdUsuario, Director)
              Values(@Id, @IdDpa, @Codigo, @Nombre, @Direccion, @Cuenta,  @NIT, @Actividad, @Activo, @Validado, @Id, @Director)
            End
          COMMIT TRAN;`;
                yield pool.request()
                    .input('IdDpa', mssql_1.Int, Datos.IdDpa)
                    .input('Codigo', (0, mssql_1.VarChar)(10), Datos.Codigo)
                    .input('Nombre', (0, mssql_1.VarChar)(200), Datos.Nombre)
                    .input('Direccion', (0, mssql_1.VarChar)(200), Datos.Direccion)
                    .input('Municipio', (0, mssql_1.VarChar)(200), Datos.Municipio)
                    .input('Actividad', (0, mssql_1.VarChar)(100), Datos.Actividad)
                    .input('Director', (0, mssql_1.VarChar)(100), Datos.Director)
                    .input('Cuenta', (0, mssql_1.VarChar)(50), Datos.Cuenta)
                    .input('NIT', (0, mssql_1.VarChar)(20), Datos.NIT)
                    .input('Activo', mssql_1.Bit, 1)
                    .input('Validado', mssql_1.Bit, 1)
                    .input('IdUsuario', mssql_1.Int, Datos.IdUsuario)
                    .query(query);
                break;
            case "Update":
                query = `UPDATE Entidad
                SET Codigo = @Codigo, Nombre = @Nombre,
                IdDpa = @IdDpa, Direccion = @Direccion,
                Cuenta = @Cuenta, NIT = @NIT, Actividad = @Actividad,
                Activo = 1, Validado = @Validado, Director = @Director
                WHERE CAST(Id AS VARCHAR(MAX)) = @Id`;
                yield pool.request()
                    .input('Id', mssql_1.VarChar, Datos.Id)
                    .input('Codigo', (0, mssql_1.VarChar)(10), Datos.Codigo)
                    .input('Nombre', (0, mssql_1.VarChar)(200), Datos.Nombre)
                    .input('IdDpa', mssql_1.Int, Datos.IdDpa)
                    .input('Direccion', (0, mssql_1.VarChar)(200), Datos.Direccion)
                    .input('Director', (0, mssql_1.VarChar)(100), Datos.Director)
                    .input('Actividad', (0, mssql_1.VarChar)(100), Datos.Actividad)
                    .input('Cuenta', (0, mssql_1.VarChar)(50), Datos.Cuenta)
                    .input('NIT', (0, mssql_1.VarChar)(50), Datos.NIT)
                    .input('Activo', mssql_1.Bit, 1)
                    .input('Validado', mssql_1.Bit, 1)
                    .query(query);
                break;
            case "Erease":
                query = `UPDATE Entidad SET Activo = 0, Validado = @Validado WHERE CAST(Id AS VARCHAR(MAX)) = @Id`;
                yield pool.request()
                    .input('Id', mssql_1.Int, Datos.Id)
                    .input('Validado', mssql_1.Bit, Datos.Validado)
                    .query(query);
                break;
            case "Delete":
                query = `DELETE FROM Entidad WHERE CAST(Id AS VARCHAR(MAX)) = @Id;`;
                yield pool.request()
                    .input('Id', mssql_1.VarChar, Datos.Id)
                    .query(query);
                break;
            default:
                throw new Error("Invalid action");
        }
        yield pool.close();
        if (Accion == 'SelectAreaEntidad') {
            return result.recordset;
        }
        return lst;
    });
}
exports.EntitiesManager = EntitiesManager;
