"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { TradeSwitcher } from "./trade-switcher";
import { useTrade } from "@/components/providers/trade-provider";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/nav";


export function Navbar() {
  const { openBooking } = useTrade();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={cn("transition-all duration-500", scrolled ? "glass border-x-0 border-t-0" : "border-b border-transparent bg-gradient-to-b from-titanium/80 to-transparent")}>
        <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
          <a href="#top" aria-label="APEX home"><Logo /></a>

          <nav className="hidden items-center gap-6 xl:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="relative whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.12em] text-bone-muted transition-colors hover:text-bone after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden whitespace-nowrap sm:inline-flex" onClick={() => openBooking({ source: "nav" })}>
              Get Instant Estimate <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
            <button aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 xl:hidden" onClick={() => setMobileOpen((o) => !o)}>
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Industry Mode strip */}
        <div className="border-t border-bone/5">
          <div className="container flex items-center gap-4 py-2">
            <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-architect text-bone-dim md:inline">Industry Mode</span>
            <div className="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
              <TradeSwitcher className="w-max" />
            </div>
          </div>
        </div>

        {/* Scroll progress */}
        <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-gradient-to-r from-accent-deep via-accent to-accent-soft" />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-4 mt-2 rounded-2xl p-4 xl:hidden"
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block border-b border-bone/5 py-3 text-sm uppercase tracking-[0.14em] text-bone-muted last:border-0 hover:text-accent">
                {l.label}
              </a>
            ))}
            <Button className="mt-3 w-full" onClick={() => { setMobileOpen(false); openBooking({ source: "nav" }); }}>
              Get Instant Estimate
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
