"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CATEGORY_META, CATEGORY_ORDER, ABOUT, HERO_SLIDES, SERVICE_ICONS, TEAM, type CategoryKey } from "@/lib/site";
import { sponsors, testimonials } from "@/lib/content";
import { Button, Counter, Marquee, Reveal, SectionTitle, SpotCard } from "./ui";
import { Arrow, Quote } from "./Icons";
import TeamCarousel from "./TeamCarousel";
import AboutVisual from "./AboutVisual";

/* ───────────── Stats strip ───────────── */
export function Stats({ stats }: { stats: { years: number; clients: number; products: number } }) {
  const items = [
    { n: 2000, s: "", l: "Serving business industries since", plain: true },
    { n: 20, s: "+", l: "Years of working experience", plain: false },
    { n: stats.clients, s: "", l: "Clients listed on our product pages", plain: false },
    { n: stats.products, s: "", l: "Products", plain: false },
  ];
  return (
    <section className="relative border-y border-ink/10 bg-ink/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-14 md:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.l} delay={i * 0.1} className="text-center">
            <div className="font-display text-5xl font-light md:text-7xl"><Counter to={it.n} suffix={it.s} plain={it.plain} className="text-grad" /></div>
            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-ink/50">{it.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────── About ───────────── */
export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <motion.div style={{ y: y1 }} className="font-display pointer-events-none absolute -right-10 top-10 select-none text-[22vw] font-bold leading-none text-outline opacity-30" aria-hidden>2000</motion.div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <SectionTitle title="About Edusoft" accent={["Edusoft"]} />
          <Reveal delay={0.2}><p className="mt-8 text-lg leading-relaxed text-ink/70">{ABOUT.blurb}</p></Reveal>
          <Reveal delay={0.3} className="mt-10"><Button href="/about/vision-mission">Details</Button></Reveal>
        </div>
        <AboutVisual />
      </div>
    </section>
  );
}

/* ───────────── Services trio ───────────── */
export function ServicesTrio() {
  const list = [
    { slug: "business-consultancy", title: "Business Consultancy", text: "Our entire solutions are focused on providing a better solution and even better future for your business..." },
    { slug: "web-design-ndevelopment", title: "Web Designing & Development", text: "Web Designing & Development is a job whose main purpose is to provide your business..." },
    { slug: "mobile-app-development", title: "Mobile App Development", text: "Your requirement is the foremost priority when developing a mobile application ..." },
  ];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle title="Let’s make a better Business" accent={["Business"]} />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {list.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.12}>
              <Link href={`/services/${s.slug}`} className="block h-full">
                <SpotCard className="glass group flex h-full flex-col rounded-3xl p-8">
                  <div className="mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-ink/[0.06] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Image src={SERVICE_ICONS[s.slug]} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 flex-1 text-ink/60">{s.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--orange)]">Details <Arrow className="transition-transform group-hover:translate-x-2" /></span>
                </SpotCard>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── Pinned horizontal solutions ───────────── */
export function SolutionsScroller({ byCategory }: { byCategory: Record<CategoryKey, { slug: string; name: string }[]> }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const dist = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root.current, pin: true, scrub: 0.6, start: "top top", end: () => `+=${dist()}`, invalidateOnRefresh: true } });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); };
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={root} className="relative overflow-hidden lg:h-screen">
      <div ref={track} className="flex flex-col gap-10 px-6 py-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-16 lg:px-[8vw] lg:py-0">
        <div className="lg:w-[34vw] lg:shrink-0">
          <SectionTitle title="Solutions" accent={["Solutions"]} />
          
        </div>
        {CATEGORY_ORDER.map((c, i) => {
          const m = CATEGORY_META[c];
          const items = byCategory[c];
          return (
            <Reveal key={c} className="lg:w-[42vw] lg:shrink-0">
              <div className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-10" style={{ ["--accent" as string]: m.color } as React.CSSProperties}>
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-3xl" style={{ background: m.color }} />
                <div className="font-display text-[8rem] font-bold leading-none opacity-15" style={{ color: m.color }}>0{i + 1}</div>
                <h3 className="font-display -mt-10 text-4xl font-semibold md:text-5xl">{m.title}</h3>
                <p className="mt-3 max-w-md text-ink/65">{HERO_SLIDES[c].text}</p>
                <ul className="relative mt-7 flex flex-wrap gap-2">
                  {items.slice(0, 6).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/solutions/${c}/${p.slug}`} className="inline-block rounded-full border border-ink/15 px-4 py-1.5 text-xs transition-all hover:-translate-y-0.5 hover:text-black" style={{ ["--c" as string]: m.color }} onMouseEnter={(e) => (e.currentTarget.style.background = m.color)} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>{p.name}</Link>
                    </li>
                  ))}
                  {items.length > 6 && <li className="px-2 py-1.5 text-xs text-ink/50">+{items.length - 6} more</li>}
                </ul>
                <div className="relative mt-8"><Button href={`/solutions/${c}`}>{items.length} products</Button></div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────── Testimonials ───────────── */
export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % testimonials.length), 8000);
    return () => clearTimeout(t);
  }, [i]);
  const t = testimonials[i];
  return (
    <section className="relative overflow-hidden py-32">
      <div className="font-display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[16vw] font-bold leading-none text-outline opacity-[0.12]" aria-hidden>TESTIMONIAL</div>
      <div className="relative mx-auto max-w-5xl px-6">
        <SectionTitle title="Client’s Testimonials & Achievements" accent={["Testimonials"]} />
        <div className="mt-14">
          <div className="mb-8 flex items-center gap-4"><span className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-white" /><i className="h-3 w-3 rounded-full bg-white" /></span><span className="h-px flex-1 bg-ink/25" /><Quote className="text-[var(--orange)]" /></div>
          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -30, filter: "blur(8px)" }} transition={{ duration: 0.6 }}>
                <p className="font-display text-xl font-light leading-relaxed md:text-3xl">{t.quote}</p>
                <div className="mt-8 flex items-center gap-4">
                  {t.photo && <Image src={t.photo} alt={t.name} width={72} height={72} className="h-[72px] w-[72px] rounded-full object-cover ring-2 ring-[var(--orange)]" />}
                  <div><div className="font-semibold">{t.name}</div><div className="text-sm text-ink/60">{t.company}</div></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center gap-3">
            {testimonials.map((x, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Show testimonial ${k + 1}`} className={`relative overflow-hidden rounded-full transition-all ${k === i ? "h-14 w-14 ring-2 ring-[var(--orange)]" : "h-11 w-11 opacity-50 grayscale hover:opacity-100"}`}>
                {x.photo && <Image src={x.photo} alt="" fill sizes="56px" className="object-cover" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Client logos ───────────── */
export function ClientLogos() {
  const half = Math.ceil(sponsors.length / 2);
  const row = (list: string[]) => list.map((s) => (
    <div key={s} className="mx-3 grid h-24 w-44 shrink-0 place-items-center rounded-2xl bg-white p-3 shadow-lg transition-transform duration-300 hover:scale-110 md:h-28 md:w-52">
      <Image src={s} alt="Client logo" width={180} height={90} className="max-h-full w-auto object-contain" />
    </div>
  ));
  return (
    <section className="py-10">
            <div className="space-y-6">
        <Marquee duration={60}>{row(sponsors.slice(0, half))}</Marquee>
        <Marquee duration={70} reverse>{row(sponsors.slice(half))}</Marquee>
      </div>
    </section>
  );
}

/* ───────────── Top management ───────────── */
export function TopManagement() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionTitle title="Top Management" />
            <Reveal delay={0.15}><p className="mt-6 max-w-2xl text-lg text-ink/65">Highly qualified and experienced Programmers and System Analysts<br />Accounting and Finance Professionals serving our clients as Functional Consultants</p></Reveal>
          </div>
          <Button href="/about/management-team">Details</Button>
        </div>
        <div className="-mx-3 mt-14"><TeamCarousel team={TEAM} /></div>
      </div>
    </section>
  );
}
