"use client";
import { motion } from "framer-motion";
import { Reveal, SpotCard, SplitText } from "./ui";
import { Quote } from "./Icons";

/** Mission + Vision: two oversized statement cards that slide in from opposite sides. */
export function MissionCards({ mission, vision }: { mission: string; vision: string }) {
  const cards = [
    { title: "Mission Statement", text: mission, color: "#12b862", from: -60 },
    { title: "Vision", text: vision, color: "#f59a0c", from: 60 },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {cards.map((c, i) => (
        <motion.div key={c.title} initial={{ opacity: 0, x: c.from, rotate: c.from > 0 ? 1.5 : -1.5 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <SpotCard className="glass relative h-full overflow-hidden rounded-3xl p-8 md:p-10">
            <Quote className="absolute -right-3 -top-3 h-32 w-32 opacity-[0.07]" />
            <span className="absolute inset-y-8 left-0 w-1 rounded-r" style={{ background: c.color }} />
            <div style={{ color: c.color }} className="font-display text-xs font-semibold uppercase tracking-[0.35em]">{c.title}</div>
            <p className="font-display relative mt-5 text-2xl font-light leading-snug md:text-3xl">“{c.text}”</p>
          </SpotCard>
        </motion.div>
      ))}
    </div>
  );
}

/** About Company: sticky heading on the left, text on the right; the lead sentence is set larger. */
export function CompanyStory({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mt-28 grid gap-10 lg:grid-cols-[320px_1fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SplitText text="About Company" className="font-display text-4xl font-light md:text-5xl" />
        <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="mt-5 block h-[3px] w-24 origin-left bg-gradient-to-r from-[var(--green)] to-[var(--orange)]" />
      </div>
      <div className="space-y-6">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className={i === 0 ? "text-xl font-medium leading-relaxed md:text-2xl" : "text-lg leading-relaxed text-ink/70"}>{p}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** Why choose us?: numbered cards whose check-marks draw themselves as they enter. */
export function WhyList({ items }: { items: string[] }) {
  return (
    <div className="mt-28">
      <SplitText text="Why choose us?" accent={["us?"]} className="font-display text-4xl font-light md:text-6xl" />
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {items.map((w, i) => (
          <motion.li key={w} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}>
            <div className="glass group flex h-full items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--green)]/50 hover:bg-ink/[0.05]">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--green)]/15 text-[var(--green)] transition-colors group-hover:bg-[var(--green)] group-hover:text-black">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <motion.path d="m5 12.5 4.5 4.5L19 7" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + (i % 2) * 0.1 }} />
                </svg>
              </span>
              <span className="pt-1.5 text-[17px] leading-snug">{w}</span>
              <span className="font-display ml-auto text-sm font-bold text-ink/20 transition-colors group-hover:text-[var(--orange)]">{String(i + 1).padStart(2, "0")}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
