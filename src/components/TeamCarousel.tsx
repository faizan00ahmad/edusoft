"use client";
import { isReduced } from "@/lib/motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { SpotCard } from "./ui";
import { Arrow } from "./Icons";

type Member = { name: string; role: string; photo: string };

/** Infinite auto-sliding carousel (3 / 2 / 1 cards per view). Pauses on hover; arrows + dots for manual control. */
export default function TeamCarousel({ team, interval = 3200 }: { team: Member[]; interval?: number }) {
  const n = team.length;
  const [idx, setIdx] = useState(0);
  const [snap, setSnap] = useState(false); // true = move without animation (used for the loop reset)
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);

  const go = useCallback((to: number) => {
    if (busy.current) return;
    busy.current = true;
    setIdx(to);
  }, []);

  const next = useCallback(() => go(idx + 1), [go, idx]);
  const prev = useCallback(() => {
    if (idx > 0) return go(idx - 1);
    // jump to the cloned set, then slide back one
    setSnap(true);
    setIdx(n);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setSnap(false);
      busy.current = true;
      setIdx(n - 1);
    }));
  }, [go, idx, n]);

  useEffect(() => {
    if (paused || isReduced()) return;
    const t = setInterval(() => go(idx + 1), interval);
    return () => clearInterval(t);
  }, [paused, idx, interval, go]);

  const onEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "transform") return;
    if (idx >= n) {
      setSnap(true);
      setIdx(idx - n);
      requestAnimationFrame(() => requestAnimationFrame(() => { setSnap(false); busy.current = false; }));
    } else busy.current = false;
  };

  const list = [...team, ...team];
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="overflow-hidden [--step:100%] sm:[--step:50%] lg:[--step:33.3333%]">
        <ul
          className={`flex ${snap ? "" : "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
          style={{ transform: `translateX(calc(var(--step) * -${idx}))` }}
          onTransitionEnd={onEnd}
        >
          {list.map((m, i) => (
            <li key={i} className="shrink-0 basis-full px-3 sm:basis-1/2 lg:basis-1/3" aria-hidden={i >= n}>
              <SpotCard className="group relative aspect-[4/5] overflow-hidden rounded-3xl" tilt={5}>
                <Image src={m.photo} alt={m.name} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="mb-2 h-[3px] w-10 bg-[var(--orange)] transition-all duration-500 group-hover:w-24" />
                  <h3 className="font-display text-xl font-semibold uppercase">{m.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-[var(--orange)]">{m.role}</p>
                </div>
              </SpotCard>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between px-3">
        <div className="flex gap-2" role="tablist" aria-label="Team members">
          {team.map((m, k) => (
            <button key={m.name} role="tab" aria-selected={k === idx % n} aria-label={m.name} onClick={() => go(k)} className={`h-2 rounded-full transition-all duration-500 ${k === idx % n ? "w-10 bg-[var(--orange)]" : "w-2 bg-white/25 hover:bg-white/50"}`} />
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={prev} aria-label="Previous" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-all hover:border-[var(--orange)] hover:bg-[var(--orange)] hover:text-black">
            <Arrow className="rotate-180" />
          </button>
          <button onClick={next} aria-label="Next" className="grid h-12 w-12 place-items-center rounded-full border border-white/20 transition-all hover:border-[var(--orange)] hover:bg-[var(--orange)] hover:text-black">
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}
