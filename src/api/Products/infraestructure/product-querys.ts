import { IResult } from 'mssql';

import { getConnection } from '../../../database/config';
import { Product } from '../interface/product.interface';

export async function ProductsManager(action: string, data?: Product) {
  
  const pool = await getConnection();
  if (!pool) {
    throw new Error('Failed to establish a database connection.');
  }

  let query = '';
  let result: IResult<any> | null = null;

  switch (action) {
    case 'SelectAll':
      query = 'SELECT * FROM Productos;';
      result = await pool.request()
        .query(query);
      break;
    // case 'SelectById':
    //   query = 'SELECT * FROM Usuarios WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
    //   result = await pool.request()
    //       .input('Id', data!.Id)
    //       .input('Activo', data!.Activo)
    //       .query(query);
    //   break;
    // case 'SelectByName':
    //     query = 'SELECT * FROM Usuarios WHERE Nombre = @Nombre';
    //   result = await pool.request()
    //       .input('Nombre', data!.Nombre)
    //       .input('Activo', data!.Activo)
    //       .query(query);
    //   break;
    // case 'Insert':
    //   query = `DECLARE @Id bigint
    //     BEGIN TRAN
    //       SET @Id = (SELECT COUNT(Id) FROM Usuarios WHERE Nombre = @Nombre)
    //       IF @Id = 0
    //         BEGIN
    //           SET @Id = ISNULL((SELECT MAX(Id) + 1 FROM Usuarios), (SELECT TOP 1 IdServer FROM ServerId))
    //           INSERT INTO Usuarios (Id, Nombre, ClaveAcceso, Cargo, NivelAcceso, Correo, Activo, IdUsuario)
    //           VALUES (@Id, @Nombre, @ClaveAcceso, @Cargo, @NivelAcceso, @Correo, @Activo, @Id)
    //         END
    //     COMMIT TRAN`;
    //   result = await pool.request()
    //     .input('Nombre', data!.Nombre)
    //     .input('Correo', data!.Correo)
    //     .input('ClaveAcceso', data!.ClaveAcceso)
    //     .input('Cargo', data!.Cargo)
    //     .input('NivelAcceso', data!.NivelAcceso)
    //     .input('Activo', 1)
    //     .query(query);
    //   break;
    // case 'Update':
    //   query = 'UPDATE Usuarios SET Nombre = @Nombre, Cargo = @Cargo, Correo = @Correo, Activo = 1 WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
    //   result = await pool.request()
    //     .input('Id', data!.Id)
    //     .input('Nombre', data!.Nombre)
    //     .input('Cargo', data!.Cargo)
    //     .input('Correo', data!.Correo)
    //     .query(query);
    //   break;
    // case 'Erease':
    //   query = `
    //     UPDATE Usuarios 
    //     SET Activo = CASE WHEN Activo = 1 THEN 0 ELSE 1 END 
    //     WHERE CAST(Id AS VARCHAR(MAX)) = @Id`;
    //   result = await pool.request()
    //     .input('Id', data!.Id)
    //     .query(query);
    //   break;
    // case 'Delete':
    //   query = 'DELETE FROM Usuarios WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
    //   result = await pool.request()
    //     .input('Id', data!.Id)
    //     .query(query);
    //   break;
    // case 'SetRole':
      // query = 'UPDATE Usuarios SET NivelAcceso = @NivelAcceso, Activo = 1 WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
      // result = await pool.request()
      //   .input('Id', data!.Id)
      //   .input('NivelAcceso', data!.NivelAcceso)
      //   .query(query);
      // break;
  }

  await pool.close();

  if (result === null) {
    throw new Error('No action matched in GestionUsuarios.');
  }

  return result.recordset;
}

