import * as t from "drizzle-orm/pg-core";
import { schema, timestamps } from "./generic";

export const customers = schema.table("customers", {
  id: t.varchar("id", { length: 26 }).primaryKey(),
  name: t.varchar("name", { length: 255 }).notNull(),
  email: t.varchar("email", { length: 255 }),
  phone: t.varchar("phone", { length: 255 }).notNull(),
  ...timestamps,
});
