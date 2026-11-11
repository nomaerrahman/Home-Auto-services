import { Car, ChefHat, Trees, Sofa } from "lucide-react";
import type { Trade, TradeId } from "@/lib/types";
import { IMAGES } from "./images";

export const BRAND = {
  name: "APEX",
  full: "APEX Craftsmen & Studio",
  phone: "(555) 014-2290",
  email: "studio@apexcraftsmen.example",
  city: "Serving the Greater Metro Area",
};

export const TRADES: Record<TradeId, Trade> = {
  auto: {
    id: "auto",
    label: "Auto Detailing",
    short: "Auto",
    icon: Car,
    accent: { base: "217 119 6", deep: "180 83 9", soft: "251 191 36" }, // copper
    hero: {
      image: IMAGES.auto.hero,
      kicker: "Paint Correction · Ceramic · PPF",
      sub: "Multi-stage paint correction and 9H ceramic protection, applied in a climate-controlled studio by IDA-certified technicians. Every panel is measured, corrected and sealed, with coatings warranted for up to a lifetime.",
      stat: [
        { value: "2,400+", label: "Vehicles protected" },
        { value: "98.7%", label: "Swirl removal avg." },
        { value: "Lifetime", label: "Coating warranty" },
      ],
    },
    craft: [
      { title: "Paint Depth Mapping", body: "Digital gauge readings on every panel before a pad touches the paint, so correction never compromises clear coat." },
      { title: "Climate-Controlled Bay", body: "Filtered, 68°F / 45% RH curing environment for consistent ceramic bonding and zero dust nibs." },
      { title: "Swirl-Free Inspection", body: "Final QC under 5,000K and 6,500K inspection lighting, with a photo report delivered to your phone." },
    ],
    materials: ["Gtechniq Crystal Serum", "XPEL Ultimate Plus PPF", "Rupes BigFoot", "Koch-Chemie", "Gyeon Q²"],
  },
  remodel: {
    id: "remodel",
    label: "Home Remodeling",
    short: "Remodel",
    icon: ChefHat,
    accent: { base: "201 150 62", deep: "161 112 38", soft: "232 196 120" }, // brushed gold
    hero: {
      image: IMAGES.remodel.hero,
      kicker: "Kitchens · Baths · Whole-Home",
      sub: "Design-build kitchens and baths delivered on a fixed price and a fixed schedule. Licensed master trades, quartz and natural stone fabricated in-house, and a 10-year workmanship warranty on every build.",
      stat: [
        { value: "640+", label: "Spaces rebuilt" },
        { value: "On time", label: "94% of projects" },
        { value: "10-Year", label: "Workmanship warranty" },
      ],
    },
    craft: [
      { title: "3D Design Previews", body: "Photoreal renders of your finished space, so cabinets, stone and lighting are approved before demolition day." },
      { title: "In-House Fabrication", body: "CNC-templated quartz and stone, cut to 1/32\" tolerances in our own shop, not subcontracted." },
      { title: "Fixed-Price Contracts", body: "A line-item scope locked before work begins. No surprise change orders." },
    ],
    materials: ["Caesarstone", "Sub-Zero / Wolf", "Blum Hardware", "Kohler", "Schluter Systems"],
  },
  landscape: {
    id: "landscape",
    label: "Outdoor Living",
    short: "Landscape",
    icon: Trees,
    accent: { base: "190 140 70", deep: "140 98 44", soft: "222 190 130" }, // brass
    hero: {
      image: IMAGES.landscape.hero,
      kicker: "Hardscape · Fire Features · Lighting",
      sub: "Engineered patios, fire features and outdoor kitchens built on compacted, graded bases that won't heave or settle. Natural stone, low-voltage lighting and planting plans designed to age well.",
      stat: [
        { value: "380+", label: "Estates transformed" },
        { value: "ICPI", label: "Certified installers" },
        { value: "15-Year", label: "Structural warranty" },
      ],
    },
    craft: [
      { title: "Engineered Base Systems", body: "Excavation to 10\", geotextile and compacted aggregate in 2\" lifts, so the surface holds through every freeze-thaw cycle." },
      { title: "Drone Site Surveys", body: "Grade, drainage and sun-path analysis captured before design, so water always moves away from your home." },
      { title: "Lighting Design", body: "Low-voltage LED lighting plans with app control and a lifetime fixture warranty." },
    ],
    materials: ["Techo-Bloc", "Belgard", "Unilock", "Kichler LED", "Bluestone & Travertine"],
  },
  interior: {
    id: "interior",
    label: "Interior Design",
    short: "Interiors",
    icon: Sofa,
    accent: { base: "212 163 115", deep: "166 118 76", soft: "236 205 170" }, // champagne
    hero: {
      image: IMAGES.interior.hero,
      kicker: "Residential · Hospitality · Styling",
      sub: "Full-service interior architecture, from space planning and custom millwork to furniture procurement and final styling. One studio, one point of contact, and every detail chosen on purpose.",
      stat: [
        { value: "210+", label: "Residences styled" },
        { value: "Trade", label: "Pricing passed on" },
        { value: "1 Lead", label: "Designer per project" },
      ],
    },
    craft: [
      { title: "Material Libraries", body: "Physical sample boards of fabric, stone and timber reviewed in your space, under your light." },
      { title: "Custom Millwork", body: "Built-ins and joinery drawn in-house and produced by partner cabinetmakers to the millimeter." },
      { title: "Turnkey Install Day", body: "Furniture, art and accessories placed and styled in one day. You walk into a finished home." },
    ],
    materials: ["Holly Hunt", "Farrow & Ball", "Visual Comfort", "Calacatta Viola", "Rift White Oak"],
  },
};

export const TRADE_ORDER: TradeId[] = ["auto", "remodel", "landscape", "interior"];
