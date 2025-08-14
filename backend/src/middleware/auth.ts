import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import db from "../db/db";
import { sessions } from "../db/schema/admin";
import { customers } from "../db/schema/customers";
import { admin } from "../db/schema/admin";
import { eq } from "drizzle-orm";

export const SESSION_COOKIE = "png_session";

export interface AuthenticatedContext extends Context {
  user: {
    id: string;
    email: string;
    name: string;
    role: "admin" | "customer";
  };
}

export async function requireAuth(c: Context, next: Next) {
  const sessionId = getCookie(c, SESSION_COOKIE);

  if (!sessionId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    // Find session
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.session_id, sessionId));

    if (session.length === 0) {
      return c.json({ error: "Invalid session" }, 401);
    }

    // Check if session is expired
    if (new Date() > session[0].expires_at) {
      return c.json({ error: "Session expired" }, 401);
    }

    // Find user based on user_type
    if (session[0].user_type === "admin") {
      const adminUser = await db
        .select()
        .from(admin)
        .where(eq(admin.id, session[0].user_id));

      if (adminUser.length === 0) {
        return c.json({ error: "Admin user not found" }, 401);
      }

      (c as AuthenticatedContext).user = {
        id: adminUser[0].id,
        email: adminUser[0].email || "",
        name: adminUser[0].name || "",
        role: "admin" as const,
      };
    } else {
      // Customer user
      const customerUser = await db
        .select()
        .from(customers)
        .where(eq(customers.id, session[0].user_id));

      if (customerUser.length === 0) {
        return c.json({ error: "Customer user not found" }, 401);
      }

      (c as AuthenticatedContext).user = {
        id: customerUser[0].id,
        email: customerUser[0].email || "",
        name: customerUser[0].name || "",
        role: "customer" as const,
      };
    }

    await next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return c.json({ error: "Authentication failed" }, 401);
  }
}

export async function requireAdmin(c: Context, next: Next) {
  const sessionId = getCookie(c, SESSION_COOKIE);

  if (!sessionId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.session_id, sessionId));

    if (session.length === 0) {
      return c.json({ error: "Invalid session" }, 401);
    }

    if (session[0].user_type !== "admin") {
      return c.json({ error: "Admin access required" }, 403);
    }

    const adminUser = await db
      .select()
      .from(admin)
      .where(eq(admin.id, session[0].user_id));

    if (adminUser.length === 0) {
      return c.json({ error: "Admin user not found" }, 401);
    }

    (c as AuthenticatedContext).user = {
      id: adminUser[0].id,
      email: adminUser[0].email || "",
      name: adminUser[0].name || "",
      role: "admin" as const,
    };

    await next();
  } catch (error) {
    return c.json({ error: "Authentication failed" }, 401);
  }
}

export async function requireCustomer(c: Context, next: Next) {
  const sessionId = getCookie(c, SESSION_COOKIE);

  if (!sessionId) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.session_id, sessionId));

    if (session.length === 0) {
      return c.json({ error: "Invalid session" }, 401);
    }

    if (session[0].user_type !== "customer") {
      return c.json({ error: "Customer access required" }, 403);
    }

    const customerUser = await db
      .select()
      .from(customers)
      .where(eq(customers.id, session[0].user_id));

    if (customerUser.length === 0) {
      return c.json({ error: "Customer user not found" }, 401);
    }

    (c as AuthenticatedContext).user = {
      id: customerUser[0].id,
      email: customerUser[0].email || "",
      name: customerUser[0].name || "",
      role: "customer" as const,
    };

    await next();
  } catch (error) {
    return c.json({ error: "Authentication failed" }, 401);
  }
}
