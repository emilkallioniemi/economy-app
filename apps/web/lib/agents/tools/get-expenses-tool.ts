import { getExpenses } from "@economy-app/backend";
import { tool } from "ai";
import { z } from "zod";

const getExpensesSchema = z.object({
  category: z
    .string()
    .optional()
    .describe(
      "Optional filter by category (e.g., 'Food', 'Transport', 'Bills')"
    ),
  type: z
    .enum(["fixed", "dynamic"])
    .optional()
    .describe(
      "Optional filter by type: 'fixed' for recurring, 'dynamic' for one-time"
    ),
});

export function getExpensesTool(userId: string) {
  return tool({
    description:
      "Get all expense entries. Can optionally filter by category or type (fixed/dynamic). Returns a list of all expenses with details like amount, description, category, type, dates, etc.",
    inputSchema: getExpensesSchema,
    execute: async (params) => {
      const expenses = await getExpenses(userId);

      // Filter by category if provided
      let filtered = expenses;
      if (params.category) {
        filtered = filtered.filter(
          (expense) =>
            expense.category?.toLowerCase() === params.category?.toLowerCase()
        );
      }

      // Filter by type if provided
      if (params.type) {
        filtered = filtered.filter((expense) => expense.type === params.type);
      }

      // Calculate totals
      const totalAmount = filtered.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0
      );

      return {
        success: true,
        count: filtered.length,
        totalAmount: totalAmount.toFixed(2),
        expenses: filtered.map((expense) => ({
          id: expense.id,
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
          type: expense.type,
          recurrencePattern: expense.recurrencePattern,
          startDate: expense.startDate,
          endDate: expense.endDate,
          expenseDate: expense.expenseDate,
          createdAt: expense.createdAt,
          isActive: expense.isActive,
        })),
        message: `Found ${filtered.length} expense${
          filtered.length !== 1 ? "s" : ""
        } with total amount of $${totalAmount.toFixed(2)}`,
      };
    },
  });
}
