import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { appEnv } from "../types/env";

const sql = neon(appEnv.DATABASE_URL);
const db = drizzle(sql);

export default db;
