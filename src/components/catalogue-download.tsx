import { useEffect, useState } from "react";

export const UNLOCK_KEY = "devrani:catalogue-unlocked";
export const UNLOCK_EVENT = "devrani:catalogue-unlocked";

export function isCatalogueUnlocked() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(UNLOCK_KEY) === "1";
}

type Props = {
  productTitle: string;
  productImage: string;
  onClose: () => void;
  mode?: "download" | "unlock";
  onVerified?: () => void;
};

type Step = "phone" | "otp" | "done";

export function CatalogueDownloadDialog({ productTitle, productImage, onClose, mode = "download", onVerified }: Props) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sendOtp = async () => {
    setError("");
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSending(true);
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    // Demo: simulate SMS latency
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setStep("otp");
  };

  const verifyOtp = async () => {
    setError("");
    if (otp.trim() !== generatedOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 600));
    // Persist unlock across the site
    try {
      window.localStorage.setItem(UNLOCK_KEY, "1");
      window.dispatchEvent(new Event(UNLOCK_EVENT));
    } catch {}
    if (mode === "download") {
      const a = document.createElement("a");
      a.href = productImage;
      a.download = `${productTitle.replace(/\s+/g, "-").toLowerCase()}-devrani-catalogue.jpg`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
    onVerified?.();
    setSending(false);
    setStep("done");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${productTitle} catalogue`}
        className="w-full max-w-md bg-[var(--ivory)] rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="px-6 pt-6 pb-4 border-b border-[var(--gold)]/25 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">Catalogue</p>
            <h3 className="font-display text-2xl mt-1 leading-tight">{productTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-[var(--rose)]/25 grid place-items-center text-[var(--ink)]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 space-y-5">
          {step === "phone" && (
            <>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enter your WhatsApp mobile number. We'll send a one-time code to verify — then deliver the catalogue to your WhatsApp instantly.
              </p>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--gold)]">Mobile number</span>
                <div className="mt-2 flex items-stretch border border-border rounded-full overflow-hidden focus-within:border-[var(--gold)]">
                  <span className="px-4 grid place-items-center bg-[var(--sage)]/20 text-sm text-[var(--ink)]">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="flex-1 px-3 py-3 bg-transparent outline-none text-base"
                  />
                </div>
              </label>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                onClick={sendOtp}
                disabled={sending}
                className="w-full rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm tracking-wide py-3 hover:bg-black transition-colors disabled:opacity-60"
              >
                {sending ? "Sending OTP…" : "Send OTP"}
              </button>
              <p className="text-[10px] text-center text-muted-foreground">
                By continuing you agree to receive WhatsApp messages from Devrani.
              </p>
            </>
          )}

          {step === "otp" && (
            <>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enter the 6-digit code sent to <b>+91 {phone}</b>.
              </p>
              <div className="rounded-lg bg-[var(--sage)]/20 border border-[var(--sage)]/40 px-3 py-2 text-[11px] text-[var(--ink)]">
                <b>Demo mode:</b> your OTP is <span className="font-mono tracking-widest">{generatedOtp}</span>
              </div>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[var(--gold)]">OTP</span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="••••••"
                  className="mt-2 w-full text-center tracking-[0.5em] font-mono text-xl px-4 py-3 rounded-full border border-border bg-transparent outline-none focus:border-[var(--gold)]"
                />
              </label>
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                onClick={verifyOtp}
                disabled={sending || otp.length < 6}
                className="w-full rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm tracking-wide py-3 hover:bg-black transition-colors disabled:opacity-60"
              >
                {sending ? "Verifying…" : "Verify & Get Catalogue"}
              </button>
              <button
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError("");
                }}
                className="w-full text-xs text-muted-foreground hover:text-[var(--ink)]"
              >
                ← Change number
              </button>
            </>
          )}

          {step === "done" && (
            <div className="text-center space-y-4 py-2">
              <div className="mx-auto h-14 w-14 rounded-full bg-[#25D366]/15 grid place-items-center">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#25D366]" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="font-display text-2xl">{mode === "unlock" ? "Catalogue unlocked!" : "Catalogue sent!"}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mode === "unlock" ? (
                  <>All designs are now unlocked on this device, and the full <b>{productTitle}</b> catalogue is on its way to WhatsApp on <b>+91 {phone}</b>.</>
                ) : (
                  <>We've sent the <b>{productTitle}</b> catalogue to WhatsApp on <b>+91 {phone}</b>. It should also download automatically to this device.</>
                )}
              </p>
              <button
                onClick={onClose}
                className="w-full rounded-full bg-[var(--ink)] text-[var(--ivory)] text-sm tracking-wide py-3 hover:bg-black transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
