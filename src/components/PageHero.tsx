"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "./ui";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-ink/10 bg-ink/[0.03]">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3 text-xs text-ink/60">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {c.href ? <Link href={c.href} className="text-[var(--accent,#f59a0c)] hover:underline">{c.label}</Link> : <span className="text-ink">{c.label}</span>}
            {i < items.length - 1 && <span className="text-ink/30">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Parallax banner with a big letter-spaced title, like the original inner pages. */
export default function PageHero({ title, image = "/img/banner/re-engineering.jpg", subtitle, crumbs, height = "h-[44vh] min-h-[320px]" }: { title: string; image?: string; subtitle?: string; crumbs: Crumb[]; height?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  return (
    <>
      <div ref={ref} className={`relative isolate flex ${height} items-end justify-center overflow-hidden pb-14`}>
        <motion.div className="absolute inset-0 -z-10" style={{ y, scale }}>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-50 grayscale" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/80 via-transparent to-bg" />
        <div className="aurora -z-10"><i /><i /><i /></div>
        <motion.div style={{ opacity: op }} className="px-6 text-center">
          <SplitText as="h1" text={title.toUpperCase()} className="font-display text-3xl font-bold tracking-[0.28em] md:text-6xl" />
          {subtitle && <p className="mx-auto mt-4 max-w-2xl text-sm text-ink/70 md:text-base">{subtitle}</p>}
        </motion.div>
      </div>
      <Breadcrumb items={crumbs} />
    </>
  );
}
