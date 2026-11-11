import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CURRENCY = { code: "USD", locale: "en-US" } as const;

export function money(n: number, compact = false) {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency",
    currency: CURRENCY.code,
    maximumFractionDigits: 0,
    notation: compact ? "compact" : "standard",
  }).format(n);
}

/** Unsplash helper — swap for your client's own photography. */
export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
