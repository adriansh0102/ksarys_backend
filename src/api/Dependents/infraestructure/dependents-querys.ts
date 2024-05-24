import { IResult } from 'mssql';
import { getConnection } from '../../../database/config';
import { Dependents } from '../interface/dependents.interface';

export async function DependentsManager(action: string, Dependent?: Dependents) {
  
  const pool = await getConnection();
  if (!pool) {
    throw new Error('Failed to establish a database connection.');
  }

  let query: string;
  let result: IResult<any> | null = null;

  switch (action) {
    case 'Select':
      query = 'SELECT * FROM Dependientes;';
      result = await pool.request()
        .query(query);
      break;
    case 'SelectByArea':
      query = 'SELECT * FROM Dependientes WHERE IdAreaEntidad = @IdAreaEntidad';
      result = await pool.request()
        .input('IdAreaEntidad', Dependent!.IdAreaEntidad)
        .query(query);
      break;
    case 'Insert':
      query = `
        DECLARE @Id bigint;
        BEGIN TRAN
          SET @Id = (SELECT COUNT(Id) FROM Dependientes WHERE Nombre = @Nombre);
          IF @Id = 0 BEGIN
            SET @Id = ISNULL((SELECT MAX(Id) + 1 FROM Dependientes), (SELECT TOP 1 IdServer FROM ServerID));
            INSERT INTO Dependientes(Id, Nombre, Activo, IdAreaEntidad, IdUsuario)
            VALUES(@Id, @Nombre, @Activo, @IdAreaEntidad, @IdUsuario);
          END
        COMMIT TRAN;`;
      result = await pool.request()
        .input('Nombre', Dependent!.Nombre)
        .input('Activo', 1)
        .input('IdAreaEntidad', Dependent!.IdAreaEntidad)
        .input('IdUsuario', Dependent!.IdUsuario)
        .query(query);
      break;
    case 'Update':
      query = `
        UPDATE Dependientes
        SET Nombre = @Nombre, Activo = 1, IdAreaEntidad = @IdAreaEntidad
        WHERE CAST(Id AS VARCHAR(MAX)) = @Id;`;
      result = await pool.request()
        .input('Id', Dependent!.Id)
        .input('Nombre', Dependent!.Nombre)
        .input('IdAreaEntidad', Dependent!.IdAreaEntidad)
        .query(query);
      break;
    case 'Erease':
      query = `
        UPDATE Dependientes 
        SET Activo = CASE WHEN Activo = 1 THEN 0 ELSE 1 END 
        WHERE CAST(Id AS VARCHAR(MAX)) = @Id`;
      result = await pool.request()
        .input('Id', Dependent!.Id)
        .query(query);
      break;
    case 'Delete':
      query = 'DELETE FROM Dependientes WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
      result = await pool.request()
        .input('Id', Dependent!.Id)
        .query(query);
      break;
    default:
      throw new Error('Invalid Action');
  }

  await pool.close();

  if (result === null) {
    throw new Error('No action matched in GestionUsuarios.');
  }

  return result.recordset;
}
