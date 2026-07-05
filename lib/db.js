import { neon } from "@neondatabase/serverless";

let _sql = null;

export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (!_sql) _sql = neon(process.env.DATABASE_URL);
  return _sql;
}
