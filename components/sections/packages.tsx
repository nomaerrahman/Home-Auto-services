"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock, ShieldCheck, X } from "lucide-react";
import { useTrade } from "@/components/providers/trade-provider";
import { SERVICES } from "@/lib/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn, money } from "@/lib/utils";
import type { PackageTier } from "@/lib/types";

export function Packages() {
  const { trade, config, openBooking } = useTrade();
  const tiers = SERVICES[trade];
  const [active, setActive] = useState(1);
  useEffect(() => setActive(1), [trade]);

  const select = (t: PackageTier) =>
    openBooking({
      source: "package",
      packageName: t.name,
      summary: `${config.label} · ${t.name} package`,
      estimate: { low: t.priceFrom, high: t.priceTo },
    });

  return (
    <section id="packages" className="relative py-24 md:py-36">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="01"
            eyebrow="Services & Packages"
            title={<>Choose your <span className="accent-text">tier</span></>}
            sub="Every tier is fixed-price and scoped line by line, with no hidden fees. Compare materials, timeframes and warranty coverage at a glance."
            className="mb-0 md:mb-0"
          />
          <div role="tablist" className="flex shrink-0 gap-1 self-start rounded-full border border-bone/10 bg-carbon p-1 lg:self-end">
            {tiers.map((t, i) => (
              <button key={t.id} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={cn("relative rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors", active === i ? "text-titanium" : "text-bone-muted hover:text-bone")}>
                {active === i && <motion.span layoutId="tier-tab" className="absolute inset-0 -z-0 rounded-full bg-bone" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{t.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={trade} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-14 grid gap-5 lg:grid-cols-3">
            {tiers.map((t, i) => {
              const isActive = active === i;
              return (
                <motion.article
                  key={t.id}
                  layout
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border p-7 transition-[border-color,background-color] duration-500 md:p-8",
                    isActive ? "accent-ring border-accent/60 bg-carbon" : "border-bone/10 bg-carbon/50",
                    !isActive && "hidden lg:flex",
                  )}
                >
                  {t.featured && (
                    <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-titanium">Most Chosen</span>
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-dim">Tier 0{i + 1}</span>
                  <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-none">{t.name}</h3>
                  <p className="mt-3 text-sm text-bone-muted">{t.tagline}</p>

                  <div className="mt-7 flex items-baseline gap-2">
                    <span className="font-display text-5xl font-extrabold text-bone">{money(t.priceFrom)}</span>
                    <span className="font-mono text-xs text-bone-dim">– {money(t.priceTo)}</span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 border-y border-bone/10 py-4 text-xs">
                    <div className="flex items-center gap-2 text-bone/80"><Clock className="h-4 w-4 text-accent" />{t.timeframe}</div>
                    <div className="flex items-center gap-2 text-bone/80"><ShieldCheck className="h-4 w-4 text-accent" />{t.warranty}</div>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {t.features.map((f, fi) => (
                      <motion.li key={f.label} initial={false} animate={{ opacity: f.included ? 1 : 0.38 }} transition={{ delay: isActive ? fi * 0.03 : 0 }} className="flex gap-3 text-sm">
                        <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", f.included ? "bg-accent/15 text-accent" : "bg-bone/5 text-bone-dim")}>
                          {f.included ? <Check className="h-3 w-3" strokeWidth={3} /> : <X className="h-3 w-3" />}
                        </span>
                        <span>
                          <span className={cn(f.included ? "text-bone" : "text-bone-dim line-through decoration-bone/20")}>{f.label}</span>
                          {f.detail && f.included && <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-bone-dim">{f.detail}</span>}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <dl className="mt-7 grid grid-cols-2 gap-3">
                    {t.specs.map((s) => (
                      <div key={s.label} className="rounded-xl border border-bone/10 bg-titanium/60 p-3">
                        <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-dim">{s.label}</dt>
                        <dd className="mt-1 text-xs font-semibold text-bone">{s.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <Button className="mt-7 w-full" variant={isActive ? "primary" : "outline"} onClick={(e) => { e.stopPropagation(); select(t); }}>
                    Select & Request Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
