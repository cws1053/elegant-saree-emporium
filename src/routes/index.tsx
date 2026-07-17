import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/devrani-logo.jpg.asset.json";
import heroSaree from "@/assets/hero-saree.jpg";
import sareesStack from "@/assets/sarees-stack.jpg";
import detailZari from "@/assets/detail-zari.jpg";
import collectionSage from "@/assets/collection-sage.jpg";
import collectionIvory from "@/assets/collection-ivory.jpg";
import collectionRose from "@/assets/collection-rose.jpg";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const collections = [
  {
    name: "Gulaab",
    tag: "Dusty Rose Silk",
    desc: "Soft-hand silk with a whisper of gold zari. Bridal registers and boutique shelves.",
    img: collectionRose,
  },
  {
    name: "Vanika",
    tag: "Sage Kanjivaram",
    desc: "Muted mint-sage weave with a bold gold border. A modern take on a classic.",
    img: collectionSage,
  },
  {
    name: "Chandni",
    tag: "Ivory Banarasi",
    desc: "Creamy ivory silk, hand-motif buti, delicate gold pallu. Ceremony ready.",
    img: collectionIvory,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Nav />
      <Hero />
      <Marquee />
      <Story />
      <Collections />
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
        <span className="hidden sm:inline">B2B Wholesale · MOQ from 12 pcs · Pan-India dispatch</span>
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
          <a href="#collections" className="hover:text-[var(--gold)] transition-colors">Collections</a>
          <a href="#craft" className="hover:text-[var(--gold)] transition-colors">The Craft</a>
          <a href="#wholesale" className="hover:text-[var(--gold)] transition-colors">Wholesale</a>
          <a href="#enquire" className="hover:text-[var(--gold)] transition-colors">Contact</a>
        </nav>
        <a
          href="#enquire"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--gold)] bg-transparent px-5 py-2 text-sm tracking-wide text-[var(--ink)] hover:bg-[var(--gold)] hover:text-white transition-colors"
        >
          Request Catalogue
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
            Heirloom sarees,<br />
            <em className="not-italic text-[var(--gold)]">wholesale-ready.</em>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Devrani is a boutique B2B saree house from the heart of India — dressing retailers,
            designers and family stores in weaves that carry the softness of home.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#collections" className="rounded-full bg-[var(--ink)] px-7 py-3 text-sm tracking-wide text-[var(--ivory)] hover:bg-[var(--gold)] transition-colors">
              Explore Collections
            </a>
            <a href="#enquire" className="rounded-full border border-[var(--ink)] px-7 py-3 text-sm tracking-wide hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-colors">
              Become a Stockist
            </a>
          </div>
          <dl className="grid grid-cols-3 gap-6 pt-8 border-t border-border max-w-md">
            {[
              ["1200+", "Retail partners"],
              ["48hr", "Dispatch"],
              ["120+", "Live designs"],
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
            alt="Model draped in a dusty rose Devrani silk saree"
            width={1400}
            height={1600}
            className="rounded-[1.5rem] w-full object-cover shadow-2xl shadow-[var(--rose)]/40"
          />
          <div className="absolute -bottom-6 -left-6 bg-[var(--ivory)] border border-[var(--gold)]/40 rounded-2xl px-5 py-4 shadow-lg">
            <p className="font-display text-xl text-[var(--ink)]">Gulaab No. 07</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Dusty Rose · Pure Silk</p>
          </div>
        </div>
      </div>
    </section>
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
          reflects the care with which every weave is chosen, folded and sent on its way to your store.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We work directly with weaver clusters in Varanasi, Kanchipuram, Chanderi and Surat, translating
          heritage techniques into a curated boutique catalogue built for the modern retail floor.
        </p>
        <div className="gold-rule" />
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section id="collections" className="bg-[var(--sage)]/12 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Featured Collections</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 max-w-xl">Weaves in season, ready to ship.</h2>
          </div>
          <a href="#enquire" className="text-sm underline underline-offset-8 decoration-[var(--gold)] hover:text-[var(--gold)]">
            Request full lookbook →
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((c) => (
            <article key={c.name} className="group bg-[var(--ivory)] rounded-2xl overflow-hidden border border-border hover:border-[var(--gold)] transition-colors">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={c.img} alt={`${c.name} — ${c.tag}`} width={900} height={1100} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 space-y-2">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--gold)]">{c.tag}</p>
                <h3 className="font-display text-2xl">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Craft() {
  const rows = [
    { k: "01", t: "Sourced with intent", d: "Direct partnerships with weaver clusters in Banaras, Kanchipuram, Chanderi and Surat." },
    { k: "02", t: "Boutique curation", d: "Every design vetted against a season-tight palette — no clutter on your shelves." },
    { k: "03", t: "Quality controlled", d: "Two-stage inspection, GSM verified, colour-fastness tested before every dispatch." },
    { k: "04", t: "Retailer-first pricing", d: "Transparent wholesale margins, tiered slabs and easy replenishment cycles." },
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
    { name: "Boutique", min: "12 pcs", note: "For independent stores exploring the range." },
    { name: "Retail Partner", min: "48 pcs", note: "Priority stock, seasonal previews, replenishment." },
    { name: "Distributor", min: "200 pcs", note: "Territory-based pricing and dedicated account manager." },
  ];
  return (
    <section id="wholesale" className="bg-[var(--rose)]/25 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Wholesale Programme</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">Built around how you sell.</h2>
          <p className="text-muted-foreground mt-4">Three simple tiers, one honest price list. Choose the fit for your store and grow into the next.</p>
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
  const [sent, setSent] = useState(false);
  return (
    <section id="enquire" className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-14">
      <div className="space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Get in Touch</span>
        <h2 className="font-display text-4xl md:text-5xl leading-tight">Request the catalogue.</h2>
        <p className="text-muted-foreground max-w-md">Tell us a little about your store. We'll share the current lookbook, price list and MOQ details within one working day.</p>
        <div className="space-y-3 pt-4 text-sm">
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">Trade Desk</span><br />+91 00000 00000</p>
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">Email</span><br />trade@devranisaree.com</p>
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">Showroom</span><br />Surat, Gujarat · India</p>
        </div>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="bg-[var(--ivory)] border border-border rounded-2xl p-8 space-y-4"
      >
        {sent ? (
          <div className="text-center py-16 space-y-3">
            <p className="font-display text-3xl text-[var(--gold)]">धन्यवाद</p>
            <p className="text-muted-foreground">We'll reach out within one working day.</p>
          </div>
        ) : (
          <>
            {[
              { n: "name", p: "Your name", t: "text" },
              { n: "store", p: "Store / Company", t: "text" },
              { n: "city", p: "City", t: "text" },
              { n: "phone", p: "Phone / WhatsApp", t: "tel" },
              { n: "email", p: "Email", t: "email" },
            ].map((f) => (
              <input
                key={f.n}
                name={f.n}
                type={f.t}
                required
                placeholder={f.p}
                className="w-full bg-transparent border-b border-border py-3 text-sm outline-none focus:border-[var(--gold)] transition-colors"
              />
            ))}
            <textarea
              name="msg"
              rows={3}
              placeholder="Tell us about your store"
              className="w-full bg-transparent border-b border-border py-3 text-sm outline-none focus:border-[var(--gold)] transition-colors resize-none"
            />
            <button className="w-full rounded-full bg-[var(--ink)] text-[var(--ivory)] py-3 text-sm tracking-wide hover:bg-[var(--gold)] transition-colors">
              Send Enquiry
            </button>
          </>
        )}
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--ivory)]/80">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <img src={logo.url} alt="Devrani Saree Pvt. Ltd." className="h-14 w-auto bg-[var(--ivory)] rounded-lg p-2 inline-block" />
          <p className="text-sm max-w-sm leading-relaxed">Devrani Saree Pvt. Ltd. — साड़ियों का मायका. A boutique B2B saree house serving retailers across India.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[var(--gold)] uppercase tracking-widest text-xs mb-3">Explore</p>
          <a href="#collections" className="block hover:text-[var(--rose)]">Collections</a>
          <a href="#craft" className="block hover:text-[var(--rose)]">The Craft</a>
          <a href="#wholesale" className="block hover:text-[var(--rose)]">Wholesale</a>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-[var(--gold)] uppercase tracking-widest text-xs mb-3">Trade</p>
          <p>+91 00000 00000</p>
          <p>trade@devranisaree.com</p>
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
