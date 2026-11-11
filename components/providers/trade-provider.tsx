"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { TradeId } from "@/lib/types";
import { TRADES } from "@/lib/data/trades";

export interface BookingPrefill {
  source: "nav" | "package" | "estimator" | "portfolio" | "contact";
  summary?: string;
  packageName?: string;
  estimate?: { low: number; high: number };
}

interface TradeContextValue {
  trade: TradeId;
  setTrade: (t: TradeId) => void;
  booking: { open: boolean; prefill: BookingPrefill | null };
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}

const TradeContext = createContext<TradeContextValue | null>(null);
const STORAGE_KEY = "apex:trade";

function applyAccent(t: TradeId) {
  const { base, deep, soft } = TRADES[t].accent;
  const root = document.documentElement;
  root.style.setProperty("--accent", base);
  root.style.setProperty("--accent-deep", deep);
  root.style.setProperty("--accent-soft", soft);
  root.dataset.trade = t;
}

export function TradeProvider({ children }: { children: React.ReactNode }) {
  const [trade, setTradeState] = useState<TradeId>("auto");
  const [booking, setBooking] = useState<{ open: boolean; prefill: BookingPrefill | null }>({ open: false, prefill: null });

  // Initial trade: ?trade=remodel (handy for sending a demo link) → saved choice → default.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("trade") as TradeId | null;
    let saved: TradeId | null = null;
    try { saved = localStorage.getItem(STORAGE_KEY) as TradeId | null; } catch {}
    const initial = [fromUrl, saved].find((v): v is TradeId => !!v && v in TRADES);
    if (initial) setTradeState(initial);
  }, []);

  useEffect(() => {
    applyAccent(trade);
    try { localStorage.setItem(STORAGE_KEY, trade); } catch {}
  }, [trade]);

  const setTrade = useCallback((t: TradeId) => setTradeState(t), []);
  const openBooking = useCallback((prefill?: BookingPrefill) => setBooking({ open: true, prefill: prefill ?? null }), []);
  const closeBooking = useCallback(() => setBooking((b) => ({ ...b, open: false })), []);

  const value = useMemo(() => ({ trade, setTrade, booking, openBooking, closeBooking }), [trade, setTrade, booking, openBooking, closeBooking]);
  return <TradeContext.Provider value={value}>{children}</TradeContext.Provider>;
}

export function useTrade() {
  const ctx = useContext(TradeContext);
  if (!ctx) throw new Error("useTrade must be used inside <TradeProvider>");
  return { ...ctx, config: TRADES[ctx.trade] };
}
