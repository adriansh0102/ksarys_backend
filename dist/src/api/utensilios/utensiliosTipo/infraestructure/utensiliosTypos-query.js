"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtensiliosTipos = void 0;
const config_1 = require("../../../../database/config");
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
function UtensiliosTipos(action, Datos) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error("Failed to establish a database connection.");
        }
        let lst = [];
        let query = "";
        switch (action) {
            case "Select":
                query = `Select * From UtensiliosTipos Where (Activo = @Activo or @Activo = 0)`;
                const resultSelect = yield pool.request().input("Activo", 1).query(query);
                resultSelect.recordset.forEach((record) => {
                    const dat = {
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
                const resultInsert = yield pool
                    .request()
                    .input("Nombre", Datos.Nombre)
                    .input("Activo", Datos.Activo)
                    .input("IdUsuario", Datos.IdUsuario)
                    .query(query);
                break;
            case "Import":
                query = ` BEGIN TRAN
                Insert Into UtensiliosTipos(Id,  Nombre,  Activo, IdUsuario)
                                                Values(@Id, @Nombre, @Activo, @IdUsuario)
              COMMIT TRAN`;
                const resultImport = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Nombre", Datos.Nombre)
                    .input("Activo", Datos.Activo)
                    .input("IdUsuario", Datos.IdUsuario)
                    .query(query);
                break;
            case "Update":
                query = ` Update UtensiliosTipos
                Set  Nombre = @Nombre,  Activo = 1
                Where Id = @Id`;
                const resultUpdate = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .input("Nombre", Datos.Nombre)
                    .query(query);
                break;
            case "Borrar":
                query = ` Update UtensiliosTipos Set Activo = 0 Where Id = @Id`;
                const resultDelete = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .query(query);
                break;
            case "Eliminar":
                query = ` Delete From UtensiliosTipos Where Id = @Id And Activo = 0`;
                const resultEliminate = yield pool
                    .request()
                    .input("Id", Datos.Id)
                    .query(query);
                break;
        }
        yield pool.close();
        return lst;
    });
}
exports.UtensiliosTipos = UtensiliosTipos;
