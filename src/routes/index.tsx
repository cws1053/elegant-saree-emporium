import { createFileRoute, Link } from "@tanstack/react-router";
import heroSaree from "@/assets/hero-saree.jpg";
import sareesStack from "@/assets/sarees-stack.jpg";
import detailZari from "@/assets/detail-zari.jpg";
import { products } from "@/data/products";
import { featuredProducts } from "@/lib/product-details";
import { TopBar, Nav, Footer, ProductCard, WhatsAppIcon } from "@/components/site-chrome";
import { WHATSAPP_DISPLAY, waLink } from "@/lib/wa";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <TopBar />
      <Nav />
      <Hero />
      <ColorSetBanner />
      <Marquee />
      <Story />
      <Featured />
      <Craft />
      <Wholesale />
      <Enquire />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 sm:pt-10 pb-10 sm:pb-16">
        <div className="relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden rounded-[1.25rem] shadow-2xl shadow-[var(--rose)]/30 animate-fade-in">
          <img
            src={heroSaree}
            alt="Model draped in a Devrani silk saree"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/75 via-[var(--ink)]/25 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-16">
            <p className="text-[var(--gold)] uppercase tracking-[0.3em] text-[10px] sm:text-xs font-bold mb-3 sm:mb-4">
              Autumn Wholesale · Est. Boutique House
            </p>
            <h1 className="font-display italic text-white text-4xl sm:text-6xl md:text-7xl leading-[0.95] max-w-2xl">
              The loom<br />of heritage.
            </h1>
            <p className="mt-4 sm:mt-6 text-white/85 max-w-md text-sm sm:text-base leading-relaxed">
              A boutique B2B saree house from Surat — every design ships as a{" "}
              <em className="text-[var(--rose)] not-italic font-medium">complete color set</em>,
              packed and dispatched together.
            </p>
            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
              <Link to="/catalogue" className="rounded-full bg-[var(--rose)] text-[var(--ink)] px-6 py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold hover:bg-[var(--gold)] hover:text-white transition-colors hover-scale">
                Explore {products.length} designs
              </Link>
              <a
                href={waLink("Namaste Devrani, please share the full price list.")}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/70 text-white px-6 py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-[var(--ink)] transition-colors"
              >
                WhatsApp Price
              </a>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10 max-w-2xl mx-auto">
          {[
            [`${products.length}+`, "Live designs"],
            ["Full", "Color sets"],
            ["48hr", "Dispatch"],
          ].map(([k, v]) => (
            <div key={v} className="text-center">
              <dt className="font-display italic text-3xl sm:text-4xl text-[var(--gold)]">{k}</dt>
              <dd className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ColorSetBanner() {
  return (
    <div className="bg-[var(--gold)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-base tracking-wide">
        <span className="font-display text-lg sm:text-2xl animate-pulse">✦</span>
        <p>
          <strong className="font-display text-base sm:text-xl mr-2">Please note —</strong>
          Every design ships as a <em>full color set</em>. Single-piece orders are not accepted.
        </p>
      </div>
    </div>
  );
}

function Marquee() {
  const items = ["Banarasi", "Kanjivaram", "Chanderi", "Tussar", "Organza", "Paithani", "Maheshwari", "Patola"];
  return (
    <div className="border-y border-border bg-[var(--sage)]/15 py-4 sm:py-5 overflow-hidden">
      <div className="flex gap-10 sm:gap-14 whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {[...items, ...items, ...items].map((w, i) => (
          <span key={i} className="font-display text-xl sm:text-3xl text-[var(--ink)]/70">
            {w} <span className="text-[var(--gold)] mx-3 sm:mx-4">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function Story() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 sm:gap-14 items-center">
      <img src={sareesStack} alt="A stack of Devrani sarees" width={1200} height={900} loading="lazy" className="rounded-[1.5rem] w-full object-cover animate-fade-in" />
      <div className="space-y-5 sm:space-y-6 animate-fade-in">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Our House</span>
        <h2 className="font-display text-3xl sm:text-5xl leading-tight">
          A daughter's home — <em className="not-italic text-[var(--gold)]">for every saree.</em>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          <em className="not-italic">Devrani</em> means the younger sister-in-law — a keeper of tradition
          and a bringer of warmth. Our tagline, <em>साड़ियों का मायका</em> — a mother's home for sarees —
          reflects the care with which every design is stitched, boxed and sent on its way to your store.
        </p>
        <div className="gold-rule" />
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section id="featured" className="bg-[var(--sage)]/12 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="animate-fade-in">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Featured</span>
            <h2 className="font-display text-3xl sm:text-5xl mt-3 max-w-xl">
              A glimpse of the season's bestsellers.
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg">
              Tap any design for full details — fabric, color count, care & instant WhatsApp inquiry.
            </p>
          </div>
          <Link
            to="/catalogue"
            className="rounded-full border border-[var(--gold)] text-[var(--ink)] px-5 py-2.5 text-xs sm:text-sm tracking-wide hover:bg-[var(--gold)] hover:text-white transition-colors"
          >
            View all {products.length} →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--ivory)] px-7 py-3 text-sm tracking-wide hover:bg-[var(--gold)] transition-colors hover-scale"
          >
            Explore the full catalogue
          </Link>
        </div>
      </div>
    </section>
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
    <section id="craft" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-12 gap-10 sm:gap-14">
      <div className="md:col-span-5">
        <img src={detailZari} alt="Gold zari detail" width={1000} height={1200} loading="lazy" className="rounded-[1.5rem] w-full object-cover md:sticky md:top-28 animate-fade-in" />
      </div>
      <div className="md:col-span-7 space-y-8 sm:space-y-10">
        <div className="animate-fade-in">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">The Craft</span>
          <h2 className="font-display text-3xl sm:text-5xl mt-3 leading-tight">Slow-made weaves, retail-ready operations.</h2>
        </div>
        <ul className="divide-y divide-border">
          {rows.map((r) => (
            <li key={r.k} className="py-5 sm:py-6 grid grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start hover:bg-[var(--sage)]/10 rounded-xl px-2 transition-colors">
              <span className="font-display text-2xl sm:text-3xl text-[var(--gold)]">{r.k}</span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl mb-1">{r.t}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{r.d}</p>
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
    <section id="wholesale" className="bg-[var(--rose)]/25 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10 sm:space-y-14">
        {/* Editorial dark CTA */}
        <div className="relative bg-[var(--ink)] text-[var(--ivory)] rounded-2xl p-8 sm:p-14 text-center border border-[var(--gold)]/40 overflow-hidden animate-fade-in">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--gold)]/10" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[var(--rose)]/10" />
          <div className="relative">
            <p className="text-[var(--gold)] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-3">
              Partner with Devrani
            </p>
            <h2 className="font-display italic text-3xl sm:text-5xl mb-4 text-[var(--gold)]">Priced by the color set.</h2>
            <p className="text-[var(--ivory)]/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
              Apply for wholesale access — browse our masterweaver catalogues, unlock per-set pricing, and get direct WhatsApp support.
            </p>
            <a
              href={waLink("Namaste Devrani, I'd like to register as a retail partner.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--ink)] px-8 py-4 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold hover:bg-[var(--rose)] transition-colors hover-scale"
            >
              Register Retail Account
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {tiers.map((t) => (
            <div key={t.name} className="bg-[var(--ivory)] rounded-2xl p-6 sm:p-8 border border-[var(--gold)]/30 hover:-translate-y-1 hover:shadow-xl transition-all">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Tier</p>
              <h3 className="font-display text-2xl sm:text-3xl mt-2">{t.name}</h3>
              <p className="mt-4 text-sm text-muted-foreground">Minimum order</p>
              <p className="font-display text-3xl sm:text-4xl text-[var(--ink)]">{t.min}</p>
              <div className="gold-rule my-5 sm:my-6" />
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
    <section id="enquire" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 sm:gap-14">
      <div className="space-y-5 sm:space-y-6 animate-fade-in">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Get in Touch</span>
        <h2 className="font-display text-3xl sm:text-5xl leading-tight">One tap on WhatsApp.</h2>
        <p className="text-muted-foreground max-w-md">
          Our trade desk replies in minutes with the latest lookbook, per-set price and dispatch timeline.
        </p>
        <div className="space-y-3 pt-4 text-sm">
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">WhatsApp</span><br />{WHATSAPP_DISPLAY}</p>
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">Showroom</span><br />Surat, Gujarat · India</p>
        </div>
      </div>
      <div className="bg-[var(--ivory)] border border-border rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center gap-5 sm:gap-6 hover:shadow-xl transition-shadow">
        <div className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center animate-pulse">
          <WhatsAppIcon size={22} />
        </div>
        <div>
          <p className="font-display text-2xl sm:text-3xl text-[var(--ink)]">Chat with our trade desk</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Send a hi and we'll share the full catalogue, price list and color set details.
          </p>
        </div>
        <a
          href={waLink("Namaste Devrani, please share the full catalogue and price list.")}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#25D366] hover:bg-[#1ea952] text-white px-6 sm:px-8 py-3 text-sm tracking-wide transition-colors flex items-center gap-2 hover-scale"
        >
          <WhatsAppIcon /> Open WhatsApp
        </a>
      </div>
    </section>
  );
}
