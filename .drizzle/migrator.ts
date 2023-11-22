import Pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import "dotenv/config";

const doMigrate = async () => {
  try {
    const pool = new Pg.Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const dbMigrator = drizzle(pool);

    await migrate(dbMigrator, { migrationsFolder: ".drizzle/migrations" });
    console.log("migration done");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

doMigrate();
