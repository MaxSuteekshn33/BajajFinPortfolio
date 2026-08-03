"use client";

import { Database, ShieldCheck } from "lucide-react";
import { Modal } from "./Modal";

const dataSources = [
  {
    name: "Account Aggregator framework",
    description:
      "Consented, read-only access to your bank and investment account data via the RBI-regulated AA network — used to show a unified portfolio view across AMCs, not just Bajaj Finserv holdings.",
  },
  {
    name: "Your Bajaj Finserv AMC transactions",
    description:
      "SIPs, lumpsums, switches, and redemptions across your own Bajaj Finserv scheme holdings on this platform.",
  },
  {
    name: "Suitability quiz responses",
    description:
      "Your answers to the risk-profiling quiz — used only to derive your investor persona and shortlist matching schemes.",
  },
];

export function ConsentModal({
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
        <h3 className="mt-4 text-lg font-bold text-primary-dark">
          Your data, on consent
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          This platform builds your view from consented signals only:
        </p>

        <div className="mt-4 space-y-3">
          {dataSources.map((source) => (
            <div key={source.name} className="rounded-xl bg-surface-muted p-3.5">
              <p className="text-sm font-semibold text-primary-dark">
                {source.name}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                {source.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-xl bg-primary-light p-3.5">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary" />
          <p className="text-xs font-medium leading-relaxed text-primary">
            All signals are consent-gated under the DPDP Act 2023. You can
            withdraw consent and disconnect any data source at any time.
          </p>
        </div>
      </div>
    </Modal>
  );
}
