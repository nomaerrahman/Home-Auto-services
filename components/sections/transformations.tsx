"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTrade } from "@/components/providers/trade-provider";
import { TRANSFORMATIONS } from "@/lib/data/transformations";
import { TRADES, TRADE_ORDER } from "@/lib/data/trades";
import { SectionHeading } from "@/components/ui/section-heading";
import { BeforeAfterSlider } from "@/components/interactive/before-after-slider";
import { cn } from "@/lib/utils";
import type { TradeId } from "@/lib/types";

export function Transformations() {
  const { trade } = useTrade();
  // Follows the global Industry Mode, but can be browsed independently.
  const [override, setOverride] = useState<TradeId | null>(null);
  const [lastTrade, setLastTrade] = useState(trade);
  if (lastTrade !== trade) { setLastTrade(trade); setOverride(null); }
  const current = override ?? trade;
  const item = TRANSFORMATIONS[current];

  return (
    <section id="transformations" className="py-24 md:py-36">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Transformation Engine"
          title={<>Drag to see the <span className="accent-text">difference</span></>}
          sub="Real-world transformations documented from the same angle. Drag the handle, or use your arrow keys."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {TRADE_ORDER.map((id) => (
            <button key={id} onClick={() => setOverride(id)} className={cn("rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors", current === id ? "border-accent bg-accent/10 text-accent" : "border-bone/10 text-bone-muted hover:border-bone/30 hover:text-bone")}>
              {TRADES[id].label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45 }}>
            <BeforeAfterSlider item={item} />
            <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_2fr] md:items-center">
              <p className="font-display text-2xl font-bold uppercase leading-tight text-bone md:text-3xl">{item.title}</p>
              <div className="grid grid-cols-3 gap-3">
                {item.stats.map((s) => (
                  <div key={s.label} className="panel p-4">
                    <div className="font-display text-2xl font-extrabold text-accent md:text-3xl">{s.value}</div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-dim">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
