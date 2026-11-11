import type { Metadata, Viewport } from "next";
import "@fontsource/big-shoulders-display/600";
import "@fontsource/big-shoulders-display/700";
import "@fontsource/big-shoulders-display/800";
import "@fontsource/big-shoulders-display/900";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { TradeProvider } from "@/components/providers/trade-provider";

export const metadata: Metadata = {
  title: "APEX Craftsmen & Studio | Precision Engineering. Master Craftsmanship.",
  description: "High-ticket auto detailing, home remodeling, outdoor living and interior design: fixed pricing, lifetime warranties and instant estimates.",
};

export const viewport: Viewport = { themeColor: "#121316" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TradeProvider>{children}</TradeProvider>
      </body>
    </html>
  );
}
