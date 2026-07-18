import { useEffect, useState } from "react";
import { CatalogueDownloadDialog, isCatalogueUnlocked, UNLOCK_EVENT } from "./catalogue-download";

const PREVIEW_COUNT = 3;

export function ProductGallery({
  images,
  alt,
  productTitle,
  productImage,
}: {
  images: string[];
  alt: string;
  productTitle: string;
  productImage: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    setUnlocked(isCatalogueUnlocked());
    const onUnlock = () => setUnlocked(true);
    window.addEventListener(UNLOCK_EVENT, onUnlock);
    window.addEventListener("storage", onUnlock);
    return () => {
      window.removeEventListener(UNLOCK_EVENT, onUnlock);
      window.removeEventListener("storage", onUnlock);
    };
  }, []);

  const visible = unlocked ? images : images.slice(0, PREVIEW_COUNT);
  const lockedCount = Math.max(0, images.length - visible.length);
  const safeActive = Math.min(active, visible.length - 1);
  const src = visible[safeActive] ?? images[0];

  return (
    <div className="animate-fade-in">
      <div className="relative">
        <div className="absolute -inset-4 sm:-inset-6 bg-[var(--rose)]/25 rounded-[2rem] -z-10 rotate-1" />
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="block w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-2xl shadow-[var(--rose)]/40 bg-[var(--ivory)]"
        >
          <img
            src={src}
            alt={`${alt} — page ${safeActive + 1}`}
            className="w-full h-full object-contain transition-opacity duration-500"
          />
        </button>
        <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
          Page {safeActive + 1} of {images.length} · Tap to zoom
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 mt-4">
        {visible.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View page ${i + 1}`}
            className={`aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all bg-[var(--ivory)] ${
              i === safeActive
                ? "border-[var(--gold)] shadow-md scale-[1.02]"
                : "border-transparent opacity-75 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`${alt} — thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}

        {lockedCount > 0 && (
          <button
            type="button"
            onClick={() => setShowUnlock(true)}
            aria-label={`Unlock ${lockedCount} more images`}
            className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-dashed border-[var(--gold)]/60 bg-[var(--sage)]/15 grid place-items-center text-center px-1 hover:bg-[var(--sage)]/25 hover:border-[var(--gold)] transition-all"
          >
            <div className="flex flex-col items-center gap-1">
              <LockIcon />
              <span className="text-[10px] uppercase tracking-widest text-[var(--ink)] leading-tight">
                +{lockedCount} more
              </span>
            </div>
          </button>
        )}
      </div>

      {lockedCount > 0 && (
        <div className="mt-5 rounded-2xl border border-[var(--gold)]/40 bg-[var(--ivory)] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 animate-fade-in">
          <div className="h-10 w-10 rounded-full bg-[var(--gold)]/20 grid place-items-center text-[var(--gold)] shrink-0">
            <LockIcon />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display text-lg leading-tight">See all {images.length} design pages</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Verify your WhatsApp number with a one-time code to unlock the full catalogue.
            </p>
          </div>
          <button
            onClick={() => setShowUnlock(true)}
            className="rounded-full bg-[var(--ink)] text-[var(--ivory)] text-xs uppercase tracking-widest px-5 py-3 hover:bg-black transition-colors shrink-0"
          >
            See More
          </button>
        </div>
      )}

      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm grid place-items-center p-4 animate-fade-in"
          onClick={() => setZoom(false)}
        >
          <img src={src} alt={alt} className="max-h-[92vh] max-w-full rounded-lg object-contain" />
          <button
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 text-[var(--ink)] grid place-items-center"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs tracking-widest uppercase">
            Page {safeActive + 1} / {images.length}
          </div>
        </div>
      )}

      {showUnlock && (
        <CatalogueDownloadDialog
          mode="unlock"
          productTitle={productTitle}
          productImage={productImage}
          onClose={() => setShowUnlock(false)}
          onVerified={() => setUnlocked(true)}
        />
      )}
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
