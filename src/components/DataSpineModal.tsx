"use client";

import { Database, ShieldCheck } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { dataSpineSources, dataSpineConsentLine } from "@/lib/mockData";

export function DataSpineModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Database size={20} />
        </div>
        <h3 className="mt-4 text-lg font-bold text-primary-dark">Unified Data Spine</h3>
        <p className="mt-1 text-sm text-gray-500">
          One customer graph, built from consented signals across:
        </p>

        <div className="mt-4 space-y-3">
          {dataSpineSources.map((source) => (
            <div key={source.name} className="rounded-xl bg-surface-muted p-3.5">
              <p className="text-sm font-semibold text-primary-dark">{source.name}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                {source.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-xl bg-primary-light p-3.5">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-xs font-medium leading-relaxed text-primary">
            {dataSpineConsentLine}
          </p>
        </div>
      </div>
    </Modal>
  );
}
