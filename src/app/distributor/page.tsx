"use client";

import { useState } from "react";
import { TopBanner } from "@/components/TopBanner";
import { KPIRow } from "@/components/distributor/KPIRow";
import { ChurnRadar } from "@/components/distributor/ChurnRadar";
import { NextBestConversationPanel } from "@/components/distributor/NextBestConversationPanel";
import { ReportPreviewModal } from "@/components/distributor/ReportPreviewModal";
import { CallScriptModal } from "@/components/distributor/CallScriptModal";
import { LeadFeed } from "@/components/distributor/LeadFeed";
import { EarningsSimulator } from "@/components/distributor/EarningsSimulator";
import { AttributionLedger } from "@/components/distributor/AttributionLedger";
import { ToastStack, useToast } from "@/components/ui/Toast";
import { CountUp } from "@/components/ui/CountUp";
import { ChurnClient, distributorProfile, leads } from "@/lib/mockData";

export default function DistributorCoPilotPage() {
  const [selectedClient, setSelectedClient] = useState<ChurnClient | null>(null);
  const [reportClient, setReportClient] = useState<ChurnClient | null>(null);
  const [callScriptClient, setCallScriptClient] = useState<ChurnClient | null>(null);
  const [acceptedLeads, setAcceptedLeads] = useState<string[]>([]);
  const { toasts, showToast } = useToast();

  const extraAum = acceptedLeads.reduce((sum, id) => {
    const lead = leads.find((l) => l.id === id);
    return sum + (lead?.aumValue ?? 0);
  }, 0);

  function handleAcceptLead(leadId: string) {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    setAcceptedLeads((prev) => [...prev, leadId]);
    showToast(`${lead.name} assigned to you. First meeting suggested: this week.`);
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      <TopBanner />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div>
          <h1 className="text-xl font-bold text-primary-dark">
            {distributorProfile.name}
          </h1>
          <p className="text-sm text-gray-400">
            {distributorProfile.city} ·{" "}
            <CountUp
              value={distributorProfile.clients + acceptedLeads.length}
              format={(n) => Math.round(n).toString()}
              className="inline"
            />{" "}
            clients · {distributorProfile.aum} AUM
          </p>
        </div>

        <div className="mt-6">
          <KPIRow extraAum={extraAum} />
        </div>

        <div className="mt-6">
          <ChurnRadar onSelectClient={setSelectedClient} onPrepCall={setCallScriptClient} />
        </div>

        <div className="mt-6">
          <LeadFeed accepted={acceptedLeads} onAccept={handleAcceptLead} />
        </div>

        <div className="mt-6">
          <EarningsSimulator />
        </div>

        <div className="mt-6">
          <AttributionLedger />
        </div>
      </main>

      <NextBestConversationPanel
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
        onGenerateReport={(client) => setReportClient(client)}
      />
      <ReportPreviewModal client={reportClient} onClose={() => setReportClient(null)} />
      <CallScriptModal client={callScriptClient} onClose={() => setCallScriptClient(null)} />
      <ToastStack toasts={toasts} />
    </div>
  );
}
