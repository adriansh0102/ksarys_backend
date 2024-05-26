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
      
  }
  await pool.close();

  if (result === null) {
    throw new Error("No sse completo la.");
  }

  return result.recordset;
}
