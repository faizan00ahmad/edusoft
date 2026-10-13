"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import type { Panel } from "@/lib/data";
import { Chevron, Quote, Search } from "./Icons";
import { Reveal, SpotCard } from "./ui";

export function BarHeading({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="font-display glass rounded-xl border-l-4 border-l-[var(--accent)] px-6 py-4 text-xl font-medium md:text-2xl">{children}</h2>
    </Reveal>
  );
}

/** Coloured testimonial band that sits under the page banner (accent per category). */
export function TestimonialBand() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(120deg, color-mix(in srgb, var(--accent) 88%, #000), var(--accent))" }}>
      <div className="pointer-events-none absolute -right-20 -top-10 opacity-20"><Quote className="h-72 w-72" /></div>
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex gap-1.5">
            <button aria-label="Previous testimonial" onClick={() => setI((i + testimonials.length - 1) % testimonials.length)} className="h-3.5 w-3.5 rounded-full bg-white transition-transform hover:scale-125" />
            <button aria-label="Next testimonial" onClick={() => setI((i + 1) % testimonials.length)} className="h-3.5 w-3.5 rounded-full bg-white transition-transform hover:scale-125" />
          </span>
          <span className="h-px flex-1 bg-white/40" />
          <Quote className="h-8 w-8" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5 }}>
            <p className="max-w-3xl text-base leading-relaxed md:text-lg">{t.quote}</p>
            <div className="mt-6 flex items-center gap-4">
              {t.photo && <Image src={t.photo} alt={t.name} width={72} height={72} className="h-[72px] w-[72px] rounded-full border-2 border-white/80 object-cover" />}
              <div className="text-sm"><div className="font-semibold">{t.name}</div><div className="opacity-80">{t.company}</div></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function ModuleGrid({ modules }: { modules: { label: string; icon: string | null }[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((m, i) => (
        <motion.li key={m.label + i} initial={{ opacity: 0, y: 30, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-5% 0px" }} transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
          <SpotCard className="glass group flex items-center gap-4 rounded-2xl p-3.5 transition-colors hover:bg-ink/[0.07]">
            <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-[var(--accent)]/70 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
              {m.icon && <Image src={m.icon} alt="" width={56} height={56} className="h-full w-full scale-[1.02] object-cover" />}
            </span>
            <span className="text-[15px] font-medium leading-snug">{m.label}</span>
          </SpotCard>
        </motion.li>
      ))}
    </ul>
  );
}

export function Accordion({ panels }: { panels: Panel[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {panels.map((p, i) => {
        const on = open === i;
        return (
          <Reveal key={p.title + i} delay={(i % 4) * 0.04} y={20}>
            <div className={`glass overflow-hidden rounded-xl transition-colors ${on ? "border-[var(--accent)]/60" : ""}`}>
              <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="font-display text-[15px] font-medium text-[var(--accent)] md:text-base">{p.title}</span>
                <Chevron className={`shrink-0 transition-transform duration-300 ${on ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <div className="space-y-3 border-t border-ink/10 px-5 py-5 text-sm leading-relaxed text-ink/75">
                      {p.blocks.length === 0 && <p className="text-ink/40">Details coming soon…</p>}
                      {p.blocks.map((b, j) =>
                        b.type === "list" ? (
                          <ul key={j} className="grid gap-x-8 gap-y-1.5 md:grid-cols-2">
                            {b.items.map((it, k) => (
                              <li key={k} className="flex gap-2.5"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />{it}</li>
                            ))}
                          </ul>
                        ) : b.type === "h" ? (
                          <h4 key={j} className="font-display pt-2 text-base font-semibold text-ink">{b.text}</h4>
                        ) : (
                          <p key={j}>{b.text}</p>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function ClientList({ clients }: { clients: string[] }) {
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const found = useMemo(() => clients.filter((c) => c.toLowerCase().includes(q.toLowerCase())), [clients, q]);
  const LIMIT = 30;
  const list = all || q ? found : found.slice(0, LIMIT);
  if (!clients.length) return <p className="px-2 text-ink/50">Client list coming soon…</p>;
  return (
    <div>
      {clients.length > 12 && (
        <label className="glass mb-6 flex max-w-md items-center gap-3 rounded-full px-5 py-3 focus-within:border-[var(--accent)]">
          <Search className="text-ink/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${clients.length} clients…`} className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40" />
        </label>
      )}
      <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <motion.li key={c + i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -4% 0px" }} transition={{ duration: 0.4, delay: Math.min((i % 12) * 0.025, 0.3) }} className="group flex items-start gap-2 rounded-md px-2 py-1.5 text-[15px] text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink">
            <span className="mt-1 text-[var(--accent)] transition-transform group-hover:translate-x-1">›</span>
            {c}
          </motion.li>
        ))}
      </ul>
      {list.length === 0 && <p className="mt-4 text-ink/50">No client matches “{q}”.</p>}
      {!all && !q && found.length > LIMIT && (
        <button onClick={() => setAll(true)} className="mt-6 rounded-full border border-ink/25 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black">
          Show all {found.length} clients
        </button>
      )}
    </div>
  );
}
