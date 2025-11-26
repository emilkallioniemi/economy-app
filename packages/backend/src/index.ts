// Export database connection
export { db, client } from "./database";

// Export schema
export {
  incomes,
  expenses,
  entryTypeEnum,
  recurrencePatternEnum,
} from "./schema";

// Export query functions
export {
  createIncome,
  createExpense,
  getIncomes,
  getExpenses,
} from "./queries";

// Export types
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import type { incomes, expenses } from "./schema";

export type Income = InferSelectModel<typeof incomes>;
export type Expense = InferSelectModel<typeof expenses>;
export type NewIncome = InferInsertModel<typeof incomes>;
export type NewExpense = InferInsertModel<typeof expenses>;
