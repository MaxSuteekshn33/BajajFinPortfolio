"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ChurnClient, callScripts } from "@/lib/mockData";
import { PhoneCall, Copy, Check } from "lucide-react";

export function CallScriptModal({
  client,
  onClose,
}: {
  client: ChurnClient | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const script = client ? callScripts.find((s) => s.clientId === client.id) : undefined;

  function handleCopy() {
    if (!script) return;
    const text = [script.opener, ...script.lines.map((l) => `• ${l}`), script.closer].join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Modal open={client !== null} onClose={onClose} maxWidth="max-w-lg">
      {client && script && (
        <div className="p-9">
          <div className="flex items-center gap-2 text-primary">
            <PhoneCall size={18} />
            <p className="text-xs font-semibold uppercase tracking-wide">Prep Call · AI Script</p>
          </div>
          <h3 className="mt-2 text-lg font-bold text-primary-dark">{client.name}</h3>
          <p className="mt-0.5 text-xs text-gray-400">{script.title}</p>

          <div className="mt-5 rounded-xl bg-surface-muted p-4">
            <p className="text-xs italic leading-relaxed text-gray-600">{script.opener}</p>
          </div>

          <ul className="mt-4 space-y-2.5">
            {script.lines.map((line, i) => (
              <li key={i} className="flex gap-2.5 text-xs leading-relaxed text-gray-600">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary-light text-[9px] font-bold text-primary">
                  {i + 1}
                </span>
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl bg-primary-light p-4">
            <p className="text-xs italic leading-relaxed text-primary">{script.closer}</p>
          </div>

          <Button
            onClick={handleCopy}
            variant={copied ? "success" : "outline"}
            className="mt-6 w-full"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied to clipboard" : "Copy script"}
          </Button>
        </div>
      )}
    </Modal>
  );
}
