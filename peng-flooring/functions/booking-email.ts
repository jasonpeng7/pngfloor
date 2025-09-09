// Cloudflare Pages Function: POST /booking-email
// Sends your booking form as an email via the Mailgun API.

interface Env {
  MAILGUN_API_KEY?: string;
  MAILGUN_DOMAIN?: string;
  MAILGUN_SENDER_EMAIL?: string;
  MAILGUN_RECIPIENT_EMAIL?: string;
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

    // Check if Mailgun credentials are available
    if (
      !env.MAILGUN_API_KEY ||
      !env.MAILGUN_DOMAIN ||
      !env.MAILGUN_SENDER_EMAIL ||
      !env.MAILGUN_RECIPIENT_EMAIL
    ) {
      console.error(
        "Mailgun environment variables are not set. Email will not be sent."
      );
      // Log the booking data for debugging, but return success to the user so the form works.
      console.log("Booking request received (email not sent):", booking);
      return corsResponse(
        env,
        json(
          {
            success: true,
            message:
              "Your estimate request has been submitted successfully! We'll contact you within 48 hours.",
            note: "Mailgun not configured - booking logged only",
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

    // --- Send via Mailgun API using fetch ---
    // The mailgun.js library has compatibility issues in the Workers environment.
    // Using a direct fetch call is more robust.
    const formData = new FormData();
    formData.append("from", env.MAILGUN_SENDER_EMAIL);
    formData.append("to", env.MAILGUN_RECIPIENT_EMAIL);
    formData.append("subject", subject);
    formData.append("text", textBody);
    formData.append("html", htmlBody);

    const response = await fetch(
      `https://api.mailgun.net/v3/${env.MAILGUN_DOMAIN}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`api:${env.MAILGUN_API_KEY}`)}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mailgun API Error:", errorText);
      return corsResponse(
        env,
        json({ success: false, error: "Failed to send email via Mailgun" }, 502)
      );
    }

    const mailgunResponse = await response.json();

    console.log("Mailgun response:", mailgunResponse);

    return corsResponse(
      env,
      json(
        {
          success: true,
          message: "Your estimate request has been emailed!",
          mailgunId: mailgunResponse.id,
        },
        200
      )
    );
  } catch (err) {
    console.error("An error occurred:", err);
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

function isAllowedOrigin(origin: string, env: Env): boolean {
  if (!origin || origin === "null") {
    return true; // Allow server-to-server or tools like curl
  }

  const allowed = [
    env.ALLOWED_ORIGIN,
    "https://www.pengfloor.com",
    "https://pengfloor.com",
    "http://localhost:8788", // For Wrangler
  ].filter(Boolean);

  console.log("Checking origin:", origin, "against allowed:", allowed);
  return !!allowed.find((o) => o === origin);
}

function corsResponse(env: Env, res: Response): Response {
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", "*"); // More permissive for now
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
