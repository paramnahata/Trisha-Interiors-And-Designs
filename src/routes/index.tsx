import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowDown, Instagram } from "lucide-react";
import { useRef } from "react";
import { Header, NAV, Wordmark } from "@/components/site/Header";
import { Portfolio } from "@/components/site/Portfolio";
import { Contact } from "@/components/site/Contact";
import { MaskImage, Reveal, ScrollLine, ScrollBackdrop, ease } from "@/components/site/Reveal";
import { IMG } from "@/components/site/images";
import { BUSINESS, serviceMessage, waLink } from "@/lib/business";

const TITLE = "Trisha Interiors And Designs | Interior Design in Chhatrapati Sambhajinagar";
const DESC =
  "Explore interior design inspiration and connect with Trisha Interiors And Designs in Chhatrapati Sambhajinagar, Maharashtra, to discuss your residential or commercial interior project.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  name: BUSINESS.name,
  telephone: BUSINESS.phoneTel,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kamgar Chowk, Mayanagar Colony, Cidco",
    addressLocality: "Chhatrapati Sambhajinagar",
    addressRegion: "Maharashtra",
    postalCode: "431007",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 09:00-22:00",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

const SERVICES = [
  { name: "Residential Interiors", desc: "Complete homes planned around routine, light and storage.", img: IMG.hallwayTv },
  { name: "Living Room Design", desc: "Media walls, seating and lighting composed as one gesture.", img: IMG.tvWall },
  { name: "Bedroom Interiors", desc: "Calm, tactile retreats with considered wardrobes.", img: IMG.bedroom },
  { name: "Modular Kitchens and Storage", desc: "Practical joinery that keeps every surface quiet.", img: IMG.vanity },
  { name: "Commercial Interiors", desc: "Kiosks and retail spaces designed for flow and visibility.", img: IMG.kiosk },
  { name: "Space Planning and Design Consultation", desc: "Layouts, 3D visualisation and direction before you build.", img: IMG.kioskRender },
];

const PROCESS = [
  ["Discover", "Understand the client's requirements and preferences."],
  ["Plan", "Explore layout, design direction, materials, and practical considerations."],
  ["Refine", "Review and refine the proposed design direction."],
  ["Realise", "Coordinate the agreed execution process according to the confirmed scope."],
];

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const lines = ["Spaces that feel", "as extraordinary", "as they look."];
  const init = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: d, ease } };

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-walnut text-ivory">
      <motion.div
        className="absolute inset-0"
        style={{ y }}
        initial={reduce ? false : { clipPath: "inset(8% 8% 8% 8%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.4, ease }}
      >
        <motion.img
          src={IMG.tvWall}
          alt="Warm-lit living room with marble media wall and illuminated shelving"
          fetchPriority="high"
          className="h-full w-full object-cover object-[50%_40%]"
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease }}
        />
        <div className="scrim absolute inset-0" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
        <motion.p className="eyebrow" {...init(0.3)}>
          Interior design studio · Chhatrapati Sambhajinagar
        </motion.p>
        <h1 className="display mt-6 text-[3.1rem] sm:text-7xl lg:text-[6.5rem]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${i === 1 ? "italic text-gold" : ""}`}
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p className="max-w-md text-base leading-relaxed text-ivory/85" {...init(0.9)}>
            Thoughtfully considered interiors, where refined aesthetics meet everyday living.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" {...init(1.05)}>
            <a href="#contact" className="btn-lux border-gold bg-gold text-walnut hover:bg-ivory hover:border-ivory">
              Discuss your project <ArrowRight size={14} />
            </a>
            <a href="#work" className="btn-lux text-ivory hover:bg-ivory hover:text-walnut">
              Explore our work <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>
      <a href="#about" aria-label="Scroll to introduction" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ivory/70 md:block">
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}

function Intro() {
  return (
    <section id="about" className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <MaskImage src={IMG.livingSofa} alt="Living room with grey sectional sofa and gold accents" className="aspect-[4/5] lg:col-span-5" />
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal x={20}>
            <p className="eyebrow">The studio</p>
            <h2 className="display mt-5 text-5xl lg:text-7xl">
              Designed around the way <em className="text-gold">you live.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="my-10 h-px w-20 bg-gold" />
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Every space has its own character. We approach interior design with a focus on thoughtful planning,
              material harmony, visual balance, and the details that make a space feel personal.
            </p>
            <a href="#work" className="nav-link mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.24em]">
              View the portfolio <ArrowRight size={14} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-t border-border bg-card py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Services</p>
          <h2 className="display mt-5 text-5xl lg:text-6xl">How we can help.</h2>
        </Reveal>
        <ul className="mt-16 border-t border-border">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04} y={24} x={12}>
              <li className="group grid grid-cols-[auto_1fr] items-center gap-6 border-b border-border py-8 md:grid-cols-[3rem_1fr_1fr_9rem_auto] md:gap-10">
                <span className="display text-lg text-gold">0{i + 1}</span>
                <h3 className="display text-3xl md:text-4xl">{s.name}</h3>
                <p className="col-span-2 text-sm text-muted-foreground md:col-span-1">{s.desc}</p>
                <div className="hidden aspect-[4/3] overflow-hidden md:block">
                  <img src={s.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <a
                  href={waLink(serviceMessage(s.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] md:col-span-1"
                  aria-label={`Enquire about ${s.name} on WhatsApp`}
                >
                  <span className="nav-link">Enquire</span> <ArrowRight size={14} />
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow">Process</p>
          <h2 className="display mt-5 max-w-2xl text-5xl lg:text-6xl">A considered journey, step by step.</h2>
        </Reveal>
        <ScrollLine />
        <ol className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1} className="bg-background p-8 lg:p-10">
              <li>
                <span className="display text-6xl text-gold">0{i + 1}</span>
                <h3 className="display mt-8 text-3xl">{t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="border-y border-border bg-card py-20">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <p className="eyebrow">Kind words</p>
        <p className="display mt-5 text-3xl lg:text-4xl">Read what clients say about the studio on Google.</p>
        <a href={BUSINESS.maps} target="_blank" rel="noopener noreferrer" className="btn-lux mt-8 hover:bg-walnut hover:text-ivory">
          View Google reviews <ArrowRight size={14} />
        </a>
      </Reveal>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden text-ivory">
      <ScrollBackdrop src={IMG.hallwayTv} />
      <div className="scrim absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 py-36 lg:px-10 lg:py-48">
        <Reveal className="max-w-2xl">
          <h2 className="display text-5xl lg:text-7xl">Have a space in mind?</h2>
          <p className="mt-6 text-lg text-ivory/85">
            Tell us about your project. Let's explore how thoughtful design can bring your vision to life.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-lux border-gold bg-gold text-walnut hover:bg-ivory hover:border-ivory">
              Start a conversation <ArrowRight size={14} />
            </a>
            <a href={`tel:${BUSINESS.phoneTel}`} className="btn-lux text-ivory hover:bg-ivory hover:text-walnut">
              Call the studio <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-walnut text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3 lg:px-10">
        <div>
          <Wordmark light />
          <p className="mt-6 max-w-xs text-sm text-ivory/70">Interior Design · Space Planning · Turnkey Solutions</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="nav-link w-fit text-ivory/80 hover:text-ivory">{n.label}</a>
          ))}
        </nav>
        <div className="space-y-3 text-sm text-ivory/80">
          <p>{BUSINESS.address}</p>
          <a href={`tel:${BUSINESS.phoneTel}`} className="nav-link block w-fit">{BUSINESS.phoneDisplay}</a>
          <p>{BUSINESS.hours}</p>
          <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="nav-link inline-flex items-center gap-3">
            <Instagram size={16} /> Instagram <ArrowRight size={12} />
          </a>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-6 py-6 text-center text-xs text-ivory/50">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}

function Index() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Portfolio />
        <Process />
        <Trust />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
