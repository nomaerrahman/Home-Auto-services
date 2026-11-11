"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lock, Plus } from "lucide-react";
import { useTrade } from "@/components/providers/trade-provider";
import { ESTIMATOR } from "@/lib/data/estimator";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { AnimatedMoney } from "@/components/ui/animated-number";
import { cn, money } from "@/lib/utils";

const STEPS = ["Project Type", "Scope", "Upgrades"];

export function Estimator() {
  const { trade, config, openBooking } = useTrade();
  const cfg = ESTIMATOR[trade];

  const [step, setStep] = useState(0);
  const [typeId, setTypeId] = useState(cfg.projectTypes[1].id);
  const [units, setUnits] = useState(cfg.scope.kind === "slider" ? cfg.scope.default : 0);
  const [sizeId, setSizeId] = useState(cfg.scope.kind === "choice" ? cfg.scope.options[0].id : "");
  const [addOns, setAddOns] = useState<string[]>([]);

  // Reset when the Industry Mode changes.
  useEffect(() => {
    const c = ESTIMATOR[trade];
    setStep(0);
    setTypeId(c.projectTypes[1].id);
    setUnits(c.scope.kind === "slider" ? c.scope.default : 0);
    setSizeId(c.scope.kind === "choice" ? c.scope.options[0].id : "");
    setAddOns([]);
  }, [trade]);

  const calc = useMemo(() => {
    const type = cfg.projectTypes.find((t) => t.id === typeId) ?? cfg.projectTypes[0];
    let core = type.base;
    let scopeLabel = "";
    if (cfg.scope.kind === "slider") {
      core += units * cfg.scope.ratePerUnit;
      scopeLabel = `${units.toLocaleString()} ${cfg.scope.unit}`;
    } else {
      const opt = cfg.scope.options.find((o) => o.id === sizeId) ?? cfg.scope.options[0];
      core *= opt.multiplier;
      scopeLabel = opt.label;
    }
    const chosen = cfg.addOns.filter((a) => addOns.includes(a.id));
    const extras = chosen.reduce((s, a) => s + a.price, 0);
    const mid = core + extras;
    return { type, scopeLabel, chosen, mid, low: Math.round((mid * (1 - cfg.spread)) / 100) * 100, high: Math.round((mid * (1 + cfg.spread)) / 100) * 100 };
  }, [cfg, typeId, units, sizeId, addOns]);

  const toggle = (id: string) => setAddOns((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const book = () =>
    openBooking({
      source: "estimator",
      summary: `${config.label} · ${calc.type.label} · ${calc.scopeLabel}${calc.chosen.length ? ` · +${calc.chosen.map((c) => c.label).join(", ")}` : ""}`,
      estimate: { low: calc.low, high: calc.high },
    });

  return (
    <section id="estimator" className="relative border-y border-bone/10 bg-titanium-950 py-24 md:py-36">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Instant Estimator"
          title={<>Your price, <span className="accent-text">in 30 seconds</span></>}
          sub="Pick a project type, set the scope and add upgrades. The estimate updates live, with no email required. An on-site inspection then locks in the exact figure."
        />

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Steps */}
          <div className="panel overflow-hidden">
            <div className="flex border-b border-bone/10">
              {STEPS.map((s, i) => (
                <button key={s} onClick={() => setStep(i)} className={cn("relative flex flex-1 items-center gap-3 px-4 py-5 text-left md:px-6", i === step ? "text-bone" : "text-bone-dim hover:text-bone-muted")}>
                  <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]", i < step ? "border-accent bg-accent text-titanium" : i === step ? "border-accent text-accent" : "border-bone/20")}>
                    {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] sm:inline">{s}</span>
                  {i === step && <motion.span layoutId="est-step" className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />}
                </button>
              ))}
            </div>

            <div className="min-h-[380px] p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={`${trade}-${step}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                  {step === 0 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {cfg.projectTypes.map((t) => (
                        <button key={t.id} onClick={() => setTypeId(t.id)} className={cn("group rounded-2xl border p-5 text-left transition-all", typeId === t.id ? "border-accent bg-accent/10" : "border-bone/10 hover:border-bone/30")}>
                          <div className="flex items-start justify-between gap-3">
                            <span className="font-display text-2xl font-bold uppercase leading-none">{t.label}</span>
                            <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border", typeId === t.id ? "border-accent bg-accent text-titanium" : "border-bone/20")}>
                              {typeId === t.id && <Check className="h-3 w-3" strokeWidth={3} />}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-bone-muted">{t.desc}</p>
                          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim">From {money(t.base)}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 1 && cfg.scope.kind === "slider" && (
                    <div className="py-6">
                      <p className="eyebrow">{cfg.scope.label}</p>
                      <div className="mt-4 flex items-baseline gap-3">
                        <span className="font-display text-7xl font-black md:text-8xl">{units.toLocaleString()}</span>
                        <span className="font-mono text-sm uppercase text-bone-muted">{cfg.scope.unit}</span>
                      </div>
                      <input
                        type="range"
                        className="apex-range mt-10"
                        min={cfg.scope.min}
                        max={cfg.scope.max}
                        step={cfg.scope.step}
                        value={units}
                        onChange={(e) => setUnits(Number(e.target.value))}
                        style={{ ["--fill" as string]: `${((units - cfg.scope.min) / (cfg.scope.max - cfg.scope.min)) * 100}%` }}
                        aria-label={cfg.scope.label}
                      />
                      <div className="mt-3 flex justify-between font-mono text-[10px] text-bone-dim">
                        <span>{cfg.scope.min.toLocaleString()} {cfg.scope.unit}</span>
                        <span>{cfg.scope.max.toLocaleString()} {cfg.scope.unit}</span>
                      </div>
                    </div>
                  )}

                  {step === 1 && cfg.scope.kind === "choice" && (
                    <div>
                      <p className="eyebrow mb-4">{cfg.scope.label}</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {cfg.scope.options.map((o) => (
                          <button key={o.id} onClick={() => setSizeId(o.id)} className={cn("rounded-2xl border p-5 text-left transition-all", sizeId === o.id ? "border-accent bg-accent/10" : "border-bone/10 hover:border-bone/30")}>
                            <span className="font-display text-2xl font-bold uppercase">{o.label}</span>
                            <p className="mt-1 text-sm text-bone-muted">{o.desc}</p>
                            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim">×{o.multiplier.toFixed(1)} scope factor</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-3">
                      {cfg.addOns.map((a) => {
                        const on = addOns.includes(a.id);
                        return (
                          <button key={a.id} onClick={() => toggle(a.id)} className={cn("flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all", on ? "border-accent bg-accent/10" : "border-bone/10 hover:border-bone/30")}>
                            <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all", on ? "rotate-0 border-accent bg-accent text-titanium" : "border-bone/20 text-bone-muted")}>
                              {on ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" />}
                            </span>
                            <span className="flex-1">
                              <span className="block font-semibold">{a.label}</span>
                              <span className="block text-xs text-bone-muted">{a.desc}</span>
                            </span>
                            <span className="font-mono text-sm text-bone">+{money(a.price)}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-bone/10 p-4 md:px-8">
              <Button variant="ghost" size="sm" disabled={step === 0} onClick={() => setStep((s) => s - 1)}><ArrowLeft className="h-4 w-4" /> Back</Button>
              {step < 2 ? (
                <Button size="sm" onClick={() => setStep((s) => s + 1)}>Next: {STEPS[step + 1]} <ArrowRight className="h-4 w-4" /></Button>
              ) : (
                <Button size="sm" onClick={book}>Book Inspection <ArrowRight className="h-4 w-4" /></Button>
              )}
            </div>
          </div>

          {/* Live output */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            <div className="accent-ring relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-b from-carbon to-titanium p-7 md:p-8">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
              <p className="eyebrow relative">Estimated investment</p>
              <div className="relative mt-4 font-display text-5xl font-black leading-none md:text-6xl">
                <AnimatedMoney value={calc.low} />
                <span className="mx-2 text-bone-dim">–</span>
                <br className="hidden md:block lg:hidden xl:block" />
                <AnimatedMoney value={calc.high} className="accent-text" />
              </div>

              <dl className="relative mt-8 space-y-3 border-t border-bone/10 pt-6 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-bone-muted">Trade</dt><dd className="text-right font-medium">{config.label}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-bone-muted">Project</dt><dd className="text-right font-medium">{calc.type.label}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-bone-muted">Scope</dt><dd className="text-right font-medium">{calc.scopeLabel}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-bone-muted">Upgrades</dt><dd className="text-right font-medium">{calc.chosen.length || "None"}</dd></div>
              </dl>

              <Button size="lg" className="relative mt-8 w-full text-[11px]" onClick={book}>
                <Lock className="h-4 w-4" /> Lock In Your Estimate & Book Inspection
              </Button>
              <p className="relative mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-bone-dim">Free inspection · Fixed-price contract · No obligation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
