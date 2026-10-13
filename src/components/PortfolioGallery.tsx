"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SpotCard } from "./ui";

type Item = { title: string; src: string };

/** Three project cards that open into a full-screen lightbox (click, arrow keys, swipe-free; Esc closes). */
export default function PortfolioGallery({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", key);
      window.__lenis?.start();
    };
  }, [open, go]);

  return (
    <>
      <ul className="grid gap-8 md:grid-cols-3">
        {items.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.12}>
            <button onClick={() => setOpen(i)} aria-label={`Open ${p.title}`} className="block w-full text-left">
              <SpotCard className="glass group overflow-hidden rounded-3xl" tilt={7}>
                <motion.div layoutId={`pf-${i}`} data-cursor="view" className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.src} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/85 via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                  </span>
                  <span className="font-display absolute bottom-3 left-5 text-5xl font-bold text-white/25">{String(i + 1).padStart(2, "0")}</span>
                </motion.div>
                <h3 className="font-display p-6 text-xl font-semibold transition-colors group-hover:text-[var(--orange)]">{p.title}</h3>
              </SpotCard>
            </button>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div role="dialog" aria-modal="true" aria-label={items[open].title} className="fixed inset-0 z-[250] grid place-items-center bg-black/85 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div key={open} layoutId={`pf-${open}`} className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
              <Image src={items[open].src} alt={items[open].title} fill sizes="90vw" className="object-contain" priority />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display absolute bottom-6 left-1/2 -translate-x-1/2 text-lg text-white">{items[open].title} · {open + 1}/{items.length}</motion.p>
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white hover:text-black">×</button>
            {[-1, 1].map((d) => (
              <button key={d} onClick={(e) => { e.stopPropagation(); go(d); }} aria-label={d < 0 ? "Previous" : "Next"} className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-black ${d < 0 ? "left-4" : "right-4"}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={d < 0 ? "rotate-180" : ""}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
