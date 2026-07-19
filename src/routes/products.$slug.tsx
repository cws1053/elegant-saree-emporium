import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
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
        ]
      : [{ title: "Design — Devrani Saree" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl">Design not found</h1>
        <Link to="/catalogue" className="mt-6 inline-block rounded-full bg-[var(--ink)] text-[var(--ivory)] px-6 py-3 text-sm">
          Browse catalogue
        </Link>
      </div>
    </div>
  ),
  errorComponent: ErrorRetry,
});

function ErrorRetry({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="rounded-full bg-[var(--ink)] text-[var(--ivory)] px-6 py-3 text-sm"
      >
        Retry
      </button>
    </div>
  );
}

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
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <TopBar />
      <Nav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-5 text-[10px] sm:text-xs tracking-widest uppercase text-muted-foreground animate-fade-in">
        <Link to="/" className="hover:text-[var(--gold)]">{t("product.home")}</Link>
        <span className="mx-2">/</span>
        <Link to="/catalogue" className="hover:text-[var(--gold)]">{t("product.catalogue")}</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--ink)]">{product.title}</span>
      </div>

      {/* Header / Meta */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 sm:pt-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)] font-semibold">
          {t("product.sku")} · {sku}
        </p>
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl mt-2 leading-[1.05] max-w-3xl">
          {product.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span className="px-3 py-1 bg-[var(--rose)]/20 border border-[var(--rose)]/50 text-[var(--ink)] text-[10px] font-bold tracking-widest uppercase">
            {t("product.b2b_badge")}
          </span>
          <span className="px-3 py-1 border border-[var(--gold)]/50 text-[var(--gold)] text-[10px] font-bold tracking-widest uppercase">
            {t("product.shades", { n: product.colors })}
          </span>
          <span className="text-[11px] text-muted-foreground tracking-wide">
            {t("product.price_on_wa")}
          </span>
        </div>
      </section>

      {/* Gallery + Buy */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-2 gap-10 lg:gap-14">
        <ProductGallery
          images={productPages[product.slug] ?? [product.image]}
          alt={product.title}
          productTitle={product.title}
          productImage={product.image}
        />

        <div className="space-y-8 animate-fade-in">
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Spec Strip */}
          <div className="grid grid-cols-3 border-y border-[var(--gold)]/25 bg-[var(--sage)]/8 -mx-4 sm:mx-0 sm:rounded-2xl">
            {[
              ["Fabric", product.fabric.split(" ").slice(0, 2).join(" ")],
              ["Weight", product.weight],
              ["Colors", `${product.colors} shades`],
            ].map(([k, v]) => (
              <div key={k} className="text-center py-5 px-2 border-r last:border-r-0 border-[var(--gold)]/20">
                <p className="text-[9px] uppercase font-bold text-[var(--sage)] tracking-[0.2em] mb-1">{k}</p>
                <p className="text-xs sm:text-sm text-[var(--ink)] leading-tight">{v}</p>
              </div>
            ))}
          </div>

          {/* Qty + primary CTAs */}
          <div className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--ivory)] p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="uppercase tracking-widest text-[10px] text-[var(--gold)] font-bold">Order Sets</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Each set = all {product.colors} colors</p>
              </div>
              <div className="flex items-center border-2 border-[var(--ink)]/10 rounded-full overflow-hidden">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="px-4 py-2 hover:bg-[var(--sage)]/20 text-lg font-light">−</button>
                <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} className="w-12 text-center bg-transparent py-2 outline-none font-display text-lg" />
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="px-4 py-2 hover:bg-[var(--sage)]/20 text-lg font-light">+</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowDownload(true)}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-[var(--ink)] text-[var(--ink)] text-[11px] sm:text-xs font-bold tracking-widest uppercase py-3 hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-colors"
              >
                <DownloadIcon /> Catalogue
              </button>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] text-[var(--ivory)] text-[11px] sm:text-xs font-bold tracking-widest uppercase py-3 hover:bg-[#25D366] transition-colors"
              >
                <WhatsAppIcon /> Enquire
              </a>
            </div>
            <p className="text-[11px] text-center text-muted-foreground pt-1">
              We dispatch as one carton · single-piece orders not accepted
            </p>
          </div>

          {/* Full spec list */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-2">
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
      </section>

      {/* Trust Row */}
      <section className="border-y border-[var(--gold)]/20 bg-[var(--sage)]/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { i: <CheckIcon />, t: "Verified Weaver", d: "Sourced direct" },
            { i: <TruckIcon />, t: "48hr Dispatch", d: "Pan-India" },
            { i: <ShieldIcon />, t: "QC Checked", d: "Two-stage" },
            { i: <BoxIcon />, t: "One Carton", d: "Full color set" },
          ].map((b) => (
            <div key={b.t} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-[var(--gold)] text-[var(--gold)] grid place-items-center">
                {b.i}
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.18em]">{b.t}</p>
              <p className="text-[10px] text-muted-foreground -mt-1">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested — horizontal scroll on mobile */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">{t("product.curated")}</p>
            <h2 className="font-display italic text-2xl sm:text-4xl mt-2">{t("product.suggested")}</h2>
          </div>
          <Link to="/catalogue" className="text-[10px] sm:text-xs uppercase tracking-widest text-[var(--sage)] border-b border-[var(--sage)] pb-0.5 hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
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
              <div className="aspect-[3/4] bg-[var(--sage)]/10 overflow-hidden mb-2">
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
      <div className="fixed md:hidden bottom-0 inset-x-0 h-16 bg-[var(--ivory)] border-t border-[var(--gold)]/30 flex items-stretch shadow-[0_-8px_24px_rgba(0,0,0,0.08)] z-40">
        <button
          onClick={() => setShowDownload(true)}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 border-r border-[var(--sage)]/25"
        >
          <DownloadIcon />
          <span className="text-[9px] uppercase font-bold tracking-widest">{t("product.btn_catalogue")}</span>
        </button>
        <a
          href={waLink(message)}
          target="_blank"
          rel="noreferrer"
          className="flex-[1.6] bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center gap-2 hover:bg-black transition-colors"
        >
          <span className="text-[var(--gold)]"><WhatsAppIcon size={18} /></span>
          <span className="text-[11px] uppercase font-bold tracking-[0.18em]">{t("product.sticky_wa")}</span>
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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function CheckIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>;
}
function TruckIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="6" width="14" height="11" /><path d="M15 10h4l3 3v4h-7" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></svg>;
}
function ShieldIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}
function BoxIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v10" /></svg>;
}
