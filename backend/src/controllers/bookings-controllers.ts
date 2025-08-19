import { createFactory } from "hono/factory";
import db from "../db/db";
import { bookings } from "../db/schema/bookings";
import { ulid } from "ulid";
import { eq } from "drizzle-orm";

const factory = createFactory();

export const getBookings = factory.createHandlers(async (c) => {
  console.log("getting all bookings...");
  const read = await db.select().from(bookings);
  return c.json(read);
});

export const getBookingById = factory.createHandlers(async (c) => {
  const bookingID = c.req.param("id");
  if (!bookingID) return c.json({ error: "Booking ID is required" }, 400);
  const result = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, bookingID));
  if (result.length === 0) return c.json({ error: "Booking not found" }, 404);
  return c.json(result[0]);
});

export const createBooking = factory.createHandlers(async (c) => {
  const new_bookingId = ulid();
  const body = await c.req.json();

  // Basic validation/coercion to avoid 500s from bad payloads
  const requiredString = (val: unknown) =>
    typeof val === "string" && val.trim().length > 0 ? val.trim() : null;
  const requiredInt = (val: unknown) => {
    if (typeof val === "number" && Number.isFinite(val)) return Math.trunc(val);
    if (typeof val === "string" && val.trim() !== "") {
      const parsed = parseInt(val, 10);
      return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
  };

  const payload = {
    customer_id: requiredString(body.customer_id),
    date: requiredString(body.date),
    name: requiredString(body.name),
    email: requiredString(body.email),
    address: requiredString(body.address),
    phone_number: requiredString(body.phone_number),
    house_size: requiredInt(body.house_size),
    lived_in: requiredString(body.lived_in),
    rooms: requiredString(body.rooms),
    service: requiredString(body.service),
    message:
      typeof body.message === "string" ? body.message : body.message ?? "",
    status: typeof body.status === "string" ? body.status : "pending",
  } as const;

  const missing = Object.entries(payload)
    .filter(([key, value]) =>
      ["message", "status"].includes(key) ? false : value === null
    )
    .map(([key]) => key);

  if (missing.length > 0) {
    return c.json(
      {
        error: "Missing or invalid fields",
        fields: missing,
      },
      400
    );
  }

  try {
    const [newBooking] = await db
      .insert(bookings)
      .values({
        id: new_bookingId,
        customer_id: payload.customer_id!,
        date: new Date(payload.date!),
        name: payload.name!,
        email: payload.email!,
        address: payload.address!,
        phone_number: payload.phone_number!,
        house_size: payload.house_size!,
        lived_in: payload.lived_in!,
        rooms: payload.rooms!,
        service: payload.service!,
        message: payload.message,
        status: payload.status,
      })
      .returning();
    console.log("Booking created successfully:", newBooking);
    return c.json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return c.json(
      {
        error: "Failed to create booking",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

export const updateBooking = factory.createHandlers(async (c) => {
  const bookingId = c.req.param("id");
  if (!bookingId) return c.json({ error: "Booking ID is required" }, 400);
  const body = await c.req.json();
  try {
    const [updatedBooking] = await db
      .update(bookings)
      .set({
        house_size: body.house_size,
        rooms: body.rooms,
        message: body.message,
      })
      .where(eq(bookings.id, bookingId))
      .returning();

    return c.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return c.json({ error: "Failed to update booking" }, 500);
  }
});

export const deleteBooking = factory.createHandlers(async (c) => {
  const bookingId = c.req.param("id");
  if (!bookingId) return c.json({ error: "Booking ID is required" }, 400);
  const deletedBooking = await db
    .delete(bookings)
    .where(eq(bookings.id, bookingId))
    .returning();
  if (deletedBooking.length === 0)
    return c.json({ error: "Booking not found" }, 404);
  return c.json(deletedBooking[0]);
});

export const getBookingsByCustomerId = factory.createHandlers(async (c) => {
  const customerId = c.req.param("customerId");
  if (!customerId) return c.json({ error: "Customer ID is required" }, 400);

  const result = await db
    .select()
    .from(bookings)
    .where(eq(bookings.customer_id, customerId));

  // return empty array instead of 404 error when no bookings found
  return c.json(result);
});

export const cancelBooking = factory.createHandlers(async (c) => {
  const bookingId = c.req.param("id");
  if (!bookingId) return c.json({ error: "Booking ID is required" }, 400);
  const customerId = c.req.param("customerId");
  if (!customerId) return c.json({ error: "Customer ID is required" }, 400);

  const deletedBooking = await db
    .delete(bookings)
    .where(eq(bookings.id, bookingId))
    .returning();

  if (deletedBooking.length === 0)
    return c.json({ error: "Booking not found" }, 404);
  return c.json(deletedBooking[0]);
});

export const updateBookingStatus = factory.createHandlers(async (c) => {
  const bookingId = c.req.param("id");
  if (!bookingId) return c.json({ error: "Booking ID is required" }, 400);
  const body = await c.req.json();

  if (!body.status) return c.json({ error: "Status is required" }, 400);

  try {
    const [updatedBooking] = await db
      .update(bookings)
      .set({
        status: body.status,
      })
      .where(eq(bookings.id, bookingId))
      .returning();

    if (!updatedBooking) {
      return c.json({ error: "Booking not found" }, 404);
    }

    return c.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking status:", error);
    return c.json({ error: "Failed to update booking status" }, 500);
  }
});
