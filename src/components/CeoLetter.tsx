"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote } from "./Icons";

const PULL = "Business is not all about earning profits measured in numbers but also, as importantly, about how those numbers are achieved.";

/** The letter: a sticky portrait card beside the text, the CEO's own key sentence set as a pull-quote after the first paragraph. */
export default function CeoLetter({ name, role, photo, paragraphs }: { name: string; role: string; photo: string; paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div ref={ref} className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[340px_1fr]">
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <motion.div initial={{ opacity: 0, y: 40, rotate: -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[var(--green)] via-transparent to-[var(--orange)] opacity-60 blur-xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border border-ink/15 bg-card">
            <div className="relative aspect-[4/5]">
              <Image src={photo} alt={name} fill priority sizes="340px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/90 via-transparent to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="mb-2 h-[3px] w-12 bg-[var(--orange)]" />
              <h2 className="font-display text-2xl font-semibold">{name}</h2>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--orange)]">{role}</p>
            </div>
          </div>
        </motion.div>
        {/* reading progress for the letter */}
        <div className="mt-8 hidden h-1 overflow-hidden rounded-full bg-ink/10 lg:block" aria-hidden>
          <motion.div style={{ width: line }} className="h-full bg-gradient-to-r from-[var(--green)] to-[var(--orange)]" />
        </div>
      </aside>

      <div className="space-y-8 text-[17px] leading-[1.9] text-ink/75">
        {paragraphs.map((p, i) => (
          <div key={i} className="space-y-8">
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6% 0px" }} transition={{ duration: 0.8 }} className={i === 0 ? "first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.85] first-letter:text-[var(--orange)]" : ""}>
              {p}
            </motion.p>
            {i === 0 && (
              <motion.blockquote initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.9 }} className="relative my-4 overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-[var(--green)]/10 to-[var(--orange)]/10 p-8 md:p-10">
                <Quote className="absolute -left-2 -top-2 h-24 w-24 text-[var(--orange)] opacity-20" />
                <p className="font-display relative text-2xl font-light leading-snug text-ink md:text-3xl">{PULL}</p>
              </motion.blockquote>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
