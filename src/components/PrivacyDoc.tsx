"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Block = { tag: string; text: string };
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Policy text with a sticky contents list that highlights the section being read. */
export default function PrivacyDoc({ blocks }: { blocks: Block[] }) {
  const heads = blocks.filter((b) => b.tag.startsWith("h")).map((b) => ({ text: b.text, id: slug(b.text) }));
  const [active, setActive] = useState(heads[0]?.id ?? "");

  useEffect(() => {
    const els = heads.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(vis.target.id);
    }, { rootMargin: "-20% 0px -65% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[260px_1fr]">
      <nav aria-label="Contents" className="lg:sticky lg:top-32 lg:self-start">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">Privacy Policy</p>
        <ul className="relative space-y-1 border-l border-ink/15">
          {heads.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`} className={`relative block py-1.5 pl-4 text-sm transition-colors ${active === h.id ? "font-semibold text-ink" : "text-ink/55 hover:text-ink"}`}>
                {active === h.id && <motion.span layoutId="toc-dot" className="absolute -left-px top-1 h-[calc(100%-8px)] w-[3px] rounded bg-[var(--orange)]" />}
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <article className="space-y-5 leading-relaxed text-ink/75">
        {blocks.map((b, i) =>
          b.tag.startsWith("h") ? (
            <motion.h2 id={slug(b.text)} key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-display pt-8 text-2xl font-semibold text-ink first:pt-0">
              {b.text}
            </motion.h2>
          ) : b.text.startsWith("•") ? (
            <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-4% 0px" }} className="flex gap-3 pl-1">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--orange)]" aria-hidden />
              <span>{b.text.replace(/^•\s*/, "")}</span>
            </motion.p>
          ) : (
            <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-4% 0px" }}>
              {b.text}
            </motion.p>
          ),
        )}
      </article>
    </div>
  );
}
