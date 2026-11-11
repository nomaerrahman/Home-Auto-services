import type { Review } from "@/lib/types";
import { IMAGES } from "./images";

/**
 * SAMPLE reviews for demo purposes only.
 * Replace with the client's real, verified reviews (Google / Houzz / Yelp feed) before going live.
 */
export const REVIEWS: Review[] = [
  { id: "r1", trade: "auto", name: "Marcus D.", location: "Westfield", rating: 5, project: "Show-Car Correction", cost: 7200, quote: "They showed me paint-depth readings for every panel before starting. Obsessive in the best way.", thumb: IMAGES.auto.hero, date: "Sep 2026" },
  { id: "r2", trade: "auto", name: "Priya S.", location: "Hillcrest", rating: 5, project: "Matte Ceramic", cost: 4100, quote: "The only shop that knew how to handle satin paint properly. Pickup and drop-off was flawless.", thumb: IMAGES.auto.a, date: "Aug 2026" },
  { id: "r3", trade: "auto", name: "Leo F.", location: "Harbor Point", rating: 5, project: "Full-Front PPF", cost: 2900, quote: "You honestly can't see the film edges. Rock chips on the highway don't worry me anymore.", thumb: IMAGES.auto.d, date: "Jul 2026" },
  { id: "r4", trade: "remodel", name: "The Hendersons", location: "Maple Ridge", rating: 5, project: "Kitchen Remodel", cost: 86500, quote: "Fixed price, finished early, and a daily photo update. We had braced for chaos and got none.", thumb: IMAGES.remodel.hero, date: "Oct 2026" },
  { id: "r5", trade: "remodel", name: "Elena R.", location: "Lakeview", rating: 5, project: "Spa Bathroom", cost: 64000, quote: "They found water damage behind the tile, showed us photos, and fixed it without inflating the price.", thumb: IMAGES.remodel.c, date: "Sep 2026" },
  { id: "r6", trade: "remodel", name: "Sam O.", location: "Cedar Park", rating: 4.9, project: "Basement Finish", cost: 58000, quote: "The dust containment was unreal. You could barely tell construction was happening downstairs.", thumb: IMAGES.remodel.d, date: "Jun 2026" },
  { id: "r7", trade: "landscape", name: "James & Carla T.", location: "Oakmont", rating: 5, project: "Fire Pit Terrace", cost: 72000, quote: "Our soggy slope is now the best room in the house. Drainage is perfect even in downpours.", thumb: IMAGES.landscape.hero, date: "Oct 2026" },
  { id: "r8", trade: "landscape", name: "Robert K.", location: "Willow Creek", rating: 5, project: "Pool Deck & Kitchen", cost: 168000, quote: "They handled permits and the HOA, all of it. I only made decisions about stone and lighting.", thumb: IMAGES.landscape.b, date: "Aug 2026" },
  { id: "r9", trade: "landscape", name: "Mei L.", location: "Ashbury", rating: 4.9, project: "Lighting Package", cost: 9800, quote: "The night lighting is breathtaking. I control every zone from my phone.", thumb: IMAGES.landscape.d, date: "Jul 2026" },
  { id: "r10", trade: "interior", name: "Alexandra M.", location: "Riverside", rating: 5, project: "Penthouse Living", cost: 142000, quote: "They made a glass box feel like a home. The install day felt like a magic trick.", thumb: IMAGES.interior.hero, date: "Sep 2026" },
  { id: "r11", trade: "interior", name: "Nina P.", location: "Brookfield", rating: 5, project: "Primary Suite", cost: 54000, quote: "Every drawer and every switch was thought through. Trade pricing saved us more than the fee.", thumb: IMAGES.interior.b, date: "Aug 2026" },
  { id: "r12", trade: "interior", name: "Thomas G.", location: "Financial District", rating: 5, project: "Office Fit-out", cost: 310000, quote: "Delivered entirely after hours. Our team arrived Monday to a finished office.", thumb: IMAGES.commercial.a, date: "May 2026" },
];

export const REVIEW_SUMMARY = { average: 4.9, count: 350 };
