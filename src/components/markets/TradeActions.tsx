"use client";

import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ToastStack, useToast } from "@/components/ui/Toast";
import { formatINR, formatPrice } from "@/lib/format";
import type { Holding, Instrument } from "@/lib/marketData";

export function TradeActions({
  instrument,
  holding,
}: {
  instrument: Instrument;
  holding?: Holding;
}) {
  const [mode, setMode] = useState<"buy" | "sell" | null>(null);
  const [quantity, setQuantity] = useState("1");
  const { toasts, showToast } = useToast();

  const unitLabel = instrument.type === "stock" ? "shares" : "units";
  const qtyNumber = Number(quantity) || 0;
  const estimatedValue = qtyNumber * instrument.currentPrice;
  const maxSellQty = holding?.quantity ?? 0;

  function closeModal() {
    setMode(null);
    setQuantity("1");
  }

  function confirmOrder() {
    if (!mode || qtyNumber <= 0) return;
    const verb = mode === "buy" ? "Buy" : "Sell";
    showToast(
      `${verb} order placed: ${qtyNumber} ${unitLabel} of ${instrument.symbol} for ${formatINR(
        Math.round(estimatedValue)
      )} (demo only, no real order submitted).`
    );
    closeModal();
  }

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="primary" className="flex-1 sm:flex-none" onClick={() => setMode("buy")}>
          <ArrowUpCircle size={16} />
          Buy
        </Button>
        {holding && (
          <Button
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={() => setMode("sell")}
          >
            <ArrowDownCircle size={16} />
            Sell
          </Button>
        )}
      </div>

      <Modal open={mode !== null} onClose={closeModal}>
        <div className="p-6 sm:p-8">
          <h3 className="text-lg font-bold text-primary-dark">
            {mode === "buy" ? "Buy" : "Sell"} {instrument.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {formatPrice(instrument.currentPrice)} per {unitLabel.slice(0, -1)}
          </p>

          <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
            Quantity ({unitLabel})
          </label>
          <input
            type="number"
            min={1}
            max={mode === "sell" ? maxSellQty : undefined}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm font-semibold text-primary-dark outline-none focus:border-primary/40"
          />
          {mode === "sell" && (
            <p className="mt-1.5 text-xs text-gray-400">
              You hold {maxSellQty % 1 === 0 ? maxSellQty : maxSellQty.toFixed(2)} {unitLabel}.
            </p>
          )}

          <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Estimated {mode === "buy" ? "cost" : "proceeds"}
            </span>
            <span className="text-sm font-bold text-primary-dark">
              {formatINR(Math.round(estimatedValue))}
            </span>
          </div>

          <Button
            variant={mode === "sell" ? "outline" : "primary"}
            className="mt-5 w-full justify-center"
            disabled={qtyNumber <= 0 || (mode === "sell" && qtyNumber > maxSellQty)}
            onClick={confirmOrder}
          >
            Confirm {mode === "buy" ? "buy" : "sell"} order
          </Button>
          <p className="mt-3 text-center text-[11px] text-gray-400">
            Demo only — no real order is placed.
          </p>
        </div>
      </Modal>

      <ToastStack toasts={toasts} />
    </>
  );
}
