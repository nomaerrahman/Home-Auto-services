"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useTrade } from "@/components/providers/trade-provider";
import { BRAND } from "@/lib/data/trades";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";

export function Contact() {
  const { config, openBooking } = useTrade();
  return (
    <section id="contact" className="relative isolate overflow-hidden py-28 md:py-40">
      <SmartImage src={config.hero.image} alt="" className="absolute inset-0 -z-20 h-full w-full opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-titanium via-titanium/80 to-titanium" />
      <div className="container text-center">
        <Reveal>
          <p className="eyebrow">08 · Book your inspection</p>
          <h2 className="mx-auto mt-6 max-w-5xl font-display text-6xl font-black uppercase leading-[0.85] md:text-[8rem]">
            Built once. <span className="accent-text">Built right.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-bone-muted">Free on-site inspection and a fixed-price proposal within 48 hours. Spots for {config.label.toLowerCase()} projects this month are limited.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={() => openBooking({ source: "contact" })}>Book Free Inspection <ArrowUpRight className="h-4 w-4" /></Button>
            <a href={`tel:${BRAND.phone.replace(/\D/g, "")}`}><Button size="lg" variant="outline"><Phone className="h-4 w-4" />{BRAND.phone}</Button></a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-muted">
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" />{BRAND.email}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" />{BRAND.city}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
