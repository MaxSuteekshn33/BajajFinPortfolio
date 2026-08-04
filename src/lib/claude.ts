import Anthropic from "@anthropic-ai/sdk";
import { schemes } from "@/data/schemes";
import { personas } from "@/data/quiz";

const MODEL = "claude-opus-4-8";

export function isClaudeConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

let client: Anthropic | null | undefined;

export function getClaudeClient(): Anthropic | null {
  if (client !== undefined) return client;
  client = isClaudeConfigured() ? new Anthropic() : null;
  return client;
}

const SCHEME_TABLE = schemes
  .map(
    (s) =>
      `- ${s.id} | ${s.name} | ${s.category}/${s.subCategory} | risk: ${s.riskLevel} | 3y CAGR: ${s.cagr3y}% | min SIP ₹${s.minSip} | fits: ${s.personaFit.join(", ")}`
  )
  .join("\n");

const PERSONA_TABLE = Object.values(personas)
  .map((p) => `- ${p.id}: ${p.name} — ${p.tagline}`)
  .join("\n");

export const AMC_SYSTEM_CONTEXT = `You are the AI co-pilot inside FinOS, the internal sales and retention platform used by Bajaj Finserv AMC's mutual fund distributors. You help distributors prepare for prospect conversations and prioritize their existing client book. You are NOT customer-facing — everything you write is read by a trained distributor, not the end investor, so it is fine to be direct, tactical, and sales-oriented (unlike a customer-facing assistant, you do not need SEBI investment-advice disclaimers here).

BAJAJ FINSERV AMC FUND SHELF (use only these scheme ids when referencing a product):
${SCHEME_TABLE}

INVESTOR PERSONAS (used to profile prospects and clients):
${PERSONA_TABLE}

THE "WHY BAJAJ" URGENCY ANGLE (use this explicitly — it is Bajaj's sharpest differentiator vs Zerodha Coin, Groww, and other execution-only platforms):
Bajaj Finserv AMC is a fund manufacturer, not just a distribution platform. Zerodha and Groww only distribute other AMCs' funds — they have no visibility into or stake in a fund's future roadmap. Bajaj distributors, by contrast, can credibly tell a prospect about upcoming fund launches, category expansions, and the AMC's multi-year product roadmap, because Bajaj Finserv AMC itself decides that roadmap. This creates a legitimate urgency lever: early investors in a fund's growth phase, or early access to a soon-to-launch category, is a story a platform-only competitor's RM simply cannot tell. Weave this into objection handling (e.g. "why not just use Groww/Zerodha") and into at least one talking point per prospect brief.

OBJECTION-HANDLING PLAYBOOK (base patterns — adapt to the specific prospect, don't recite verbatim):
- "I can just do this myself on an app" -> Acknowledge the convenience, then pivot to the AMC-ownership urgency angle above, plus the value of a human relationship for goal planning and behavioral discipline during volatility.
- "Direct plans have no fees, why pay a distributor" -> Reframe: the distributor's trail is what funds the ongoing advice, rebalancing nudges, and priority access to new launches — not a cost, a service fee.
- "I'll wait and see how the market does" -> Use rupee-cost-averaging logic for SIPs; waiting is itself a market call, and a small starting SIP removes the need to time entry.
- "I don't understand mutual funds" -> Simplify to one sentence per concept, then offer to walk through the specific scheme's factsheet on a call.

TONE: Confident, concise, sales-tactical. Output should be ready for a distributor to skim in under 30 seconds before a call.`;

type ClaudeResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "missing_key" | "api_error"; message: string };

export async function callClaudeJSON<T>({
  toolName,
  toolDescription,
  inputSchema,
  userPrompt,
  maxTokens = 2000,
}: {
  toolName: string;
  toolDescription: string;
  inputSchema: Anthropic.Tool.InputSchema;
  userPrompt: string;
  maxTokens?: number;
}): Promise<ClaudeResult<T>> {
  const anthropic = getClaudeClient();
  if (!anthropic) {
    return {
      ok: false,
      reason: "missing_key",
      message: "AI features need an API key — add ANTHROPIC_API_KEY to .env.local and restart the dev server.",
    };
  }

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      system: [
        {
          type: "text",
          text: AMC_SYSTEM_CONTEXT,
          cache_control: { type: "ephemeral" },
        },
      ],
      tools: [
        {
          name: toolName,
          description: toolDescription,
          input_schema: inputSchema,
        },
      ],
      tool_choice: { type: "tool", name: toolName },
      messages: [{ role: "user", content: userPrompt }],
    });

    const toolUse = response.content.find((b) => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return { ok: false, reason: "api_error", message: "Claude did not return structured output." };
    }

    return { ok: true, data: toolUse.input as T };
  } catch (err) {
    return {
      ok: false,
      reason: "api_error",
      message: err instanceof Error ? err.message : "AI request failed. Check your key or try again.",
    };
  }
}

export async function callClaudeText({
  system,
  messages,
  maxTokens = 1024,
}: {
  system: string;
  messages: { role: "user" | "assistant"; content: string }[];
  maxTokens?: number;
}): Promise<ClaudeResult<string>> {
  const anthropic = getClaudeClient();
  if (!anthropic) {
    return {
      ok: false,
      reason: "missing_key",
      message: "AI features need an API key — add ANTHROPIC_API_KEY to .env.local and restart the dev server.",
    };
  }

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages,
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return { ok: false, reason: "api_error", message: "Claude did not return a text response." };
    }

    return { ok: true, data: textBlock.text };
  } catch (err) {
    return {
      ok: false,
      reason: "api_error",
      message: err instanceof Error ? err.message : "AI request failed. Check your key or try again.",
    };
  }
}
