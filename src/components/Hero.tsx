"use client";
import { isReduced } from "@/lib/motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CATEGORY_META, CATEGORY_ORDER, HERO_SLIDES } from "@/lib/site";
import { Button } from "./ui";
import { Chevron } from "./Icons";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const INTERVAL = 7000;
const E = [0.22, 1, 0.36, 1] as const;

/** Home hero: big copy on the left, animated orb on the right, the three options as a clean strip along the bottom. */
export default function Hero() {
  const [i, setI] = useState(0);
  const [canvas, setCanvas] = useState(false);
  const [wide, setWide] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const cat = CATEGORY_ORDER[i];
  const meta = CATEGORY_META[cat];
  const slide = HERO_SLIDES[cat];

  useEffect(() => {
    const t = setTimeout(() => {
      const reduce = isReduced();
      setWide(window.innerWidth >= 1024);
      setCanvas(!reduce && window.innerWidth >= 768);
    }, 1600);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % CATEGORY_ORDER.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i]);

  const orb = wide ? { x: 3.2, y: 0.9, scale: 0.8 } : { x: 0, y: 0.6, scale: 0.7 };

  return (
    <section ref={ref} className="relative isolate min-h-screen overflow-hidden" style={{ ["--accent" as string]: meta.color, ["--accent-rgb" as string]: meta.glow } as React.CSSProperties}>
      {/* the live site's banner photo, blurred so its baked-in text doesn't ghost through */}
      <AnimatePresence>
        <motion.div key={cat} className="absolute inset-0 -z-30" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1.08 }} exit={{ opacity: 0 }} transition={{ duration: 1.6, ease: "easeOut" }}>
          <Image src={meta.banner} alt="" fill priority sizes="100vw" className="object-cover blur-[22px]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-20 bg-bg/70" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-bg/90 via-transparent to-bg" />
      <div className="aurora -z-20"><i /><i /><i /></div>
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
      <div className="absolute inset-0 -z-10">{canvas && <Hero3D color={meta.color} x={orb.x} y={orb.y} scale={orb.scale} />}</div>
      {!canvas && <div className="absolute right-[18%] top-1/2 -z-10 hidden h-[360px] w-[360px] -translate-y-1/2 rounded-full opacity-70 blur-2xl md:block" style={{ background: `radial-gradient(circle, rgba(${meta.glow},0.55), transparent 65%)` }} />}

      <motion.div style={{ y: lift, opacity: fade }} className="mx-auto flex min-h-screen max-w-[1500px] flex-col px-6 pb-40 pt-32 lg:px-10">
        <div className="flex flex-1 items-center py-8">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={cat} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.8, ease: E }}>
                <h1 className="font-display text-[clamp(2.4rem,6vw,5.4rem)] font-bold leading-[0.98] tracking-tight">{slide.title}</h1>
                <div className="my-6 h-[3px] w-24 bg-[var(--accent)]" />
                <p className="max-w-xl text-lg font-light leading-relaxed text-ink/85 md:text-2xl">{slide.text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={`/solutions/${cat}`}>{meta.title}</Button>
              <Button href="/free-offer" variant="ghost">Free Offer</Button>
            </div>
          </div>
        </div>

        {/* the three options */}
        <div className="grid gap-4 md:grid-cols-3">
          {slide.cards.map((c, k) => (
            <motion.div key={cat + c.slug} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + k * 0.12, duration: 0.8, ease: E }}>
              <Link href={`/solutions/${cat}/${c.slug}`} className="group relative block h-full border-t border-ink/25 bg-gradient-to-b from-ink/[0.06] to-transparent px-1 pb-4 pt-5 transition-colors hover:from-ink/[0.12]">
                <span className="absolute -top-px left-0 h-[2px] w-0 bg-[var(--accent)] transition-all duration-700 group-hover:w-full" />
                <div className="flex items-start gap-4">
                  <Image src={`/img/hero/b${slide.n}-${k + 1}.png`} alt="" width={60} height={60} className="h-[60px] w-[60px] shrink-0 rounded-full ring-2 ring-[var(--accent)]/60" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[15px] font-semibold">{c.name}</span>
                      <span className="font-display text-sm text-ink/30">0{k + 1}</span>
                    </div>
                    {c.text && <p className="mt-1.5 text-[13px] leading-snug text-ink/70">{c.text}</p>}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* category switcher */}
      <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-[1500px] items-end justify-between px-6 lg:px-10">
        <div className="flex gap-3 sm:gap-6">
          {CATEGORY_ORDER.map((c, k) => (
            <button key={c} onClick={() => setI(k)} aria-label={CATEGORY_META[c].title} className="group w-16 text-left sm:w-28">
              <span className="relative mb-2 block h-[3px] overflow-hidden rounded bg-ink/20">
                {k === i && <motion.span key={`p${i}`} className="absolute inset-y-0 left-0 bg-[var(--accent)]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: INTERVAL / 1000, ease: "linear" }} />}
                {k < i && <span className="absolute inset-0 bg-ink/50" />}
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-widest transition-colors sm:text-xs ${k === i ? "text-ink" : "text-ink/40 group-hover:text-ink/70"}`}>{CATEGORY_META[c].short}</span>
            </button>
          ))}
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="hidden text-ink/50 sm:block"><Chevron /></motion.div>
      </div>
    </section>
  );
}
