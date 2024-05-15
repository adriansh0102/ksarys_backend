import { IResult } from 'mssql';

import { User } from '../interface/user.interface';
import { getConnection } from '../../../database/config';

export async function GestionUsuarios(action: string, Datos?: User) {
  
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
      case 'SelectUnUsuario':
          query = 'SELECT * FROM Usuarios WHERE Id = @Id';
          result = await pool.request()
              .input('Id', Datos!.ID)
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
                              VALUES (@Id, @Nombre, @ClaveAcceso, @Cargo, @NivelAcceso, @Correo, @Activo, @IdUsuario)
                          END
                  COMMIT TRAN`;
          result = await pool.request()
              .input('Nombre', Datos!.Nombre)
              .input('Correo', Datos!.Correo)
              .input('ClaveAcceso', Datos!.ClaveAcceso)
              .input('Cargo', Datos!.Cargo)
              .input('NivelAcceso', Datos!.NivelAcceso)
              .input('Activo', Datos!.Activo)
              .query(query);
          break;
      case 'Import':
          query = `DECLARE @IdDb int
                  BEGIN TRAN
                      SET @IdDb = (SELECT COUNT(Id) FROM Usuarios WHERE Id = @Id)
                      IF @IdDb = 0
                          BEGIN
                              INSERT INTO Usuarios (Id, Nombre, ClaveAcceso, Cargo, NivelAcceso, Correo, Activo)
                              VALUES (@Id, @Nombre, @ClaveAcceso, @Cargo, @NivelAcceso, @Correo, @Activo)
                          END
                      ELSE
                          BEGIN
                              UPDATE Usuarios
                              SET Nombre = @Nombre, ClaveAcceso = @ClaveAcceso, NivelAcceso = @NivelAcceso, Cargo = @Cargo, Correo = @Correo, Activo = @Activo
                              WHERE Id = @Id
                          END
                  COMMIT TRAN`;
          result = await pool.request()
              .input('Id', Datos!.ID)
              .input('Nombre', Datos!.Nombre)
              .input('ClaveAcceso', Datos!.ClaveAcceso)
              .input('Cargo', Datos!.Cargo)
              .input('NivelAcceso', Datos!.NivelAcceso)
              .input('Correo', Datos!.Correo)
              .input('Activo', Datos!.Activo)
              .query(query);
          break;
      case 'Update':
          query = 'UPDATE Usuarios SET Nombre = @Nombre, Cargo = @Cargo, Correo = @Correo, Activo = 1 WHERE Id = @Id';
          result = await pool.request()
              .input('Id', Datos!.ID)
              .input('Nombre', Datos!.Nombre)
              .input('Cargo', Datos!.Cargo)
              .input('Correo', Datos!.Correo)
              .query(query);
          break;
      case 'Borrar':
          query = 'UPDATE Usuarios SET Activo = 0 WHERE Id = @Id';
          result = await pool.request()
              .input('Id', Datos!.ID)
              .query(query);
          break;
      case 'Eliminar':
          query = 'DELETE FROM Usuarios WHERE Id = @Id AND Activo = 0';
          result = await pool.request()
              .input('Id', Datos!.ID)
              .query(query);
          break;
      case 'CambiarClave':
          query = 'UPDATE Usuarios SET ClaveAcceso = @ClaveAcceso WHERE Id = @Id';
          result = await pool.request()
              .input('Id', Datos!.ID)
              .input('ClaveAcceso', Datos!.ClaveAcceso)
              .query(query);
          break;
      case 'AsignarRol':
          query = 'UPDATE Usuarios SET NivelAcceso = @NivelAcceso, Activo = 1 WHERE Id = @Id';
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

