import { PersonaId } from "@/data/quiz";

export interface ProspectIntake {
  name: string;
  age: number;
  city: string;
  contactPhone?: string;
  monthlyCapacity: number;
  statedGoal: string;
  personaId: PersonaId;
  notes?: string;
}

export interface AcquisitionBrief {
  schemeSuggestions: { schemeId: string; rationale: string }[];
  talkingPoints: { title: string; body: string }[];
  objectionHandling: { objection: string; response: string }[];
  whyBajajAngle: { headline: string; body: string };
}

export type SipStatus = "active" | "paused" | "none";

export interface DistributorClient {
  id: string;
  name: string;
  city: string;
  aumValue: number;
  personaId: PersonaId;
  joinedYear: number;
  sipStatus: SipStatus;
  daysSinceLastContact: number;
  recentLogins7d: number;
  idleCashAmount: number;
  recentRedemptionFlag: boolean;
  lastActivityNote: string;
}

export interface ClientSummary {
  clientId: string;
  name: string;
  aumValue: number;
  personaId: PersonaId;
  sipStatus: SipStatus;
  daysSinceLastContact: number;
  recentLogins7d: number;
  idleCashAmount: number;
  recentRedemptionFlag: boolean;
  lastActivityNote: string;
}

export interface ClientPriority {
  clientId: string;
  priorityScore: number;
  reason: string;
  suggestedAction: string;
}

export interface ClientDetail {
  priorityScore: number;
  reason: string;
  suggestedAction: string;
  talkingPoints: string[];
  nextBestConversation: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}
