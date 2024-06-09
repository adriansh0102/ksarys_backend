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
exports.ComandaDetallesQuerys = void 0;
const config_1 = require("../../../../database/config");
const ComandaDetallesQuerys = (accion, datos) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, config_1.getConnection)();
    if (!pool) {
        throw new Error('Failed to establish a database connection.');
    }
    let query;
    const result = [];
    switch (accion) {
        case 'getAll':
            query = 'SELECT * FROM ComandaDetalles WHERE CAST(IdComanda AS VARCHAR(MAX)) = @IdComanda;';
            const res = yield pool.request()
                .input('IdComanda', datos.IdComanda)
                .query(query);
            res.recordset.forEach(record => {
                const dat = {
                    Id: record.Id,
                    IdComanda: record.IdComanda,
                    IdOferta: record.IdOferta,
                    Cantidad: record.Cantidad,
                    Importe: record.Importe,
                    ImporteDescuento: record.ImporteDescuento,
                    IdUsuario: record.IdUsuario
                };
                result.push(dat);
            });
            break;
        case 'getComandaDetalleByComanda':
            query = `select cd.*, o.Nombre, op.Precio
        from ComandaDetalles cd, Ofertas o, OfertasPrecios op
        where cd.IdComanda = @IdComanda and o.Id = cd.IdOferta and op.IdOferta = cd.IdOferta;`;
            const resp = yield pool.request()
                .input('IdComanda', datos.IdComanda)
                .query(query);
            resp.recordset.forEach(record => {
                const dat = {
                    Id: record.Id,
                    IdComanda: record.IdComanda,
                    IdOferta: record.IdOferta,
                    Cantidad: record.Cantidad,
                    Importe: record.Importe,
                    ImporteDescuento: record.ImporteDescuento,
                    IdUsuario: record.IdUsuario,
                    Nombre: record.Nombre,
                    Precio: record.Precio
                };
                result.push(dat);
            });
            break;
        case 'Select':
            query = `
        SELECT Cdet.*, dbo.GetPrecioOferta(IdOferta, Cda.Fecha) AS Precio
        FROM ComandaDetalles Cdet
        INNER JOIN Comanda Cda ON Cdet.IdComanda = Cda.Id
        WHERE IdComanda = @IdComanda OR @IdComanda = 0
      `;
            const resultSelect = yield pool.request()
                .query(query);
            resultSelect.recordset.forEach(record => {
                const dat = {
                    Id: record.Id,
                    IdComanda: record.IdComanda,
                    IdOferta: record.IdOferta,
                    Cantidad: record.Cantidad,
                    Importe: record.Importe,
                    ImporteDescuento: record.ImporteDescuento,
                    IdUsuario: record.IdUsuario
                };
                result.push(dat);
            });
            break;
        case 'Insert':
            query = `
        DECLARE @Id BIGINT;
        BEGIN TRAN
            SET @Id = (SELECT COUNT(Id) FROM ComandaDetalles WHERE IdComanda = @IdComanda AND IdOferta = @IdOferta);
            IF @Id = 0 BEGIN
                SET @Id = ISNULL((SELECT MAX(Id) + 1 FROM ComandaDetalles), (SELECT TOP 1 IdServer FROM ServerID));
                INSERT INTO ComandaDetalles(Id, IdComanda, IdOferta, Cantidad, Importe, ImporteDescuento, IdUsuario)
                VALUES(@Id, @IdComanda, @IdOferta, @Cantidad, @Importe, @ImporteDescuento, @IdUsuario);
            END
        COMMIT TRAN
      `;
            yield pool.request()
                .input('IdComanda', datos.IdComanda)
                .input('IdOferta', datos.IdOferta)
                .input('Cantidad', datos.Cantidad)
                .input('Importe', datos.Importe)
                .input('ImporteDescuento', datos.ImporteDescuento)
                .input('IdUsuario', datos.IdUsuario)
                .query(query);
            break;
        case 'Update':
            query = `
        UPDATE ComandaDetalles
        SET IdOferta = @IdOferta, Cantidad = @Cantidad, Importe = @Importe, ImporteDescuento = @ImporteDescuento
        WHERE Id = @Id
      `;
            yield pool.request()
                .input('Id', datos.Id)
                .input('IdOferta', datos.IdOferta)
                .input('Cantidad', datos.Cantidad)
                .input('Importe', datos.Importe)
                .input('ImporteDescuento', datos.ImporteDescuento)
                .query(query);
            break;
        case 'Eliminar':
            query = 'DELETE FROM ComandaDetalles WHERE Id = @Id';
            yield pool.request()
                .input('Id', datos.Id)
                .query(query);
            break;
        default:
            throw new Error('Acción no soportada');
    }
    return result;
});
exports.ComandaDetallesQuerys = ComandaDetallesQuerys;
