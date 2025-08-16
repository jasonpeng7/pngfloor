import { createFactory } from "hono/factory";
import db from "../db/db";
import { bookings } from "../db/schema/bookings";
import { ulid } from "ulid";
import { eq } from "drizzle-orm";

const factory = createFactory();

export const getBookings = factory.createHandlers(async (c) => {
  console.log("getting all bookings...");
  const read = await db.select().from(bookings);
  if (read.length === 0) return c.json({ error: "No bookings found" }, 404);
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
  try {
    const [newBooking] = await db
      .insert(bookings)
      .values({
        id: new_bookingId,
        customer_id: body.customer_id,
        date: new Date(body.date),
        name: body.name,
        email: body.email,
        address: body.address,
        phone_number: body.phone_number,
        house_size: body.house_size,
        rooms: body.rooms,
        service: body.service,
        message: body.message,
        status: body.status || "pending",
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
