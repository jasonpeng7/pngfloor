import { uuid, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  customer_id: uuid("customer_id")
    .references(() => customers.id)
    .notNull(),
  date: timestamp("date").notNull(),
  status: text("status").default("pending"),
});
