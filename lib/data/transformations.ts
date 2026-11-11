import type { Transformation, TradeId } from "@/lib/types";
import { IMAGES } from "./images";

/**
 * Before/after pairs. With `simulateBefore: true` the same photo is used on both
 * sides and the "before" side gets a weathered filter, which works for demos.
 * For a real client, supply true before/after shots taken from the same angle
 * and set simulateBefore to false.
 */
export const TRANSFORMATIONS: Record<TradeId, Transformation> = {
  auto: {
    id: "t-auto",
    trade: "auto",
    title: "Swirled, oxidized clear coat → mirror ceramic finish",
    before: { label: "Scratched & Swirled", image: IMAGES.auto.hero },
    after: { label: "Mirror Ceramic Finish", image: IMAGES.auto.hero },
    simulateBefore: true,
    stats: [
      { label: "Defects removed", value: "97%" },
      { label: "Gloss gain", value: "+52 GU" },
      { label: "Clear coat removed", value: "4µm avg" },
    ],
  },
  remodel: {
    id: "t-remodel",
    trade: "remodel",
    title: "Dated 1990s galley → modern luxury quartz kitchen",
    before: { label: "1994 Oak Galley", image: IMAGES.remodel.hero },
    after: { label: "Calacatta Quartz Open-Plan", image: IMAGES.remodel.hero },
    simulateBefore: true,
    stats: [
      { label: "Usable counter", value: "+68%" },
      { label: "Delivered", value: "2 days early" },
      { label: "Budget variance", value: "<1%" },
    ],
  },
  landscape: {
    id: "t-landscape",
    trade: "landscape",
    title: "Overgrown, waterlogged yard → stone patio with fire pit",
    before: { label: "Overgrown & Waterlogged", image: IMAGES.landscape.hero },
    after: { label: "Bluestone Terrace + Fire Pit", image: IMAGES.landscape.hero },
    simulateBefore: true,
    stats: [
      { label: "Living space added", value: "1,200 sq ft" },
      { label: "Standing water", value: "Eliminated" },
      { label: "Home value impact", value: "+$85k est." },
    ],
  },
  interior: {
    id: "t-interior",
    trade: "interior",
    title: "Cold builder-grade shell → layered, warm living room",
    before: { label: "Builder-Grade Shell", image: IMAGES.interior.hero },
    after: { label: "Curated & Layered", image: IMAGES.interior.hero },
    simulateBefore: true,
    stats: [
      { label: "Reverb reduced", value: "60%" },
      { label: "Pieces sourced", value: "84" },
      { label: "Install", value: "1 day" },
    ],
  },
};
