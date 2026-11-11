import { Logo } from "@/components/ui/logo";
import { NAV_LINKS } from "@/lib/nav";
import { BRAND } from "@/lib/data/trades";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-titanium-950">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm text-bone-muted">Precision auto care, remodeling, outdoor living and interior design, delivered to one written standard.</p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm md:col-span-1">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href} className="text-bone-muted hover:text-accent">{l.label}</a>)}
        </nav>
        <div className="space-y-2 font-mono text-xs uppercase tracking-[0.14em] text-bone-muted">
          <p>Licensed & Insured · $2M General Liability</p>
          <p>Lic. #APX-000000 (placeholder)</p>
          <p>{BRAND.phone}</p>
        </div>
      </div>
      <div className="border-t border-bone/5 py-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
        © {new Date().getFullYear()} {BRAND.full}. Demo template: sample content and imagery.
      </div>
    </footer>
  );
}
