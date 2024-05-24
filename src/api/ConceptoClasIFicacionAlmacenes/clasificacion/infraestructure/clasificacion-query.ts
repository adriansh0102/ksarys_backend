import { IResult } from "mssql";
import { Clasificacion } from "../interface/clasificacion.interface";
import { getConnection } from "../../../../database/config";

export async function ClasificacionManager(action: string, Datos?: any) {
  const pool = await getConnection();
  if (!pool) {
    throw new Error("Failed to establish a database connection.");
  }

  let query = "";
  let result: IResult<any> | null = null;

  switch (action) {
    case "Select":
      query = `Select * From ProductosClasificacion Where ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)`;

      result = await pool
        .request()
        .input("Activo", Datos.Activo)
        .input("Validado", Datos.Validado)
        .query(query);

      break;
    case "Insert":
      query = `Declare @Id bigint
        BEGIN TRAN
            Set @Id = (Select Count(Id) From ProductosClasificacion Where Nombre = @Nombre)
            If @Id = 0 Begin
                Set @Id = IsNull((Select Max(Id)+1 From ProductosClasificacion),(Select Top 1 IdServer From ServerID))
                Insert Into ProductosClasificacion(Id, IdConcepto,  Nombre, Activo, Validado, IdUsuario)
                Values(@Id, @IdConcepto, @Nombre, @Activo, @Validado, @IdUsuario)
            End
        COMMIT TRAN`;
        result = await pool
        .request()
        .input("Nombre", Datos!.Nombre)
        .input("Activo", Datos!.Activo)
        .input("Validado", Datos!.Validado)
        .input("IdConcepto" , Datos!.IdConcepto)
        .input("IdUsuario", Datos!.IdUsuario)
        .query(query);
        break;
    case "Import":
        query = `BEGIN TRAN
                  Insert Into ProductosClasificacion(Id,  IdConcepto,  Nombre, Activo,  Validado, IdUsuario)
                  Values(@Id, @IdConcepto, @Nombre, @Activo, @Validado, @IdUsuario)
              COMMIT TRAN`;
  
        result = await pool
          .request()
          .input("Id", Datos.Id)
          .input("Nombre", Datos.Nombre)
          .input("Activo", Datos.Activo)
          .input("Validado", Datos.Validado)
          .input("IdConcepto", Datos.IdConcepto)
          .input("IdUsuario", Datos.IdUsuario)
          .query(query);
        break;
  
    case "Update":
        query = ` Update ProductosClasificacion
                  Set  Nombre = @Nombre,  IdConcepto = @IdConcepto, Activo = 1, Validado = @Validado
                  Where Id = @Id`;
  
        result = await pool
          .request()
          .input("Id", Datos.Id)
          .input("Nombre", Datos.Nombre)
          .input("IdConcepto", Datos.IdConcepto)
          .input("Validado", Datos.Validado)
          .query(query);
        break;
  
    case "Borrar":
        query = ` Update ProductosClasificacion Set Activo = 0, Validado = @Validado Where Id = @Id`;
  
        result = await pool
          .request()
          .input("Id", Datos.Id)
          .input("Validado", Datos.Validado)
          .query(query);
        break;
  
    case "Eliminar":
        query = ` Delete From ProductosClasificacion Where Id = @Id And Activo = 0`;
  
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
