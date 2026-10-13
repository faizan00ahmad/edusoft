"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Reveal, SplitText, Wipe } from "./ui";

type Section = { title: string; image: string | null; blocks: { tag: "p" | "h"; text: string }[] };
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Numbered service sections + a sticky sidebar: sibling services, and (when the page has several sections) a live "on this page" index. */
export default function ServiceSections({ sections, nav, current }: { sections: Section[]; nav: { slug: string; name: string }[]; current: string }) {
  const [active, setActive] = useState(slug(sections[0]?.title ?? ""));
  useEffect(() => {
    if (sections.length < 2) return;
    const els = sections.map((s) => document.getElementById(slug(s.title))).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(vis.target.id);
    }, { rootMargin: "-25% 0px -55% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [sections]);

  return (
    <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1fr_300px]">
      <div className="space-y-28">
        {sections.map((sec, n) => (
          <section key={sec.title} id={slug(sec.title)} aria-labelledby={`${slug(sec.title)}-h`}>
            <div className="flex items-start gap-5">
              {sections.length > 1 && <span className="font-display select-none text-6xl font-bold leading-none text-outline md:text-7xl" aria-hidden>{String(n + 1).padStart(2, "0")}</span>}
              <div className="min-w-0 flex-1">
                <SplitText as="h2" text={sec.title} className="font-display text-3xl font-light md:text-5xl" />
                <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 }} className="mt-4 block h-[3px] w-20 origin-left bg-gradient-to-r from-[var(--orange)] to-[var(--green)]" />
              </div>
            </div>
            <div className="mt-8 overflow-hidden text-[17px] leading-[1.85] text-ink/75">
              {sec.image && (
                <Wipe className="float-left mb-4 mr-8 w-full overflow-hidden rounded-2xl shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] sm:w-[340px]">
                  <Image src={sec.image} alt={sec.title} width={680} height={600} className="h-auto w-full transition-transform duration-700 hover:scale-105" />
                </Wipe>
              )}
              {sec.blocks.map((b, i) => (
                <Reveal key={i} y={18}>
                  <p className={`mb-5 ${b.tag === "h" ? "font-semibold text-ink" : ""}`}>{b.text}</p>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
        <Button href="/contact">Contact us</Button>
      </div>

      <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
        {sections.length > 1 && (
          <Reveal className="glass rounded-3xl p-6">
            <h3 className="font-display mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-ink/55">{sections.length} sections</h3>
            <ul className="relative space-y-1 border-l border-ink/15">
              {sections.map((s, n) => (
                <li key={s.title}>
                  <a href={`#${slug(s.title)}`} className={`relative flex gap-3 py-2 pl-4 text-sm transition-colors ${active === slug(s.title) ? "font-semibold text-ink" : "text-ink/55 hover:text-ink"}`}>
                    {active === slug(s.title) && <motion.span layoutId="svc-dot" className="absolute -left-px top-1.5 h-[calc(100%-12px)] w-[3px] rounded bg-[var(--orange)]" />}
                    <span className="font-display text-ink/30">{String(n + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
        <Reveal className="glass rounded-3xl p-6" delay={0.1}>
          <h3 className="font-display mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-ink/55">Our Services</h3>
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.slug}>
                <Link href={`/services/${n.slug}`} aria-current={n.slug === current ? "page" : undefined} className={`block rounded-lg px-3 py-2 text-sm transition-all hover:translate-x-1 hover:bg-ink/10 ${n.slug === current ? "bg-[var(--orange)] font-semibold text-black hover:bg-[var(--orange)]" : "text-ink/80"}`}>
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </aside>
    </div>
  );
}
