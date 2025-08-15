import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsByCustomerId,
  cancelBooking,
} from "../controllers/bookings-controllers";

import { Hono } from "hono";

const bookingsRouter = new Hono();

bookingsRouter.get("/", ...getBookings);
bookingsRouter.get("/user/:customerId", ...getBookingsByCustomerId);
bookingsRouter.get("/:id", ...getBookingById);
bookingsRouter.post("/", ...createBooking);
bookingsRouter.put("/:id", ...updateBooking);
bookingsRouter.delete("/:id", ...deleteBooking);
bookingsRouter.delete("/:id/cancel/:customerId", ...cancelBooking);

export default bookingsRouter;
