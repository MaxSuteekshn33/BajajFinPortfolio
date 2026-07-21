"use client";

import { useEffect, useRef, useState } from "react";
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

  // Tracked at the window level (rather than relying on setPointerCapture on the
  // track element) so the drag keeps following the cursor/finger even if it moves
  // fast, leaves the track's bounds, or the browser's pointer-capture support is flaky.
  useEffect(() => {
    if (!dragging) return;

    function clientXFromEvent(e: PointerEvent | TouchEvent) {
      if ("clientX" in e) return e.clientX;
      return e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX;
    }

    function handleMove(e: PointerEvent | TouchEvent) {
      const clientX = clientXFromEvent(e);
      if (clientX != null) updateFromClientX(clientX);
    }
    function handleEnd() {
      setDragging(false);
      setDragPct(null);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleEnd);
    window.addEventListener("pointercancel", handleEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleEnd);
      window.removeEventListener("pointercancel", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [dragging]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(true);
    updateFromClientX(e.clientX);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setDragging(true);
    const clientX = e.touches[0]?.clientX;
    if (clientX != null) updateFromClientX(clientX);
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
        onTouchStart={handleTouchStart}
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
