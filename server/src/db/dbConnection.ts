import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST || 'aws-0-eu-central-1.pooler.supabase.com',
  user: process.env.DB_USER || 'postgres.lkmnkqyrlyseesaendco',
  password: process.env.DB_PASSWORD || 'mamba2025',
  database: process.env.DB_NAME || 'postgres',
  port: Number(process.env.DB_PORT || 6543),
});

export async function executeQuery<T>(query: string, params?: any[]): Promise<T[]> {    
    const connection = await pool.connect()
    try {        
      const result = await connection.query(query, params);
      return result.rows;
    }
    catch (e: any) {
        throw new Error(e)
    }
    finally {
        connection.release()
    }
}
