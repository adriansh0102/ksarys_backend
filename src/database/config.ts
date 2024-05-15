import sql from 'mssql';

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

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings)
    return pool
  
  } catch (error) { console.log(error); }
}