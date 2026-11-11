"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTrade } from "@/components/providers/trade-provider";
import { TRADES, TRADE_ORDER } from "@/lib/data/trades";
import { cn } from "@/lib/utils";

/** The live "Industry Mode" pill. Switching re-tints the site and swaps all trade-aware content. */
export function TradeSwitcher({ className }: { className?: string }) {
  const { trade, setTrade } = useTrade();
  const ref = useRef<HTMLDivElement>(null);
  // Keep the active pill visible when the strip scrolls horizontally on mobile.
  useEffect(() => {
    ref.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [trade]);
  return (
    <div ref={ref} role="tablist" aria-label="Industry mode" className={cn("relative flex items-center gap-1 rounded-full border border-bone/10 bg-titanium-950/60 p-1", className)}>
      {TRADE_ORDER.map((id) => {
        const t = TRADES[id];
        const Icon = t.icon;
        const active = id === trade;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            onClick={() => setTrade(id)}
            className={cn(
              "relative z-10 flex shrink-0 items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors md:px-4",
              active ? "text-titanium" : "text-bone-muted hover:text-bone",
            )}
          >
            {active && (
              <motion.span layoutId="trade-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            )}
            <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
            <span className="whitespace-nowrap">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
