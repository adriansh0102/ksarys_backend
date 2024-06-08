import sql, { ConnectionPool } from 'mssql';


const dbSettings: sql.config = {

  user: 'DIMS',
  password: 'sql.2015',
  server: '127.0.0.1',
  database: 'BAR_KSARY',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }

}

export async function getConnection(): Promise<ConnectionPool> {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    throw new Error('Error connecting to the database');
  }
}