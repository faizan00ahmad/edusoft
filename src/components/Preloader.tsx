"use client";
import { isReduced } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

/** One-per-session intro: counter, logo reveal, then a curtain lift.
 *  Always finishes: a timer backs up the animation loop (browsers pause animation frames in background tabs),
 *  and a click or Escape skips it. */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  const skip = useRef(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("edusoft-intro") === "1"; } catch {}
    if (seen || isReduced()) {
      const t = setTimeout(() => setShow(false), 0);
      return () => clearTimeout(t);
    }
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try { sessionStorage.setItem("edusoft-intro", "1"); } catch {}
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      setN(100);
      setShow(false);
    };

    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const loop = (t: number) => {
      const p = skip.current ? 1 : Math.min(1, (t - start) / dur);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
      else setTimeout(finish, 250);
    };
    raf = requestAnimationFrame(loop);
    const failsafe = setTimeout(finish, 3200);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { skip.current = true; setTimeout(finish, 300); } };
    window.addEventListener("keydown", esc);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      window.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre"
          data-preloader
          className="fixed inset-0 z-[300] flex cursor-pointer flex-col items-center justify-center bg-bg"
          onClick={() => { skip.current = true; }}
          role="presentation"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="aurora"><i /><i /><i /></div>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative">
            <Logo size="xl" />
          </motion.div>
          <div className="relative mt-10 h-[2px] w-56 overflow-hidden rounded bg-ink/10 md:w-72">
            <motion.div className="h-full bg-gradient-to-r from-[var(--green)] to-[var(--orange)]" style={{ width: `${n}%` }} />
          </div>
          <div className="font-display relative mt-5 text-6xl font-light tabular-nums text-ink/90 md:text-8xl">{String(n).padStart(2, "0")}</div>
          <p className="relative mt-2 text-xs uppercase tracking-[0.4em] text-ink/40">Loading · click to skip</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
