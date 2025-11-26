import { getIncomes } from "@economy-app/backend";
import { tool } from "ai";
import { z } from "zod";

const getIncomesSchema = z.object({
  category: z
    .string()
    .optional()
    .describe("Optional filter by category (e.g., 'Salary', 'Freelance')"),
  type: z
    .enum(["fixed", "dynamic"])
    .optional()
    .describe(
      "Optional filter by type: 'fixed' for recurring, 'dynamic' for one-time"
    ),
});

export function getIncomesTool(userId: string) {
  return tool({
    description:
      "Get all income entries. Can optionally filter by category or type (fixed/dynamic). Returns a list of all incomes with details like amount, description, category, type, dates, etc.",
    inputSchema: getIncomesSchema,
    execute: async (params) => {
      const incomes = await getIncomes(userId);

      // Filter by category if provided
      let filtered = incomes;
      if (params.category) {
        filtered = filtered.filter(
          (income) =>
            income.category?.toLowerCase() === params.category?.toLowerCase()
        );
      }

      // Filter by type if provided
      if (params.type) {
        filtered = filtered.filter((income) => income.type === params.type);
      }

      // Calculate totals
      const totalAmount = filtered.reduce(
        (sum, income) => sum + parseFloat(income.amount),
        0
      );

      return {
        success: true,
        count: filtered.length,
        totalAmount: totalAmount.toFixed(2),
        incomes: filtered.map((income) => ({
          id: income.id,
          amount: income.amount,
          description: income.description,
          category: income.category,
          type: income.type,
          recurrencePattern: income.recurrencePattern,
          startDate: income.startDate,
          endDate: income.endDate,
          incomeDate: income.incomeDate,
          createdAt: income.createdAt,
          isActive: income.isActive,
        })),
        message: `Found ${filtered.length} income${
          filtered.length !== 1 ? "s" : ""
        } with total amount of $${totalAmount.toFixed(2)}`,
      };
    },
  });
}
