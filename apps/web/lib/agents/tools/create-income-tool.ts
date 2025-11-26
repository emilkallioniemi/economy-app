import { createIncome } from "@economy-app/backend";
import { tool } from "ai";
import { z } from "zod";

const createIncomeSchema = z.object({
  amount: z.number().describe("The income amount as a number"),
  description: z.string().describe("Description of the income source"),
  type: z
    .enum(["fixed", "dynamic"])
    .describe(
      'Type: "fixed" for recurring income (salary, rent), "dynamic" for one-time income'
    ),
  category: z
    .string()
    .optional()
    .describe(
      'Optional category for the income (e.g., "Salary", "Freelance", "Investment")'
    ),
  // For fixed incomes
  recurrencePattern: z
    .enum(["daily", "weekly", "monthly", "yearly"])
    .optional()
    .describe("Required for fixed incomes: how often it occurs"),
  startDate: z
    .string()
    .optional()
    .describe("Required for fixed incomes: start date in YYYY-MM-DD format"),
  endDate: z
    .string()
    .optional()
    .describe(
      "Optional for fixed incomes: end date in YYYY-MM-DD format (null if ongoing)"
    ),
  // For dynamic incomes
  incomeDate: z
    .string()
    .optional()
    .describe(
      "Required for dynamic incomes: date when income occurred in YYYY-MM-DD format"
    ),
});

export function createIncomeTool(userId: string) {
  return tool({
    description:
      "Create a new income entry (fixed recurring income or dynamic one-time income)",
    inputSchema: createIncomeSchema,
    execute: async (params) => {
      const { amount, description, type, category, ...rest } = params;
      const data: {
        amount: string;
        description: string;
        type: "fixed" | "dynamic";
        category: string | null;
        recurrencePattern?: "daily" | "weekly" | "monthly" | "yearly";
        startDate?: string;
        endDate?: string | null;
        incomeDate?: string;
      } = {
        amount: amount.toString(),
        description,
        type,
        category: category || null,
      };

      if (type === "fixed") {
        if (!rest.recurrencePattern || !rest.startDate) {
          throw new Error(
            "Fixed incomes require recurrencePattern and startDate"
          );
        }
        data.recurrencePattern = rest.recurrencePattern;
        data.startDate = rest.startDate;
        data.endDate = rest.endDate || null;
      } else {
        data.incomeDate =
          rest.incomeDate || new Date().toISOString().split("T")[0];
      }

      const result = await createIncome(userId, data);
      return {
        success: true,
        income: result,
        message: `Successfully created ${type} income: ${description} for $${amount}`,
      };
    },
  });
}

