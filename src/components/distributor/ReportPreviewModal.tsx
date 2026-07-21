"use client";

import { Modal } from "@/components/ui/Modal";
import { ChurnClient, distributorProfile } from "@/lib/mockData";
import { BarChart3, ShieldCheck } from "lucide-react";

export function ReportPreviewModal({
  client,
  onClose,
}: {
  client: ChurnClient | null;
  onClose: () => void;
}) {
  return (
    <Modal open={client !== null} onClose={onClose} maxWidth="max-w-lg">
      {client && (
        <div className="p-0">
          <div className="rounded-t-2xl bg-primary px-8 py-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
              Portfolio Review
            </p>
            <h3 className="mt-1 text-xl font-bold">{client.name}</h3>
            <p className="mt-1 text-xs text-white/70">
              Prepared for your quarterly review meeting
            </p>
          </div>

          <div className="space-y-5 p-9">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-surface-muted p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">AUM</p>
                <p className="mt-1 font-bold text-primary-dark">{client.aum}</p>
              </div>
              <div className="rounded-xl bg-surface-muted p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">XIRR</p>
                <p className="mt-1 font-bold text-gain">+11.8%</p>
              </div>
              <div className="rounded-xl bg-surface-muted p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  Risk Profile
                </p>
                <p className="mt-1 font-bold text-primary-dark">Moderate</p>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-gray-200 p-5 text-center text-gray-400">
              <BarChart3 size={28} className="mx-auto mb-2" />
              <p className="text-xs">Asset allocation & 3-year performance chart</p>
            </div>

            <div className="rounded-xl bg-primary-light p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <ShieldCheck size={14} /> Advisor recommendation
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-primary/80">
                {client.talkingPoints[0]}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-b-2xl bg-surface-muted px-8 py-4 text-[11px] text-gray-400">
            <span>Bajaj Finserv Asset Management</span>
            <span>Prepared by {distributorProfile.name}</span>
          </div>
        </div>
      )}
    </Modal>
  );
}
