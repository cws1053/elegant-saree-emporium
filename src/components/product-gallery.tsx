import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const src = images[active] ?? images[0];

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
            alt={`${alt} — page ${active + 1}`}
            className="w-full h-full object-contain transition-opacity duration-500"
          />
        </button>
        <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
          Page {active + 1} of {images.length} · Tap to zoom
        </p>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View page ${i + 1}`}
              className={`aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all bg-[var(--ivory)] ${
                i === active
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
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-xs tracking-widest uppercase">
              Page {active + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
