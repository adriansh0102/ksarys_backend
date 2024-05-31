import { ConnectionPool } from "mssql";
import { getConnection } from "../../../../database/config";

export async function Products(action: string, Datos?: any) {
    const pool: ConnectionPool = await getConnection();

    if (!pool) {
        throw new Error("Failed to establish a database connection.");
    }

    let query = "";
    let result: any = null;

    switch (action) {
        case "Select":
            query = `Select Id, Codigo, Nombre, IdUm, IdClasificacion, IdConcepto, IdEntidad, IdAlmacen, 
                IsNull((Select Top 1 Precio From ProductosPrecios Where IdProducto = Pr.Id Order by Fecha Desc),0) as Precio, 
                IsNull((Select Top 1 Fecha From ProductosPrecios Where IdProducto = Pr.Id Order by Fecha Desc),GetDate()) 
                as FechaApertura, IsNull((Select Sum(Cantidad) From ProductosFacturaDetalles Where IdProducto = Pr.Id),0) 
                as InventarioInicial, Activo, Validado, IsNull((Select Nombre From ProductosClasificacion Where Id = IdClasificacion),
                '') as Clasificacion, FactorConversion From Productos Pr Where (IdEntidad = @IdEntidad Or @IdEntidad = 0) 
                And ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)`;
            result = await pool.request()
                .input("IdEntidad", Datos.IdEntidad)
                .input("Activo", Datos.Activo)
                .input("Validado", Datos.Validado)
                .query(query);
            break;
        case "SelectSelect":
            query = `Select * from ProductosClasificacion;
            Select * from ProductosConceptos;
            Select * from Almacenes;
            Select * from UnidadesMedida;`;
            result = await pool.request().query(query);
            break;

        case "SelectTable":
            query = `SELECT 
                p.Id, 
                p.Codigo, 
                p.Nombre, 
                p.IdUm, 
                p.IdClasificacion, 
                p.IdConcepto, 
                p.IdEntidad, 
                p.IdAlmacen, 
                p.FactorConversion,             
                COALESCE(c.Nombre, '0') AS Clasificacion,
                COALESCE(a.Nombre, '0') AS Almacen,
                COALESCE(m.Nombre, '0') AS Medida,
                COALESCE(pre.Precio, 0) AS Precio,
                COALESCE(pc.Nombre ,'0') AS Concepto
            FROM 
                Productos p
            LEFT JOIN 
                ProductosClasificacion c ON p.IdClasificacion = c.Id
            LEFT JOIN
                Almacenes a ON p.IdAlmacen = a.Id
            LEFT JOIN
                UnidadesMedida m ON p.IdUm = m.Id
            LEFT JOIN
                ProductosPrecios pre ON p.Id = pre.IdProducto
            LEFT JOIN
                ProductosConceptos pc ON p.IdConcepto = pc.Id where p.Activo = 1`;
            result = await pool.request().query(query);
            break;
        case "SelectOneName":
            query = "Select Id, Codigo, Nombre, IdUm, IdClasificacion, IdConcepto, IdEntidad, IdAlmacen, IsNull((Select Top 1 Precio From ProductosPrecios Where IdProducto = Pr.Id Order by Fecha Desc),0) as Precio, IsNull((Select Top 1 Fecha From ProductosPrecios Where IdProducto = Pr.Id Order by Fecha Desc),GetDate()) as FechaApertura, IsNull((Select Sum(Cantidad) From ProductosFacturaDetalles Where IdProducto = Pr.Id),0) as InventarioInicial, Activo, Validado, IsNull((Select Nombre From ProductosClasificacion Where Id = IdClasificacion),'') as Clasificacion, FactorConversion From Productos Pr Where IdEntidad = @IdEntidad And Nombre = @Nombre";
            result = await pool.request()
                .input("IdEntidad", Datos.IdEntidad)
                .input("Nombre", Datos.Nombre)
                .query(query);
            break;

        case "SelectOneId":
            query = `Select Id, Codigo, Nombre, IdUm, IdClasificacion, IdConcepto, IdEntidad, IdAlmacen, 
            IsNull((Select Top 1 Precio From ProductosPrecios Where IdProducto = Pr.Id 
                Order by Fecha Desc),0) as Precio, IsNull((Select Top 1 Fecha From 
                    ProductosPrecios Where IdProducto = Pr.Id Order by Fecha Desc),
                    GetDate()) as FechaApertura, IsNull((Select Sum(Cantidad) From 
                    ProductosFacturaDetalles Where IdProducto = Pr.Id),0) as InventarioInicial
                    , Activo, Validado, IsNull((Select Nombre From ProductosClasificacion 
                        Where Id = IdClasificacion),'') as Clasificacion, FactorConversion 
                        From Productos Pr Where Id = @Id`;


            result = await pool.request()
                .input("Id", Datos.Id)
                .query(query);
            break;

        case "SelectAll":
            query = "Select Id, Nombre, IdUm, (Select Siglas From UnidadesMedida Where Id = IdUm) as Um, FactorConversion  From Productos Where (IdEntidad = @IdEntidad Or @IdEntidad = 0) And ((Activo = @Activo) And (Validado = @Validado) Or @Validado = 0)";
            result = await pool.request()
                .input("IdEntidad", Datos.IdEntidad)
                .input("Activo", Datos.Activo)
                .input("Validado", Datos.Validado)
                .query(query);
            break;

        case "Insert":
            query = `DECLARE @Id bigint
                    BEGIN TRAN
                        DELETE Productos Where Nombre = @Nombre And Id > @Id
                        SET @Id = IsNull((Select Min(Id) From Productos Where Nombre = @Nombre), 0)
                        If @Id = 0 Begin
                            Set @Id = IsNull((Select Max(Id) + 1 From Productos), (Select Top 1 IdServer From ServerID))
                            Insert Into Productos(Id, Codigo, Nombre, IdUm, IdClasificacion, IdConcepto, IdEntidad, IdAlmacen,
                                 Activo, Validado, IdUsuario, FactorConversion) Values(@Id, @Codigo, @Nombre, @IdUm, @IdClasificacion, 
                                    @IdConcepto, @IdEntidad, @IdAlmacen, @Activo, @Validado, @IdUsuario, @FactorConversion)
                        End;
                        DECLARE @IdTmp bigint
                        If @IdFacturaProveedor > 0 Begin
                            Set @IdTmp = IsNull((Select Id From ProductosFacturaDetalles Where IdProducto = @Id), 0)
                            If @IdTmp = 0 Begin
                                Set @IdTmp = (Select Max(Id) + 1 From ProductosFacturaDetalles)
                                Insert ProductosFacturaDetalles(Id, IdProducto, IdFacturaProveedor, IdAreaEntidad, IdAlmacen,
                                     Cantidad, Importe, Activo, Validado, Cerrado, IdUsuario) Values(@IdTmp, @Id, @IdFacturaProveedor,
                                         @IdAreaEntidad, @IdAlmacen, @Cantidad, @Importe, 1, @Validado, 0, @IdUsuario)
                            End
                        End
                    COMMIT TRAN`;
            result = await pool.request()
                .input("IdFacturaProveedor", Datos.IdFacturaProveedor)
                .input("Codigo", Datos.Codigo)
                .input("Nombre", Datos.Nombre)
                .input("IdUm", Datos.IdUm)
                .input("IdClasificacion", Datos.IdClasificacion)
                .input("IdConcepto", Datos.IdConcepto)
                .input("IdEntidad", Datos.IdEntidad)
                .input("IdAlmacen", Datos.IdAlmacen)
                .input("Activo", Datos.Activo)
                .input("Validado", Datos.Validado)
                .input("IdAreaEntidad", Datos.IdAreaEntidad)
                .input("Cantidad", Datos.InventarioInicial)
                .input("Importe", Datos.Importe)
                .input("FactorConversion", Datos.FactorConversion)
                .input("Fecha", Datos.FechaApertura)
                .input("IdUsuario", Datos.IdUsuario)
                .query(query);
            break;

        case "Update":
            query = `UPDATE Productos 
          SET Codigo = @Codigo, Nombre = @Nombre, IdUm = @IdUm, IdClasificacion = @IdClasificacion, IdConcepto = @IdConcepto, IdAlmacen = @IdAlmacen, Activo = 1, Validado = @Validado, FactorConversion = @FactorConversion 
          WHERE CAST(Id AS VARCHAR(MAX)) = @Id; 
          UPDATE ProductosPrecios SET Precio = @Precio WHERE IdProducto = @Id; 
          DECLARE @IdTmp bigint 
          If @IdFacturaProveedor > 0 Begin 
              Set @IdTmp = IsNull((Select Id From ProductosFacturaDetalles Where IdProducto = @Id), 0) 
              If @IdTmp = 0 Begin 
                  Set @IdTmp = (Select Max(Id) + 1 From ProductosFacturaDetalles) 
                  Insert ProductosFacturaDetalles(Id, IdProducto, IdFacturaProveedor, IdAreaEntidad, IdAlmacen, Cantidad, Importe, Activo, Validado, Cerrado) Values(@IdTmp, @Id, @IdFacturaProveedor, @IdAreaEntidad, @IdAlmacen, @Cantidad, @Importe, 1, @Validado, 0) 
              End 
              Update ProductosFacturaDetalles Set Cantidad = @Cantidad, Importe = @Importe Where IdProducto = @Id And IdFacturaProveedor = @IdFacturaProveedor 
          End`;
            result = await pool.request()
                .input("Id", Datos.Id)
                .input("IdFacturaProveedor", Datos.IdFacturaProveedor)
                .input("Codigo", Datos.Codigo)
                .input("Nombre", Datos.Nombre)
                .input("IdUm", Datos.IdUm)
                .input("IdClasificacion", Datos.IdClasificacion)
                .input("IdConcepto", Datos.IdConcepto)
                .input("IdAlmacen", Datos.IdAlmacen)
                .input("Activo", Datos.Activo)
                .input("Validado", Datos.Validado)
                .input("Cantidad", Datos.InventarioInicial)
                .input("Importe", Datos.Importe)
                .input("FactorConversion", Datos.FactorConversion)
                .input("IdAreaEntidad", Datos.IdAreaEntidad)
                .input("Precio", Datos.Precio)

                .query(query);
            break;

        case "Borrar":
            query = `UPDATE Productos SET Activo = 0, Validado = @Validado WHERE Id = @Id`;
            result = await pool.request()
                .input("Id", Datos.Id)
                .input("Validado", Datos.Validado)
                .query(query);
            break;

        case "Eliminar":
            query = `DELETE ProductosCuentasContables Where IdProducto = @Id; 
          DELETE From Productos Where Id = @Id`;
            result = await pool.request()
                .input("IdFacturaProveedor", Datos.IdFacturaProveedor)
                .input("Id", Datos.Id)
                .query(query);
            break;
    }
    await pool.close();

    if (result === null) {
        throw new Error("Null");
    }

    return (action !== 'SelectSelect') ? result.recordset : result.recordsets;

}
