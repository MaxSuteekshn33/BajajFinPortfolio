"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, MessageSquareText, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChurnClient } from "@/lib/mockData";

export function NextBestConversationPanel({
  client,
  onClose,
  onGenerateReport,
}: {
  client: ChurnClient | null;
  onClose: () => void;
  onGenerateReport: (client: ChurnClient) => void;
}) {
  return (
    <AnimatePresence>
      {client && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-surface shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
              <div className="flex items-center gap-2 text-primary">
                <MessageSquareText size={18} />
                <p className="text-sm font-bold">Next Best Conversation</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-400 hover:bg-surface-muted hover:text-gray-600"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-primary-dark">{client.name}</h3>
                <Badge tone={client.riskScore === "High" ? "red" : "orange"}>
                  {client.riskScore} Risk
                </Badge>
              </div>
              <p className="mt-1 text-xs text-gray-400">
                {client.aum} AUM · {client.reason}
              </p>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
                AI-generated talking points
              </p>
              <ul className="mt-3 space-y-3">
                {client.talkingPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 rounded-xl bg-surface-muted p-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-gray-600">{point}</p>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onGenerateReport(client)}
                className="mt-6 w-full"
                variant="primary"
              >
                <FileText size={15} />
                Generate Review Report
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
