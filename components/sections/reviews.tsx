"use client";

import { useMemo } from "react";
import { BadgeCheck, Star } from "lucide-react";
import { useTrade } from "@/components/providers/trade-provider";
import { REVIEWS, REVIEW_SUMMARY } from "@/lib/data/reviews";
import { TRADES } from "@/lib/data/trades";
import { SectionHeading } from "@/components/ui/section-heading";
import { SmartImage } from "@/components/ui/smart-image";
import { cn, money } from "@/lib/utils";
import type { Review } from "@/lib/types";

function ReviewCard({ r, highlight }: { r: Review; highlight: boolean }) {
  return (
    <article className={cn("w-[340px] shrink-0 rounded-3xl border bg-carbon p-6 md:w-[400px]", highlight ? "border-accent/40" : "border-bone/10")}>
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
          {/* mini before/after thumb */}
          <SmartImage src={r.thumb} alt="" label="" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"><SmartImage src={r.thumb} alt="" label="" className="absolute inset-0 h-full w-[200%] max-w-none" style={{ filter: "grayscale(0.6) sepia(0.4) brightness(0.6)" }} /></div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-bone" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 font-semibold">{r.name}<BadgeCheck className="h-4 w-4 text-accent" /></div>
          <div className="text-xs text-bone-muted">{r.location} · {r.date}</div>
          <div className="mt-1 flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}</div>
        </div>
      </div>
      <p className="mt-5 text-[15px] leading-relaxed text-bone/85">“{r.quote}”</p>
      <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
        <span className="rounded-full border border-bone/15 px-2.5 py-1 text-bone-muted">{TRADES[r.trade].short} · {r.project}</span>
        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-accent">{money(r.cost)} project</span>
      </div>
    </article>
  );
}

function Row({ items, reverse, trade }: { items: Review[]; reverse?: boolean; trade: string }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={cn("flex w-max gap-4 pr-4 animate-marquee group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}>
        {[...items, ...items].map((r, i) => <ReviewCard key={r.id + i} r={r} highlight={r.trade === trade} />)}
      </div>
    </div>
  );
}

export function Reviews() {
  const { trade } = useTrade();
  const sorted = useMemo(() => [...REVIEWS].sort((a, b) => Number(b.trade === trade) - Number(a.trade === trade)), [trade]);
  const half = Math.ceil(sorted.length / 2);

  return (
    <section id="reviews" className="overflow-hidden py-24 md:py-36">
      <div className="container">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading index="07" eyebrow="Verified Reviews" title={<>{REVIEW_SUMMARY.count}+ owners <span className="accent-text">can't be wrong</span></>} className="mb-0 md:mb-0" />
          <div className="flex items-center gap-6 pb-2">
            <span className="font-display text-8xl font-black leading-none">{REVIEW_SUMMARY.average}</span>
            <div>
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-accent text-accent" />)}</div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-muted">Google · Houzz · Yelp</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 space-y-4">
        <Row items={sorted.slice(0, half)} trade={trade} />
        <Row items={sorted.slice(half)} reverse trade={trade} />
      </div>
    </section>
  );
}
