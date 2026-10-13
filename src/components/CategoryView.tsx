"use client";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_META, HERO_SLIDES, ABOUT, type CategoryKey } from "@/lib/site";
import PageHero from "./PageHero";
import AccentSetter from "./AccentSetter";
import { Counter, Reveal, SpotCard } from "./ui";
import { Arrow } from "./Icons";

export type CategoryItem = { slug: string; category: CategoryKey; name: string; banner: string; modules: number; clients: number; summary: string; icons: string[] };

export default function CategoryView({ category, items, totals }: { category: CategoryKey; items: CategoryItem[]; totals: { products: number; modules: number; clients: number } }) {
  const m = CATEGORY_META[category];
  const facts = [
    { n: totals.products, l: "Products" },
    { n: totals.modules, l: "Operational Modules" },
    { n: totals.clients, l: "Valuable Clients" },
  ];
  return (
    <div style={{ ["--accent" as string]: m.color, ["--accent-rgb" as string]: m.glow } as React.CSSProperties}>
      <AccentSetter color={m.color} rgb={m.glow} />
      <PageHero title={m.title} image={m.banner} subtitle={HERO_SLIDES[category].text} crumbs={[{ label: "Home", href: "/" }, { label: m.title }]} />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="max-w-3xl space-y-3 text-lg leading-relaxed text-ink/70">
              <p>{ABOUT.company[0]}</p>
              <p>{ABOUT.company[2]}</p>
            </div>
          </Reveal>
          <ul className="grid grid-cols-3 gap-3">
            {facts.map((f, i) => (
              <Reveal as="li" key={f.l} delay={i * 0.1} y={24}>
                <div className="glass rounded-2xl p-4 text-center">
                  <Counter to={f.n} className="font-display text-3xl font-bold text-[var(--accent)] md:text-4xl" />
                  <p className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-widest text-ink/55">{f.l}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
              <Link href={`/solutions/${p.category}/${p.slug}`} data-cursor="view" className="block h-full">
                <SpotCard className="glass group flex h-full flex-col overflow-hidden rounded-3xl">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={p.banner} alt="" fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/30 to-transparent" />
                    <span className="absolute bottom-3 left-4 rounded-full bg-[var(--accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">{p.modules} modules</span>
                    <span className="font-display absolute right-4 top-3 text-5xl font-bold text-white/15">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-[var(--accent)]">{p.name}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm text-ink/60">{p.summary}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="flex -space-x-2" aria-hidden>
                        {p.icons.map((ic, k) => (
                          <span key={k} className="relative h-8 w-8 overflow-hidden rounded-full bg-white ring-2 ring-card transition-transform duration-300 group-hover:translate-y-[-3px]" style={{ transitionDelay: `${k * 40}ms` }}>
                            <Image src={ic} alt="" fill sizes="32px" className="object-cover" />
                          </span>
                        ))}
                      </span>
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Details <Arrow className="transition-transform group-hover:translate-x-2" /></span>
                    </div>
                  </div>
                </SpotCard>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
