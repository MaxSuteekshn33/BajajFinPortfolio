"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/format";

export function RangeBar({
  label,
  low,
  high,
  current,
}: {
  label: string;
  low: number;
  high: number;
  current: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragPct, setDragPct] = useState<number | null>(null);

  const currentPct = high === low ? 50 : ((current - low) / (high - low)) * 100;
  const clampedCurrent = Math.min(100, Math.max(0, currentPct));
  const pct = dragPct ?? clampedCurrent;
  const previewValue = low + ((high - low) * pct) / 100;

  function updateFromClientX(clientX: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setDragPct(Math.min(1, Math.max(0, ratio)) * 100);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore — pointer capture is a nice-to-have, not required for the drag to work
    }
    setDragging(true);
    updateFromClientX(e.clientX);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  }

  function handlePointerUp() {
    setDragging(false);
    setDragPct(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-mkt-muted">
        <span className="font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div
        ref={trackRef}
        className="relative mt-2 h-6 cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-black/[0.06]" />
        {dragging && (
          <div
            className="pointer-events-none absolute -top-6 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary-dark px-2 py-1 text-[10px] font-semibold text-white shadow-sm"
            style={{ left: `${pct}%` }}
          >
            {formatPrice(previewValue)}
          </div>
        )}
        <motion.div
          className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-mkt-accent shadow-[0_0_0_2px_rgba(0,55,159,0.25)]"
          animate={{ left: `calc(${pct}% - 6px)` }}
          transition={dragging ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 22 }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs tabular-nums text-mkt-text">
        <span>{formatPrice(low)}</span>
        <span>{formatPrice(high)}</span>
      </div>
    </div>
  );
}
