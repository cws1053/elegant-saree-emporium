import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { products } from "@/data/products";
import { waLink, WHATSAPP_DISPLAY } from "@/lib/wa";
import { useI18n } from "@/i18n";
import { WhatsAppIcon } from "@/components/site-chrome";

const phoneRegex = /^\+?[0-9]{10,15}$/;

const quoteSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, { message: "Company / shop name is required" })
    .max(120, { message: "Keep it under 120 characters" }),
  contact: z
    .string()
    .trim()
    .min(2, { message: "Contact person is required" })
    .max(80, { message: "Keep it under 80 characters" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone number is required" })
    .regex(phoneRegex, { message: "Enter a valid phone (10–15 digits)" }),
  email: z
    .string()
    .trim()
    .max(120, { message: "Keep it under 120 characters" })
    .optional()
    .or(z.literal("").transform(() => undefined))
    .pipe(z.string().email({ message: "Enter a valid email" }).optional()),
  gst: z
    .string()
    .trim()
    .max(20, { message: "Keep it under 20 characters" })
    .optional(),
  design: z.string().trim().max(120).optional(),
  quantity: z.coerce
    .number({ message: "Enter a quantity" })
    .int({ message: "Whole sets only" })
    .min(1, { message: "Minimum 1 full color set" })
    .max(9999, { message: "Too large" }),
  address: z
    .string()
    .trim()
    .min(6, { message: "Delivery address is required" })
    .max(400, { message: "Keep it under 400 characters" }),
  city: z
    .string()
    .trim()
    .min(2, { message: "City is required" })
    .max(80, { message: "Keep it under 80 characters" }),
  state: z
    .string()
    .trim()
    .min(2, { message: "State is required" })
    .max(80, { message: "Keep it under 80 characters" }),
  pincode: z
    .string()
    .trim()
    .min(4, { message: "Pincode is required" })
    .max(12, { message: "Keep it under 12 characters" }),
  notes: z.string().trim().max(500, { message: "Keep it under 500 characters" }).optional(),
});

type QuoteValues = z.infer<typeof quoteSchema>;

type Props = {
  presetDesign?: string;
};

export function QuoteForm({ presetDesign }: Props) {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      company: "",
      contact: "",
      phone: "",
      email: "",
      gst: "",
      design: presetDesign ?? "",
      quantity: 1,
      address: "",
      city: "",
      state: "",
      pincode: "",
      notes: "",
    },
  });

  const qty = watch("quantity");

  function onSubmit(values: QuoteValues) {
    const lines = [
      "Namaste Devrani — B2B Quote Request",
      "",
      `• Company / Shop: ${values.company}`,
      `• Contact Person: ${values.contact}`,
      `• Phone: ${values.phone}`,
      values.email ? `• Email: ${values.email}` : "",
      values.gst ? `• GST: ${values.gst}` : "",
      values.design ? `• Design of Interest: ${values.design}` : "",
      `• Quantity: ${values.quantity} full color set${values.quantity > 1 ? "s" : ""}`,
      "",
      "Delivery Address:",
      values.address,
      `${values.city}, ${values.state} — ${values.pincode}`,
      "",
      values.notes ? `Notes: ${values.notes}` : "",
    ].filter(Boolean);

    const message = lines.join("\n");
    setSubmitted(message);
    // Open WhatsApp prefilled in a new tab.
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[var(--gold)]/40 bg-[var(--ivory)] p-8 sm:p-10 text-center animate-fade-in">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#25D366] text-[var(--ivory)] grid place-items-center mb-5">
          <WhatsAppIcon size={26} />
        </div>
        <h3 className="font-display italic text-2xl sm:text-3xl">{t("quote.success_title")}</h3>
        <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
          {t("quote.success_body")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(submitted)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ea952] text-[var(--ivory)] px-6 py-3 text-xs uppercase tracking-widest font-bold transition-colors"
          >
            <WhatsAppIcon /> {t("quote.reopen_wa")}
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(null)}
            className="rounded-full border border-[var(--ink)] text-[var(--ink)] px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-colors"
          >
            {t("quote.new_request")}
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-5">
          {WHATSAPP_DISPLAY}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      {/* Company details */}
      <fieldset className="space-y-4">
        <legend className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--gold)] mb-1">
          {t("quote.section_company")}
        </legend>
        <Field label={t("quote.company")} error={errors.company?.message} required>
          <input
            type="text"
            autoComplete="organization"
            {...register("company")}
            className={inputCls(errors.company)}
            placeholder={t("quote.company_ph")}
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label={t("quote.contact")} error={errors.contact?.message} required>
            <input
              type="text"
              autoComplete="name"
              {...register("contact")}
              className={inputCls(errors.contact)}
              placeholder={t("quote.contact_ph")}
            />
          </Field>
          <Field label={t("quote.phone")} error={errors.phone?.message} required>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              {...register("phone")}
              className={inputCls(errors.phone)}
              placeholder="+91 8XXXX XXXXX"
            />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label={`${t("quote.email")} (${t("quote.optional")})`} error={errors.email?.message}>
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              className={inputCls(errors.email)}
              placeholder="name@shop.in"
            />
          </Field>
          <Field label={`${t("quote.gst")} (${t("quote.optional")})`} error={errors.gst?.message}>
            <input
              type="text"
              {...register("gst")}
              className={inputCls(errors.gst)}
              placeholder="22AAAAA0000A1Z5"
            />
          </Field>
        </div>
      </fieldset>

      {/* Order details */}
      <fieldset className="space-y-4 pt-2">
        <legend className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--gold)] mb-1">
          {t("quote.section_order")}
        </legend>
        <Field label={t("quote.design")} error={errors.design?.message}>
          <input
            type="text"
            list="devrani-designs"
            {...register("design")}
            className={inputCls(errors.design)}
            placeholder={t("quote.design_ph")}
          />
          <datalist id="devrani-designs">
            {products.map((p) => (
              <option key={p.slug} value={p.title} />
            ))}
          </datalist>
        </Field>
        <Field label={t("quote.quantity")} error={errors.quantity?.message} required hint={t("quote.quantity_hint")}>
          <div className="flex items-center border-2 border-[var(--ink)]/15 rounded-full overflow-hidden w-fit">
            <button
              type="button"
              onClick={() => {}}
              aria-label="decrease"
              tabIndex={-1}
              className="px-4 py-2 text-lg font-light pointer-events-none opacity-40"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              step={1}
              {...register("quantity")}
              className="w-20 text-center bg-transparent py-2 outline-none font-display text-lg border-0 focus:ring-0"
            />
            <button
              type="button"
              onClick={() => {}}
              aria-label="increase"
              tabIndex={-1}
              className="px-4 py-2 text-lg font-light pointer-events-none opacity-40"
            >
              +
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            {t("quote.quantity_summary", { n: qty || 1 })}
          </p>
        </Field>
      </fieldset>

      {/* Delivery address */}
      <fieldset className="space-y-4 pt-2">
        <legend className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--gold)] mb-1">
          {t("quote.section_delivery")}
        </legend>
        <Field label={t("quote.address")} error={errors.address?.message} required>
          <textarea
            rows={3}
            {...register("address")}
            className={inputCls(errors.address) + " resize-y min-h-[80px]"}
            placeholder={t("quote.address_ph")}
          />
        </Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label={t("quote.city")} error={errors.city?.message} required>
            <input type="text" {...register("city")} className={inputCls(errors.city)} placeholder={t("quote.city")} />
          </Field>
          <Field label={t("quote.state")} error={errors.state?.message} required>
            <input type="text" {...register("state")} className={inputCls(errors.state)} placeholder={t("quote.state")} />
          </Field>
          <Field label={t("quote.pincode")} error={errors.pincode?.message} required>
            <input
              type="text"
              inputMode="numeric"
              {...register("pincode")}
              className={inputCls(errors.pincode)}
              placeholder="395002"
            />
          </Field>
        </div>
        <Field label={`${t("quote.notes")} (${t("quote.optional")})`} error={errors.notes?.message}>
          <textarea
            rows={2}
            {...register("notes")}
            className={inputCls(errors.notes) + " resize-y min-h-[60px]"}
            placeholder={t("quote.notes_ph")}
          />
        </Field>
      </fieldset>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--navy)] text-[var(--ivory)] px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-colors disabled:opacity-60 hover-scale"
        >
          <WhatsAppIcon size={16} /> {t("quote.submit")}
        </button>
        <p className="text-[11px] text-muted-foreground text-center sm:text-left max-w-xs">
          {t("quote.submit_hint")}
        </p>
      </div>
    </form>
  );
}

function inputCls(error?: { message?: string } | string) {
  const hasError = Boolean(error);
  return [
    "w-full rounded-xl bg-[var(--ivory)] border px-4 py-3 text-sm text-[var(--ink)] outline-none transition-colors",
    "placeholder:text-muted-foreground/70",
    hasError
      ? "border-[var(--rose)] focus:border-[var(--rose)]"
      : "border-[var(--gold)]/30 focus:border-[var(--gold)]",
  ].join(" ");
}

function Field({
  label,
  children,
  error,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.18em] font-bold text-[var(--ink)]/80 mb-1.5">
        {label} {required && <span className="text-[var(--rose)]">*</span>}
      </span>
      {children}
      {hint && !error && <span className="block text-[11px] text-muted-foreground mt-1">{hint}</span>}
      {error && <span className="block text-[11px] text-[var(--rose)] mt-1">{error}</span>}
    </label>
  );
}
