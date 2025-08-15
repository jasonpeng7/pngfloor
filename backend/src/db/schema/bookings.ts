import * as t from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { schema } from "./generic";

export const bookings = schema.table("bookings", {
  id: t.varchar("id", { length: 26 }).primaryKey(),
  customer_id: t
    .varchar("customer_id", { length: 26 })
    .references(() => customers.id)
    .notNull(),
  date: t.timestamp("date").notNull(),
  name: t.varchar("name", { length: 255 }).notNull(),
  email: t.varchar("email", { length: 255 }).notNull(),
  address: t.varchar("address", { length: 255 }).notNull(),
  phone_number: t.varchar("phone_number", { length: 255 }).notNull(),
  house_size: t.integer("house_size").notNull(),
  rooms: t.varchar("rooms", { length: 255 }).notNull(),
  service: t.varchar("service", { length: 255 }).notNull(),
  message: t.text("message").notNull(),
  status: t.varchar("status", { length: 255 }).default("pending"),
});
