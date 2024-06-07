import { Sale } from '../interface/sales.interface';
import { getConnection } from '../../../../database/config';

export async function SalesManager(action: string, data?: any) {
  
  const pool = await getConnection();
  if (!pool) {
    throw new Error('Failed to establish a database connection.');
  }


  let query: string;
  const result: Sale[] = [];

  switch (action) {
    case 'SelectAll':
      query = 'select c.*, d.Nombre as NombreDependiente from Comanda c, Dependientes d where d.Id = c.IdDependiente;';
      const resultSelect = await pool.request()
        .query(query);
      resultSelect.recordset.forEach(record => {
        const dat: Sale = {
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
      const byId = await pool.request()
        .input('Id', data!.Id)
        .query(query) as { recordset: Sale[] };
      if (byId.recordset[0]) {
        result.push(byId.recordset[0]);
      }
      break;

    case 'SelectNumero':
      query = 'SELECT ISNULL(MAX(Numero) + 1, (YEAR(@Fecha) - 2000) * 10000 + 1) AS Numero FROM Comanda WHERE YEAR(Fecha) = YEAR(@Fecha)';
      const bynum = await pool.request()
        .input('Id', data!.Fecha)
        .query(query) as { recordset: Sale[] };
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
        await pool.request()
          .input('Numero', data!.Numero)
          .input('IdAreaEntidad', data!.IdAreaEntidad)
          .input('Fecha', data!.Fecha)
          .input('Mesa', data!.Mesa)
          .input('Personas', data!.Personas)
          .input('IdDependiente', data!.IdDependiente)
          .input('Observaciones', data!.Observaciones)
          .input('Descuento', data!.Descuento)
          .input('Activo', 1)
          .input('Validado', 1)
          .input('Cerrado', 0)
          .input('IdUsuario', data!.IdUsuario)
          .query(query);
        break;

    case 'Update':
      query = `
        UPDATE Comanda
        SET IdAreaEntidad = @IdAreaEntidad, Fecha = @Fecha, Mesa = @Mesa, Personas = @Personas, IdDependiente = @IdDependiente,
            Observaciones = @Observaciones, Descuento = @Descuento
        WHERE Id = @Id;
      `;
      await pool.request()
        .input('Id', data!.Id)
        .input('Numero', data!.Numero)
        .input('IdAreaEntidad', data!.IdAreaEntidad)
        .input('Fecha', data!.Fecha)
        .input('Mesa', data!.Mesa)
        .input('Personas', data!.Personas)
        .input('IdDependiente', data!.IdDependiente)
        .input('Observaciones', data!.Observaciones)
        .input('Descuento', data!.Descuento)
        .query(query);
      break;

    case 'Borrar':
      query = 'UPDATE Comanda SET Activo = 0, Validado = @Validado WHERE Id = @Id';
      await pool.request()
        .input('Id', data!.Id)
        .input('Validado', data!.Validado)
        .query(query)
      break;

    case 'Eliminar':
      query = 'DELETE FROM Comanda WHERE Id = @Id AND Activo = 0';
      await pool.request()
        .input('Id', data!.Id)
        .query(query)
      break;

    case 'Carrar':
      query = 'UPDATE Comanda SET Cerrado = 1 WHERE Id = @Id';
      await pool.request()
        .input('Id', data!.Id)
        .query(query)
      break;

    default:
      throw new Error('Acción no válida');
  }

  await pool.close();

  if (result === null) {
    throw new Error('No action matched in GestionUsuarios.');
  }

  return result;
}

