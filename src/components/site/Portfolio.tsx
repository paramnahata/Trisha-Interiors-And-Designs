import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { WORK, type Category } from "./images";
import { MaskImage, Reveal } from "./Reveal";

const FILTERS: ("All" | Category)[] = ["All", "Residential", "Living Spaces", "Kitchens & Storage", "Commercial"];

export function Portfolio() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const items = filter === "All" ? WORK : WORK.filter((w) => w.category === filter);

  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const touchX = useRef(0);
  const current = index !== null ? items[index] : null;

  return (
    <section id="work" className="bg-walnut py-28 text-ivory lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="display mt-5 max-w-xl text-5xl lg:text-7xl">
              Rooms, <em className="text-gold">composed</em> with care.
            </h2>
          </Reveal>
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-x-6 gap-y-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`nav-link text-[0.68rem] uppercase tracking-[0.22em] transition-colors ${
                  filter === f ? "text-gold" : "text-ivory/60 hover:text-ivory"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            <AnimatePresence mode="popLayout">
              {items.map((w, i) => (
                <motion.li
                  layout
                  key={w.src}
                  initial={reduce ? false : { opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                  transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={filter === "All" ? w.shape : "md:col-span-6 aspect-[4/3]"}
                >
                  <button
                    onClick={(e) => {
                      lastFocus.current = e.currentTarget;
                      setIndex(i);
                    }}
                    className="group relative block h-full w-full overflow-hidden text-left"
                    aria-label={`View ${w.caption} larger`}
                  >
                    <MaskImage
                      src={w.src}
                      alt={w.alt}
                      className="h-full w-full"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-walnut/80 to-transparent p-5 pt-16">
                      <span className="display text-xl">{w.caption}</span>
                      <span className="eyebrow translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                        View
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${current.caption} — image ${(index ?? 0) + 1} of ${items.length}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-walnut/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? 0)}
            onTouchEnd={(e) => {
              const d = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
              if (Math.abs(d) > 50) step(d < 0 ? 1 : -1);
            }}
          >
            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="flex max-h-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={current.src} alt={current.alt} className="max-h-[80vh] max-w-full object-contain" />
              <figcaption className="mt-4 text-center text-sm text-ivory/80">
                {current.caption} · {(index ?? 0) + 1} / {items.length}
              </figcaption>
            </motion.figure>
            <button ref={closeRef} onClick={close} aria-label="Close" className="absolute top-5 right-5 p-3 text-ivory">
              <X size={28} />
            </button>
            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-ivory md:left-6"
                >
                  <ChevronLeft size={34} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-ivory md:right-6"
                >
                  <ChevronRight size={34} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
