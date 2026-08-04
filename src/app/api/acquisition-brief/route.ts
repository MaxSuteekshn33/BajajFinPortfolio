import { NextRequest, NextResponse } from "next/server";
import { callClaudeJSON } from "@/lib/claude";
import { schemes } from "@/data/schemes";
import { personas } from "@/data/quiz";
import { AcquisitionBrief, ProspectIntake } from "@/lib/distributorTypes";

export async function POST(req: NextRequest) {
  const { prospect }: { prospect: ProspectIntake } = await req.json();

  const persona = personas[prospect.personaId];
  const userPrompt = `Build an acquisition brief for this prospect so the distributor can prepare for their first call.

Prospect: ${prospect.name}, age ${prospect.age}, based in ${prospect.city}.
Stated goal: ${prospect.statedGoal}
Monthly investment capacity: ₹${prospect.monthlyCapacity}
Risk persona (from intake quiz): ${persona.name} — ${persona.tagline}
${prospect.notes ? `Distributor's notes: ${prospect.notes}` : ""}

Suggest 2-3 schemes from the fund shelf that fit this persona and goal, 3 rapport-building talking points, 3 objection-handling entries (at least one must use the "Why Bajaj" urgency angle), and one dedicated "Why Bajaj" card.`;

  const result = await callClaudeJSON<AcquisitionBrief>({
    toolName: "acquisition_brief",
    toolDescription: "Return a structured sales brief for a new prospect.",
    inputSchema: {
      type: "object",
      properties: {
        schemeSuggestions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              schemeId: { type: "string" },
              rationale: { type: "string" },
            },
            required: ["schemeId", "rationale"],
          },
        },
        talkingPoints: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              body: { type: "string" },
            },
            required: ["title", "body"],
          },
        },
        objectionHandling: {
          type: "array",
          items: {
            type: "object",
            properties: {
              objection: { type: "string" },
              response: { type: "string" },
            },
            required: ["objection", "response"],
          },
        },
        whyBajajAngle: {
          type: "object",
          properties: {
            headline: { type: "string" },
            body: { type: "string" },
          },
          required: ["headline", "body"],
        },
      },
      required: ["schemeSuggestions", "talkingPoints", "objectionHandling", "whyBajajAngle"],
    },
    userPrompt,
    maxTokens: 2000,
  });

  if (!result.ok) return NextResponse.json(result);

  const validSchemeIds = new Set(schemes.map((s) => s.id));
  const cleaned: AcquisitionBrief = {
    ...result.data,
    schemeSuggestions: result.data.schemeSuggestions.filter((s) => validSchemeIds.has(s.schemeId)),
  };

  return NextResponse.json({ ok: true, data: cleaned });
}
