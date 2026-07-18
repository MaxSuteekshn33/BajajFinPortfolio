"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Sparkles, PhoneCall } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { saathiScript, rupeeCostAveragingData, ChatQA } from "@/lib/mockData";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  showChart?: boolean;
  offerAdvisor?: boolean;
}

export function AskFinAIWidget({ onTalkToAdvisor }: { onTalkToAdvisor?: () => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      role: "assistant",
      text: "Hi Ananya, I'm Saathi — your FinAI companion. Ask me anything about your portfolio, or tap a suggestion below.",
    },
  ]);
  const [askedIds, setAskedIds] = useState<string[]>([]);

  function askQuestion(qa: ChatQA) {
    setAskedIds((prev) => [...prev, qa.id]);
    setMessages((prev) => [
      ...prev,
      { id: `${qa.id}-q`, role: "user", text: qa.question },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${qa.id}-a`,
          role: "assistant",
          text: qa.answer,
          showChart: qa.showChart,
          offerAdvisor: qa.offerAdvisor,
        },
      ]);
    }, 500);
  }

  const remainingQuestions = saathiScript.filter((qa) => !askedIds.includes(qa.id));

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="mb-4 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <p className="text-sm font-semibold">Saathi</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X size={17} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div key={m.id}>
                  <div
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-white rounded-br-sm"
                          : "bg-surface-muted text-gray-700 rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                  {m.showChart && (
                    <div className="mt-2 rounded-xl bg-surface-muted p-3">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        Rupee Cost Averaging — Units bought per SIP
                      </p>
                      <ResponsiveContainer width="100%" height={140}>
                        <LineChart data={rupeeCostAveragingData} margin={{ left: -20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <RechartsTooltip
                            contentStyle={{ fontSize: 11, borderRadius: 8 }}
                            formatter={(value, name) =>
                              name === "unitsBought"
                                ? [value as number, "Units bought"]
                                : [value as number, "NAV"]
                            }
                          />
                          <Line
                            type="monotone"
                            dataKey="unitsBought"
                            stroke="#00379F"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="nav"
                            stroke="#ea580c"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            strokeDasharray="4 4"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <p className="mt-1 text-[10px] text-gray-400">
                        Blue = units bought · Orange (dashed) = NAV — more units when NAV falls.
                      </p>
                    </div>
                  )}
                  {m.offerAdvisor && (
                    <button
                      onClick={() => {
                        setOpen(false);
                        onTalkToAdvisor?.();
                      }}
                      className="mt-2 flex items-center gap-1.5 rounded-xl border border-primary/20 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary-light"
                    >
                      <PhoneCall size={13} />
                      Talk to Rajesh instead
                    </button>
                  )}
                </div>
              ))}
            </div>

            {remainingQuestions.length > 0 && (
              <div className="border-t border-black/5 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  Suggested
                </p>
                <div className="flex flex-col gap-1.5">
                  {remainingQuestions.map((qa) => (
                    <button
                      key={qa.id}
                      onClick={() => askQuestion(qa)}
                      className="rounded-xl border border-primary/20 px-3 py-2 text-left text-xs font-medium text-primary hover:bg-primary-light"
                    >
                      {qa.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-transform hover:scale-105"
        aria-label="Ask Saathi"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
