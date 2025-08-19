import { appEnv, isLocal } from "../types/env";
import * as client from "openid-client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import { Hono } from "hono";
import { setCookie, getCookie, deleteCookie } from "hono/cookie";
import { googleOAuthToken, googleIdToken } from "../types/google_auth_types";
import db from "../db/db";
import { ulid } from "ulid";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { admin, sessions } from "../db/schema/admin";
import { customers } from "../db/schema/customers";

const STATE_COOKIE = "png_state";
export const SESSION_COOKIE = "png_session";
dayjs.extend(duration);
const SESSION_LENGTH = dayjs.duration({ days: 30 });

// Safari-compatible cookie settings with multiple strategies
const getCookieOptions = (isSecure: boolean) => ({
  httpOnly: true,
  secure: isSecure,
  sameSite: "None" as const,
  path: "/",
  maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
});

let googleClient: any;

async function initializeGoogleClient() {
  if (!googleClient) {
    googleClient = await client.discovery(
      new URL("https://accounts.google.com/.well-known/openid-configuration"),
      appEnv.GOOGLE_CLIENT_ID,
      appEnv.GOOGLE_CLIENT_SECRET
    );
  }
  return googleClient;
}

const googleAuthRoutes = new Hono();
googleAuthRoutes.get("/", async (c) => {
  const googleClientInstance = await initializeGoogleClient();
  const state = crypto.getRandomValues(new Uint8Array(32)).join("");

  // Set state cookie with Safari-compatible settings
  setCookie(c, STATE_COOKIE, state, getCookieOptions(!isLocal));

  const redirect = client.buildAuthorizationUrl(googleClientInstance, {
    redirect_uri: appEnv.GOOGLE_REDIRECT_URI!,
    scope: "openid email profile",
    state,
    prompt: "select_account", // Force account selection to help with ITP
  });

  return c.redirect(redirect.toString());
});

class GoogleAuthError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}
googleAuthRoutes.get("/callback", async (c) => {
  const stateCookie = getCookie(c, STATE_COOKIE);
  deleteCookie(c, STATE_COOKIE, getCookieOptions(!isLocal));

  let rawToken;
  const url = new URL(c.req.url);
  const urlOfRedirect = new URL(appEnv.GOOGLE_REDIRECT_URI!);

  if (
    urlOfRedirect.protocol === "https:" ||
    urlOfRedirect.protocol === "http:"
  ) {
    url.protocol = urlOfRedirect.protocol;
  }

  try {
    const googleClientInstance = await initializeGoogleClient();
    rawToken = await client.authorizationCodeGrant(googleClientInstance, url, {
      expectedState: stateCookie,
    });
  } catch (e) {
    // handle error
    if (e instanceof client.ClientError) {
      if (e.code && e.code === "OAUTH_INVALID_RESPONSE") {
        if (
          (e.cause as { message?: string } | undefined)?.message ===
          `unexpected "state" response parameter encountered`
        )
          throw new GoogleAuthError("invalid_state", "Invalid state parameter");
      }
    } else if (e instanceof client.ResponseBodyError) {
      console.log("Response Body Error", e.response, e.cause);
      console.log(url.toString());
    }

    console.error(e);
    throw new GoogleAuthError("oauth_error", "Unexpected oauth error");
  }

  const tokenParse = googleOAuthToken.safeParse(rawToken);

  if (!tokenParse.success) {
    console.error(tokenParse.error);
    throw new GoogleAuthError("parse_token", "Unexpected error parsing token");
  }
  const token = tokenParse.data;

  if (
    !token.scope
      .split(" ")
      .includes("https://www.googleapis.com/auth/userinfo.profile")
  ) {
    throw new GoogleAuthError("invalid_scope", "Invalid scope");
  }

  const typedIdToken = googleIdToken.safeParse(
    JSON.parse(atob(token.id_token.split(".")[1]))
  );
  if (!typedIdToken.success) {
    console.error(typedIdToken.error);
    throw new GoogleAuthError(
      "parse_id_token",
      "Unexpected error parsing id token"
    );
  }

  if (!typedIdToken.data.email_verified)
    throw new GoogleAuthError("email_not_verified", "Email not verified");

  // Check if user is admin or customer
  const isAdmin = typedIdToken.data.email === appEnv.ADMIN_EMAIL;
  let user: any;

  if (isAdmin) {
    // Handle admin user
    let findAdmin = await db
      .select()
      .from(admin)
      .where(eq(admin.email, typedIdToken.data.email));
    if (findAdmin.length === 0) {
      findAdmin = await db
        .insert(admin)
        .values({
          id: ulid(),
          email: typedIdToken.data.email,
          name: typedIdToken.data.name,
          profile_picture_url: typedIdToken.data.picture || null,
        } satisfies typeof admin.$inferInsert)
        .returning();

      if (findAdmin.length === 0)
        throw new GoogleAuthError("database_error", "Database error");
    }

    // admin exists - update profile info if needed
    if (
      typedIdToken.data.picture &&
      findAdmin[0].profile_picture_url != typedIdToken.data.picture
    ) {
      const update = await db
        .update(admin)
        .set({ profile_picture_url: typedIdToken.data.picture })
        .where(eq(admin.id, findAdmin[0].id))
        .returning({ profile_picture_url: admin.profile_picture_url });

      if (update.length === 0)
        throw new GoogleAuthError("database_error", "Database update error");
      findAdmin[0].profile_picture_url = update[0].profile_picture_url;
    }

    if (findAdmin[0].name != typedIdToken.data.name) {
      const update = await db
        .update(admin)
        .set({ name: typedIdToken.data.name })
        .where(eq(admin.id, findAdmin[0].id))
        .returning({ name: admin.name });

      if (update.length === 0)
        throw new GoogleAuthError("database_error", "Database update error");
      findAdmin[0].name = update[0].name;
    }

    user = findAdmin[0];
  } else {
    // Handle customer user
    let findCustomer = await db
      .select()
      .from(customers)
      .where(eq(customers.email, typedIdToken.data.email));
    if (findCustomer.length === 0) {
      findCustomer = await db
        .insert(customers)
        .values({
          id: ulid(),
          name: typedIdToken.data.name,
          email: typedIdToken.data.email,
          phone: "", // Will be updated later
        } satisfies typeof customers.$inferInsert)
        .returning();

      if (findCustomer.length === 0)
        throw new GoogleAuthError("database_error", "Database error");
    }

    // Update customer profile if needed
    if (findCustomer[0].name != typedIdToken.data.name) {
      const update = await db
        .update(customers)
        .set({ name: typedIdToken.data.name })
        .where(eq(customers.id, findCustomer[0].id))
        .returning({ name: customers.name });

      if (update.length === 0)
        throw new GoogleAuthError("database_error", "Database update error");
      findCustomer[0].name = update[0].name;
    }

    user = findCustomer[0];
  }

  const session = await db
    .insert(sessions)
    .values({
      id: ulid(),
      user_id: user.id,
      user_type: isAdmin ? "admin" : "customer",
      session_id: nanoid(32),
      expires_at: dayjs().add(SESSION_LENGTH).toDate(),
    } satisfies typeof sessions.$inferInsert)
    .returning();

  if (session.length === 0)
    throw new GoogleAuthError("session_db_error", "Session database error");

  // Set session cookie with Safari-compatible settings
  setCookie(c, SESSION_COOKIE, session[0].session_id, {
    ...getCookieOptions(!isLocal),
    expires: session[0].expires_at,
  });

  // Add additional headers to help with Safari ITP
  c.header("Cache-Control", "no-cache, no-store, must-revalidate");
  c.header("Pragma", "no-cache");
  c.header("Expires", "0");

  // Redirect based on user role
  const frontendBase = (appEnv.FRONTEND_URL || "").replace(/\/$/, "");
  const redirectUrl = isAdmin
    ? `${frontendBase}/admin`
    : `${frontendBase}/bookings`;

  return c.redirect(redirectUrl);
});

googleAuthRoutes.onError((err, c) => {
  if (err instanceof GoogleAuthError) {
    const frontendBase = (appEnv.FRONTEND_URL || "").replace(/\/$/, "");
    return c.redirect(
      `${frontendBase}/login?error=${encodeURIComponent(err.code)}`
    );
  }

  throw err;
});

const authRoutes = new Hono();
authRoutes.route("/google", googleAuthRoutes);

// Get current user info
authRoutes.get("/me", async (c) => {
  const sessionId = getCookie(c, SESSION_COOKIE);

  if (!sessionId) {
    return c.json({ error: "Not authenticated" }, 401);
  }

  try {
    // Find the session
    const session = await db
      .select()
      .from(sessions)
      .where(eq(sessions.session_id, sessionId));

    if (session.length === 0) {
      return c.json({ error: "Invalid session" }, 401);
    }

    const currentSession = session[0];

    // Check if session is expired
    if (new Date() > currentSession.expires_at) {
      // Delete expired session
      await db.delete(sessions).where(eq(sessions.session_id, sessionId));
      return c.json({ error: "Session expired" }, 401);
    }

    // Get user info based on user type
    if (currentSession.user_type === "admin") {
      const adminUser = await db
        .select()
        .from(admin)
        .where(eq(admin.id, currentSession.user_id));

      if (adminUser.length === 0) {
        return c.json({ error: "User not found" }, 404);
      }

      return c.json({
        id: adminUser[0].id,
        email: adminUser[0].email,
        name: adminUser[0].name,
        picture: adminUser[0].profile_picture_url,
        type: "admin",
      });
    } else {
      const customerUser = await db
        .select()
        .from(customers)
        .where(eq(customers.id, currentSession.user_id));

      if (customerUser.length === 0) {
        return c.json({ error: "User not found" }, 404);
      }

      return c.json({
        id: customerUser[0].id,
        email: customerUser[0].email,
        name: customerUser[0].name,
        phone: customerUser[0].phone,
        type: "customer",
      });
    }
  } catch (error) {
    console.error("Error getting user info:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

authRoutes.delete("/logout", async (c) => {
  const sessionId = getCookie(c, SESSION_COOKIE);

  if (!sessionId) {
    return c.json({ success: true });
  }

  // Delete the session from the database
  await db.delete(sessions).where(eq(sessions.session_id, sessionId));

  // Delete the cookie from the browser
  deleteCookie(c, SESSION_COOKIE, getCookieOptions(!isLocal));

  return c.json({ success: true });
});

export default authRoutes;
