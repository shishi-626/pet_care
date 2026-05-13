import pg from 'pg';

const { Pool } = pg;
const globalForDb = globalThis;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required for PostgreSQL writes.');
  }

  if (!globalForDb.pgPool) {
    globalForDb.pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }

  return globalForDb.pgPool;
}
