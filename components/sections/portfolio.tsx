"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTrade } from "@/components/providers/trade-provider";
import { PORTFOLIO_TAGS, PROJECTS, TRADE_DEFAULT_TAG } from "@/lib/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import { ProjectModal } from "@/components/interactive/project-modal";
import { cn, money } from "@/lib/utils";
import type { PortfolioTag, Project } from "@/lib/types";

type Filter = "All" | PortfolioTag;

export function Portfolio() {
  const { trade } = useTrade();
  const [filter, setFilter] = useState<Filter>(TRADE_DEFAULT_TAG[trade]);
  const [lastTrade, setLastTrade] = useState(trade);
  if (lastTrade !== trade) { setLastTrade(trade); setFilter(TRADE_DEFAULT_TAG[trade]); }
  const [open, setOpen] = useState<Project | null>(null);

  const items = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);

  return (
    <section id="portfolio" className="py-24 md:py-36">
      <div className="container">
        <SectionHeading index="05" eyebrow="Portfolio & Case Studies" title={<>Work that <span className="accent-text">speaks</span></>} sub="Open any project to see the brief, the materials, the timeline and what the client said." />

        <div className="no-scrollbar -mx-4 mb-10 flex gap-2 overflow-x-auto px-4">
          {(["All", ...PORTFOLIO_TAGS] as Filter[]).map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={cn("relative shrink-0 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors", filter === t ? "text-titanium" : "border border-bone/10 text-bone-muted hover:text-bone")}>
              {filter === t && <motion.span layoutId="pf-filter" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid auto-rows-[280px] gap-4 sm:grid-cols-2 lg:grid-cols-3 md:auto-rows-[320px]">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.button
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setOpen(p)}
                className={cn("group relative overflow-hidden rounded-3xl border border-bone/10 text-left", i === 0 && items.length > 2 && "sm:col-span-2 sm:row-span-2 lg:col-span-2")}
              >
                <SmartImage src={p.cover} alt={p.title} className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105" label={p.tag} />
                <div className="absolute inset-0 bg-gradient-to-t from-titanium via-titanium/30 to-transparent" />
                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-bone text-titanium opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="mb-3 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                    <span className="rounded-full bg-accent px-2.5 py-1 font-bold text-titanium">{p.tag}</span>
                    <span className="rounded-full bg-titanium/70 px-2.5 py-1 text-bone backdrop-blur">{money(p.investment, true)}</span>
                    <span className="rounded-full bg-titanium/70 px-2.5 py-1 text-bone backdrop-blur">{p.timeframe}</span>
                  </div>
                  <h3 className={cn("font-display font-extrabold uppercase leading-none", i === 0 && items.length > 2 ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl")}>{p.title}</h3>
                  <p className="mt-2 text-xs text-bone-muted">{p.location}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}
