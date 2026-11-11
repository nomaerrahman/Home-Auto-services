"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Check, FileImage, Loader2, Upload, X } from "lucide-react";
import { useTrade } from "@/components/providers/trade-provider";
import { TRADES, TRADE_ORDER } from "@/lib/data/trades";
import { Button } from "@/components/ui/button";
import { cn, money } from "@/lib/utils";
import type { TradeId } from "@/lib/types";

const STEPS = ["Project Details", "Inspection Date", "Contact & Confirm"];
const SLOTS = ["8:00 – 10:00 AM", "11:00 AM – 1:00 PM", "2:00 – 4:00 PM", "5:00 – 6:30 PM"];

function nextWorkingDays(n: number) {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(new Date(d)); // skip Sundays
  }
  return days;
}

interface FormState {
  trade: TradeId;
  details: string;
  files: File[];
  date: string | null;
  slot: string | null;
  name: string;
  email: string;
  phone: string;
  zip: string;
  contactPref: "Call" | "Text" | "Email";
}

const inputCls =
  "w-full rounded-xl border border-bone/15 bg-titanium-950 px-4 py-3 text-sm text-bone placeholder:text-bone-dim focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export function BookingDrawer() {
  const { booking, closeBooking, trade } = useTrade();
  const { open, prefill } = booking;
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const days = useMemo(() => nextWorkingDays(12), []);

  const blank = (t: TradeId): FormState => ({ trade: t, details: "", files: [], date: null, slot: null, name: "", email: "", phone: "", zip: "", contactPref: "Call" });
  const [form, setForm] = useState<FormState>(blank(trade));
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  // Reset every time the drawer opens.
  useEffect(() => {
    if (open) { setStep(0); setDone(null); setForm(blank(trade)); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeBooking();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, closeBooking]);

  const previews = useMemo(() => form.files.map((f) => (f.type.startsWith("image/") ? URL.createObjectURL(f) : null)), [form.files]);
  useEffect(() => () => previews.forEach((p) => p && URL.revokeObjectURL(p)), [previews]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    set("files", [...form.files, ...Array.from(list)].slice(0, 8));
  };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const canNext = [form.details.trim().length >= 10 || !!prefill?.summary, !!form.date && !!form.slot, form.name.trim().length > 1 && emailOk && form.phone.replace(/\D/g, "").length >= 7][step];

  const submit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade: form.trade,
          details: form.details,
          prefill,
          fileNames: form.files.map((f) => f.name), // wire real uploads to S3/Uploadthing here
          date: form.date,
          slot: form.slot,
          name: form.name,
          email: form.email,
          phone: form.phone,
          zip: form.zip,
          contactPref: form.contactPref,
        }),
      });
      const data = await res.json().catch(() => ({}));
      setDone(data.reference ?? `APX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    } catch {
      setDone(`APX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDate = form.date ? new Date(form.date) : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeBooking} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Book an inspection"
            className="fixed inset-y-0 right-0 z-[71] flex w-full max-w-xl flex-col border-l border-bone/10 bg-titanium"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            {/* Header */}
            <div className="border-b border-bone/10 px-6 pb-5 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Instant Estimate & Inspection</p>
                  <h3 className="mt-2 font-display text-3xl font-extrabold uppercase leading-none">{done ? "You're booked." : STEPS[step]}</h3>
                </div>
                <button onClick={closeBooking} aria-label="Close" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bone/15 hover:border-accent hover:text-accent"><X className="h-4 w-4" /></button>
              </div>
              {!done && (
                <div className="mt-5 flex gap-2">
                  {STEPS.map((s, i) => (
                    <div key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-bone/10">
                      <motion.div className="h-full bg-accent" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prefill summary */}
            {prefill?.estimate && !done && (
              <div className="mx-6 mt-5 flex items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-4">
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">Locked estimate</p>
                  <p className="mt-1 truncate text-xs text-bone-muted">{prefill.summary}</p>
                </div>
                <p className="shrink-0 font-display text-2xl font-extrabold">{money(prefill.estimate.low, true)}–{money(prefill.estimate.high, true)}</p>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent text-titanium">
                      <Check className="h-10 w-10" strokeWidth={3} />
                    </motion.div>
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-bone-muted">Confirmation #{done}</p>
                    <p className="mx-auto mt-4 max-w-sm text-bone/85">
                      Thanks {form.name.split(" ")[0]}. Your {TRADES[form.trade].label.toLowerCase()} inspection is requested for{" "}
                      <strong className="text-bone">{selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</strong>, {form.slot}.
                      Your project director will confirm by {form.contactPref.toLowerCase()} within 2 business hours.
                    </p>
                    <Button className="mt-8" variant="outline" onClick={closeBooking}>Back to site</Button>
                  </motion.div>
                ) : (
                  <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-6">
                    {step === 0 && (
                      <>
                        <div>
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Service</label>
                          <div className="grid grid-cols-2 gap-2">
                            {TRADE_ORDER.map((id) => {
                              const Icon = TRADES[id].icon;
                              return (
                                <button key={id} type="button" onClick={() => set("trade", id)} className={cn("flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs font-semibold uppercase tracking-[0.1em] transition-colors", form.trade === id ? "border-accent bg-accent/10 text-accent" : "border-bone/10 text-bone-muted hover:border-bone/30")}>
                                  <Icon className="h-4 w-4" />{TRADES[id].label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="details" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Tell us about the project</label>
                          <textarea id="details" rows={4} className={inputCls} placeholder={form.trade === "auto" ? "e.g. 2023 Porsche Macan, swirl marks and light scratches, want ceramic + front PPF" : "e.g. 1990s kitchen, ~250 sq ft, want to open the wall to the dining room"} value={form.details} onChange={(e) => set("details", e.target.value)} />
                        </div>
                        <div>
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Photos (optional, up to 8)</label>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => fileRef.current?.click()}
                            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                            className={cn("flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors", dragOver ? "border-accent bg-accent/10" : "border-bone/15 hover:border-bone/30")}
                          >
                            <Upload className="h-6 w-6 text-accent" />
                            <p className="mt-3 text-sm font-semibold">Drop photos here or click to browse</p>
                            <p className="mt-1 text-xs text-bone-dim">JPG, PNG or HEIC. Photos help us quote more accurately.</p>
                            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
                          </div>
                          {form.files.length > 0 && (
                            <div className="mt-3 grid grid-cols-4 gap-2">
                              {form.files.map((f, i) => (
                                <div key={f.name + i} className="group relative aspect-square overflow-hidden rounded-xl border border-bone/10 bg-carbon">
                                  {previews[i] ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={previews[i]!} alt={f.name} className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="flex h-full items-center justify-center"><FileImage className="h-5 w-5 text-bone-dim" /></div>
                                  )}
                                  <button type="button" aria-label={`Remove ${f.name}`} onClick={() => set("files", form.files.filter((_, j) => j !== i))} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-titanium/90 opacity-0 transition-opacity group-hover:opacity-100">
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <div>
                          <label className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted"><CalendarDays className="h-3.5 w-3.5" />Preferred on-site inspection date</label>
                          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                            {days.map((d) => {
                              const iso = d.toISOString();
                              const active = form.date === iso;
                              return (
                                <button key={iso} type="button" onClick={() => set("date", iso)} className={cn("flex flex-col items-center rounded-xl border py-3 transition-colors", active ? "border-accent bg-accent text-titanium" : "border-bone/10 hover:border-bone/30")}>
                                  <span className={cn("font-mono text-[9px] uppercase tracking-[0.16em]", active ? "text-titanium/70" : "text-bone-dim")}>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                                  <span className="font-display text-2xl font-extrabold leading-tight">{d.getDate()}</span>
                                  <span className={cn("font-mono text-[9px] uppercase", active ? "text-titanium/70" : "text-bone-dim")}>{d.toLocaleDateString("en-US", { month: "short" })}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Arrival window</label>
                          <div className="grid grid-cols-2 gap-2">
                            {SLOTS.map((s) => (
                              <button key={s} type="button" onClick={() => set("slot", s)} className={cn("rounded-xl border px-3 py-3 text-sm transition-colors", form.slot === s ? "border-accent bg-accent/10 text-accent" : "border-bone/10 text-bone-muted hover:border-bone/30")}>{s}</button>
                            ))}
                          </div>
                        </div>
                        <p className="rounded-xl border border-bone/10 bg-carbon p-4 text-xs leading-relaxed text-bone-muted">
                          {form.trade === "auto" ? "We can inspect at your home or office, or you can visit our climate-controlled studio." : "Inspections take 45–60 minutes. Your project director measures, photographs and talks through the options with you."}
                        </p>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2"><label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Full name</label><input id="name" className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></div>
                          <div><label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Email</label><input id="email" type="email" className={cn(inputCls, form.email && !emailOk && "border-red-500/60")} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></div>
                          <div><label htmlFor="phone" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Phone</label><input id="phone" type="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" /></div>
                          <div className="sm:col-span-2"><label htmlFor="zip" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">ZIP / Postcode</label><input id="zip" className={inputCls} value={form.zip} onChange={(e) => set("zip", e.target.value)} autoComplete="postal-code" /></div>
                        </div>
                        <div>
                          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Best way to confirm</label>
                          <div className="flex gap-2">
                            {(["Call", "Text", "Email"] as const).map((p) => (
                              <button key={p} type="button" onClick={() => set("contactPref", p)} className={cn("flex-1 rounded-xl border py-2.5 text-sm transition-colors", form.contactPref === p ? "border-accent bg-accent/10 text-accent" : "border-bone/10 text-bone-muted")}>{p}</button>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-bone/10 bg-carbon p-4 text-sm">
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-dim">Summary</p>
                          <p className="mt-2 text-bone/85">{TRADES[form.trade].label}{prefill?.packageName ? ` · ${prefill.packageName}` : ""} · {selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}, {form.slot}</p>
                          {form.files.length > 0 && <p className="mt-1 text-xs text-bone-muted">{form.files.length} photo{form.files.length > 1 ? "s" : ""} attached</p>}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!done && (
              <div className="flex items-center justify-between gap-3 border-t border-bone/10 px-6 py-4">
                <Button variant="ghost" size="sm" disabled={step === 0} onClick={() => setStep((s) => s - 1)}><ArrowLeft className="h-4 w-4" />Back</Button>
                {step < 2 ? (
                  <Button size="sm" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>Continue <ArrowRight className="h-4 w-4" /></Button>
                ) : (
                  <Button size="sm" disabled={!canNext || submitting} onClick={submit}>
                    {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Confirming</> : <>Confirm Booking <Check className="h-4 w-4" /></>}
                  </Button>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
