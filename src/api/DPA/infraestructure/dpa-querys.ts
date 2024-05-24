import { getConnection } from '../../../database/config';
import { DPA } from '../interface/dpa.interface';

export async function DPAManager(Accion: string): Promise<DPA[]> {
    
    const pool = await getConnection();
    if (!pool) {
        throw new Error('Failed to establish a database connection.');
    }

    const lst: DPA[] = [];
    let query: string;

    switch (Accion) {
        case "Select":
            query = `SELECT * FROM Dpa WHERE Id > 100`;
            break;
        case "SelectAll":
            query = `SELECT * FROM Dpa`;
            break;
        default:
            throw new Error("Invalid action");
    }

    const request = pool.request();
    const result = await request.query(query);

    result.recordset.forEach(record => {
        const dat: DPA = {
            Id: record.ID,
            Nombre: record.Nombre.toUpperCase().trim(),
            Siglas: record.Siglas ? record.Siglas.toUpperCase().trim() : ''
        };
        lst.push(dat);
    });

    await pool.close();
    return lst;
}
