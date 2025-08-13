import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookings-controllers";

import { Hono } from "hono";

const bookingsRouter = new Hono();

bookingsRouter.get("/", ...getBookings);
bookingsRouter.get("/:id", ...getBookingById);
bookingsRouter.post("/", ...createBooking);
bookingsRouter.put("/:id", ...updateBooking);
bookingsRouter.delete("/:id", ...deleteBooking);
