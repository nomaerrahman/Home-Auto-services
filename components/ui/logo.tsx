import { cn } from "@/lib/utils";

/** Vector logo placeholder: chevron "A" peak mark + wordmark. */
export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <rect x="1" y="1" width="38" height="38" rx="8" className="fill-carbon stroke-bone/15" strokeWidth="1" />
        <path d="M8 31 L20 8 L32 31" fill="none" className="stroke-accent" strokeWidth="3" strokeLinejoin="miter" />
        <path d="M13.5 24 H26.5" className="stroke-bone" strokeWidth="2" />
        <circle cx="20" cy="8" r="1.8" className="fill-bone" />
      </svg>
      {!compact && (
        <span className="whitespace-nowrap leading-none">
          <span className="block font-display text-2xl font-extrabold tracking-[0.18em] text-bone">APEX</span>
          <span className="block font-mono text-[8.5px] uppercase tracking-[0.34em] text-bone-muted">Craftsmen &amp; Studio</span>
        </span>
      )}
    </span>
  );
}
