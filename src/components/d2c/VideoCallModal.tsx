"use client";

import { useState } from "react";
import { Video } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useToast, ToastStack } from "@/components/ui/Toast";

const SLOTS = ["Today, 5:00 PM", "Tomorrow, 11:00 AM", "Tomorrow, 4:30 PM"];

export function VideoCallModal({
  open,
  onClose,
  rmName,
}: {
  open: boolean;
  onClose: () => void;
  rmName: string;
}) {
  const [slot, setSlot] = useState<string | null>(null);
  const { toasts, showToast } = useToast();

  function handleConfirm() {
    if (!slot) return;
    showToast(`Video call requested for ${slot} — ${rmName.split(" ")[0]} will confirm shortly.`);
    setTimeout(() => {
      onClose();
      setSlot(null);
    }, 600);
  }

  return (
    <>
      <Modal open={open} onClose={onClose} maxWidth="max-w-sm">
        <div className="p-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary">
            <Video size={18} />
          </span>
          <p className="mt-3 text-sm font-bold text-primary-dark">Request a video call</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">
            Pick a slot — {rmName.split(" ")[0]} will confirm over the app.
          </p>
          <div className="mt-3 space-y-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                  slot === s
                    ? "border-primary bg-primary-light text-primary"
                    : "border-black/10 text-gray-600 hover:border-primary/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={handleConfirm}
            disabled={!slot}
            className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirm request
          </button>
        </div>
      </Modal>
      <ToastStack toasts={toasts} />
    </>
  );
}
