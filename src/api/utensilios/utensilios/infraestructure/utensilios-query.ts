import { IResult } from "mssql";

import { getConnection } from "../../../../database/config";
import { Utensilio } from "../interface/utensilios.interface";

export async function Utensilios(action: string, Datos?: Utensilio) {
  const pool = await getConnection();
  if (!pool) {
    throw new Error("Failed to establish a database connection.");
  }

  let query = "";
  let result: IResult<any> | null = null;

  switch (action) {
    case "Select":
      query =
        "Select * From Utensilios Where ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)";

      result = await pool
        .request()
        .input("Activo", Datos!.Activo)
        .input("Validado", Datos!.Validado)
        .query(query);

      break;

    case 'SelectId':
      query =`Select Top 1 * From Utensilios Where Id = @Id`
      result = await pool
        .request()
        .input("Id", Datos!.Id)
        .query(query);
    break;

    case "Insert":
      query = `Declare @Id bigint
                  BEGIN TRAN
                      Set @Id = (Select Count(Id) From Utensilios Where Nombre = @Nombre)
                      If @Id = 0 Begin
                      Set @Id = IsNull((Select Max(Id)+1 From Utensilios),(Select Top 1 IdServer From ServerID))
                          Insert Into Utensilios(Id, IdEntidad, IdTipo, Nombre, Precio, Cantidad, Activo, Validado, IdUsuario)
                        Values(@Id, @IdEntidad, @IdTipo, @Nombre, @Precio, @Cantidad, @Activo, @Validado, @IdUsuario)
                      End
                  COMMIT TRAN`;

      result = await pool
        .request()
        .input("IdEntidad", Datos!.IdEntidad)
        .input("IdTipo", Datos!.IdTipo)
        .input("Nombre", Datos!.Nombre)
        .input("Precio", Datos!.Precio)
        .input("Cantidad", Datos!.Cantidad)
        .input("Activo", Datos!.Activo)
        .input("Validado", Datos!.Validado)
        .input("IdUsuario", Datos!.IdUsuario)
        .query(query);
      break;

    case "Update":
      query = `Update Utensilios
      Set Nombre = @Nombre, IdTipo = @IdTipo, Precio = @Precio, Cantidad = @Cantidad,  Activo = 1, Validado = @Validado
    Where Id = @Id`;
      result = await pool
        .request()
        .input("Id", Datos!.Id)
        .input("Nombre", Datos!.Nombre)
        .input("IdTipo", Datos!.IdTipo)
        .input("Precio", Datos!.Precio)
        .input("Cantidad", Datos!.Cantidad)
        .input("Validado", Datos!.Validado)
        .query(query);
      break;

    case "Borrar":
      query = `Update Utensilios Set Activo = 0, Validado = @Validado Where Id = @Id`;
      result = await pool
      .request()
      .input("Id", Datos!.Id)
      .input("Validado", Datos!.Validado)
      .query(query);
      break;
  }
  await pool.close();

  if (result === null) {
    throw new Error("Null");
  }

  return result.recordset;
}
