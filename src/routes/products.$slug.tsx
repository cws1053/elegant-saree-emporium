import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct } from "@/lib/product-details";
import { products } from "@/data/products";
import { TopBar, Nav, Footer, WhatsAppIcon } from "@/components/site-chrome";
import { waLink } from "@/lib/wa";
import { ProductGallery } from "@/components/product-gallery";
import { CatalogueDownloadDialog } from "@/components/catalogue-download";
import { productPages } from "@/data/product-pages";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — Devrani Saree` },
          { name: "description", content: `${loaderData.product.title} — ${loaderData.product.fabric}. Full color set of ${loaderData.product.colors} shades, dispatched together.` },
          { property: "og:title", content: `${loaderData.product.title} — Devrani` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
          { name: "twitter:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-dvh grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl">Design not found</h1>
        <Link to="/catalogue" className="mt-6 inline-block rounded-full bg-[var(--ink)] text-[var(--ivory)] px-6 py-3 text-sm">
          Browse catalogue
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-dvh grid place-items-center px-6 text-center">
      <button onClick={reset} className="rounded-full bg-[var(--ink)] text-[var(--ivory)] px-6 py-3 text-sm">Retry</button>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { t } = useI18n();
  const [qty, setQty] = useState(1);
  const [showDownload, setShowDownload] = useState(false);

  const message =
    `Namaste Devrani,\n\nI'd like to enquire about:\n` +
    `• Design: ${product.title}\n` +
    `• Fabric: ${product.fabric}\n` +
    `• Quantity: ${qty} full color set${qty > 1 ? "s" : ""}\n\n` +
    `Please share price and availability. Thank you.`;

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 6);
  const sku = "DVR-" + product.slug.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);

  return (
    <div className="min-h-dvh bg-background text-foreground pb-24 md:pb-0">
      <TopBar />
      <Nav />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 animate-fade-in">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/50">
            <li><Link to="/" className="hover:text-[var(--sage)] transition-colors">{t("product.home")}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/catalogue" className="hover:text-[var(--sage)] transition-colors">{t("product.catalogue")}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--ink)] truncate max-w-[60vw]">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7 animate-fade-in">
            <ProductGallery
              images={productPages[product.slug] ?? [product.image]}
              alt={product.title}
              productTitle={product.title}
              productImage={product.image}
            />
          </div>

          {/* Content Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 animate-fade-in">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[11px] font-bold tracking-[0.18em] text-[var(--gold)] uppercase">
                  {t("product.sku")} · {sku}
                </span>
                <span className="px-2 py-0.5 bg-[var(--rose)]/20 text-[var(--ink)] border border-[var(--rose)]/40 text-[9px] font-bold uppercase tracking-widest rounded-sm">
                  {t("product.b2b_badge")}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl leading-tight mb-4 text-[var(--ink)]">
                {product.title}
                <span className="block italic font-light text-[var(--sage)] text-3xl md:text-4xl mt-1">
                  {t("product.shades", { n: product.colors })}
                </span>
              </h1>
              <p className="text-[var(--ink)]/70 text-sm leading-relaxed max-w-md">
                {product.description}
              </p>
            </header>

            {/* Spec Strip */}
            <div className="border-y border-[var(--ink)]/10 py-6 my-8 grid grid-cols-3 gap-6">
              {[
                [t("product.fabric") ?? "Fabric", product.fabric.split(" ").slice(0, 2).join(" ")],
                [t("product.weight") ?? "Weight", product.weight],
                [t("product.colors") ?? "Colors", `${product.colors} shades`],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="block text-[9px] uppercase tracking-widest text-[var(--ink)]/40 mb-1 font-semibold">{k}</span>
                  <span className="text-xs sm:text-sm font-medium text-[var(--ink)]">{v}</span>
                </div>
              ))}
            </div>

            {/* Unlock catalogue via WhatsApp */}
            <div className="bg-white/70 border border-[var(--sage)]/40 p-5 sm:p-6 mb-8 rounded-md">
              <div className="flex gap-4">
                <div aria-hidden="true" className="shrink-0 w-10 h-10 bg-[var(--sage)]/15 rounded-full grid place-items-center text-[var(--sage)]">
                  <WhatsAppIcon size={18} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-semibold mb-1 italic">
                    View full catalogue & pricing
                  </h2>
                  <p className="text-xs text-[var(--ink)]/60 mb-3 leading-relaxed">
                    Unlock all {(productPages[product.slug]?.length ?? 1)} design pages and wholesale pricing via a WhatsApp OTP.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowDownload(true)}
                    className="text-[10px] font-bold uppercase tracking-widest text-[var(--sage)] border-b border-[var(--sage)] pb-1 hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors min-h-11 inline-flex items-center"
                  >
                    Unlock now
                  </button>
                </div>
              </div>
            </div>

            {/* Quantity + CTA */}
            <div className="space-y-4">
              <div>
                <label htmlFor="qty-input" className="block text-[10px] uppercase tracking-widest text-[var(--ink)]/50 mb-3 font-semibold">
                  Order sets · each set = all {product.colors} colors
                </label>
                <div className="flex items-stretch border border-[var(--ink)]/15 rounded-md overflow-hidden bg-white/60 w-full max-w-[220px]">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-12 h-12 grid place-items-center hover:bg-[var(--sage)]/10 text-lg font-light"
                  >
                    −
                  </button>
                  <input
                    id="qty-input"
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                    className="flex-1 h-12 text-center bg-transparent outline-none font-display text-lg border-x border-[var(--ink)]/10"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-12 h-12 grid place-items-center hover:bg-[var(--sage)]/10 text-lg font-light"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDownload(true)}
                  className="h-14 rounded-md bg-[var(--sage)] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--ink)] transition-colors inline-flex items-center justify-center gap-2"
                >
                  <DownloadIcon /> Catalogue
                </button>
                <a
                  href={waLink(message)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Enquire on WhatsApp"
                  className="h-14 rounded-md border border-[var(--gold)] text-[var(--gold)] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--gold)]/10 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon /> Enquire now
                </a>
              </div>

              <p className="text-[11px] italic text-[var(--ink)]/50 text-center pt-2">
                We dispatch as one carton · single-piece orders not accepted
              </p>
            </div>

            {/* Full spec list */}
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                ["Fabric", product.fabric],
                ["Length", product.length],
                ["Blouse", product.blouse],
                ["Occasion", product.occasion],
                ["Care", product.care],
                ["Dispatch", "Full color set · one carton"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-dashed border-[var(--gold)]/30 pb-3">
                  <dt className="text-[9px] uppercase tracking-[0.25em] text-[var(--sage)] font-bold">{k}</dt>
                  <dd className="text-sm text-[var(--ink)] mt-1 leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>

      {/* Trust Row */}
      <section className="border-y border-[var(--gold)]/20 bg-[var(--sage)]/8 mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { i: <CheckIcon />, t: "Verified Weaver", d: "Sourced direct" },
            { i: <TruckIcon />, t: "48hr Dispatch", d: "Pan-India" },
            { i: <ShieldIcon />, t: "QC Checked", d: "Two-stage" },
            { i: <BoxIcon />, t: "One Carton", d: "Full color set" },
          ].map((b) => (
            <div key={b.t} className="flex flex-col items-center gap-2">
              <div aria-hidden="true" className="w-10 h-10 rounded-full border border-[var(--gold)] text-[var(--gold)] grid place-items-center">
                {b.i}
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.18em]">{b.t}</p>
              <p className="text-[10px] text-muted-foreground -mt-1">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">{t("product.curated")}</p>
            <h2 className="font-display italic text-2xl sm:text-4xl mt-2">{t("product.suggested")}</h2>
          </div>
          <Link to="/catalogue" className="shrink-0 text-[10px] sm:text-xs uppercase tracking-widest text-[var(--sage)] border-b border-[var(--sage)] pb-0.5 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
            {t("product.see_all")}
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 sm:mx-0 px-4 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6">
          {related.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="min-w-[45%] sm:min-w-0 snap-start group animate-fade-in"
            >
              <div className="aspect-[3/4] bg-[var(--sage)]/10 overflow-hidden mb-2 rounded-sm">
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--sage)] font-bold">Devrani</p>
              <p className="font-display italic text-sm sm:text-base leading-tight mt-0.5">{p.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />

      {/* Sticky Bottom Bar — mobile */}
      <div className="fixed md:hidden bottom-0 inset-x-0 bg-white border-t border-[var(--ink)]/10 px-4 py-3 flex gap-3 z-40 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => setShowDownload(true)}
          className="flex-[2] h-12 rounded-md bg-[var(--sage)] text-white text-[10px] font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2"
        >
          <DownloadIcon /> {t("product.btn_catalogue")}
        </button>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noreferrer"
          aria-label="Enquire on WhatsApp"
          className="flex-1 h-12 rounded-md border border-[var(--gold)] text-[var(--gold)] text-[10px] font-bold uppercase tracking-widest inline-flex items-center justify-center gap-2"
        >
          <WhatsAppIcon /> {t("product.sticky_wa")}
        </a>
      </div>

      {showDownload && (
        <CatalogueDownloadDialog
          productTitle={product.title}
          productImage={product.image}
          onClose={() => setShowDownload(false)}
        />
      )}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function CheckIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>;
}
function TruckIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="1" y="6" width="14" height="11" /><path d="M15 10h4l3 3v4h-7" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></svg>;
}
function ShieldIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}
function BoxIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v10" /></svg>;
}
