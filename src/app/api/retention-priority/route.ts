import { NextRequest, NextResponse } from "next/server";
import { callClaudeJSON } from "@/lib/claude";
import { ClientDetail, ClientPriority, ClientSummary } from "@/lib/distributorTypes";

function summarize(c: ClientSummary): string {
  return `- id: ${c.clientId} | ${c.name} | AUM ₹${c.aumValue} | persona: ${c.personaId} | SIP: ${c.sipStatus} | last contacted ${c.daysSinceLastContact}d ago | logins (7d): ${c.recentLogins7d} | idle cash: ₹${c.idleCashAmount} | recent redemption: ${c.recentRedemptionFlag} | note: ${c.lastActivityNote}`;
}

export async function POST(req: NextRequest) {
  const body: { mode: "batch"; clients: ClientSummary[] } | { mode: "detail"; client: ClientSummary } =
    await req.json();

  if (body.mode === "batch") {
    const userPrompt = `Here is a distributor's client book. For each client, assign a priority score (1-5, 5 = contact urgently), a one-sentence reason grounded in the signals given, and a one-sentence suggested action. These are suggestions the distributor can choose to act on — not mandatory tasks.

${body.clients.map(summarize).join("\n")}`;

    const result = await callClaudeJSON<{ priorities: ClientPriority[] }>({
      toolName: "retention_priorities",
      toolDescription: "Return a ranked priority list for a distributor's client book.",
      inputSchema: {
        type: "object",
        properties: {
          priorities: {
            type: "array",
            items: {
              type: "object",
              properties: {
                clientId: { type: "string" },
                priorityScore: { type: "integer", minimum: 1, maximum: 5 },
                reason: { type: "string" },
                suggestedAction: { type: "string" },
              },
              required: ["clientId", "priorityScore", "reason", "suggestedAction"],
            },
          },
        },
        required: ["priorities"],
      },
      userPrompt,
      maxTokens: 3000,
    });

    return NextResponse.json(result);
  }

  const c = body.client;
  const userPrompt = `Prepare a deep-dive on this single client for the distributor before a call. Give a priority score (1-5), the reason, a suggested action, 3 talking points for the conversation, and a one-sentence "next best conversation" opener. Suggestions only, not mandatory.

${summarize(c)}`;

  const result = await callClaudeJSON<ClientDetail>({
    toolName: "client_detail",
    toolDescription: "Return a deep-dive prep brief for one client.",
    inputSchema: {
      type: "object",
      properties: {
        priorityScore: { type: "integer", minimum: 1, maximum: 5 },
        reason: { type: "string" },
        suggestedAction: { type: "string" },
        talkingPoints: { type: "array", items: { type: "string" } },
        nextBestConversation: { type: "string" },
      },
      required: ["priorityScore", "reason", "suggestedAction", "talkingPoints", "nextBestConversation"],
    },
    userPrompt,
    maxTokens: 1500,
  });

  return NextResponse.json(result);
}
