"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/site";
import Logo from "./Logo";

const cats = CATEGORY_ORDER.map((c) => ({ key: c, ...CATEGORY_META[c] }));
// node positions on a 100×100 canvas (retail, healthcare, enterprise, more)
const PTS = [
  { x: 13, y: 15 },
  { x: 87, y: 15 },
  { x: 87, y: 85 },
  { x: 13, y: 85 },
];
const lineFor = (i: number) => `M${PTS[i].x} ${PTS[i].y} Q ${(PTS[i].x + 50) / 2 + (i % 2 ? 9 : -9)} ${(PTS[i].y + 50) / 2 + (i < 2 ? 11 : -11)} 50 50`;

/** About visual: the four solution families wired into a circular EduSoft hub.
 *  Lines draw themselves, pulses travel to the hub and the hub answers with a ripple in that family's colour. */
export default function AboutVisual() {
  const [hot, setHot] = useState<number | null>(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setHot((h) => ((h ?? -1) + 1) % 4), 2800);
    return () => clearInterval(t);
  }, [auto]);
  const accent = hot === null ? "var(--orange)" : cats[hot].color;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" onMouseLeave={() => setAuto(true)}>
      {/* faint radial dot-grid backdrop */}
      <div aria-hidden className="absolute inset-[-4%] rounded-full opacity-60 [background-image:radial-gradient(var(--line)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(circle,#000_30%,transparent_72%)] [-webkit-mask-image:radial-gradient(circle,#000_30%,transparent_72%)]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          {cats.map((c, i) => (
            <linearGradient key={c.key} id={`ln-${i}`} gradientUnits="userSpaceOnUse" x1={PTS[i].x} y1={PTS[i].y} x2="50" y2="50">
              <stop offset="0" stopColor={c.color} />
              <stop offset="1" stopColor={c.color} stopOpacity="0.15" />
            </linearGradient>
          ))}
        </defs>

        {/* measuring rings around the hub */}
        <motion.circle cx="50" cy="50" r="30.5" fill="none" stroke="var(--ink)" strokeOpacity="0.18" strokeWidth="0.25" strokeDasharray="0.8 1.6" style={{ transformOrigin: "50px 50px" }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 90, ease: "linear" }} />
        <motion.circle cx="50" cy="50" r="26" fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="0.35" strokeDasharray="14 9 3 9" strokeLinecap="round" style={{ transformOrigin: "50px 50px", transition: "stroke .6s" }} animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }} />

        {cats.map((c, i) => {
          const d = lineFor(i);
          const on = hot === i;
          return (
            <g key={c.key}>
              <motion.path d={d} fill="none" stroke={`url(#ln-${i})`} strokeWidth={on ? 0.8 : 0.4} strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.2 + i * 0.25, ease: "easeOut" }} style={{ transition: "stroke-width .3s" }} />
              {/* travelling data pulse (glow + core) */}
              <circle r={on ? 2.6 : 1.8} fill={c.color} opacity="0.25">
                <animateMotion dur={`${3 + i * 0.35}s`} repeatCount="indefinite" path={d} begin={`${i * 0.7}s`} />
              </circle>
              <circle r={on ? 1.2 : 0.9} fill={c.color}>
                <animateMotion dur={`${3 + i * 0.35}s`} repeatCount="indefinite" path={d} begin={`${i * 0.7}s`} />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* ripple answered by the hub each time a family becomes active */}
      {hot !== null && (
        <motion.span key={`rip-${hot}-${auto}`} aria-hidden className="absolute inset-[29%] rounded-full border-2" style={{ borderColor: accent }} initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 1.9, opacity: 0 }} transition={{ duration: 1.8, ease: "easeOut" }} />
      )}

      {/* the hub */}
      <div className="absolute inset-[29%]">
        <motion.div className="relative h-full w-full" animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}>
          {/* soft glow in the active colour */}
          <span aria-hidden className="absolute -inset-[18%] rounded-full blur-2xl transition-colors duration-700" style={{ background: `radial-gradient(circle, ${accent}, transparent 68%)`, opacity: 0.35 }} />
          {/* rotating gradient ring */}
          <span aria-hidden className="absolute inset-0 overflow-hidden rounded-full p-[2px]">
            <motion.span className="absolute -inset-[50%] bg-[conic-gradient(from_0deg,var(--green),transparent_28%,var(--orange),transparent_62%,var(--green))]" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} />
          </span>
          {/* disc */}
          <div className="absolute inset-[2px] overflow-hidden rounded-full bg-bg shadow-[inset_0_0_40px_rgba(0,0,0,0.25)]">
            {/* radar sweep */}
            <motion.span aria-hidden className="absolute -inset-[20%] opacity-70" style={{ background: `conic-gradient(from 0deg, transparent 0deg, ${accent}33 40deg, transparent 80deg)` }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5.5, ease: "linear" }} />
            <span aria-hidden className="absolute inset-0 rounded-full [background:radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.14),transparent_45%)]" />
            <div className="relative grid h-full w-full place-items-center">
              <div className="w-[80%]"><Logo size="fill" /></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* family nodes */}
      {cats.map((c, i) => (
        <Link key={c.key} href={`/solutions/${c.key}`} onMouseEnter={() => { setAuto(false); setHot(i); }} onFocus={() => { setAuto(false); setHot(i); }} aria-label={c.title} className="group absolute -translate-x-1/2 -translate-y-1/2 text-center" style={{ left: `${PTS[i].x}%`, top: `${PTS[i].y}%` }}>
          <span className="relative mx-auto grid h-14 w-14 place-items-center">
            {/* slow orbiting arc */}
            <motion.span aria-hidden className="absolute inset-0 rounded-full border border-dashed" style={{ borderColor: `${c.color}99` }} animate={{ rotate: i % 2 ? -360 : 360 }} transition={{ repeat: Infinity, duration: 14, ease: "linear" }} />
            <motion.span className="relative grid h-11 w-11 place-items-center rounded-full border-2 bg-bg" style={{ borderColor: c.color, boxShadow: hot === i ? `0 0 34px ${c.color}` : `0 0 12px ${c.color}55` }} animate={{ scale: hot === i ? 1.18 : 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
              <span className="h-3 w-3 rounded-full" style={{ background: c.color }} />
            </motion.span>
          </span>
          <span className="mt-1.5 block text-[11px] font-bold uppercase tracking-widest" style={{ color: c.color }}>{c.short}</span>
        </Link>
      ))}
    </div>
  );
}
