import { KeyRound, TriangleAlert } from "lucide-react";
import { Card } from "./Card";

export function AiUnavailableNotice({
  reason,
  message,
}: {
  reason: "missing_key" | "api_error";
  message?: string;
}) {
  const isMissingKey = reason === "missing_key";
  return (
    <Card className="flex items-start gap-3 border-dashed p-5">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isMissingKey ? "bg-primary-light text-primary" : "bg-alert-soft text-alert"
        }`}
      >
        {isMissingKey ? <KeyRound size={16} /> : <TriangleAlert size={16} />}
      </span>
      <div>
        <p className="text-sm font-bold text-primary-dark">
          {isMissingKey ? "AI features need an API key" : "AI request failed"}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-gray-500">
          {message ??
            (isMissingKey
              ? "Add ANTHROPIC_API_KEY to .env.local and restart the dev server to enable persona briefs, objection handling, and the AI assistant."
              : "Check your API key or try again in a moment.")}
        </p>
      </div>
    </Card>
  );
}
