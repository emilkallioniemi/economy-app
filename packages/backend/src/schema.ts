import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Dummy table for testing
export const dummy = pgTable("dummy", {
  id: serial("id").primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});
