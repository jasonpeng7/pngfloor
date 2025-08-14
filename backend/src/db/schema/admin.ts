import * as t from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { schema, timestamps } from "./generic";

// contains google info for admin login
export const admin = schema.table("admin", {
  id: t.varchar({ length: 26 }).primaryKey(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  profile_picture_url: t.text(),
});

export const adminRelations = relations(admin, ({ many }) => ({
  sessions: many(sessions),
}));

// sessions table for both admin and customer login
export const sessions = schema.table("sessions", {
  id: t.varchar({ length: 26 }).primaryKey(),
  user_id: t.varchar({ length: 26 }).notNull(), // Can be admin_id or customer_id
  user_type: t.text().notNull(), // "admin" or "customer"
  session_id: t.varchar({ length: 64 }).notNull().unique(),
  expires_at: t.timestamp().notNull(),
  ...timestamps,
});

// one session to one admin
export const sessionsRelations = relations(sessions, ({ one }) => ({
  admin: one(admin, {
    fields: [sessions.user_id],
    references: [admin.id],
  }),
}));
