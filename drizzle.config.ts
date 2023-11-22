import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema",
  out: "./.drizzle/migrations",
} satisfies Config;
