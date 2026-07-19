import { Link } from "@tanstack/react-router";
import { useState } from "react";
const logo = { url: "/favicon.png" };
import { WHATSAPP_DISPLAY, waLink } from "@/lib/wa";
import { LanguageSwitcher, useI18n } from "@/i18n";

export function TopBar() {
  const { t } = useI18n();
  return (
    <div className="bg-[var(--ink)] text-[var(--ivory)] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
        <span>{t("topbar.tagline")}</span>
        <span className="hidden sm:inline">{t("topbar.dispatch")}</span>
      </div>
    </div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const links: { to: string; label: string; internal?: boolean }[] = [
    { to: "/catalogue", label: t("nav.catalogue"), internal: true },
    { to: "/#craft", label: t("nav.craft") },
    { to: "/#wholesale", label: t("nav.wholesale") },
    { to: "/#enquire", label: t("nav.contact") },
  ];
  return (
    <header className="border-b border-border/70 bg-background/85 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo.url} alt="Devrani Saree Pvt. Ltd." className="h-14 sm:h-12 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {links.map((l) =>
            l.internal ? (
              <Link key={l.to} to={l.to} className="hover:text-[var(--gold)] transition-colors">
                {l.label}
              </Link>
            ) : (
              <a key={l.to} href={l.to} className="hover:text-[var(--gold)] transition-colors">
                {l.label}
              </a>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={waLink("Namaste, I'd like to receive the Devrani catalogue.")}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--gold)] px-4 py-2 text-xs sm:text-sm tracking-wide hover:bg-[var(--gold)] hover:text-[var(--ivory)] transition-colors"
          >
            {t("nav.whatsapp")}
          </a>
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="relative block w-4 h-3">
              <span className={`absolute inset-x-0 top-0 h-0.5 bg-[var(--ink)] transition ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute inset-x-0 top-1.5 h-0.5 bg-[var(--ink)] transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute inset-x-0 top-3 h-0.5 bg-[var(--ink)] transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-2">
          {links.map((l) =>
            l.internal ? (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm tracking-wide border-b border-border/60"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm tracking-wide border-b border-border/60"
              >
                {l.label}
              </a>
            ),
          )}
            <a
              href={waLink("Namaste Devrani, please share the catalogue.")}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full bg-[#25D366] text-[var(--ivory)] text-sm py-3 text-center"
            >
              {t("nav.whatsapp")} {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[var(--ink)] text-[var(--ivory)]/80">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <img src={logo.url} alt="Devrani" className="h-14 w-auto bg-[var(--ivory)] rounded-lg p-2 inline-block" />
          <p className="text-sm max-w-sm leading-relaxed">{t("footer.tagline")}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[var(--gold)] uppercase tracking-widest text-xs mb-3">{t("footer.explore")}</p>
          <Link to="/catalogue" className="block hover:text-[var(--rose)]">{t("nav.catalogue")}</Link>
          <a href="/#craft" className="block hover:text-[var(--rose)]">{t("nav.craft")}</a>
          <a href="/#wholesale" className="block hover:text-[var(--rose)]">{t("nav.wholesale")}</a>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[var(--gold)] uppercase tracking-widest text-xs mb-3">{t("footer.trade")}</p>
          <p>{t("nav.whatsapp")} {WHATSAPP_DISPLAY}</p>
          <p>Surat, Gujarat</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap justify-between gap-3 text-xs text-[var(--ivory)]/60">
          <p>© {new Date().getFullYear()} Devrani Saree Pvt. Ltd. {t("footer.rights")}</p>
          <p>{t("topbar.tagline").split("·")[0].trim()}</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5V9c0-.1-.7-1.7-1-2.3s-.5-.5-.7-.5H7.6c-.2 0-.5.1-.8.4a2.9 2.9 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7s1.9 2.9 4.6 4.1c.6.3 1.1.4 1.5.5.6.2 1.2.2 1.7.1.5-.1 1.6-.6 1.8-1.3s.3-1.2.2-1.3-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
    </svg>
  );
}

export function ProductCard({ product }: { product: { slug: string; title: string; image: string } }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group bg-[var(--ivory)] rounded-2xl overflow-hidden border border-border hover:border-[var(--gold)] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--rose)]/30 flex flex-col animate-fade-in"
    >
      <div className="aspect-[3/4] overflow-hidden bg-[var(--sage)]/10">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">Devrani Design</p>
        <h3 className="font-display text-lg sm:text-xl mt-1 leading-tight">{product.title}</h3>
        <p className="text-[11px] text-muted-foreground mt-1">Full color set · view details</p>
      </div>
    </Link>
  );
}
