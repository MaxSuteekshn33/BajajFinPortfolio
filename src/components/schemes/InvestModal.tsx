"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Scheme } from "@/data/schemes";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type Mode = "sip" | "lumpsum" | "redeem";

const MODE_LABEL: Record<Mode, string> = {
  sip: "Invest via SIP",
  lumpsum: "Invest Lumpsum",
  redeem: "Redeem units",
};

export function InvestModal({
  scheme,
  mode,
  open,
  onClose,
}: {
  scheme: Scheme;
  mode: Mode;
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState(mode === "sip" ? scheme.minSip : scheme.minLumpsum);
  const [frequency, setFrequency] = useState<"monthly" | "quarterly">("monthly");
  const [startDate, setStartDate] = useState("");
  const [stepUp, setStepUp] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function handleClose() {
    onClose();
    setTimeout(() => setSubmitted(false), 250);
  }

  if (submitted) {
    return (
      <Modal open={open} onClose={handleClose} maxWidth="max-w-sm">
        <div className="p-8 text-center">
          <CheckCircle2 size={40} className="mx-auto text-gain" />
          <h3 className="mt-3 text-base font-bold text-primary-dark">
            {MODE_LABEL[mode]} request captured
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
            This is a demo confirmation — no real transaction has been
            placed. In production this would route through the AMC&apos;s
            registrar and transfer agent (RTA).
          </p>
          <Button className="mt-5 w-full" onClick={handleClose}>
            Done
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-sm">
      <div className="p-7">
        <h3 className="text-base font-bold text-primary-dark">{MODE_LABEL[mode]}</h3>
        <p className="mt-0.5 text-xs text-gray-500">{scheme.name}</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">
              {mode === "redeem" ? "Amount to redeem (₹)" : "Amount (₹)"}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={mode === "sip" ? scheme.minSip : scheme.minLumpsum}
              className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-primary/40"
            />
          </div>

          {mode === "sip" && (
            <>
              <div>
                <label className="text-xs font-semibold text-gray-600">Frequency</label>
                <div className="mt-1.5 flex gap-2">
                  {(["monthly", "quarterly"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`flex-1 rounded-xl border px-3 py-2 text-xs font-semibold capitalize ${
                        frequency === f
                          ? "border-primary bg-primary-light text-primary"
                          : "border-black/10 text-gray-500"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Start date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-primary/40"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Step-up % per year (optional)
                </label>
                <input
                  type="number"
                  value={stepUp}
                  onChange={(e) => setStepUp(Number(e.target.value))}
                  min={0}
                  max={50}
                  className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-primary/40"
                />
              </div>
            </>
          )}
        </div>

        <Button className="mt-6 w-full" onClick={() => setSubmitted(true)}>
          Confirm {MODE_LABEL[mode]}
        </Button>
        <p className="mt-2 text-center text-[10px] text-gray-400">
          Mutual Fund investments are subject to market risks, read all
          scheme related documents carefully.
        </p>
      </div>
    </Modal>
  );
}
