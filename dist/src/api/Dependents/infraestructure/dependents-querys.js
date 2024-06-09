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
exports.DependentsManager = void 0;
const config_1 = require("../../../database/config");
function DependentsManager(action, Dependent) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield (0, config_1.getConnection)();
        if (!pool) {
            throw new Error('Failed to establish a database connection.');
        }
        let query;
        let result = null;
        switch (action) {
            case 'Select':
                query = 'SELECT * FROM Dependientes;';
                result = yield pool.request()
                    .query(query);
                break;
            case 'SelectByArea':
                query = 'SELECT * FROM Dependientes WHERE IdAreaEntidad = @IdAreaEntidad';
                result = yield pool.request()
                    .input('IdAreaEntidad', Dependent.IdAreaEntidad)
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
                result = yield pool.request()
                    .input('Nombre', Dependent.Nombre)
                    .input('Activo', 1)
                    .input('IdAreaEntidad', Dependent.IdAreaEntidad)
                    .input('IdUsuario', Dependent.IdUsuario)
                    .query(query);
                break;
            case 'Update':
                query = `
        UPDATE Dependientes
        SET Nombre = @Nombre, Activo = 1, IdAreaEntidad = @IdAreaEntidad
        WHERE CAST(Id AS VARCHAR(MAX)) = @Id;`;
                result = yield pool.request()
                    .input('Id', Dependent.Id)
                    .input('Nombre', Dependent.Nombre)
                    .input('IdAreaEntidad', Dependent.IdAreaEntidad)
                    .query(query);
                break;
            case 'Erease':
                query = `
        UPDATE Dependientes 
        SET Activo = CASE WHEN Activo = 1 THEN 0 ELSE 1 END 
        WHERE CAST(Id AS VARCHAR(MAX)) = @Id`;
                result = yield pool.request()
                    .input('Id', Dependent.Id)
                    .query(query);
                break;
            case 'Delete':
                query = 'DELETE FROM Dependientes WHERE CAST(Id AS VARCHAR(MAX)) = @Id';
                result = yield pool.request()
                    .input('Id', Dependent.Id)
                    .query(query);
                break;
            default:
                throw new Error('Invalid Action');
        }
        yield pool.close();
        if (result === null) {
            throw new Error('No action matched in GestionUsuarios.');
        }
        return result.recordset;
    });
}
exports.DependentsManager = DependentsManager;
