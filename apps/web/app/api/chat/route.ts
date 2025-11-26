import { createFinanceAgent } from "@/lib/agents/finance-agent";
import { auth } from "@clerk/nextjs/server";
import { createAgentUIStreamResponse } from "ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await request.json();

  const financeAgent = createFinanceAgent(userId);

  return createAgentUIStreamResponse({
    agent: financeAgent,
    messages,
  });
}
