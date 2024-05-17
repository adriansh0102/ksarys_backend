import { IResult } from "mssql";

import { getConnection } from "../../../../database/config";
import { Utensilio } from "../../utensilios/interface/utensilios.interface";
import { UtensiliosTipos } from "../interfaces/utensiliosTipos.interface";

export async function UtensiliosTipos(action: string, Datos?: UtensiliosTipos) {
  const pool = await getConnection();
  if (!pool) {
    throw new Error("Failed to establish a database connection.");
  }

  let query = "";
  let result: IResult<any> | null = null;

  switch (action) {
    case "Select":
      query = `Select * From UtensiliosTipos Where (Activo = @Activo)`;
      result = await pool.request()
      .input("Activo", true)
      .query(query);
      break;

    case 'Insert':
      query = `Declare @Id bigint
                  BEGIN TRAN
                      Set @Id = (Select Count(Id) From UtensiliosTipos Where Nombre = @Nombre)
                      If @Id = 0 Begin
                      Set @Id = IsNull((Select Max(Id)+1 From UtensiliosTipos),(Select Top 1 IdServer From ServerID))
                          Insert Into UtensiliosTipos(Id, Nombre, Activo, IdUsuario)
                        Values(@Id, @Nombre, @Activo, @IdUsuario)
                      End
                  COMMIT TRAN`;
      result = await pool
      .request()
      .input('Nombre' , Datos!.Nombre)
      .input('Activo' , Datos!.Activo)
      .input('IdUsuario' , Datos!.IdUsuario)
      .query(query)
      
  }
  await pool.close();

  if (result === null) {
    throw new Error("No sse completo la.");
  }

  return result.recordset;
}
