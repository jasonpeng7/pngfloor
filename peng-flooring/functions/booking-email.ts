// Cloudflare Pages Function: POST /booking-email
// Sends your booking form as an email via Gmail API using a long-lived refresh token.

interface Env {
  GMAIL_SENDER?: string;
  GMAIL_TO?: string;
  GMAIL_CLIENT_ID?: string;
  GMAIL_CLIENT_SECRET?: string;
  GMAIL_REFRESH_TOKEN?: string;
  ALLOWED_ORIGIN?: string;
}

interface BookingData {
  customer_id?: string;
  date?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  lived_in?: string;
  service?: string;
  house_size?: string;
  rooms?: string;
  message?: string;
  status?: string;
  hp_trap?: string;
}

interface Booking {
  customer_id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  lived_in: string;
  service: string;
  house_size: string;
  rooms: string;
  message: string;
  status: string;
  user_agent: string;
  ip: string;
}

export async function onRequest({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) {
  // Handle OPTIONS requests for CORS
  if (request.method === "OPTIONS") {
    return corsResponse(env, new Response(null, { status: 204 }));
  }

  // Only handle POST requests
  if (request.method !== "POST") {
    return corsResponse(
      env,
      json({ success: false, error: "Method not allowed" }, 405)
    );
  }
  try {
    // --- CORS & basic checks ---
    const origin = request.headers.get("Origin") || "";
    if (!isAllowedOrigin(origin, env)) {
      return corsResponse(
        env,
        json({ success: false, error: "Origin not allowed" }, 403)
      );
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      return corsResponse(
        env,
        json({ success: false, error: "Invalid content type" }, 415)
      );
    }

    const data: BookingData = await request.json();
    // Simple honeypot (optional): if a hidden field comes filled, drop it.
    if (typeof data.hp_trap === "string" && data.hp_trap.trim().length > 0) {
      return corsResponse(
        env,
        json({ success: true, message: "Thanks!" }, 200)
      ); // pretend success
    }

    // --- Validate & sanitize a bit ---
    const safe = (v: unknown): string =>
      String(v ?? "")
        .toString()
        .slice(0, 2000);
    const booking: Booking = {
      customer_id: safe(data.customer_id),
      date: safe(data.date),
      name: safe(data.name),
      email: safe(data.email),
      phone: safe(data.phone_number),
      address: safe(data.address),
      lived_in: safe(data.lived_in),
      service: safe(data.service),
      house_size: safe(data.house_size),
      rooms: safe(data.rooms),
      message: safe(data.message),
      status: safe(data.status || "pending"),
      user_agent: request.headers.get("User-Agent") || "",
      ip: request.headers.get("CF-Connecting-IP") || "",
    };

    // For testing without Gmail API credentials, just log and return success
    console.log("Booking request received:", {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      address: booking.address,
      service: booking.service,
      house_size: booking.house_size,
      rooms: booking.rooms,
      lived_in: booking.lived_in,
      message: booking.message,
      date: booking.date,
    });

    // Check if Gmail credentials are available
    if (
      !env.GMAIL_CLIENT_ID ||
      !env.GMAIL_CLIENT_SECRET ||
      !env.GMAIL_REFRESH_TOKEN
    ) {
      return corsResponse(
        env,
        json(
          {
            success: true,
            message:
              "Your estimate request has been submitted successfully! We'll contact you within 48 hours.",
            note: "Gmail API not configured - booking logged only",
          },
          200
        )
      );
    }

    // --- Build the email ---
    const subject = `New Booking Request — ${booking.name || "Unknown"} (${
      booking.service || "Service"
    })`;
    const textBody = `New Booking Request
  
  Name: ${booking.name}
  Email: ${booking.email}
  Phone: ${booking.phone}
  Address: ${booking.address}
  Service: ${booking.service}
  House Size: ${booking.house_size}
  Rooms: ${booking.rooms}
  Currently Lived In: ${booking.lived_in}
  Message:
  ${booking.message}
  
  Submitted: ${new Date().toISOString()}
  IP: ${booking.ip}
  UA: ${booking.user_agent}
  `;

    const htmlBody = `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(booking.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(booking.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(booking.phone)}</p>
        <p><strong>Address:</strong> ${escapeHtml(booking.address)}</p>
        <p><strong>Service:</strong> ${escapeHtml(booking.service)}</p>
        <p><strong>House Size:</strong> ${escapeHtml(booking.house_size)}</p>
        <p><strong>Rooms:</strong> ${escapeHtml(booking.rooms)}</p>
        <p><strong>Currently Lived In:</strong> ${escapeHtml(
          booking.lived_in
        )}</p>
        <p><strong>Message:</strong><br>${escapeHtml(booking.message).replace(
          /\n/g,
          "<br>"
        )}</p>
        <hr>
        <p><small>Submitted: ${new Date().toISOString()}</small></p>
        <p><small>IP: ${escapeHtml(booking.ip)}</small></p>
        <p><small>UA: ${escapeHtml(booking.user_agent)}</small></p>
      `;

    // Create RFC 2822 MIME message (multipart/alternative)
    const boundary = "mime_boundary_" + Math.random().toString(36).slice(2);
    const mime = [
      `From: ${env.GMAIL_SENDER}`,
      `To: ${env.GMAIL_TO}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      "",
      textBody,
      `--${boundary}`,
      `Content-Type: text/html; charset="UTF-8"`,
      "",
      htmlBody,
      `--${boundary}--`,
      "",
    ].join("\r\n");

    // Base64url encode for Gmail API
    const raw = base64UrlEncode(mime);

    // --- Get access token via refresh token ---
    const token = await getAccessToken(env);
    if (!token) {
      return corsResponse(
        env,
        json({ success: false, error: "OAuth token error" }, 500)
      );
    }

    // --- Send via Gmail API ---
    const sendResp = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw }),
      }
    );

    if (!sendResp.ok) {
      const errText = await sendResp.text();
      console.error("Gmail send error:", errText);
      return corsResponse(
        env,
        json({ success: false, error: "Failed to send email" }, 502)
      );
    }

    return corsResponse(
      env,
      json(
        { success: true, message: "Your estimate request has been emailed!" },
        200
      )
    );
  } catch (err) {
    console.error(err);
    return corsResponse(
      env,
      json({ success: false, error: "Server error" }, 500)
    );
  }
}

/* ---------- helpers ---------- */

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function base64UrlEncode(str: string): string {
  // TextEncoder → binary → base64 → base64url
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i]);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function getAccessToken(env: Env): Promise<string | null> {
  if (
    !env.GMAIL_CLIENT_ID ||
    !env.GMAIL_CLIENT_SECRET ||
    !env.GMAIL_REFRESH_TOKEN
  ) {
    return null;
  }

  const body = new URLSearchParams({
    client_id: env.GMAIL_CLIENT_ID,
    client_secret: env.GMAIL_CLIENT_SECRET,
    refresh_token: env.GMAIL_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!resp.ok) {
    console.error("Token fetch failed:", await resp.text());
    return null;
  }
  const json = await resp.json();
  return json.access_token;
}

function isAllowedOrigin(origin: string, env: Env): boolean {
  // For development, be more permissive
  if (!origin || origin === "null") {
    return true; // Allow requests without origin (like from curl)
  }

  // Single origin via env var, or allow localhost for dev
  const allowed = [
    env.ALLOWED_ORIGIN,
    "https://www.pengfloor.com",
    "https://pengfloor.com",
  ].filter(Boolean);

  console.log("Checking origin:", origin, "against allowed:", allowed);
  return !!allowed.find((o) => o === origin);
}

function corsResponse(env: Env, res: Response): Response {
  const headers = new Headers(res.headers);
  const origin = headers.get("Access-Control-Allow-Origin") || "";
  if (!origin) {
    // For development, be more permissive
    headers.set("Access-Control-Allow-Origin", "*");
  }
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(res.body, { status: res.status, headers });
}

function json(obj: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
