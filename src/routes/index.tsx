import { createFileRoute, Link } from "@tanstack/react-router";
import heroSaree from "@/assets/hero-saree.jpg";
import sareesStack from "@/assets/sarees-stack.jpg";
import detailZari from "@/assets/detail-zari.jpg";
import { products } from "@/data/products";
import { featuredProducts } from "@/lib/product-details";
import { TopBar, Nav, Footer, ProductCard, WhatsAppIcon } from "@/components/site-chrome";
import { WHATSAPP_DISPLAY, waLink } from "@/lib/wa";
import { useI18n } from "@/i18n";

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
  const { t } = useI18n();
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
              {t("hero.tag")}
            </p>
            <h1 className="font-display italic text-[var(--ivory)] text-4xl sm:text-6xl md:text-7xl leading-[0.95] max-w-2xl">
              {t("hero.title1")}<br />{t("hero.title2")}
            </h1>
            <p className="mt-4 sm:mt-6 text-[var(--ivory)]/85 max-w-md text-sm sm:text-base leading-relaxed">
              {t("hero.subtitle_pre")}{" "}
              <em className="text-[var(--rose)] not-italic font-medium">{t("hero.subtitle_em")}</em>
              {t("hero.subtitle_post")}
            </p>
            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
              <Link to="/catalogue" className="rounded-full bg-[var(--rose)] text-[var(--ink)] px-6 py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold hover:bg-[var(--gold)] hover:text-[var(--ivory)] transition-colors hover-scale">
                {t("hero.cta_explore", { count: products.length })}
              </Link>
              <a
                href={waLink("Namaste Devrani, please share the full price list.")}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--ivory)]/70 text-[var(--ivory)] px-6 py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-bold hover:bg-[var(--ivory)] hover:text-[var(--ink)] transition-colors"
              >
                {t("hero.cta_wa_price")}
              </a>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10 max-w-2xl mx-auto">
          {[
            [`${products.length}+`, t("hero.stat_live")],
            ["Full", t("hero.stat_sets")],
            ["48hr", t("hero.stat_dispatch")],
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
  const { t } = useI18n();
  return (
    <div className="bg-[var(--gold)] text-[var(--ivory)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-base tracking-wide">
        <span className="font-display text-lg sm:text-2xl animate-pulse">✦</span>
        <p>
          <strong className="font-display text-base sm:text-xl mr-2">{t("banner.please_note")}</strong>
          {t("banner.body_pre")} <em>{t("banner.body_em")}</em> {t("banner.body_post")}
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
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 sm:gap-14 items-center">
      <img src={sareesStack} alt="A stack of Devrani sarees" width={1200} height={900} loading="lazy" className="rounded-[1.5rem] w-full object-cover animate-fade-in" />
      <div className="space-y-5 sm:space-y-6 animate-fade-in">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{t("story.tag")}</span>
        <h2 className="font-display text-3xl sm:text-5xl leading-tight">
          {t("story.title_pre")} <em className="not-italic text-[var(--gold)]">{t("story.title_em")}</em>
        </h2>
        <p className="text-muted-foreground leading-relaxed">{t("story.body")}</p>
        <div className="gold-rule" />
      </div>
    </section>
  );
}

function Featured() {
  const { t } = useI18n();
  return (
    <section id="featured" className="bg-[var(--sage)]/12 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="animate-fade-in">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{t("featured.tag")}</span>
            <h2 className="font-display text-3xl sm:text-5xl mt-3 max-w-xl">{t("featured.title")}</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg">{t("featured.body")}</p>
          </div>
          <Link
            to="/catalogue"
            className="rounded-full border border-[var(--gold)] text-[var(--ink)] px-5 py-2.5 text-xs sm:text-sm tracking-wide hover:bg-[var(--gold)] hover:text-[var(--ivory)] transition-colors"
          >
            {t("featured.view_all", { count: products.length })}
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
            {t("featured.explore_full")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function Craft() {
  const { t } = useI18n();
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
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{t("craft.tag")}</span>
          <h2 className="font-display text-3xl sm:text-5xl mt-3 leading-tight">{t("craft.title")}</h2>
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
  const { t } = useI18n();
  const tiers = [
    { name: "Boutique", min: "1 set", note: "One full color set per design — try a range." },
    { name: "Retail Partner", min: "3 sets", note: "Mix designs across sets, priority stock and previews." },
    { name: "Distributor", min: "10 sets", note: "Territory pricing and a dedicated account manager." },
  ];
  return (
    <section id="wholesale" className="bg-[var(--rose)]/25 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10 sm:space-y-14">
        <div className="relative bg-[var(--ink)] text-[var(--ivory)] rounded-2xl p-8 sm:p-14 text-center border border-[var(--gold)]/40 overflow-hidden animate-fade-in">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[var(--gold)]/10" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[var(--rose)]/10" />
          <div className="relative">
            <p className="text-[var(--gold)] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold mb-3">
              {t("wholesale.tag")}
            </p>
            <h2 className="font-display italic text-3xl sm:text-5xl mb-4 text-[var(--gold)]">{t("wholesale.title")}</h2>
            <p className="text-[var(--ivory)]/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
              {t("wholesale.body")}
            </p>
            <a
              href={waLink("Namaste Devrani, I'd like to register as a retail partner.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] text-[var(--ink)] px-8 py-4 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold hover:bg-[var(--rose)] transition-colors hover-scale"
            >
              {t("wholesale.cta")}
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-[var(--ivory)] rounded-2xl p-6 sm:p-8 border border-[var(--gold)]/30 hover:-translate-y-1 hover:shadow-xl transition-all">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">{t("wholesale.tier")}</p>
              <h3 className="font-display text-2xl sm:text-3xl mt-2">{tier.name}</h3>
              <p className="mt-4 text-sm text-muted-foreground">{t("wholesale.min")}</p>
              <p className="font-display text-3xl sm:text-4xl text-[var(--ink)]">{tier.min}</p>
              <div className="gold-rule my-5 sm:my-6" />
              <p className="text-sm text-muted-foreground">{tier.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Enquire() {
  const { t } = useI18n();
  return (
    <section id="enquire" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 sm:gap-14">
      <div className="space-y-5 sm:space-y-6 animate-fade-in">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{t("enquire.tag")}</span>
        <h2 className="font-display text-3xl sm:text-5xl leading-tight">{t("enquire.title")}</h2>
        <p className="text-muted-foreground max-w-md">{t("enquire.body")}</p>
        <div className="space-y-3 pt-4 text-sm">
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">{t("enquire.wa")}</span><br />{WHATSAPP_DISPLAY}</p>
          <p><span className="text-[var(--gold)] uppercase tracking-widest text-xs">{t("enquire.showroom")}</span><br />Surat, Gujarat · India</p>
        </div>
      </div>
      <div className="bg-[var(--ivory)] border border-border rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center gap-5 sm:gap-6 hover:shadow-xl transition-shadow">
        <div className="w-16 h-16 rounded-full bg-[#25D366] text-[var(--ivory)] flex items-center justify-center animate-pulse">
          <WhatsAppIcon size={22} />
        </div>
        <div>
          <p className="font-display text-2xl sm:text-3xl text-[var(--ink)]">{t("enquire.chat_title")}</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">{t("enquire.chat_body")}</p>
        </div>
        <a
          href={waLink("Namaste Devrani, please share the full catalogue and price list.")}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#25D366] hover:bg-[#1ea952] text-[var(--ivory)] px-6 sm:px-8 py-3 text-sm tracking-wide transition-colors flex items-center gap-2 hover-scale"
        >
          <WhatsAppIcon /> {t("enquire.open_wa")}
        </a>
      </div>
    </section>
  );
}
