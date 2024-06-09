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
exports.SalesManager = void 0;
const config_1 = require("../../../../database/config");
function SalesManager(action, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error('Failed to establish a database connection.');
        }
        let query;
        const result = [];
        switch (action) {
            case 'SelectAll':
                query = 'select c.*, d.Nombre as NombreDependiente from Comanda c, Dependientes d where d.Id = c.IdDependiente;';
                const resultSelect = yield pool.request()
                    .query(query);
                resultSelect.recordset.forEach(record => {
                    const dat = {
                        Id: record.Id,
                        Numero: record.Numero,
                        IdAreaEntidad: record.IdAreaEntidad,
                        Fecha: record.Fecha,
                        Mesa: record.Mesa,
                        Personas: record.Personas,
                        IdDependiente: record.IdDependiente,
                        NombreDependiente: record.NombreDependiente,
                        Observaciones: record.Observaciones.trim(),
                        Descuento: record.Descuento,
                        Activo: record.Activo,
                        Validado: record.Validado,
                        Cerrado: record.Cerrado,
                        IdUsuario: record.IdUsuario
                    };
                    result.push(dat);
                });
                break;
            case 'SelectById':
                query = 'SELECT * FROM Comanda WHERE id = @Id';
                const byId = yield pool.request()
                    .input('Id', data.Id)
                    .query(query);
                if (byId.recordset[0]) {
                    result.push(byId.recordset[0]);
                }
                break;
            case 'SelectNumero':
                query = 'SELECT ISNULL(MAX(Numero) + 1, (YEAR(@Fecha) - 2000) * 10000 + 1) AS Numero FROM Comanda WHERE YEAR(Fecha) = YEAR(@Fecha)';
                const bynum = yield pool.request()
                    .input('Id', data.Fecha)
                    .query(query);
                if (bynum.recordset[0]) {
                    result.push(bynum.recordset[0]);
                }
                break;
            case 'Insert':
                query = `
          DECLARE @Id bigint;
          BEGIN TRAN
            SET @Id = (SELECT COUNT(Id) FROM Comanda WHERE Numero = @Numero);
            IF @Id = 0 BEGIN
              SET @Id = ISNULL((SELECT MAX(Id) + 1 FROM Comanda), (SELECT TOP 1 IdServer FROM ServerID));
              INSERT INTO Comanda(Id, Numero, IdAreaEntidad, Fecha, Mesa, Personas, IdDependiente, Observaciones, Descuento, Activo, Validado, Cerrado, IdUsuario)
              VALUES(@Id, @Numero, @IdAreaEntidad, @Fecha, @Mesa, @Personas, @IdDependiente, @Observaciones, @Descuento, @Activo, @Validado, @Cerrado, @IdUsuario);
            END
          COMMIT TRAN;
        `;
                yield pool.request()
                    .input('Numero', data.Numero)
                    .input('IdAreaEntidad', data.IdAreaEntidad)
                    .input('Fecha', data.Fecha)
                    .input('Mesa', data.Mesa)
                    .input('Personas', data.Personas)
                    .input('IdDependiente', data.IdDependiente)
                    .input('Observaciones', data.Observaciones)
                    .input('Descuento', data.Descuento)
                    .input('Activo', 1)
                    .input('Validado', 1)
                    .input('Cerrado', 0)
                    .input('IdUsuario', data.IdUsuario)
                    .query(query);
                break;
            case 'Update':
                query = `
        UPDATE Comanda
        SET IdAreaEntidad = @IdAreaEntidad, Fecha = @Fecha, Mesa = @Mesa, Personas = @Personas, IdDependiente = @IdDependiente,
            Observaciones = @Observaciones, Descuento = @Descuento
        WHERE Id = @Id;
      `;
                yield pool.request()
                    .input('Id', data.Id)
                    .input('Numero', data.Numero)
                    .input('IdAreaEntidad', data.IdAreaEntidad)
                    .input('Fecha', data.Fecha)
                    .input('Mesa', data.Mesa)
                    .input('Personas', data.Personas)
                    .input('IdDependiente', data.IdDependiente)
                    .input('Observaciones', data.Observaciones)
                    .input('Descuento', data.Descuento)
                    .query(query);
                break;
            case 'Borrar':
                query = 'UPDATE Comanda SET Activo = 0, Validado = @Validado WHERE Id = @Id';
                yield pool.request()
                    .input('Id', data.Id)
                    .input('Validado', data.Validado)
                    .query(query);
                break;
            case 'Eliminar':
                query = 'DELETE FROM Comanda WHERE Id = @Id;';
                yield pool.request()
                    .input('Id', data.Id)
                    .query(query);
                break;
            case 'Carrar':
                query = 'UPDATE Comanda SET Cerrado = 1 WHERE Id = @Id';
                yield pool.request()
                    .input('Id', data.Id)
                    .query(query);
                break;
            default:
                throw new Error('Acción no válida');
        }
        yield pool.close();
        if (result === null) {
            throw new Error('No action matched in GestionUsuarios.');
        }
        return result;
    });
}
exports.SalesManager = SalesManager;
