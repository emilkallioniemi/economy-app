// Export database connection
export { db, client } from "./database";

// Export schema
export {
  incomes,
  expenses,
  users,
  entryTypeEnum,
  recurrencePatternEnum,
} from "./schema";

// Export query functions
export {
  createIncome,
  createExpense,
  getIncomes,
  getExpenses,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} from "./queries";

// Export types
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { incomes, expenses, users } from "./schema";

export type Income = InferSelectModel<typeof incomes>;
export type Expense = InferSelectModel<typeof expenses>;
export type User = InferSelectModel<typeof users>;
export type NewIncome = InferInsertModel<typeof incomes>;
export type NewExpense = InferInsertModel<typeof expenses>;
export type NewUser = InferInsertModel<typeof users>;
