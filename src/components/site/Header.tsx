import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

export const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Our Work" },
  { href: "#contact", label: "Contact" },
];

export function Wordmark({ light }: { light?: boolean }) {
  return (
    <span className={`flex flex-col leading-none ${light ? "text-ivory" : "text-foreground"}`}>
      <span className="display text-2xl tracking-[0.3em]">TRISHA</span>
      <span className="mt-1 text-[0.55rem] tracking-[0.35em] text-gold">INTERIORS & DESIGNS</span>
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      btnRef.current?.focus();
    };
  }, [open]);

  const light = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-background/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#home" aria-label="Trisha Interiors & Designs — home">
          <Wordmark light={light} />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`nav-link text-[0.7rem] uppercase tracking-[0.22em] ${light ? "text-ivory" : "text-foreground"}`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className={`btn-lux hidden lg:inline-flex ${
            light ? "text-ivory hover:bg-ivory hover:text-walnut" : "text-foreground hover:bg-walnut hover:text-ivory"
          }`}
        >
          Book a consultation <ArrowRight size={14} />
        </a>
        <button
          ref={btnRef}
          className={`lg:hidden ${light ? "text-ivory" : "text-foreground"}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 top-20 bottom-0 bg-background px-6 pt-10 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-6">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="display border-b border-border pb-4 text-4xl"
                  autoFocus={i === 0}
                >
                  {n.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-lux mt-4 justify-center text-foreground">
                Book a consultation <ArrowRight size={14} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
