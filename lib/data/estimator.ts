import type { EstimatorConfig, TradeId } from "@/lib/types";

/**
 * Estimate = (projectType.base + scope cost) * scope multiplier + add-ons, ± spread.
 * Tune these numbers per client; the UI reads everything from here.
 * The second project type in each list is pre-selected.
 */
export const ESTIMATOR: Record<TradeId, EstimatorConfig> = {
  auto: {
    projectTypes: [
      { id: "enhance", label: "Gloss Enhancement", desc: "1-step polish + sealant", base: 650 },
      { id: "correct", label: "Paint Correction + Ceramic", desc: "2-stage, 5-year coating", base: 1850 },
      { id: "ppf", label: "Full-Front PPF", desc: "Self-healing film", base: 2400 },
      { id: "showcar", label: "Show-Car Concierge", desc: "3-stage + lifetime system", base: 4800 },
    ],
    scope: {
      kind: "choice",
      label: "Vehicle size",
      options: [
        { id: "coupe", label: "Coupe / Sedan", desc: "911, M3, Model 3", multiplier: 1 },
        { id: "suv", label: "Mid SUV", desc: "Macan, X5, Model Y", multiplier: 1.2 },
        { id: "xl", label: "Full-Size / Truck", desc: "G-Wagen, Escalade, F-150", multiplier: 1.4 },
        { id: "exotic", label: "Exotic / Supercar", desc: "Ferrari, McLaren, Lambo", multiplier: 1.6 },
      ],
    },
    addOns: [
      { id: "glass", label: "Ceramic Glass Coating", desc: "All glass, hydrophobic", price: 250 },
      { id: "wheels", label: "Wheels-Off Caliper Coat", desc: "Barrels, faces, calipers", price: 450 },
      { id: "interior", label: "Interior Ceramic Guard", desc: "Leather, fabric, trim", price: 380 },
      { id: "tint", label: "Ceramic Window Tint", desc: "Heat rejection film", price: 650 },
      { id: "concierge", label: "Enclosed Concierge Transport", desc: "Pickup & return", price: 300 },
    ],
    spread: 0.1,
  },
  remodel: {
    projectTypes: [
      { id: "bath", label: "Primary Bathroom", desc: "Wet room, stone, glass", base: 14000 },
      { id: "kitchen", label: "Kitchen Remodel", desc: "Cabinets, stone, layout", base: 18000 },
      { id: "basement", label: "Basement Finish", desc: "Living, bar, media", base: 22000 },
      { id: "whole", label: "Whole-Home Renovation", desc: "Multi-room, structural", base: 60000 },
    ],
    scope: { kind: "slider", label: "Project area", unit: "sq ft", min: 80, max: 2500, step: 10, default: 240, ratePerUnit: 210 },
    addOns: [
      { id: "led", label: "Under-Cabinet LED Lighting", desc: "Dimmable, warm 2700K", price: 2400 },
      { id: "waterfall", label: "Waterfall Island Edge", desc: "Mitered 3cm quartz", price: 4800 },
      { id: "heated", label: "Radiant Heated Floors", desc: "Electric mat system", price: 3600 },
      { id: "appliance", label: "Pro Appliance Package", desc: "Sub-Zero / Wolf", price: 28000 },
      { id: "smart", label: "Smart Lighting Scenes", desc: "Lutron Caséta", price: 3200 },
    ],
    spread: 0.12,
  },
  landscape: {
    projectTypes: [
      { id: "patio", label: "Paver / Stone Patio", desc: "Engineered base", base: 8000 },
      { id: "firepit", label: "Patio + Fire Feature", desc: "Seat wall & gas pit", base: 18000 },
      { id: "kitchen", label: "Outdoor Kitchen", desc: "Grill island & bar", base: 26000 },
      { id: "estate", label: "Full Estate Masterplan", desc: "Hardscape + softscape", base: 55000 },
    ],
    scope: { kind: "slider", label: "Hardscape area", unit: "sq ft", min: 150, max: 6000, step: 25, default: 600, ratePerUnit: 38 },
    addOns: [
      { id: "heated", label: "Heated Patio Zones", desc: "Snow-melt radiant", price: 9500 },
      { id: "lighting", label: "Landscape Lighting Package", desc: "12 fixtures, app control", price: 4800 },
      { id: "pergola", label: "Louvered Aluminum Pergola", desc: "Motorized, 12×16", price: 16500 },
      { id: "water", label: "Water Feature", desc: "Sheer descent or bubbler", price: 6200 },
      { id: "irrigation", label: "Smart Irrigation", desc: "Rachio, drip zones", price: 3800 },
    ],
    spread: 0.15,
  },
  interior: {
    projectTypes: [
      { id: "room", label: "Single Room", desc: "Living, bedroom, office", base: 4500 },
      { id: "suite", label: "Primary Suite", desc: "Bedroom + bath + closet", base: 18000 },
      { id: "living", label: "Main Living Floor", desc: "Living, dining, kitchen", base: 32000 },
      { id: "whole", label: "Whole Home", desc: "Full interior architecture", base: 75000 },
    ],
    scope: { kind: "slider", label: "Interior area", unit: "sq ft", min: 150, max: 8000, step: 50, default: 400, ratePerUnit: 42 },
    addOns: [
      { id: "millwork", label: "Custom Built-in Millwork", desc: "Library, media wall", price: 14000 },
      { id: "lighting", label: "Designer Lighting Plan", desc: "Fixtures & layering", price: 6500 },
      { id: "art", label: "Art Curation & Install", desc: "Sourced & hung", price: 8000 },
      { id: "window", label: "Motorized Window Treatments", desc: "Drapery & shades", price: 9500 },
      { id: "styling", label: "Turnkey Styling Day", desc: "Move-in ready", price: 3500 },
    ],
    spread: 0.15,
  },
};
