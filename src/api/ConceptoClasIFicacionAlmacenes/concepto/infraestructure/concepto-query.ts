import { IResult } from "mssql";
import { getConnection } from "../../../../database/config";
import { Concepto } from "../interface/concepto.interface";

export async function ConceptoManager(action: string, Datos?: any) {
  const pool = await getConnection();
  if (!pool) {
    throw new Error("Failed to establish a database connection.");
  }

  let query = "";
  let result: IResult<any> | null = null;

  switch (action) {
    case "Select":
      query = `Select * From ProductosConceptos Where ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)`;

      result = await pool
        .request()
        .input("Activo", Datos!.Activo)
        .input("Validado", Datos!.Validado)
        .query(query);

      break;

    case "Insert":
      query = `Declare @Id bigint
        BEGIN TRAN
            Set @Id = (Select Count(Id) From ProductosConceptos Where Nombre = @Nombre)
            If @Id = 0 Begin
                Set @Id = IsNull((Select Max(Id)+1 From ProductosConceptos),(Select Top 1 IdServer From ServerID))
                Insert Into ProductosConceptos(Id, Nombre, Activo, Validado, IdUsuario)
                Values(@Id, @Nombre, @Activo, @Validado, @IdUsuario)
            End
        COMMIT TRAN`;
      result = await pool
        .request()
        .input("Nombre", Datos!.Nombre)
        .input("Activo", Datos!.Activo)
        .input("Validado", Datos!.Validado)
        .input("IdUsuario", Datos!.IdUsuario)
        .query(query);

    case "Import":
      query = `BEGIN TRAN
                    Insert Into ProductosConceptos(Id,  Nombre,  Activo, Validado, IdUsuario)
                    Values(@Id, @Nombre, @Activo, @Validado, @IdUsuario)
                COMMIT TRAN`;

      result = await pool
        .request()
        .input("Id", Datos.Id)
        .input("Nombre", Datos.Nombre)
        .input("Activo", Datos.Activo)
        .input("Validado", Datos.Validado)
        .input("IdUsuario", Datos.IdUsuario)
        .query(query);
      break;

    case "Update":
      query = ` Update ProductosConceptos
                    Set  Nombre = @Nombre, Activo = 1, Validado = @Validado
                    Where Id = @Id`;

      result = await pool
        .request()
        .input("Id", Datos.Id)
        .input("Nombre", Datos.Nombre)
        .input("Validado", Datos.Validado)
        .query(query);
      break;

    case "Borrar":
      query = ` Update ProductosConceptos Set Activo = 0, Validado = @Validado Where Id = @Id`;

      result = await pool
        .request()
        .input("Id", Datos.Id)
        .input("Validado", Datos.Validado)
        .query(query);
      break;

    case "Eliminar":
      query = ` Delete From ProductosConceptos Where Id = @Id And Activo = 0`;

      result = await pool.request().input("Id", Datos.Id).query(query);
      break;
  }
  await pool.close();

  if (result === null) {
    throw new Error("Null");
  }

  return result.recordset;
}
