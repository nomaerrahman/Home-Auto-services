"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CirclePlay, Clock, Layers, MapPin, Quote, Target, Trophy, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { SmartImage } from "@/components/ui/smart-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTrade } from "@/components/providers/trade-provider";
import { TRADES } from "@/lib/data/trades";
import { cn, money } from "@/lib/utils";

/** Case-study drawer: challenge, materials, timeframe, gallery and client testimonial. */
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const { openBooking } = useTrade();
  const [shot, setShot] = useState(0);
  useEffect(() => setShot(0), [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-3xl flex-col overflow-y-auto border-l border-bone/10 bg-titanium"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-bone/10 bg-titanium/90 px-6 py-4 backdrop-blur">
              <Badge>{project.tag}</Badge>
              <button onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 hover:border-accent hover:text-accent"><X className="h-4 w-4" /></button>
            </div>

            <div className="p-6 md:p-10">
              <p className="eyebrow">{TRADES[project.trade].label} · Case Study</p>
              <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">{project.title}</h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-bone-muted"><MapPin className="h-4 w-4" />{project.location}</p>

              {/* Gallery */}
              <div className="mt-8">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-bone/10">
                  <AnimatePresence mode="wait">
                    <motion.div key={shot} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                      <SmartImage src={project.gallery[shot]} alt={`${project.title} photo ${shot + 1}`} className="h-full w-full" />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {project.gallery.map((g, i) => (
                    <button key={g + i} onClick={() => setShot(i)} className={cn("relative aspect-[16/10] overflow-hidden rounded-xl border transition-all", shot === i ? "border-accent" : "border-bone/10 opacity-60 hover:opacity-100")}>
                      <SmartImage src={g} alt="" className="h-full w-full" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="panel p-5"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">Investment</p><p className="mt-1 font-display text-3xl font-extrabold text-accent">{money(project.investment)}</p></div>
                <div className="panel p-5"><p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim"><Clock className="h-3 w-3" />Timeframe</p><p className="mt-1 font-display text-3xl font-extrabold">{project.timeframe}</p></div>
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-xl font-bold uppercase"><Target className="h-5 w-5 text-accent" />Client Challenge</h4>
                  <p className="mt-3 leading-relaxed text-bone-muted">{project.challenge}</p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-display text-xl font-bold uppercase"><Layers className="h-5 w-5 text-accent" />Materials & Technology Used</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.materials.map((m) => <li key={m} className="rounded-full border border-bone/15 px-3 py-1.5 text-xs text-bone/80">{m}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-display text-xl font-bold uppercase"><Trophy className="h-5 w-5 text-accent" />Final Result</h4>
                  <p className="mt-3 leading-relaxed text-bone-muted">{project.result}</p>
                </div>

                <figure className="relative overflow-hidden rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-8">
                  <div className="flex items-start gap-5">
                    <button className="group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent text-titanium" aria-label="Play client video testimonial (placeholder)">
                      <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
                      <CirclePlay className="relative h-7 w-7" />
                    </button>
                    <div>
                      <Quote className="h-5 w-5 text-accent" />
                      <blockquote className="mt-2 text-lg font-medium leading-snug text-bone">“{project.testimonial.quote}”</blockquote>
                      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">{project.testimonial.name} · {project.testimonial.role} · Video testimonial</figcaption>
                    </div>
                  </div>
                </figure>
              </div>

              <Button size="lg" className="mt-10 w-full" onClick={() => { onClose(); openBooking({ source: "portfolio", summary: `Similar to: ${project.title}`, estimate: { low: Math.round(project.investment * 0.85), high: Math.round(project.investment * 1.15) } }); }}>
                Start a Project Like This <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
