"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import type { Transformation } from "@/lib/types";

const DISTRESS = "grayscale(0.55) sepia(0.45) contrast(0.78) brightness(0.62) saturate(0.7) blur(0.6px)";

/** Drag-to-compare slider. Pointer, touch and keyboard (←/→, Home/End) supported. */
export function BeforeAfterSlider({ item }: { item: Transformation }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-bone/10 bg-carbon md:aspect-[16/9]"
      onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); setDragging(true); update(e.clientX); }}
      onPointerMove={(e) => dragging && update(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      style={{ touchAction: "pan-y" }}
    >
      {/* AFTER (base layer) */}
      <SmartImage src={item.after.image} alt={item.after.label} className="absolute inset-0 h-full w-full" label="After" />

      {/* BEFORE (clipped layer) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmartImage src={item.before.image} alt={item.before.label} className="absolute inset-0 h-full w-full" style={item.simulateBefore ? { filter: DISTRESS } : undefined} label="Before" />
        {item.simulateBefore && (
          <>
            <div className="noise absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55))]" />
            {item.trade === "auto" && (
              <svg className="absolute inset-0 h-full w-full opacity-40 mix-blend-screen" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
                {Array.from({ length: 26 }).map((_, i) => {
                  const cx = 30 + ((i * 37) % 40), cy = 30 + ((i * 53) % 40), r = 6 + ((i * 7) % 18);
                  return <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="white" strokeWidth="0.08" />;
                })}
              </svg>
            )}
          </>
        )}
      </div>

      {/* Labels */}
      <span className="absolute left-4 top-4 rounded-full bg-titanium/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone backdrop-blur md:left-6 md:top-6">
        Before · {item.before.label}
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-titanium md:right-6 md:top-6">
        After · {item.after.label}
      </span>

      {/* Handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-bone shadow-[0_0_24px_rgba(255,255,255,0.6)]" />
        <motion.button
          type="button"
          role="slider"
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
            if (e.key === "Home") setPos(0);
            if (e.key === "End") setPos(100);
          }}
          animate={{ scale: dragging ? 1.12 : 1 }}
          className="absolute top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-accent bg-bone text-titanium shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
        >
          <ChevronsLeftRight className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
}
