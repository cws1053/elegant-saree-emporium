import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { TopBar, Nav, Footer, ProductCard } from "@/components/site-chrome";

export const Route = createFileRoute("/catalogue")({
  component: CataloguePage,
  head: () => ({
    meta: [
      { title: "Full Catalogue — Devrani Saree Pvt. Ltd." },
      { name: "description", content: "Browse all Devrani saree designs. Every catalogue ships as a full color set for B2B retailers." },
      { property: "og:title", content: "Devrani — Full Saree Catalogue" },
      { property: "og:description", content: "All live designs. Every set dispatched together." },
    ],
  }),
});

function CataloguePage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Nav />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 animate-fade-in">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Full Catalogue</span>
            <h1 className="font-display text-3xl sm:text-5xl mt-3">All {products.length} designs</h1>
            <p className="text-sm text-muted-foreground mt-3 max-w-lg">
              Every design ships as a complete color set. Tap any card to view details & inquire on WhatsApp.
            </p>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search designs…"
            className="rounded-full border border-[var(--gold)]/40 bg-[var(--ivory)] px-5 py-3 text-sm outline-none focus:border-[var(--gold)] w-full sm:w-72"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No designs match "{query}".</p>
        )}
      </section>
      <Footer />
    </div>
  );
}
