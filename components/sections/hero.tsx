"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight, BadgeCheck, ShieldCheck, Star, ThumbsUp } from "lucide-react";
import { useTrade } from "@/components/providers/trade-provider";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";
import { REVIEW_SUMMARY } from "@/lib/data/reviews";

const LINES = [["Precision", "Engineering."], ["Master", "Craftsmanship."]];

const TRUST = [
  { icon: ShieldCheck, label: "Licensed & Insured ($2M)" },
  { icon: BadgeCheck, label: "Certified Master Technicians" },
  { icon: ThumbsUp, label: "100% Satisfaction Guarantee" },
  { icon: Star, label: `${REVIEW_SUMMARY.average} ★★★★★ (${REVIEW_SUMMARY.count}+ Verified Reviews)` },
];

export function Hero() {
  const { trade, config, openBooking } = useTrade();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  let wordIndex = 0;

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-36 md:pt-44">
      {/* Background imagery, cross-fades per trade */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-20">
        <AnimatePresence mode="popLayout">
          <motion.div key={trade} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="absolute inset-0">
            <SmartImage src={config.hero.image} alt={`${config.label} showcase`} className="h-full w-full" eager label={config.label} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-titanium via-titanium/85 to-titanium/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-titanium via-transparent to-titanium/60" />
      <div className="absolute inset-0 -z-10 bg-grid-lines opacity-60 [background-size:80px_80px] [mask-image:linear-gradient(to_right,black,transparent_70%)]" />

      <div className="container relative flex flex-1 flex-col justify-center pb-10">
        {/* line-work coordinates */}
        <div className="pointer-events-none absolute right-8 top-0 hidden flex-col items-end gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/30 lg:flex">
          <span>Tolerance ±0.8mm</span>
          <span className="h-24 w-px bg-gradient-to-b from-accent to-transparent" />
        </div>

        <AnimatePresence mode="wait">
          <motion.p key={trade} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.4 }} className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            {config.label} — {config.hero.kicker}
          </motion.p>
        </AnimatePresence>

        <h1 className="font-display text-[15vw] font-black uppercase leading-[0.82] tracking-tight sm:text-[12vw] lg:text-[9.2rem]">
          {LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((word) => {
                const i = wordIndex++;
                return (
                  <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.04em] align-bottom">
                    <motion.span
                      className={li === 1 && word.startsWith("Craft") ? "accent-text inline-block" : "inline-block"}
                      initial={{ y: "110%", rotate: 4 }}
                      animate={{ y: "0%", rotate: 0 }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <AnimatePresence mode="wait">
            <motion.p key={trade} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="max-w-xl text-base leading-relaxed text-bone/75 md:text-lg">
              {config.hero.sub}
            </motion.p>
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Button size="lg" onClick={() => openBooking({ source: "nav" })}>
              Get Instant Estimate <ArrowUpRight className="h-4 w-4" />
            </Button>
            <a href="#transformations">
              <Button size="lg" variant="outline">See Transformations <ArrowDownRight className="h-4 w-4" /></Button>
            </a>
          </motion.div>
        </div>

        {/* stats */}
        <div className="mt-14 grid grid-cols-3 border-y border-bone/10">
          {config.hero.stat.map((s, i) => (
            <div key={s.label} className="border-bone/10 py-5 pr-4 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 md:pl-8 md:[&:first-child]:pl-0">
              <AnimatePresence mode="wait">
                <motion.div key={trade + s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.06 }}>
                  <div className="font-display text-3xl font-extrabold uppercase text-bone md:text-5xl">{s.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">{s.label}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* trust badges */}
      <div className="relative border-t border-bone/10 bg-titanium-950/70 backdrop-blur">
        <div className="container grid grid-cols-2 gap-px md:grid-cols-4">
          {TRUST.map(({ icon: Icon, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.1 }} className="flex items-center gap-3 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-bone/80 md:py-5">
              <Icon className="h-4 w-4 shrink-0 text-accent" />
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
