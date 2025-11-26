import { financeAgent } from "@/lib/agents/finance-agent";
import { createAgentUIStreamResponse } from "ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { messages } = await request.json();

  return createAgentUIStreamResponse({
    agent: financeAgent,
    messages,
  });
}
