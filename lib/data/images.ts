import { img } from "@/lib/utils";

/**
 * Central image registry (Unsplash, royalty-free).
 * Replace these with each client's real job photography before launch.
 * Every image renders through <SmartImage>, which falls back to a branded
 * placeholder if a URL fails to load, so the template never shows a broken image.
 */
export const IMAGES = {
  auto: {
    hero: img("1503376780353-7e6692767b70", 2200),
    a: img("1492144534655-ae79c964c9d7"),
    b: img("1607860108855-64acf2078ed9"),
    c: img("1544636331-e26879cd4d9b"),
    d: img("1580273916550-e323be2ae537"),
    e: img("1617814076367-b759c7d7e738"),
  },
  remodel: {
    hero: img("1556911220-bff31c812dba", 2200),
    a: img("1556909114-f6e7ad7d3136"),
    b: img("1484154218962-a197022b5858"),
    c: img("1552321554-5fefe8c9ef14"),
    d: img("1600566753190-17f0baa2a6c3"),
  },
  landscape: {
    hero: img("1600585154340-be6161a56a0c", 2200),
    a: img("1558904541-efa843a96f01"),
    b: img("1564013799919-ab600027ffc6"),
    c: img("1416879595882-3373a0480b5b"),
    d: img("1600596542815-ffad4c1539a9"),
  },
  interior: {
    hero: img("1618221195710-dd6b41faaea6", 2200),
    a: img("1600210492486-724fe5c67fb0"),
    b: img("1586023492125-27b2c045efd7"),
    c: img("1600607687939-ce8a6c25118c"),
    d: img("1616486338812-3dadae4b4ace"),
  },
  commercial: {
    a: img("1497366216548-37526070297c"),
    b: img("1497366811353-6870744d04b2"),
  },
} as const;
