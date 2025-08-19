import { Hono } from "hono";
import { cors } from "hono/cors";
import customersRouter from "./routes/customers";
import bookingsRouter from "./routes/bookings";
import authRoutes from "./routes/auth";
import { appEnv } from "./types/env";

const app = new Hono();

const normalizeOrigin = (origin?: string) => origin?.replace(/\/$/, "");

const allowedFixedOrigins = [
  normalizeOrigin("http://localhost:3000"),
  normalizeOrigin(appEnv.FRONTEND_URL),
].filter((v): v is string => Boolean(v));

const isAllowedOrigin = (origin?: string): boolean => {
  if (!origin) return false;
  const normalized = normalizeOrigin(origin)!;
  if (allowedFixedOrigins.includes(normalized)) return true;
  try {
    const hostname = new URL(origin).hostname;
    // Allow Cloudflare Pages preview subdomains like <hash>.<project>.pages.dev
    if (hostname.endsWith(".pages.dev")) return true;
  } catch {}
  return false;
};

app.use(
  cors({
    origin: (origin) => (isAllowedOrigin(origin) ? origin : null),
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Cookie",
    ],
    exposeHeaders: ["Set-Cookie"],
  })
);

// Add Safari-specific headers for better cookie handling
app.use("*", async (c, next) => {
  await next();

  // Add headers to help with Safari's ITP
  c.header("Cache-Control", "no-cache, no-store, must-revalidate");
  c.header("Pragma", "no-cache");
  c.header("Expires", "0");

  // Ensure CORS headers are set for all responses
  const origin = c.req.header("Origin");
  if (origin && isAllowedOrigin(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Access-Control-Allow-Credentials", "true");
  }
});

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
