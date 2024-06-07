

import { ConnectionPool } from "mssql";
import { getConnection } from "../../../database/config";


export async function Ofertas(Accion: string, Datos?: any) {
    const pool: ConnectionPool = await getConnection();
    if (!pool) {
        throw new Error("Failed to establish a database connection.");
    }

    let query = "";
    let result: any = null;

    switch (Accion) {
    case 'select':
        query = `Select Distinct Ofe.Id, Nombre, IsNull((Select Top 1 Precio From OfertasPrecios Where IdOferta = Ofe.Id), 0) as Precio,
        IsNull((Select Top 1 Fecha From OfertasPrecios Where IdOferta = Ofe.Id), GetDate()) as FechaPrecio,
        IdClasificacion, Activo, Validado, IdConcepto, IdAreaEntidad
        From Ofertas Ofe
        Inner Join OfertasComposicion COfe on Ofe.Id = COfe.IdOferta
        Where ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)`;
        result = await pool
        .request()
        .input("Activo", Datos.Activo)
        .input("Validado", Datos.Validado)
        .query(query);
    break;
  
    case "SelectAll":
        query = `Select Id, Nombre
             From Ofertas
             Where ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)`;
        result = await pool
            .request()
            .input("Activo", 1)
            .input("Validado", 1)
            .query(query);

    break;
  
    case "SelectOne":
        query = `Select Id, Nombre, IsNull((Select Max(Precio) From OfertasPrecios Where IdOferta = Ofe.Id), 0) as Precio,
                    IsNull((Select Max(Fecha) From OfertasPrecios Where IdOferta = Ofe.Id), GetDate()) as FechaPrecio,
                    IdClasificacion, Activo, Validado, IdAreaEntidad, IdConcepto
             From Ofertas Ofe
             Where Nombre = @Nombre And IdAreaEntidad = @IdAreaEntidad`;
        result = await pool
            .request()
            .input("Nombre", Datos.Nombre)
            .input("IdAreaEntidad", Datos.IdAreaEntidad)
            .query(query);
    break;
  
    case "Insert":
            query = `BEGIN TRAN
                  Declare @Id bigint
                  Set @Id = IsNull((Select Count(Id) From Ofertas Where Nombre = @Nombre And IdAreaEntidad = @IdAreaEntidad), 0)
                  If @Id = 0 Begin
                    Set @Id = IsNull((Select Max(Id)+1 From Ofertas), (Select Top 1 IdServer From ServerID))
                    Insert Into Ofertas(Id, Nombre, IdClasificacion, IdAreaEntidad, Activo, Validado, IdConcepto, IdUsuario)
                    Values(@Id, @Nombre, @IdClasificacion, @IdAreaEntidad, @Activo, @Validado, @IdConcepto, @IdUsuario)
                  End
                COMMIT TRAN`;
            result = await pool
                .request()
                .input("IdClasificacion", Datos.IdClasificacion)
                .input("IdAreaEntidad", Datos.IdAreaEntidad)
                .input("IdConcepto", Datos.IdConcepto)
                .input("Nombre", Datos.Nombre)
                .input("Activo", Datos.Activo)
                .input("Validado", Datos.Validado)
                .input("IdUsuario", Datos.IdUsuario)
                .query(query);
            break;
    break;

    case "Import":
        query = `BEGIN TRAN
              Insert Into Ofertas(Id, Nombre, IdClasificacion, IdAreaEntidad, Activo, Validado, IdConcepto, IdUsuario)
              Values(@Id, @Nombre, @IdClasificacion, @IdAreaEntidad, @Activo, @Validado, @IdConcepto, @IdUsuario)
            COMMIT TRAN`;
        result = await pool
            .request()
            .input("Id", Datos.Id)
            .input("IdClasificacion", Datos.IdClasificacion)
            .input("IdAreaEntidad", Datos.IdAreaEntidad)
            .input("IdConcepto", Datos.IdConcepto)
            .input("Nombre", Datos.Nombre)
            .input("Activo", Datos.Activo)
            .input("Validado", Datos.Validado)
            .input("IdUsuario", Datos.IdUsuario)
            .query(query);
        break;
    break;
  
    case "Update":
        query = `Update Ofertas
             Set Nombre = @Nombre, IdClasificacion = @IdClasificacion, Activo = 1, Validado = @Validado, IdConcepto = @IdConcepto, IdAreaEntidad = @IdAreaEntidad
             Where Id = @Id`;
        result = await pool
            .request()
            .input("Id", Datos.Id)
            .input("IdClasificacion", Datos.IdClasificacion)
            .input("IdAreaEntidad", Datos.IdAreaEntidad)
            .input("IdConcepto", Datos.IdConcepto)
            .input("Nombre", Datos.Nombre)
            .input("Validado", Datos.Validado)
            .query(query);
        break;

    case "Borrar":
        query = `Update Ofertas
             Set Activo = 0, Validado = @Validado
             Where Id = @Id`;
        result = await pool
            .request()
            .input("Id", Datos.Id)
            .input("Validado", Datos.Validado)
            .query(query);
        break;

    case "Eliminar":
        query = `Delete From Ofertas
             Where Id = @Id And Activo = 0`;
        result = await pool
            .request()
            .input("Id", Datos.Id)
            .query(query);
        break;
}

await pool.close();

return result.recordset;
  }