"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <section className="dot-surface relative overflow-hidden border-b border-black/5 bg-gradient-to-b from-primary-light/50 to-transparent">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 text-xs font-semibold text-primary"
        >
          <Sparkles size={12} />
          FinAI-driven, direct-to-customer investing
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-4xl font-extrabold leading-tight text-primary-dark sm:text-5xl md:text-6xl"
        >
          Investing that fits{" "}
          <span className="text-primary">who you actually are.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base"
        >
          Answer a few questions about your goals, and we&apos;ll shortlist Bajaj
          Finserv AMC schemes that match your profile — full details, zero
          jargon, no pressure to buy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button onClick={onStartQuiz} className="px-6 py-3 text-sm">
            Find my investor profile <ArrowDown size={14} />
          </Button>
          <p className="text-xs text-gray-400">Takes about 90 seconds</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 grid grid-cols-3 gap-6 rounded-2xl border border-black/5 bg-surface/80 px-6 py-4 backdrop-blur sm:gap-10 sm:px-10"
        >
          <div>
            <p className="text-lg font-extrabold text-primary-dark sm:text-2xl">9</p>
            <p className="text-[10px] text-gray-500 sm:text-xs">AMC schemes</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-primary-dark sm:text-2xl">6</p>
            <p className="text-[10px] text-gray-500 sm:text-xs">Riskometer levels</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-primary-dark sm:text-2xl">0%</p>
            <p className="text-[10px] text-gray-500 sm:text-xs">Trail on Direct</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
