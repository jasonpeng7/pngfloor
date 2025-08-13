import { Hono } from "hono";
import db from "../db/db";
import { bookings } from "../db/schema/bookings";
import { customers } from "../db/schema/customers";
import { eq } from "drizzle-orm";

const bookingsRouter = new Hono();

// get all bookings
bookingsRouter.get("/", async (c) => {
  try {
    const allBookings = await db.select().from(bookings);
    return c.json(allBookings);
  } catch (error) {
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

// booking by id
bookingsRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const booking = await db.select().from(bookings).where(eq(bookings.id, id));

    if (booking.length === 0) {
      return c.json({ error: "Booking not found" }, 404);
    }

    return c.json(booking[0]);
  } catch (error) {
    return c.json({ error: "Failed to fetch booking" }, 500);
  }
});

// create new booking
bookingsRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();

    // Verify customer exists
    const customer = await db
      .select()
      .from(customers)
      .where(eq(customers.id, body.customer_id));
    if (customer.length === 0) {
      return c.json({ error: "Customer not found" }, 400);
    }

    const newBooking = await db.insert(bookings).values(body).returning();
    return c.json(newBooking[0]);
  } catch (error) {
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// update booking
bookingsRouter.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    // verify customer exists
    if (body.customer_id) {
      const customer = await db
        .select()
        .from(customers)
        .where(eq(customers.id, body.customer_id));
      if (customer.length === 0) {
        return c.json({ error: "Customer not found" }, 400);
      }
    }

    const updatedBooking = await db
      .update(bookings)
      .set(body)
      .where(eq(bookings.id, id))
      .returning();

    if (updatedBooking.length === 0) {
      return c.json({ error: "Booking not found" }, 404);
    }

    return c.json(updatedBooking[0]);
  } catch (error) {
    return c.json({ error: "Failed to update booking" }, 500);
  }
});

// delete booking
bookingsRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deletedBooking = await db
      .delete(bookings)
      .where(eq(bookings.id, id))
      .returning();

    if (deletedBooking.length === 0) {
      return c.json({ error: "Booking not found" }, 404);
    }

    return c.json({ message: "Booking deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete booking" }, 500);
  }
});

export default bookingsRouter;
