import { IResult } from "mssql";

import { getConnection } from "../../../../database/config";
import { Utensilio } from "../../utensilios/interface/utensilios.interface";
import { UtensiliosTipos } from "../interfaces/utensiliosTipos.interface";

// export async function UtensiliosTipos(action: string, Datos?: UtensiliosTipos) {
//   const pool = await getConnection();
//   if (!pool) {
//     throw new Error("Failed to establish a database connection.");
//   }

//   let query = "";
//   let result: IResult<any> | null = null;

//   switch (action) {
//     case "Select":
//       query = `Select * From UtensiliosTipos Where (Activo = @Activo)`;
//       result = await pool.request()
//       .input("Activo", true)
//       .query(query);
//       break;

//     case 'Insert':
//       query = `Declare @Id bigint
//                   BEGIN TRAN
//                       Set @Id = (Select Count(Id) From UtensiliosTipos Where Nombre = @Nombre)
//                       If @Id = 0 Begin
//                       Set @Id = IsNull((Select Max(Id)+1 From UtensiliosTipos),(Select Top 1 IdServer From ServerID))
//                           Insert Into UtensiliosTipos(Id, Nombre, Activo, IdUsuario)
//                         Values(@Id, @Nombre, @Activo, @IdUsuario)
//                       End
//                   COMMIT TRAN`;
//       result = await pool
//       .request()
//       .input('Nombre' , Datos!.Nombre)
//       .input('Activo' , Datos!.Activo)
//       .input('IdUsuario' , Datos!.IdUsuario)
//       .query(query)
//       break;

//     case 'Update':
//       query = `Update UtensiliosTipos Set  Nombre = @Nombre, Activo = 1 Where Id = @Id`
//       result = await pool
//       .request()
//       .input('Id' , Datos!.Id)
//       .input('Nombre' , Datos!.Nombre)
//       .query(query)
//       break;

//     case 'Borrar':
//       query = `Update UtensiliosTipos Set Activo = 0 Where Id = @Id`
//       result = await pool
//       .request()
//       .input('Id' , Datos!.Id)
//       .query(query)
//       break;
//   }
//   await pool.close();

//   if (result === null) {
//     throw new Error("No sse completo la request");
//   }

//   return result.recordset;
// }


export async function UtensiliosTipos(action: string, Datos?: UtensiliosTipos) {
  const pool = await getConnection();
  if (!pool) {
    throw new Error("Failed to establish a database connection.");
  }

  let lst: UtensiliosTipos[] = [];
  let query = "";

  switch (action) {
    case "Select":
      query = `Select * From UtensiliosTipos Where (Activo = @Activo or @Activo = 0)`;
      const resultSelect = await pool.request().input("Activo", 1).query(query);
      resultSelect.recordset.forEach((record: any) => {
        const dat: UtensiliosTipos = {
          Id: record.ID,
          Nombre: record.Nombre ? record.Nombre.toString().trim() : "",
          Activo: record.Activo ? record.Activo : false
        };
        lst.push(dat);
      });
      break;

    case "Insert":
      query = ` Declare @Id bigint
                BEGIN TRAN
                    Set @Id = (Select Count(Id) From UtensiliosTipos Where Nombre = @Nombre)
                    If @Id = 0 Begin
                        Set @Id = IsNull((Select Max(Id)+1 From UtensiliosTipos),(Select Top 1 IdServer From ServerID))
                        Insert Into UtensiliosTipos(Id, Nombre, Activo, IdUsuario)
                        Values(@Id, @Nombre, @Activo, @IdUsuario)
                    End
                COMMIT TRAN`;
      const resultInsert = await pool
        .request()
        .input("Nombre", Datos!.Nombre)
        .input("Activo", Datos!.Activo)
        .input("IdUsuario", Datos!.IdUsuario)
        .query(query);
      break;

    case "Import":
      query = ` BEGIN TRAN
                Insert Into UtensiliosTipos(Id,  Nombre,  Activo, IdUsuario)
                                                Values(@Id, @Nombre, @Activo, @IdUsuario)
              COMMIT TRAN`;
      const resultImport = await pool
        .request()
        .input("Id", Datos!.Id)
        .input("Nombre", Datos!.Nombre)
        .input("Activo", Datos!.Activo)
        .input("IdUsuario", Datos!.IdUsuario)
        .query(query);
      break;

    case "Update":
      query = ` Update UtensiliosTipos
                Set  Nombre = @Nombre,  Activo = 1
                Where Id = @Id`;
      const resultUpdate = await pool
        .request()
        .input("Id", Datos!.Id)
        .input("Nombre", Datos!.Nombre)
        .query(query);
      break;

    case "Borrar":
      query = ` Update UtensiliosTipos Set Activo = 0 Where Id = @Id`;
      const resultDelete = await pool
        .request()
        .input("Id", Datos!.Id)
        .query(query);
      break;

    case "Eliminar":
      query = ` Delete From UtensiliosTipos Where Id = @Id And Activo = 0`;
      const resultEliminate = await pool
        .request()
        .input("Id", Datos!.Id)
        .query(query);
      break;
  }

  await pool.close();

  return lst;
}
