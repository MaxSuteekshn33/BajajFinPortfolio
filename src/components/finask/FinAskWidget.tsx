"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { getFinAskReply } from "@/lib/finask";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
}

const WELCOME: ChatMessage = {
  id: 0,
  role: "assistant",
  text: "Hi, I'm FinAsk. Ask me to explain a mutual fund concept, a personal finance basic, or look up a fact about any scheme on our shelf — e.g. \"what's the expense ratio of the Flexi Cap fund?\". I can't tell you what to buy or sell.",
};

export function FinAskWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", text: trimmed };
    const reply = getFinAskReply(trimmed);
    const assistantMsg: ChatMessage = {
      id: Date.now() + 1,
      role: "assistant",
      text: reply.text,
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl hover:bg-primary-dark"
        aria-label="Open FinAsk chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-5 z-50 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-black/5 bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-black/5 bg-primary px-4 py-3">
              <Sparkles size={16} className="text-accent" />
              <div>
                <p className="text-sm font-bold text-white">FinAsk</p>
                <p className="text-[10px] text-white/70">
                  MF concepts &amp; scheme facts — not advice
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-white"
                        : "bg-surface-muted text-gray-700"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-black/5 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about a fund or MF concept..."
                className="flex-1 rounded-xl border border-black/10 bg-surface-muted px-3 py-2 text-xs outline-none focus:border-primary/40"
              />
              <button
                onClick={handleSend}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-dark"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
