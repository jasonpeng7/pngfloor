import { Hono } from "hono";
import { cors } from "hono/cors";
import customersRouter from "./routes/customers";
import bookingsRouter from "./routes/bookings";
import authRoutes from "./routes/auth";

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

// Mount API routes
app.route("/api/customers", customersRouter);
app.route("/api/bookings", bookingsRouter);
app.route("/api/auth", authRoutes);

export default {
  port: 8080,
  fetch: app.fetch,
};
