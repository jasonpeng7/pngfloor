import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Root route
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: 8080,
  fetch: app.fetch,
};
