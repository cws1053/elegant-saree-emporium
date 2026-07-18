import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct } from "@/lib/product-details";
import { products } from "@/data/products";
import { TopBar, Nav, Footer, WhatsAppIcon, ProductCard } from "@/components/site-chrome";
import { waLink } from "@/lib/wa";
import { ProductGallery } from "@/components/product-gallery";
import { CatalogueDownloadDialog } from "@/components/catalogue-download";
import { productPages } from "@/data/product-pages";

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
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl">Design not found</h1>
        <Link to="/catalogue" className="mt-6 inline-block rounded-full bg-[var(--ink)] text-[var(--ivory)] px-6 py-3 text-sm">
          Browse catalogue
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <button onClick={reset} className="rounded-full bg-[var(--ink)] text-[var(--ivory)] px-6 py-3 text-sm">Retry</button>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [showDownload, setShowDownload] = useState(false);

  const message =
    `Namaste Devrani,\n\nI'd like to enquire about:\n` +
    `• Design: ${product.title}\n` +
    `• Fabric: ${product.fabric}\n` +
    `• Quantity: ${qty} full color set${qty > 1 ? "s" : ""}\n\n` +
    `Please share price and availability. Thank you.`;

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const specs: [string, string][] = [
    ["Fabric", product.fabric],
    ["Colors in set", `${product.colors} shades`],
    ["Length", product.length],
    ["Blouse", product.blouse],
    ["Weight", product.weight],
    ["Occasion", product.occasion],
    ["Care", product.care],
    ["Dispatch", "Full color set · one carton"],
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Nav />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 text-xs tracking-widest uppercase text-muted-foreground animate-fade-in">
        <Link to="/" className="hover:text-[var(--gold)]">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/catalogue" className="hover:text-[var(--gold)]">Catalogue</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--ink)]">{product.title}</span>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-2 gap-8 lg:gap-14">
        <ProductGallery images={productPages[product.slug] ?? [product.image]} alt={product.title} />

        <div className="space-y-6 animate-fade-in">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Devrani Design</span>
            <h1 className="font-display text-4xl sm:text-5xl mt-2 leading-tight">{product.title}</h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--sage)]/25 text-[var(--ink)] text-xs px-3 py-1 tracking-wide">{product.colors} colors</span>
            <span className="rounded-full bg-[var(--rose)]/30 text-[var(--ink)] text-xs px-3 py-1 tracking-wide">{product.occasion}</span>
            <span className="rounded-full border border-[var(--gold)]/50 text-[var(--ink)] text-xs px-3 py-1 tracking-wide">Full set dispatch</span>
          </div>

          <div className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--ivory)] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="uppercase tracking-widest text-xs text-muted-foreground">Sets</span>
              <div className="flex items-center border border-border rounded-full overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease"
                  className="px-4 py-2 hover:bg-[var(--sage)]/20 text-lg"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="w-14 text-center bg-transparent py-2 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase"
                  className="px-4 py-2 hover:bg-[var(--sage)]/20 text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <a
              href={waLink(message)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ea952] text-white text-sm font-medium tracking-wide py-3 transition-colors hover-scale"
            >
              <WhatsAppIcon /> Inquire on WhatsApp
            </a>
            <p className="text-[11px] text-center text-muted-foreground">
              We ship every design as a full color set — single-piece orders are not accepted.
            </p>
          </div>

          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-border">
            {specs.map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <dt className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)]">{k}</dt>
                <dd className="text-sm text-[var(--ink)] mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl">You may also like</h2>
          <Link to="/catalogue" className="text-xs uppercase tracking-widest text-[var(--gold)] hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-14">
        <div className="rounded-3xl bg-[var(--ink)] text-[var(--ivory)] px-6 sm:px-10 py-8 sm:py-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--gold)]">Take it with you</p>
            <h3 className="font-display text-2xl sm:text-3xl mt-2 leading-tight">
              Full catalogue of <span className="text-[var(--rose)]">{product.title}</span> on your WhatsApp
            </h3>
            <p className="mt-2 text-sm text-[var(--ivory)]/75 max-w-xl">
              Verify your number with a one-time code and we'll send the complete design sheet — every color, price, and dispatch detail — directly on WhatsApp.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:min-w-[220px]">
            <button
              onClick={() => setShowDownload(true)}
              className="flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-[var(--ink)] text-sm font-medium tracking-wide py-3 px-6 transition-colors hover-scale"
            >
              <DownloadIcon /> Download Catalogue
            </button>
            <a
              href={waLink(message)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ea952] text-white text-sm font-medium tracking-wide py-3 px-6 transition-colors hover-scale"
            >
              <WhatsAppIcon /> Enquire Now
            </a>
          </div>
        </div>
      </section>

      <Footer />

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
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
