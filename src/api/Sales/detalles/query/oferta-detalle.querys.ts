import { getConnection } from '../../../../database/config';
import { ComandaDetalles } from '../interface/comanda-detalle.interface';

export const ComandaDetallesQuerys = async (accion: string, datos?: ComandaDetalles): Promise<ComandaDetalles[]> => {
  
  const pool = await getConnection();
  if (!pool) {
    throw new Error('Failed to establish a database connection.');
  }

  let query: string;
  const result: ComandaDetalles[] = [];

  switch (accion) {

    case 'getAll':
      query = 'SELECT * FROM ComandaDetalles WHERE CAST(IdComanda AS VARCHAR(MAX)) = @IdComanda;';
      const res = await pool.request()
        .input('IdComanda', datos!.IdComanda)
        .query(query);

      res.recordset.forEach(record => {
        const dat: ComandaDetalles = {
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
      
      const resp = await pool.request()
        .input('IdComanda', datos!.IdComanda)
        .query(query);

      resp.recordset.forEach(record => {
        const dat: ComandaDetalles = {
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
      const resultSelect = await pool.request()
        .query(query);
      
      resultSelect.recordset.forEach(record => {
        const dat: ComandaDetalles = {
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
      await pool.request()
        .input('IdComanda', datos!.IdComanda)
        .input('IdOferta', datos!.IdOferta)
        .input('Cantidad', datos!.Cantidad)
        .input('Importe', datos!.Importe)
        .input('ImporteDescuento', datos!.ImporteDescuento)
        .input('IdUsuario', datos!.IdUsuario)
        .query(query);
      
      break;

    case 'Update':
      query = `
        UPDATE ComandaDetalles
        SET IdOferta = @IdOferta, Cantidad = @Cantidad, Importe = @Importe, ImporteDescuento = @ImporteDescuento
        WHERE Id = @Id
      `;
      
      await pool.request()  
        .input('Id', datos!.Id)
        .input('IdOferta', datos!.IdOferta)
        .input('Cantidad', datos!.Cantidad)
        .input('Importe', datos!.Importe)
        .input('ImporteDescuento', datos!.ImporteDescuento)
        .query(query);
      
      break;

    case 'Eliminar':
      query = 'DELETE FROM ComandaDetalles WHERE Id = @Id';

      await pool.request()
        .input('Id', datos!.Id)
        .query(query);

      break;

    default:
        throw new Error('Acción no soportada');
  }

  return result;
};
