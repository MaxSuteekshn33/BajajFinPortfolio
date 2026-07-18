"use client";

import { useState } from "react";
import { TopBanner } from "@/components/TopBanner";
import { KPIRow } from "@/components/distributor/KPIRow";
import { ChurnRadar } from "@/components/distributor/ChurnRadar";
import { NextBestConversationPanel } from "@/components/distributor/NextBestConversationPanel";
import { ReportPreviewModal } from "@/components/distributor/ReportPreviewModal";
import { LeadFeed } from "@/components/distributor/LeadFeed";
import { AttributionLedger } from "@/components/distributor/AttributionLedger";
import { ChurnClient, distributorProfile } from "@/lib/mockData";

export default function DistributorCoPilotPage() {
  const [selectedClient, setSelectedClient] = useState<ChurnClient | null>(null);
  const [reportClient, setReportClient] = useState<ChurnClient | null>(null);

  return (
    <div className="flex flex-1 flex-col bg-background">
      <TopBanner />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div>
          <h1 className="text-xl font-bold text-primary-dark">
            {distributorProfile.name}
          </h1>
          <p className="text-sm text-gray-400">
            {distributorProfile.city} · {distributorProfile.clients} clients ·{" "}
            {distributorProfile.aum} AUM
          </p>
        </div>

        <div className="mt-6">
          <KPIRow />
        </div>

        <div className="mt-6">
          <ChurnRadar onSelectClient={setSelectedClient} />
        </div>

        <div className="mt-6">
          <LeadFeed />
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
    </div>
  );
}
