"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGrid, TrendingUp, ShieldCheck, Layers, LucideIcon } from "lucide-react";
import { SchemeCategory, schemes } from "@/data/schemes";

type CategoryValue = SchemeCategory | "all";

const NODES: { value: CategoryValue; label: string; icon: LucideIcon; color: string }[] = [
  { value: "all", label: "All", icon: LayoutGrid, color: "#00379f" },
  { value: "equity", label: "Equity", icon: TrendingUp, color: "#00379f" },
  { value: "debt", label: "Debt", icon: ShieldCheck, color: "#15803d" },
  { value: "hybrid", label: "Hybrid", icon: Layers, color: "#e0a800" },
];

function countFor(value: CategoryValue) {
  if (value === "all") return schemes.length;
  return schemes.filter((s) => s.category === value).length;
}

export function RadialCategoryOrbit({
  value,
  onChange,
}: {
  value: CategoryValue;
  onChange: (v: CategoryValue) => void;
}) {
  const [angle, setAngle] = useState(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let last = performance.now();
    function tick(now: number) {
      const dt = now - last;
      last = now;
      if (!paused) {
        setAngle((a) => (a + dt * 0.012) % 360);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused]);

  const size = 216;
  const radius = 62;
  const ringSize = radius * 2 + 40;

  return (
    <div className="flex flex-col items-center">
      <label className="mb-1.5 self-start text-[10px] font-semibold uppercase tracking-wide text-black/50">
        Category
      </label>
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="absolute rounded-full border border-dashed border-primary/25"
          style={{
            width: ringSize,
            height: ringSize,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute rounded-full bg-white/40 backdrop-blur-sm"
          style={{
            width: ringSize - 44,
            height: ringSize - 44,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <button
          type="button"
          onClick={() => onChange("all")}
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          className={`absolute z-10 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105 ${
            value === "all" ? "bg-primary ring-4 ring-primary/20" : "bg-primary-dark/80"
          }`}
          aria-label="All categories"
        >
          <LayoutGrid size={16} />
        </button>

        {NODES.filter((n) => n.value !== "all").map((node, i) => {
          const rad = ((angle + i * 120) * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);
          const isActive = value === node.value;
          const Icon = node.icon;
          const count = countFor(node.value);

          return (
            <button
              key={node.value}
              type="button"
              onClick={() => onChange(node.value)}
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              className="absolute z-20 flex flex-col items-center gap-1"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold shadow-md transition-all ${
                  isActive
                    ? "scale-110 border-white bg-white text-black shadow-lg"
                    : "border-white/70 bg-white/85 text-black/70 backdrop-blur hover:border-primary/40"
                }`}
                style={isActive ? { boxShadow: `0 0 0 3px ${node.color}33` } : undefined}
              >
                <Icon size={15} color={isActive ? node.color : undefined} />
              </span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                  isActive ? "bg-black text-white" : "bg-white/70 text-black/60"
                }`}
              >
                {node.label} · {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
