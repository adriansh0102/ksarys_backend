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
      query = `select e.*, dpa.Nombre as Municipio from Entidad e, Dpa dpa where dpa.Id = e.IdDpa;`;
      const resultSelect = await pool.request()
        .query(query);
      resultSelect.recordset.forEach(record => {
        const dat: Entity = {
          Id: record.Id,
          Codigo: record.Codigo.trim(),
          Nombre: record.Nombre.trim(),
          IdDpa: record.IdDpa,
          Municipio: record.Municipio.trim(),
          Direccion: record.Direccion.trim(),
          Director: record.Director.trim(),
          Actividad: record.Actividad.trim(),
          Cuenta: record.Cuenta.trim(),
          NIT: record.NIT.trim(),
          Activo: record.Activo,
          Validado: record.Validado,
          IdUsuario: record.IdUsuario
        };
        lst.push(dat);
      });
      break;
    case 'SelectByName':
      query = `SELECT Nombre FROM Entidad WHERE Nombre = @Nombre;`;
      const exist = await pool.request()
        .input('Nombre', VarChar(200), Datos!.Nombre)
        .query(query) as { recordset: Entity[] };
      if (exist.recordset[0]) {
        lst.push({
          Nombre: exist.recordset[0].Nombre!.trim(),
        });
      }
      break;
    case 'SelectById':
      query = `SELECT Nombre FROM Entidad WHERE CAST(Id AS VARCHAR(MAX)) = @Id;`;
      const byId = await pool.request()
        .input('Id', VarChar(200), Datos!.Id)
        .query(query) as { recordset: Entity[] };
      if (byId.recordset[0]) {
        lst.push(byId.recordset[0]);
      }
      break;
    case "Insert":
        query = `Declare @Id bigint
          BEGIN TRAN
            Set @Id = (Select Count(Id) From Entidad Where Nombre = @Nombre);
            Set @IdDpa = (Select Id From Dpa dpa Where dpa.Nombre = @Municipio and Id > 100);
            If @Id = 0 Begin
            Set @Id = IsNull((Select Max(Id)+1 From Entidad),(Select Top 1 IdServer From ServerID))
              Insert Into Entidad(Id, IdDpa, Codigo, Nombre, Direccion, Cuenta,  NIT, Actividad, Activo, Validado, IdUsuario, Director)
              Values(@Id, @IdDpa, @Codigo, @Nombre, @Direccion, @Cuenta,  @NIT, @Actividad, @Activo, @Validado, @Id, @Director)
            End
          COMMIT TRAN;`;
        await pool.request()
            .input('IdDpa', Int, Datos!.IdDpa)
            .input('Codigo', VarChar(10), Datos!.Codigo)
            .input('Nombre', VarChar(200), Datos!.Nombre)
            .input('Direccion', VarChar(200), Datos!.Direccion)
            .input('Municipio', VarChar(200), Datos!.Municipio)
            .input('Actividad', VarChar(100), Datos!.Actividad)
            .input('Director', VarChar(100), Datos!.Director)
            .input('Cuenta', VarChar(50), Datos!.Cuenta)
            .input('NIT', VarChar(20), Datos!.NIT)
            .input('Activo', Bit, 1)
            .input('Validado', Bit, 1)
            .input('IdUsuario', Int, Datos!.IdUsuario)
            .query(query);
        break;
    case "Update":
        query = `UPDATE Entidad
                SET Codigo = @Codigo, Nombre = @Nombre,
                IdDpa = @IdDpa, Direccion = @Direccion,
                Cuenta = @Cuenta, NIT = @NIT, Actividad = @Actividad,
                Activo = 1, Validado = @Validado, Director = @Director
                WHERE CAST(Id AS VARCHAR(MAX)) = @Id`;
        await pool.request()
            .input('Id', VarChar, Datos!.Id)
            .input('Codigo', VarChar(10), Datos!.Codigo)
            .input('Nombre', VarChar(200), Datos!.Nombre)
            .input('IdDpa', Int, Datos!.IdDpa)
            .input('Direccion', VarChar(200), Datos!.Direccion)
            .input('Director', VarChar(100), Datos!.Director)
            .input('Actividad', VarChar(100), Datos!.Actividad)
            .input('Cuenta', VarChar(50), Datos!.Cuenta)
            .input('NIT', VarChar(50), Datos!.NIT)
            .input('Activo', Bit, 1)
            .input('Validado', Bit, 1)
            .query(query);
        break;
    case "Erease":
        query = `UPDATE Entidad SET Activo = 0, Validado = @Validado WHERE CAST(Id AS VARCHAR(MAX)) = @Id`;
        await pool.request()
          .input('Id', Int, Datos!.Id)
          .input('Validado', Bit, Datos!.Validado)
          .query(query);
        break;
    case "Delete":
        query = `DELETE FROM Entidad WHERE CAST(Id AS VARCHAR(MAX)) = @Id;`;
        await pool.request()
          .input('Id', VarChar, Datos!.Id)
          .query(query);
        break;
    default:
      throw new Error("Invalid action");
  }

  await pool.close();

  return lst;
}
