import { openai } from "@ai-sdk/openai";
import { ToolLoopAgent } from "ai";
import { createExpenseTool } from "./tools/create-expense-tool";
import { createIncomeTool } from "./tools/create-income-tool";
import { getIncomesTool } from "./tools/get-incomes-tool";
import { getExpensesTool } from "./tools/get-expenses-tool";

export const financeAgent = new ToolLoopAgent({
  model: openai("gpt-4o-mini"),
  instructions:
    "You are a helpful financial assistant. Help users manage their incomes and expenses by creating entries when they ask. You can also answer questions about their existing incomes and expenses. For fixed/recurring entries, make sure to get the recurrence pattern and start date. For dynamic/one-time entries, use today's date if not specified. When users ask about their finances, use the query tools to retrieve and analyze their data.",
  tools: {
    createIncome: createIncomeTool,
    createExpense: createExpenseTool,
    getIncomes: getIncomesTool,
    getExpenses: getExpensesTool,
  },
});
