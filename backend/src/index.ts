import { Hono } from "hono";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";

const app = new Hono();
const db = drizzle(process.env.DATABASE_URL!);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
