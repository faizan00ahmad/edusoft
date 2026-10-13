"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { Arrow } from "./Icons";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade/slide up when scrolled into view. */
export function Reveal({ children, delay = 0, y = 40, className = "", as = "div" }: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "p" }) {
  const M = motion[as] as typeof motion.div;
  return (
    <M initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }} className={className}>
      {children}
    </M>
  );
}

/** Image/box that unrolls with a clip-path wipe as it enters the viewport. */
export function Wipe({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.08 }} whileInView={{ clipPath: "inset(0 0% 0 0)", scale: 1 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/** Word-by-word masked headline reveal. `accentWords` get the gradient treatment. */
export function SplitText({ text, className = "", delay = 0, accent = [] as string[], as: Tag = "h2" }: { text: string; className?: string; delay?: number; accent?: string[]; as?: "h1" | "h2" | "h3" | "p" }) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top" aria-hidden>
          <motion.span
            className={`inline-block ${accent.includes(w.replace(/[^\w&]/g, "")) ? "text-grad" : ""}`}
            initial={{ y: "110%", rotate: 6 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Element drifts toward the cursor. */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  return (
    <motion.div
      ref={ref}
      data-magnetic
      className={`inline-block ${className}`}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Pill button with magnetic pull + shine. Renders a Link, <a> (external) or <button>. */
export function Button({ href, children, variant = "solid", className = "", external, ...rest }: { href?: string; children: React.ReactNode; variant?: "solid" | "ghost" | "green"; className?: string; external?: boolean } & Omit<HTMLMotionProps<"button">, "children">) {
  const base = "btn-shine inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] transition-colors";
  const v = {
    solid: "bg-[var(--accent,#f59a0c)] text-black hover:bg-white",
    green: "bg-[var(--green)] text-black hover:bg-white",
    ghost: "border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-bg",
  }[variant];
  const inner = <>{children}<Arrow className="transition-transform group-hover:translate-x-1" /></>;
  const cls = `group ${base} ${v} ${className}`;
  return (
    <Magnetic>
      {href ? (
        external ? <a href={href} target="_blank" rel="noreferrer" className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>
      ) : (
        <motion.button className={cls} {...rest}>{inner}</motion.button>
      )}
    </Magnetic>
  );
}

/** Counts up when visible. */
export function Counter({ to, suffix = "", className = "", plain = false }: { to: number; suffix?: string; className?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = reduce ? undefined : animate(0, to, { duration: 2.2, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    // always land on the true number (also covers reduced motion and paused animation frames)
    const done = setTimeout(() => setV(to), reduce ? 0 : 2800);
    return () => { c?.stop(); clearTimeout(done); };
  }, [inView, to]);
  return <span ref={ref} className={className}>{plain ? v : v.toLocaleString()}{suffix}</span>;
}

/** Card with 3D tilt + mouse-tracking spotlight border. */
export function SpotCard({ children, className = "", tilt = 6, as = "div", ...rest }: { children: React.ReactNode; className?: string; tilt?: number; as?: "div" | "li" } & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const transform = useTransform([rx, ry], ([a, b]) => `perspective(900px) rotateX(${a}deg) rotateY(${b}deg)`);
  const M = motion[as] as typeof motion.div;
  return (
    <M
      ref={ref}
      {...(rest as object)}
      className={`spot ${className}`}
      style={{ transform }}
      onMouseMove={(e) => {
        const el = ref.current!;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        ry.set((px - 0.5) * tilt * 2);
        rx.set(-(py - 0.5) * tilt * 2);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </M>
  );
}

/** Infinite horizontal marquee. */
export function Marquee({ children, reverse = false, duration = 40, className = "" }: { children: React.ReactNode; reverse?: boolean; duration?: number; className?: string }) {
  return (
    <div className={`marquee-wrap overflow-hidden ${className}`}>
      <div className={`marquee ${reverse ? "rev" : ""}`} style={{ ["--dur" as string]: `${duration}s` }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

export function SectionTitle({ eyebrow, title, accent, className = "" }: { eyebrow?: string; title: string; accent?: string[]; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && (
        <Reveal y={16}>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent,#f59a0c)]">
            <span className="h-px w-10 bg-current" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <SplitText text={title} accent={accent} className="font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl" />
    </div>
  );
}
