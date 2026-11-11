import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Packages } from "@/components/sections/packages";
import { Craftsmanship } from "@/components/sections/craftsmanship";
import { Transformations } from "@/components/sections/transformations";
import { Estimator } from "@/components/sections/estimator";
import { Portfolio } from "@/components/sections/portfolio";
import { Standards } from "@/components/sections/standards";
import { Reviews } from "@/components/sections/reviews";
import { Contact } from "@/components/sections/contact";
import { BookingDrawer } from "@/components/interactive/booking-drawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Packages />
        <Craftsmanship />
        <Transformations />
        <Estimator />
        <Portfolio />
        <Standards />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <BookingDrawer />
    </>
  );
}
