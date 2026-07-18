import { useState } from "react";

type View = { label: string; style: React.CSSProperties };

const views: View[] = [
  { label: "Full", style: { transform: "scale(1)", transformOrigin: "center" } },
  { label: "Pallu", style: { transform: "scale(1.9)", transformOrigin: "50% 15%" } },
  { label: "Border", style: { transform: "scale(2.1)", transformOrigin: "50% 90%" } },
  { label: "Weave", style: { transform: "scale(2.6)", transformOrigin: "35% 55%" } },
];

export function ProductGallery({ src, alt }: { src: string; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="animate-fade-in">
      <div className="relative">
        <div className="absolute -inset-4 sm:-inset-6 bg-[var(--rose)]/25 rounded-[2rem] -z-10 rotate-1" />
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="block w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-2xl shadow-[var(--rose)]/40 bg-[var(--ivory)]"
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
            style={views[active].style}
          />
        </button>
        <p className="mt-3 text-center text-xs uppercase tracking-widest text-muted-foreground">
          Tap image to zoom · {views[active].label} view
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
        {views.map((v, i) => (
          <button
            key={v.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${v.label} view`}
            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all bg-[var(--ivory)] ${
              i === active
                ? "border-[var(--gold)] shadow-md scale-[1.02]"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <img
              src={src}
              alt={`${alt} — ${v.label}`}
              className="w-full h-full object-cover"
              style={v.style}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm grid place-items-center p-4 animate-fade-in"
          onClick={() => setZoom(false)}
        >
          <img src={src} alt={alt} className="max-h-[92vh] max-w-full rounded-lg" />
          <button
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 text-[var(--ink)] grid place-items-center"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
