"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Receipt, ShieldCheck, Wind } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const STANDARDS = [
  { icon: Wind, title: "Dustless / Clean-Worksite Guarantee", body: "HEPA negative-air containment, zip-wall barriers and an end-of-day sweep. Your home or vehicle is cleaner when we leave than when we arrived.", metric: "99.97%", metricLabel: "HEPA capture" },
  { icon: ShieldCheck, title: "White-Glove Surface Protection", body: "Floors, fixtures, trim and paint are masked and padded before any tool comes out. Anything we touch is protected first.", metric: "0", metricLabel: "Damage claims, 2025" },
  { icon: Receipt, title: "Transparent Fixed Pricing", body: "A line-item contract signed before work begins. The number we quote is the number you pay, with no hidden fees and no surprise change orders.", metric: "±0%", metricLabel: "Price drift" },
  { icon: ClipboardCheck, title: "Dedicated Project Director", body: "One named director owns your project from start to finish, and you get a photo progress update every working day.", metric: "Daily", metricLabel: "Progress reports" },
];

export function Standards() {
  return (
    <section id="standards" className="border-y border-bone/10 bg-titanium-950 py-24 md:py-36">
      <div className="container">
        <SectionHeading index="06" eyebrow="Standards & Safety Protocol" title={<>The APEX <span className="accent-text">standard</span></>} sub="Four commitments written into every contract. They are the reason clients trust us with projects worth $1,000 to $250,000." align="center" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STANDARDS.map(({ icon: Icon, title, body, metric, metricLabel }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-bone/10 bg-carbon p-7"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-700 group-hover:bg-accent/25" />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent"><Icon className="h-6 w-6" /></span>
              <h3 className="mt-8 font-display text-2xl font-bold uppercase leading-tight">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-muted">{body}</p>
              <div className="mt-8 flex items-end justify-between border-t border-bone/10 pt-5">
                <span className="font-display text-4xl font-black text-bone">{metric}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-dim">{metricLabel}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
