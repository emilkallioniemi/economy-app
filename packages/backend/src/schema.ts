import {
  pgTable,
  serial,
  text,
  timestamp,
  decimal,
  date,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

// Dummy table for testing
export const dummy = pgTable("dummy", {
  id: serial("id").primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Enum for entry type (fixed or dynamic)
export const entryTypeEnum = pgEnum("entry_type", ["fixed", "dynamic"]);

// Enum for recurrence pattern (for fixed entries)
export const recurrencePatternEnum = pgEnum("recurrence_pattern", [
  "daily",
  "weekly",
  "monthly",
  "yearly",
]);

// Incomes table
export const incomes = pgTable("incomes", {
  id: serial("id").primaryKey(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  type: entryTypeEnum("type").notNull(),
  category: text("category"),
  // For fixed incomes: recurrence information
  recurrencePattern: recurrencePatternEnum("recurrence_pattern"),
  startDate: date("start_date"),
  endDate: date("end_date"), // Optional, null if ongoing
  // For dynamic incomes: specific date when income occurred
  incomeDate: date("income_date"),
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

// Expenses table
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  type: entryTypeEnum("type").notNull(),
  category: text("category"),
  // For fixed expenses: recurrence information
  recurrencePattern: recurrencePatternEnum("recurrence_pattern"),
  startDate: date("start_date"),
  endDate: date("end_date"), // Optional, null if ongoing
  // For dynamic expenses: specific date when expense occurred
  expenseDate: date("expense_date"),
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});
