"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gauge, Layers, ScanLine } from "lucide-react";
import { useTrade } from "@/components/providers/trade-provider";
import { SectionHeading } from "@/components/ui/section-heading";

const ICONS = [ScanLine, Layers, Gauge];

export function Craftsmanship() {
  const { trade, config } = useTrade();
  return (
    <section id="craftsmanship" className="relative overflow-hidden border-y border-bone/10 bg-titanium-950 py-24 md:py-36">
      <div className="absolute inset-0 bg-grid-lines opacity-70 [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="container relative">
        <SectionHeading
          index="02"
          eyebrow="Craftsmanship & Tech"
          title={<>Measured. Engineered. <span className="accent-text">Proven.</span></>}
          sub="Precision comes from process. These are the systems behind every result, and the reason our work carries a written warranty."
        />

        <AnimatePresence mode="wait">
          <motion.div key={trade} initial="hidden" animate="show" exit={{ opacity: 0 }} variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-3">
            {config.craft.map((c, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.div key={c.title} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="group relative bg-carbon p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-500 group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-6xl font-black text-bone/5">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-3xl font-bold uppercase">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone-muted">{c.body}</p>
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-hover:w-full" />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-14">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-architect text-bone-dim">Materials & partner systems</p>
          <AnimatePresence mode="wait">
            <motion.div key={trade} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-3">
              {config.materials.map((m) => (
                <span key={m} className="rounded-full border border-bone/15 px-5 py-2.5 font-display text-lg font-semibold uppercase tracking-[0.1em] text-bone/70 transition-colors hover:border-accent hover:text-accent">
                  {m}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
