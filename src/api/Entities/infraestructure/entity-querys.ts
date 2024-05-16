import { ConnectionPool, VarChar, Int, Bit, Binary, Request } from 'mssql';
import { Entity } from '../interface/entity.interface';
import { getConnection } from '../../../database/config';

export async function EntitiesManager(Accion: string, Datos?: Entity): Promise<Entity[]> {
    
  const pool = await getConnection();
  if (!pool) {
    throw new Error('Failed to establish a database connection.');
  }

  const lst: Entity[] = [];
  let query: string;
  
  switch (Accion) {
    case "Select":
      query = `SELECT * FROM Entidad;`;
      const resultSelect = await pool.request()
        .query(query);
      resultSelect.recordset.forEach(record => {
        const dat: Entity = {
          Id: record.ID,
          Codigo: record.Codigo.trim(),
          Nombre: record.Nombre.trim(),
          IdDpa: record.IdDpa,
          Direccion: record.Direccion.trim(),
          Director: record.Director.trim(),
          Actividad: record.Actividad.trim(),
          Cuenta: record.Cuenta.trim(),
          NIT: record.NIT.trim(),
          Activo: record.Activo,
          Validado: record.Validado,
          IdUsuario: Datos!.IdUsuario
        };
        lst.push(dat);
      });
      break;
    case "Insert":
        query = `INSERT INTO Entidad (Id, IdDpa, Codigo, Nombre, Direccion, Cuenta, NIT, Actividad, LogoTipo, Activo, Validado, IdUsuario, Director)
                  VALUES (@Id, @IdDpa, @Codigo, @Nombre, @Direccion, @Cuenta, @NIT, @Actividad, @LogoTipo, @Activo, @Validado, @IdUsuario, @Director)`;
        await pool.request()
            .input('Id', BigInt, )
            .input('IdDpa', Int, Datos!.IdDpa)
            .input('Codigo', VarChar(10), Datos!.Codigo)
            .input('Nombre', VarChar(200), Datos!.Nombre)
            .input('Direccion', VarChar(200), Datos!.Direccion)
            .input('Actividad', VarChar(100), Datos!.Actividad)
            .input('Director', VarChar(100), Datos!.Director)
            .input('Cuenta', VarChar(50), Datos!.Cuenta)
            .input('NIT', VarChar(20), Datos!.NIT)
            .input('Activo', Bit, Datos!.Activo)
            .input('Validado', Bit, Datos!.Validado)
            .input('IdUsuario', Int, Datos!.IdUsuario)
            .query(query);
        break;
    case "Import":
        query = `BEGIN TRAN
                  INSERT INTO Entidad (Id, IdDpa, Codigo, Nombre, Direccion, Cuenta, NIT, Actividad, LogoTipo, Activo, Validado, IdUsuario, Director)
                  VALUES (@Id, @IdDpa, @Codigo, @Nombre, @Direccion, @Cuenta, @NIT, @Actividad, @LogoTipo, @Activo, @Validado, @IdUsuario, @Director)
                  COMMIT TRAN`;
        const resultImport = await pool.request()
            .input('Id', Int, Datos!.Id)
            .input('IdDpa', Int, Datos!.IdDpa)
            .input('Codigo', VarChar(10), Datos!.Codigo)
            .input('Nombre', VarChar(200), Datos!.Nombre)
            .input('Direccion', VarChar(200), Datos!.Direccion)
            .input('Director', VarChar(100), Datos!.Director)
            .input('Actividad', VarChar(100), Datos!.Actividad)
            .input('Cuenta', VarChar(50), Datos!.Cuenta)
            .input('NIT', VarChar(20), Datos!.NIT)
            .input('Activo', Bit, Datos!.Activo)
            .input('Validado', Bit, Datos!.Validado)
            .input('IdUsuario', Int, Datos!.IdUsuario)
            .query(query);
        break;
    case "Update":
        query = `UPDATE Entidad
                  SET Codigo = @Codigo, Nombre = @Nombre, IdDpa = @IdDpa, Direccion = @Direccion, Cuenta = @Cuenta, NIT = @NIT, Actividad = @Actividad, LogoTipo = @LogoTipo, Activo = 1, Validado = @Validado, Director = @Director
                  WHERE Id = @Id`;
        const resultUpdate = await pool.request()
            .input('Id', Int, Datos!.Id)
            .input('Codigo', VarChar(10), Datos!.Codigo)
            .input('Nombre', VarChar(200), Datos!.Nombre)
            .input('IdDpa', Int, Datos!.IdDpa)
            .input('Direccion', VarChar(200), Datos!.Direccion)
            .input('Director', VarChar(100), Datos!.Director)
            .input('Actividad', VarChar(100), Datos!.Actividad)
            .input('Cuenta', VarChar(50), Datos!.Cuenta)
            .input('NIT', VarChar(50), Datos!.NIT)
            .input('Activo', Bit, Datos!.Activo)
            .input('Validado', Bit, Datos!.Validado)
            .query(query);
        break;
    case "Borrar":
        query = `UPDATE Entidad SET Activo = 0, Validado = @Validado WHERE Id = @Id`;
        const resultBorrar = await pool.request()
            .input('Id', Int, Datos!.Id)
            .input('Validado', Bit, Datos!.Validado)
            .query(query);
        break;
    case "Eliminar":
        query = `DELETE FROM Entidad WHERE Id = @Id AND Activo = 0`;
        const resultEliminar = await pool.request()
            .input('Id', Int, Datos!.Id)
            .query(query);
        break;
    default:
      throw new Error("Acción no válida");
  }

  await pool.close();

  return lst;
}
