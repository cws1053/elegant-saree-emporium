import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/devrani-logo.jpg.asset.json";
import heroSaree from "@/assets/hero-saree.jpg";
import sareesStack from "@/assets/sarees-stack.jpg";
import detailZari from "@/assets/detail-zari.jpg";
import { useMemo, useState } from "react";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_NUMBER = "918799279283";
const WHATSAPP_DISPLAY = "+91 87992 79283";

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Nav />
      <Hero />
      <ColorSetBanner />
      <Marquee />
      <Story />
      <Catalogue />
      <Craft />
      <Wholesale />
      <Enquire />
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <div className="bg-[var(--ink)] text-[var(--ivory)] text-[11px] tracking-[0.22em] uppercase">
      <div className="mx-auto max-w-7xl px-6 py-2 flex flex-wrap items-center justify-between gap-2">
        <span>जय श्री श्याम · साड़ियों का मायका</span>
        <span className="hidden sm:inline">Full color set dispatch · B2B Wholesale · Pan-India</span>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo.url} alt="Devrani Saree Pvt. Ltd." className="h-12 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm tracking-wide">
          <a href="#catalogue" className="hover:text-[var(--gold)] transition-colors">Catalogue</a>
          <a href="#craft" className="hover:text-[var(--gold)] transition-colors">The Craft</a>
          <a href="#wholesale" className="hover:text-[var(--gold)] transition-colors">Wholesale</a>
          <a href="#enquire" className="hover:text-[var(--gold)] transition-colors">Contact</a>
        </nav>
        <a
          href={waLink("Namaste, I'd like to receive the Devrani catalogue.")}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-transparent px-5 py-2 text-sm tracking-wide text-[var(--ink)] hover:bg-[var(--gold)] hover:text-white transition-colors"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6 space-y-8">
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[var(--gold)]">
            <span className="h-px w-8 bg-[var(--gold)]" /> Est. Wholesale House
          </span>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.02] text-[var(--ink)]">
            Full color sets,<br />
            <em className="not-italic text-[var(--gold)]">every catalogue.</em>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Devrani is a boutique B2B saree house from Surat — every design ships as a{" "}
            <em>complete color set</em>, packed and dispatched together. One enquiry, one carton, one price.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#catalogue" className="rounded-full bg-[var(--ink)] px-7 py-3 text-sm tracking-wide text-[var(--ivory)] hover:bg-[var(--gold)] transition-colors">
              Browse {products.length} Designs
            </a>
            <a
              href={waLink("Namaste Devrani, please share the full price list.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--ink)] px-7 py-3 text-sm tracking-wide hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-colors"
            >
              WhatsApp Price List
            </a>
          </div>
          <dl className="grid grid-cols-3 gap-6 pt-8 border-t border-border max-w-md">
            {[
              [`${products.length}+`, "Live designs"],
              ["Full", "Color sets"],
              ["48hr", "Dispatch"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-display text-3xl text-[var(--gold)]">{k}</dt>
                <dd className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="md:col-span-6 relative">
          <div className="absolute -inset-8 bg-[var(--rose)]/25 rounded-[2rem] -z-10 rotate-2" />
          <img
            src={heroSaree}
            alt="Model draped in a Devrani silk saree"
            width={1400}
            height={1600}
            className="rounded-[1.5rem] w-full object-cover shadow-2xl shadow-[var(--rose)]/40"
          />
          <div className="absolute -bottom-6 -left-6 bg-[var(--ivory)] border border-[var(--gold)]/40 rounded-2xl px-5 py-4 shadow-lg">
            <p className="font-display text-xl text-[var(--ink)]">Full Set Dispatch</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">All colors · One carton</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColorSetBanner() {
  return (
    <div className="bg-[var(--gold)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-center gap-3 text-center text-sm md:text-base tracking-wide">
        <span className="font-display text-xl md:text-2xl">✦</span>
        <p>
          <strong className="font-display text-lg md:text-xl mr-2">Please note —</strong>
          We dispatch every design as a <em>full color set</em>. Single-piece orders are not accepted.
        </p>
      </div>
    </div>
  );
}

function Marquee() {
  const items = ["Banarasi", "Kanjivaram", "Chanderi", "Tussar", "Organza", "Paithani", "Maheshwari", "Patola"];
  return (
    <div className="border-y border-border bg-[var(--sage)]/15 py-5 overflow-hidden">
      <div className="flex gap-14 whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {[...items, ...items, ...items].map((w, i) => (
          <span key={i} className="font-display text-2xl md:text-3xl text-[var(--ink)]/70">
            {w} <span className="text-[var(--gold)] mx-4">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function Story() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
      <img src={sareesStack} alt="A stack of Devrani sarees" width={1200} height={900} loading="lazy" className="rounded-[1.5rem] w-full object-cover" />
      <div className="space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Our House</span>
        <h2 className="font-display text-4xl md:text-5xl leading-tight">
          A daughter's home — <em className="not-italic text-[var(--gold)]">for every saree.</em>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          <em className="not-italic">Devrani</em> means the younger sister-in-law — a keeper of tradition
          and a bringer of warmth. Our tagline, <em>साड़ियों का मायका</em> — a mother's home for sarees —
          reflects the care with which every design is stitched, boxed and sent on its way to your store.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Every catalogue you see below ships as the <strong>complete color set</strong>. Choose your set
          quantity, tell us on WhatsApp, and we'll pack the full range together.
        </p>
        <div className="gold-rule" />
      </div>
    </section>
  );
}

function Catalogue() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  return (
    <section id="catalogue" className="bg-[var(--sage)]/12 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Live Catalogue</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 max-w-xl">
              {products.length} designs — every one a full color set.
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg">
              Pick a set quantity and tap Inquire — a pre-filled WhatsApp message opens instantly.
            </p>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search designs…"
            className="rounded-full border border-[var(--gold)]/40 bg-[var(--ivory)] px-5 py-3 text-sm outline-none focus:border-[var(--gold)] w-full sm:w-72"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No designs match "{query}".</p>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: { slug: string; title: string; image: string } }) {
  const [qty, setQty] = useState(1);
  const message =
    `Namaste Devrani,\n\nI'd like to enquire about:\n` +
    `• Design: ${product.title}\n` +
    `• Quantity: ${qty} full color set${qty > 1 ? "s" : ""}\n\n` +
    `Please share price and availability. Thank you.`;
  return (
    <article className="group bg-[var(--ivory)] rounded-2xl overflow-hidden border border-border hover:border-[var(--gold)] transition-colors flex flex-col">
      <div className="aspect-[3/4] overflow-hidden bg-[var(--sage)]/10">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">Devrani Design</p>
          <h3 className="font-display text-xl mt-1 leading-tight">{product.title}</h3>
          <p className="text-[11px] text-muted-foreground mt-1">Full color set · dispatched together</p>
        </div>
        <div className="mt-auto space-y-2">
          <label className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="uppercase tracking-widest">Sets</span>
            <div className="flex items-center border border-border rounded-full overflow-hidden">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="px-3 py-1 hover:bg-[var(--sage)]/20"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="w-12 text-center bg-transparent py-1 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="px-3 py-1 hover:bg-[var(--sage)]/20"
              >
                +
              </button>
            </div>
          </label>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ea952] text-white text-xs font-medium tracking-wide py-2.5 transition-colors"
          >
            <WhatsAppIcon /> Inquire on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1s-.5-.1-.7.2-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5V9c0-.1-.7-1.7-1-2.3s-.5-.5-.7-.5H7.6c-.2 0-.5.1-.8.4a2.9 2.9 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7s1.9 2.9 4.6 4.1c.6.3 1.1.4 1.5.5.6.2 1.2.2 1.7.1.5-.1 1.6-.6 1.8-1.3s.3-1.2.2-1.3-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
    </svg>
  );
}

function Craft() {
  const rows = [
    { k: "01", t: "Sourced with intent", d: "Direct partnerships with weaver clusters in Banaras, Kanchipuram, Chanderi and Surat." },
    { k: "02", t: "Full color set model", d: "Every design ships as the complete color range — no single-piece breakage." },
    { k: "03", t: "Quality controlled", d: "Two-stage inspection and colour-fastness tested before every dispatch." },
    { k: "04", t: "Retailer-first pricing", d: "Transparent per-set pricing on WhatsApp, easy replenishment cycles." },
  ];
  return (
    <section id="craft" className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-12 gap-14">
      <div className="md:col-span-5">
        <img src={detailZari} alt="Gold zari detail on a Devrani saree" width={1000} height={1200} loading="lazy" className="rounded-[1.5rem] w-full object-cover sticky top-28" />
      </div>
      <div className="md:col-span-7 space-y-10">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">The Craft</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3 leading-tight">Slow-made weaves, retail-ready operations.</h2>
        </div>
        <ul className="divide-y divide-border">
          {rows.map((r) => (
            <li key={r.k} className="py-6 grid grid-cols-[auto_1fr] gap-6 items-start">
              <span className="font-display text-3xl text-[var(--gold)]">{r.k}</span>
              <div>
                <h3 className="font-display text-2xl mb-1">{r.t}</h3>
                <p className="text-muted-foreground">{r.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Wholesale() {
  const tiers = [
    { name: "Boutique", min: "1 set", note: "One full color set per design — try a range." },
    { name: "Retail Partner", min: "3 sets", note: "Mix designs across sets, priority stock and previews." },
    { name: "Distributor", min: "10 sets", note: "Territory pricing and a dedicated account manager." },
  ];
  return (
    <section id="wholesale" className="bg-[var(--rose)]/25 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Wholesale Programme</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Priced by the color set.</h2>
          <p className="text-muted-foreground mt-4">
            Every design is one indivisible color set. Order one, three, or ten — the full range ships together.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div key={t.name} className="bg-[var(--ivory)] rounded-2xl p-8 border border-[var(--gold)]/30">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Tier</p>
              <h3 className="font-display text-3xl mt-2">{t.name}</h3>
              <p className="mt-4 text-sm text-muted-foreground">Minimum order</p>
              <p className="font-display text-4xl text-[var(--ink)]">{t.min}</p>
              <div className="gold-rule my-6" />
              <p className="text-sm text-muted-foreground">{t.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Enquire() {
  return (
    <section id="enquire" className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-14">
      <div className="space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Get in Touch</span>
        <h2 className="font-display text-4xl md:text-5xl leading-tight">One tap on WhatsApp.</h2>
        <p className="text-muted-foreground max-w-md">
          Our trade desk replies in minutes on WhatsApp with the latest lookbook, per-set price and dispatch timeline.
        </p>
        <div className="space-y-3 pt-4 text-sm">
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">WhatsApp</span><br />{WHATSAPP_DISPLAY}</p>
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">Showroom</span><br />Surat, Gujarat · India</p>
        </div>
      </div>
      <div className="bg-[var(--ivory)] border border-border rounded-2xl p-8 flex flex-col justify-center items-center text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center">
          <WhatsAppIcon />
        </div>
        <div>
          <p className="font-display text-3xl text-[var(--ink)]">Chat with our trade desk</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Send a hi and we'll share the full catalogue, price list and color set details.
          </p>
        </div>
        <a
          href={waLink("Namaste Devrani, please share the full catalogue and price list.")}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#25D366] hover:bg-[#1ea952] text-white px-8 py-3 text-sm tracking-wide transition-colors flex items-center gap-2"
        >
          <WhatsAppIcon /> Open WhatsApp
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--ivory)]/80">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <img src={logo.url} alt="Devrani Saree Pvt. Ltd." className="h-14 w-auto bg-[var(--ivory)] rounded-lg p-2 inline-block" />
          <p className="text-sm max-w-sm leading-relaxed">
            Devrani Saree Pvt. Ltd. — साड़ियों का मायका. A boutique B2B saree house from Surat. Every design ships as a full color set.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[var(--gold)] uppercase tracking-widest text-xs mb-3">Explore</p>
          <a href="#catalogue" className="block hover:text-[var(--rose)]">Catalogue</a>
          <a href="#craft" className="block hover:text-[var(--rose)]">The Craft</a>
          <a href="#wholesale" className="block hover:text-[var(--rose)]">Wholesale</a>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[var(--gold)] uppercase tracking-widest text-xs mb-3">Trade</p>
          <p>WhatsApp {WHATSAPP_DISPLAY}</p>
          <p>Surat, Gujarat</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap justify-between gap-3 text-xs text-[var(--ivory)]/60">
          <p>© {new Date().getFullYear()} Devrani Saree Pvt. Ltd. All rights reserved.</p>
          <p>जय श्री श्याम</p>
        </div>
      </div>
    </footer>
  );
}
