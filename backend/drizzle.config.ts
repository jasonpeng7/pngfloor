import { appEnv } from "./src/types/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    host: appEnv.POSTGRES_HOST,
    port: appEnv.POSTGRES_PORT,
    user: appEnv.POSTGRES_USER!,
    password: appEnv.POSTGRES_PASSWORD!,
    database: appEnv.POSTGRES_DB!,
    ssl: appEnv.POSTGRES_SSL === "false" ? false : appEnv.POSTGRES_SSL,
  },
});
