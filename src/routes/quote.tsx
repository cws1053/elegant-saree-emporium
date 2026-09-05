import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { TopBar, Nav, Footer } from "@/components/site-chrome";
import { QuoteForm } from "@/components/quote-form";
import { useI18n } from "@/i18n";
import { WHATSAPP_DISPLAY } from "@/lib/wa";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — Devrani Saree" },
      {
        name: "description",
        content:
          "Request a B2B wholesale saree quote from Devrani. Share your company details, quantity and delivery address — our trade desk replies on WhatsApp.",
      },
      { property: "og:title", content: "Request a Quote — Devrani Saree" },
      {
        property: "og:description",
        content:
          "B2B wholesale saree quote request — company details, quantity and delivery address, answered on WhatsApp.",
      },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const { t } = useI18n();
  const preset = (Route.useSearch() as { design?: string }).design;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Nav />

      <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 sm:pt-10 animate-fade-in">
        <div className="text-[10px] sm:text-xs tracking-widest uppercase text-muted-foreground">
          <Link to="/" className="hover:text-[var(--gold)]">
            {t("product.home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">{t("quote.crumb")}</span>
        </div>

        <div className="mt-6 sm:mt-8 flex items-center gap-3 text-[var(--gold)]/70 mb-4">
          <span className="h-px w-8 bg-[var(--gold)]" />
          <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-[var(--gold)]">
            {t("quote.tag")}
          </span>
        </div>
        <h1 className="font-display italic text-3xl sm:text-5xl leading-[1.05] max-w-2xl">
          {t("quote.title")}
        </h1>
        <p className="text-[15px] text-muted-foreground leading-relaxed mt-4 max-w-xl">
          {t("quote.subtitle")}
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <div className="rounded-3xl border border-[var(--gold)]/25 bg-[var(--ivory)] p-6 sm:p-10 shadow-sm">
          <QuoteForm presetDesign={preset} />
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
          {[
            [t("quote.bullet_wa"), WHATSAPP_DISPLAY],
            [t("quote.bullet_dispatch"), t("quote.bullet_dispatch_v")],
            [t("quote.bullet_sets"), t("quote.bullet_sets_v")],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-[var(--gold)]/20 bg-[var(--sage)]/8 py-5 px-3">
              <p className="text-[9px] uppercase font-bold text-[var(--sage)] tracking-[0.2em] mb-1">{k}</p>
              <p className="text-sm text-[var(--ink)] leading-snug">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
