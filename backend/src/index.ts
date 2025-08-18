import { Hono } from "hono";
import { cors } from "hono/cors";
import customersRouter from "./routes/customers";
import bookingsRouter from "./routes/bookings";
import authRoutes from "./routes/auth";
import { appEnv } from "./types/env";

const app = new Hono();

const normalizeOrigin = (origin?: string) => origin?.replace(/\/$/, "");

const allowedOrigins = [
  normalizeOrigin("http://localhost:3000"),
  normalizeOrigin(appEnv.FRONTEND_URL),
].filter((v): v is string => Boolean(v));

app.use(
  cors({
    origin: allowedOrigins,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// api routes
app.route("/api/customers", customersRouter);
app.route("/api/bookings", bookingsRouter);
app.route("/api/auth", authRoutes);

export default {
  port: 8080,
  fetch: app.fetch,
};
