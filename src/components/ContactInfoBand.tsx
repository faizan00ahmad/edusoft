"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/site";
import { Reveal } from "./ui";

function CopyBtn({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={async () => {
        try { await navigator.clipboard.writeText(value); } catch { return; }
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
      className="relative ml-2 inline-grid h-7 w-7 place-items-center rounded-full border border-ink/15 align-middle text-ink/55 transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.svg key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#12b862" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12.5 4.5 4.5L19 7" /></motion.svg>
        ) : (
          <motion.svg key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></motion.svg>
        )}
      </AnimatePresence>
      <span role="status" className="sr-only">{done ? "Copied" : ""}</span>
      <AnimatePresence>
        {done && <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: -30 }} exit={{ opacity: 0 }} aria-hidden className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[11px] font-semibold text-bg">Copied</motion.span>}
      </AnimatePresence>
    </button>
  );
}

/** "Contact Information" strip shown under the Contact and Free Offer forms. Every line can be copied with one tap. */
export default function ContactInfoBand() {
  const cols = [
    { icon: "/img/service/04.png", title: "Physical Address", lines: [{ t: SITE.address, copy: SITE.address, label: "address" }] },
    { icon: "/img/service/05.png", title: "Contact us", lines: SITE.phones.map((p) => ({ t: `Phone: ${p}`, href: `tel:${p.replace(/[^+\d]/g, "")}`, copy: p, label: "phone number" })) },
    { icon: "/img/service/06.png", title: "Email / Chat", lines: SITE.emails.map((e) => ({ t: e, href: `mailto:${e}`, copy: e, label: "email address" })) },
  ];
  return (
    <section className="mx-auto mt-20 max-w-7xl border-t border-ink/10 px-6 pb-4 pt-12">
      <div className="grid items-center gap-10 lg:grid-cols-[260px_1fr]">
        <h2 className="font-display border-ink/15 text-5xl font-light leading-tight lg:border-r">Contact Information</h2>
        <div className="grid gap-8 text-center md:grid-cols-3">
          {cols.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -4 }} className="rounded-2xl p-3 transition-colors hover:bg-ink/[0.04]">
                <motion.span className="mx-auto mb-4 block h-14 w-14" whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                  <Image src={c.icon} alt="" width={56} height={56} className="h-14 w-14 object-contain" />
                </motion.span>
                <h3 className="mb-2 font-bold">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l.t} className="text-ink/70">
                    {"href" in l ? <a href={l.href} className="hover:text-[var(--orange)]">{l.t}</a> : l.t}
                    <CopyBtn value={l.copy} label={l.label} />
                  </p>
                ))}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
