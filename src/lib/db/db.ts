import Pg from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import "dotenv/config";
import * as schema from "./schema";

const pool = new Pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
