import { db } from "./database";
import { incomes, expenses } from "./schema";
import type { InferInsertModel } from "drizzle-orm";

export async function createIncome(data: InferInsertModel<typeof incomes>) {
  const result = await db.insert(incomes).values(data).returning();
  return result[0];
}

export async function createExpense(data: InferInsertModel<typeof expenses>) {
  const result = await db.insert(expenses).values(data).returning();
  return result[0];
}

export async function getIncomes() {
  return await db.select().from(incomes);
}

export async function getExpenses() {
  return await db.select().from(expenses);
}

