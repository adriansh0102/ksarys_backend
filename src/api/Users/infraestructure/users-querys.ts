import { IResult } from 'mssql';

import { User } from '../interface/user.interface';
import { getConnection } from '../../../database/config';

export async function UsersManager(action: string, Datos?: User) {
  
  const pool = await getConnection();
  if (!pool) {
    throw new Error('Failed to establish a database connection.');
  }

  let query = '';
  let result: IResult<any> | null = null;

  switch (action) {
    case 'Select':
      query = 'SELECT * FROM Usuarios;';
      result = await pool.request()
        .query(query);
      break;
    case 'SelectById':
      query = 'SELECT * FROM Usuarios WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
      result = await pool.request()
          .input('Id', Datos!.ID)
          .input('Activo', Datos!.Activo)
          .query(query);
      break;
    case 'SelectByName':
        query = 'SELECT * FROM Usuarios WHERE Nombre = @Nombre';
      result = await pool.request()
          .input('Nombre', Datos!.Nombre)
          .input('Activo', Datos!.Activo)
          .query(query);
      break;
    case 'Insert':
      query = `DECLARE @Id bigint
        BEGIN TRAN
          SET @Id = (SELECT COUNT(Id) FROM Usuarios WHERE Nombre = @Nombre)
          IF @Id = 0
            BEGIN
              SET @Id = ISNULL((SELECT MAX(Id) + 1 FROM Usuarios), (SELECT TOP 1 IdServer FROM ServerID))
              INSERT INTO Usuarios (Id, Nombre, ClaveAcceso, Cargo, NivelAcceso, Correo, Activo, IdUsuario)
              VALUES (@Id, @Nombre, @ClaveAcceso, @Cargo, @NivelAcceso, @Correo, @Activo, @Id)
            END
        COMMIT TRAN`;
      result = await pool.request()
        .input('Nombre', Datos!.Nombre)
        .input('Correo', Datos!.Correo)
        .input('ClaveAcceso', Datos!.ClaveAcceso)
        .input('Cargo', Datos!.Cargo)
        .input('NivelAcceso', Datos!.NivelAcceso)
        .input('Activo', 1)
        .query(query);
      break;
    case 'Update':
      query = 'UPDATE Usuarios SET Nombre = @Nombre, Cargo = @Cargo, Correo = @Correo, Activo = 1 WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
      result = await pool.request()
        .input('Id', Datos!.ID)
        .input('Nombre', Datos!.Nombre)
        .input('Cargo', Datos!.Cargo)
        .input('Correo', Datos!.Correo)
        .query(query);
      break;
    case 'Erease':
      query = `
        UPDATE Usuarios 
        SET Activo = CASE WHEN Activo = 1 THEN 0 ELSE 1 END 
        WHERE CAST(Id AS VARCHAR(MAX)) = @Id`;
      result = await pool.request()
        .input('Id', Datos!.ID)
        .query(query);
      break;
    case 'Delete':
      query = 'DELETE FROM Usuarios WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
      result = await pool.request()
        .input('Id', Datos!.ID)
        .query(query);
      break;
    case 'ChangePassword':
      query = 'UPDATE Usuarios SET ClaveAcceso = @ClaveAcceso WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
      result = await pool.request()
        .input('Id', Datos!.ID)
        .input('ClaveAcceso', Datos!.ClaveAcceso)
        .query(query);
      break;
    case 'SetRole':
      query = 'UPDATE Usuarios SET NivelAcceso = @NivelAcceso, Activo = 1 WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
      result = await pool.request()
        .input('Id', Datos!.ID)
        .input('NivelAcceso', Datos!.NivelAcceso)
        .query(query);
      break;
  }

  await pool.close();

  if (result === null) {
    throw new Error('No action matched in GestionUsuarios.');
  }

  return result.recordset;
}

