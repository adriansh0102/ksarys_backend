
import { ConnectionPool } from 'mssql';
import { getConnection } from "../../../../database/config";


export async function AlmacenesManager(action: string, Datos?: any) {
  const pool: ConnectionPool = await getConnection();
  if (!pool) {
    throw new Error("Failed to establish a database connection.");
  }

  let query = "";
  let result: any = null;

  switch (action) {
    case "Select":
      query = `Select *, IsNull((Select Id From EntidadAreas Where Id in (Select IdAreaEntidad From AlmacenAreasEntidad Where IdAlmacen = A.Id)),-1) as IdAreaEntidad 
                From Almacenes A
                Where IdEntidad = @IdEntidad And ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)`;

      result = await pool
        .request()
        .input("Activo", Datos.Activo)
        .input("IdEntidad", Datos.IdEntidad)
        .input("IdAreaEntidad", Datos.IdAreaEntidad)
        .input("Validado", Datos.Validado)
        .query(query);

      break;

    case "SelectAll":
      query = `Select * From Almacenes`;

      result = await pool.request().query(query);
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

      result = await pool
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

      result = await pool
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

      result = await pool
        .request()
        .input("Id", Datos.Id)
        .input("Nombre", Datos.Nombre)
        .input("IdEntidad", Datos.IdEntidad)
        .input("Validado", Datos.Validado)
        .query(query);
      break;

    case "Borrar":
      query = `Update Almacenes Set Activo = 0, Validado = @Validado Where Id = @Id`;

      result = await pool
        .request()
        .input("Id", Datos.Id)
        .input("Validado", Datos.Validado)
        .query(query);
      break;

    case "Eliminar":
      query = `Delete From Almacenes Where Id = @Id And Activo = 0`;

      result = await pool
        .request()
        .input("Id", Datos.Id)
        .query(query);
      break;
  }

  await pool.close();

  if (result === null) {
    throw new Error("Null");
  }

  return result.recordset;
}