import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const links = pgTable("links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull(),
  originalUrl: text("original_url").notNull(),
  shortCode: text("short_code").notNull().unique(),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Type inference for type-safe queries
export type Link = InferSelectModel<typeof links>;
export type NewLink = InferInsertModel<typeof links>;
