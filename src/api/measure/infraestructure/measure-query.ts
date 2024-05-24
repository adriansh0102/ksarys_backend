import { IResult } from "mssql";
import { ConnectionPool } from 'mssql';
import { getConnection } from "../../../database/config";



export async function MeasureManager(action: string, Datos?: any) {
    
    let pool: ConnectionPool = await getConnection();
    if (!pool) {
        throw new Error("Failed to establish a database connection.");
    }


    let query = "";
    let result: IResult<any> | null = null;

    switch (action) {
        case "Select":
            query = `Select * From UnidadesMedida Where (Activo = @Activo or @Activo = 0)`
            result = await pool.request()
                .input("Activo", Datos.Activo)
                .query(query);
            break;
    }

    await pool.close();

    if (result === null) {
        throw new Error("Null");
    }

    return result.recordset;

}
