"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * <img> with a branded fallback. Uses a plain img (not next/image) so the
 * template works with any remote URL without extra config, and so a dead
 * stock URL degrades into an on-brand placeholder instead of a broken icon.
 */
export function SmartImage({ src, alt, className, style, label, eager }: { src: string; alt: string; className?: string; style?: React.CSSProperties; label?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt} className={cn("relative flex items-center justify-center overflow-hidden bg-carbon-700", className)} style={style}>
        <div className="absolute inset-0 bg-grid-lines [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-titanium" />
        {label !== "" && <span className="relative font-display text-2xl font-bold uppercase tracking-[0.2em] text-bone/30">{label ?? "APEX"}</span>}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={cn("object-cover", className)} style={style} loading={eager ? "eager" : "lazy"} draggable={false} onError={() => setFailed(true)} />
  );
}
