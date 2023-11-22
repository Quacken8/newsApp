import Pg from "pg";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";

const pool = new Pg.Pool({
  connectionString: process.env.DATABASE_URL + "?sslmode=require",
});
export const db = drizzle(pool);
