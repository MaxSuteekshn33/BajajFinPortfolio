import { NextRequest, NextResponse } from "next/server";
import { AMC_SYSTEM_CONTEXT, callClaudeText } from "@/lib/claude";
import { personas } from "@/data/quiz";
import { ChatMessage, ProspectIntake } from "@/lib/distributorTypes";

export async function POST(req: NextRequest) {
  const { prospect, messages }: { prospect: ProspectIntake; messages: ChatMessage[] } = await req.json();

  const persona = personas[prospect.personaId];
  const scopedSystem = `${AMC_SYSTEM_CONTEXT}

You are currently helping the distributor prepare for a live or upcoming call with this specific prospect — answer on-the-spot questions about products, positioning, or objection handling for this person only.

Prospect on this call: ${prospect.name}, age ${prospect.age}, ${prospect.city}. Goal: ${prospect.statedGoal}. Persona: ${persona.name}. Monthly capacity: ₹${prospect.monthlyCapacity}. ${prospect.notes ?? ""}

Keep answers under 80 words — the distributor is reading this mid-conversation.`;

  const result = await callClaudeText({
    system: scopedSystem,
    messages: messages.map((m) => ({ role: m.role, content: m.text })),
    maxTokens: 500,
  });

  if (!result.ok) return NextResponse.json(result);
  return NextResponse.json({ ok: true, data: { reply: result.data } });
}
