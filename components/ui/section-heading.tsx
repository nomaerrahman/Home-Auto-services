import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({ index, eyebrow, title, sub, align = "left", className }: { index: string; eyebrow: string; title: React.ReactNode; sub?: string; align?: "left" | "center"; className?: string }) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <div className={cn("mb-5 flex items-center gap-4", align === "center" && "justify-center")}>
        <span className="font-mono text-[11px] text-bone-dim">{index}</span>
        <span className="h-px w-10 bg-accent" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-bone md:text-7xl">{title}</h2>
      {sub && <p className={cn("mt-6 max-w-2xl text-base leading-relaxed text-bone-muted md:text-lg", align === "center" && "mx-auto")}>{sub}</p>}
    </Reveal>
  );
}
