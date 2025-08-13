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
  status: t.varchar("status", { length: 255 }).default("pending"),
});
