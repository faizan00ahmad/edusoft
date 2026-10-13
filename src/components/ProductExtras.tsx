"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/data";
import { CATEGORY_META } from "@/lib/site";
import { Arrow, Download } from "./Icons";
import { Counter, Reveal, SpotCard } from "./ui";

/** Animated fact chips under the product heading (all numbers come straight from the product's own page data). */
export function FactBadges({ product }: { product: Product }) {
  const items = [
    { n: product.modules.length, l: "Operational Modules" },
    ...(product.accordion.length ? [{ n: product.accordion.length, l: "Feature Groups" }] : []),
    ...(product.clients.length ? [{ n: product.clients.length, l: "Valuable Clients" }] : []),
  ];
  return (
    <ul className="mt-8 flex flex-wrap gap-3">
      {items.map((it, i) => (
        <motion.li key={it.l} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 160, damping: 14 }} className="glass flex items-baseline gap-2.5 rounded-full px-5 py-2.5">
          <Counter to={it.n} className="font-display text-2xl font-bold text-[var(--accent)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/60">{it.l}</span>
        </motion.li>
      ))}
    </ul>
  );
}

/** Slim action bar that slides up once the visitor has read past the top of the page. */
export function StickyCTA({ product }: { product: Product }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 90, opacity: 0 }} transition={{ type: "spring", stiffness: 140, damping: 18 }} className="fixed bottom-4 left-4 right-[84px] z-[105] sm:left-1/2 sm:right-auto sm:w-[min(92vw,560px)] sm:-translate-x-1/2">
          <div className="flex items-center gap-3 rounded-full border border-ink/15 bg-card/85 p-2 pl-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
            <span className="hidden min-w-0 flex-1 truncate text-sm font-semibold sm:block">{product.name}</span>
            {product.brochure && (
              <a href={product.brochure} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:inline-flex">
                <Download className="h-4 w-4" /> Download
              </a>
            )}
            <Link href="/contact" className="btn-shine ml-auto inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-[1.03] sm:ml-0">
              Contact Us <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Other products from the same family, so a visitor who liked this one keeps exploring instead of leaving. */
export type Related = { slug: string; category: Product["category"]; name: string; icon: string | null; modules: number };
export function RelatedProducts({ product, others }: { product: Product; others: Related[] }) {
  const meta = CATEGORY_META[product.category];
  if (!others.length) return null;
  return (
    <section className="mt-24" aria-labelledby="related-h">
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 id="related-h" className="font-display text-3xl font-light md:text-5xl">{meta.title}</h2>
        <Link href={`/solutions/${product.category}`} className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">
          All <Arrow className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08} y={30}>
            <Link href={`/solutions/${p.category}/${p.slug}`} data-cursor="view" className="block h-full">
              <SpotCard className="glass group flex h-full items-center gap-4 rounded-2xl p-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-[var(--accent)]/60 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  {p.icon && <Image src={p.icon} alt="" fill sizes="64px" className="object-cover" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-snug">{p.name}</span>
                  <span className="mt-1 block text-xs uppercase tracking-widest text-ink/50">{p.modules} modules</span>
                </span>
                <Arrow className="shrink-0 text-ink/30 transition-all group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
              </SpotCard>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
