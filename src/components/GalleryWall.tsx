import React from "react";

type Item = { id: string; src: string; alt?: string };

export function GalleryWall({ items }: { items: Item[] }) {
  return (
    <section aria-labelledby="gallery-wall" className="space-y-4">
      <h2 id="gallery-wall" className="sr-only">Gallery</h2>

      <div className="perforation mx-auto w-full rounded-full" aria-hidden />

      <div className="relative gallery-fade">
        <div
          className="rounded-3xl border border-black/10 shadow-[0_1px_0_0_rgba(0,0,0,0.12),0_20px_40px_-20px_rgba(0,0,0,0.25)] bg-[var(--gallery-surface,#fffceb)] p-4"
          role="region"
          aria-label="Horizontal gallery wall"
        >
          <div className="relative">
            {/* Gradient overlays (portable) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--gallery-surface,#fffceb)] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--gallery-surface,#fffceb)] to-transparent z-10" />

            <div
              className="flex gap-6 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory no-scrollbar -mx-1 px-1 py-1"
              onWheel={(e) => {
                const el = e.currentTarget;
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                  el.scrollLeft += e.deltaY;
                  e.preventDefault();
                }
              }}
            >
              {items.map((it) => (
                <figure
                  key={it.id}
                  className="flex-none w-[520px] max-w-[75vw] aspect-[4/3] snap-start overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
                >
                  <img
                    src={it.src}
                    alt={it.alt ?? ""}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-black/60 select-none">
        Drag to explore the full wall.
      </p>
    </section>
  );
}
