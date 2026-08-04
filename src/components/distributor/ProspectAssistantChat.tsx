"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AiUnavailableNotice } from "@/components/ui/AiUnavailableNotice";
import { ChatMessage, ProspectIntake } from "@/lib/distributorTypes";

export function ProspectAssistantChat({ prospect }: { prospect: ProspectIntake | null }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ reason: "missing_key" | "api_error"; message?: string } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || !prospect || loading) return;
    const next = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    const res = await fetch("/api/ai-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prospect, messages: next }),
    }).then((r) => r.json());

    if (res.ok) {
      setMessages((prev) => [...prev, { role: "assistant", text: res.data.reply }]);
    } else {
      setError({ reason: res.reason, message: res.message });
    }
    setLoading(false);
  }

  return (
    <Card className="flex h-[420px] flex-col p-0">
      <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3">
        <Sparkles size={15} className="text-primary" />
        <div>
          <p className="text-sm font-bold text-primary-dark">AI assistant</p>
          <p className="text-[10px] text-gray-500">Ask anything on the spot, mid-call</p>
        </div>
      </div>

      {!prospect ? (
        <div className="flex flex-1 items-center justify-center p-6 text-center text-xs text-gray-400">
          Generate a brief for a prospect first — this assistant scopes its answers to them.
        </div>
      ) : (
        <>
          <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-xs text-gray-400">
                Ask about {prospect.name.split(" ")[0]}&rsquo;s persona, a scheme comparison, or how to
                handle a pushback — I have their profile in context.
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.role === "user" ? "bg-primary text-white" : "bg-surface-muted text-gray-700"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Loader2 size={13} className="animate-spin" /> Thinking…
              </div>
            )}
            {error && <AiUnavailableNotice reason={error.reason} message={error.message} />}
          </div>

          <div className="flex items-center gap-2 border-t border-black/5 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask the AI assistant..."
              className="flex-1 rounded-xl border border-black/10 bg-surface-muted px-3 py-2 text-xs outline-none focus:border-primary/40"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          </div>
        </>
      )}
    </Card>
  );
}
