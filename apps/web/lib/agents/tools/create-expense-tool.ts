import { createExpense } from "@economy-app/backend";
import { tool } from "ai";
import { z } from "zod";

const createExpenseSchema = z.object({
  amount: z.number().describe("The expense amount as a number"),
  description: z.string().describe("Description of the expense"),
  type: z
    .enum(["fixed", "dynamic"])
    .describe(
      'Type: "fixed" for recurring expenses (rent, subscriptions), "dynamic" for one-time expenses'
    ),
  category: z
    .string()
    .optional()
    .describe(
      'Optional category for the expense (e.g., "Food", "Transport", "Bills", "Entertainment")'
    ),
  // For fixed expenses
  recurrencePattern: z
    .enum(["daily", "weekly", "monthly", "yearly"])
    .optional()
    .describe("Required for fixed expenses: how often it occurs"),
  startDate: z
    .string()
    .optional()
    .describe("Required for fixed expenses: start date in YYYY-MM-DD format"),
  endDate: z
    .string()
    .optional()
    .describe(
      "Optional for fixed expenses: end date in YYYY-MM-DD format (null if ongoing)"
    ),
  // For dynamic expenses
  expenseDate: z
    .string()
    .optional()
    .describe(
      "Required for dynamic expenses: date when expense occurred in YYYY-MM-DD format"
    ),
});

export function createExpenseTool(userId: string) {
  return tool({
    description:
      "Create a new expense entry (fixed recurring expense or dynamic one-time expense)",
    inputSchema: createExpenseSchema,
    execute: async (params) => {
      const data: {
        amount: string;
        description: string;
        type: "fixed" | "dynamic";
        category: string | null;
        recurrencePattern?: "daily" | "weekly" | "monthly" | "yearly";
        startDate?: string;
        endDate?: string | null;
        expenseDate?: string;
      } = {
        amount: params.amount.toString(),
        description: params.description,
        type: params.type,
        category: params.category || null,
      };

      if (params.type === "fixed") {
        if (!params.recurrencePattern || !params.startDate) {
          throw new Error(
            "Fixed expenses require recurrencePattern and startDate"
          );
        }
        data.recurrencePattern = params.recurrencePattern;
        data.startDate = params.startDate;
        data.endDate = params.endDate || null;
      } else {
        data.expenseDate =
          params.expenseDate || new Date().toISOString().split("T")[0];
      }

      const result = await createExpense(userId, data);
      return {
        success: true,
        expense: result,
        message: `Successfully created ${params.type} expense: ${params.description} for $${params.amount}`,
      };
    },
  });
}

