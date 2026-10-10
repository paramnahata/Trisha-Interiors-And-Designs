import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, x, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -40px 0px", amount: "some" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function MaskImage({
  src,
  alt,
  className,
  imgClassName = "",
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-3%", "3%"]);
  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className ?? ""}`}
      initial={reduce ? false : { clipPath: "inset(12% 0 12% 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.3, ease }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{ y }}
        initial={reduce ? false : { scale: 1.14 }}
        whileInView={{ scale: reduce ? 1 : 1.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      />
    </motion.div>
  );
}

export function ScrollLine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 35%"] });
  return (
    <div ref={ref} className="mt-12 h-px overflow-hidden bg-border" aria-hidden="true">
      <motion.div className="h-full origin-left bg-gold" style={{ scaleX: reduce ? 1 : scrollYProgress }} />
    </div>
  );
}

export function ScrollBackdrop({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.img src={src} alt="" loading="lazy" className="h-full w-full object-cover" style={{ y, scale: reduce ? 1 : 1.12 }} />
    </div>
  );
}

export { ease };
