import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { db } from "./database";
import { expenses, incomes, users } from "./schema";

// User queries
export async function createUser(data: InferInsertModel<typeof users>) {
  const result = await db.insert(users).values(data).returning();
  return result[0];
}

export async function updateUser(
  userId: string,
  data: Partial<InferInsertModel<typeof users>>
) {
  const result = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  return result[0];
}

export async function getUser(userId: string) {
  const result = await db.select().from(users).where(eq(users.id, userId));
  return result[0];
}

export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.id, userId));
}

// Income queries
export async function createIncome(
  userId: string,
  data: Omit<InferInsertModel<typeof incomes>, "userId">
) {
  if (!userId || typeof userId !== "string") {
    throw new Error("userId is required and must be a string");
  }
  const result = await db
    .insert(incomes)
    .values({ ...data, userId })
    .returning();
  return result[0];
}

export async function getIncomes(userId: string) {
  if (!userId || typeof userId !== "string") {
    throw new Error("userId is required and must be a string");
  }
  return await db.select().from(incomes).where(eq(incomes.userId, userId));
}

// Expense queries
export async function createExpense(
  userId: string,
  data: Omit<InferInsertModel<typeof expenses>, "userId">
) {
  if (!userId || typeof userId !== "string") {
    throw new Error("userId is required and must be a string");
  }
  const result = await db
    .insert(expenses)
    .values({ ...data, userId })
    .returning();
  return result[0];
}

export async function getExpenses(userId: string) {
  if (!userId || typeof userId !== "string") {
    throw new Error("userId is required and must be a string");
  }
  return await db.select().from(expenses).where(eq(expenses.userId, userId));
}
