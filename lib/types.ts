import type { LucideIcon } from "lucide-react";

export type TradeId = "auto" | "remodel" | "landscape" | "interior";

export interface Trade {
  id: TradeId;
  label: string;
  short: string;
  icon: LucideIcon;
  /** RGB channel strings, e.g. "217 119 6" */
  accent: { base: string; deep: string; soft: string };
  hero: {
    image: string;
    kicker: string;
    sub: string;
    stat: { value: string; label: string }[];
  };
  craft: { title: string; body: string }[];
  materials: string[];
}

export interface PackageTier {
  id: string;
  name: string;
  tagline: string;
  priceFrom: number;
  priceTo: number;
  timeframe: string;
  warranty: string;
  featured?: boolean;
  features: { label: string; included: boolean; detail?: string }[];
  specs: { label: string; value: string }[];
}

export type PortfolioTag = "Automotive" | "Kitchen & Bath" | "Outdoor Living" | "Interiors" | "Commercial";

export interface Project {
  id: string;
  trade: TradeId;
  title: string;
  location: string;
  tag: PortfolioTag;
  cover: string;
  gallery: string[];
  investment: number;
  timeframe: string;
  challenge: string;
  materials: string[];
  result: string;
  testimonial: { quote: string; name: string; role: string };
}

export interface Review {
  id: string;
  trade: TradeId;
  name: string;
  location: string;
  rating: number;
  project: string;
  cost: number;
  quote: string;
  thumb: string;
  date: string;
}

export interface Transformation {
  id: string;
  trade: TradeId;
  title: string;
  before: { label: string; image: string };
  after: { label: string; image: string };
  /** When the same photo is used for both sides, a "distressed" filter is applied to the before side. */
  simulateBefore?: boolean;
  stats: { label: string; value: string }[];
}

export interface EstimatorConfig {
  projectTypes: { id: string; label: string; desc: string; base: number }[];
  scope:
    | { kind: "slider"; label: string; unit: string; min: number; max: number; step: number; default: number; ratePerUnit: number }
    | { kind: "choice"; label: string; options: { id: string; label: string; desc: string; multiplier: number }[] };
  addOns: { id: string; label: string; desc: string; price: number }[];
  spread: number; // +/- range spread, e.g. 0.12
}
