import * as t from "drizzle-orm/pg-core";

export const schema = t.pgSchema("pngfloorv1");

export const timestamps = {
  created_at: t.timestamp("created_at").defaultNow().notNull(),
  updated_at: t.timestamp("updated_at"),
  deleted_at: t.timestamp("deleted_at"),
};
