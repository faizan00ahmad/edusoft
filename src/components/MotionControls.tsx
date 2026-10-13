"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_KEY, setMotion } from "@/lib/motion";

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => mo.disconnect();
};
const useReduced = () => useSyncExternalStore(subscribe, () => document.documentElement.dataset.motion === "reduced", () => false);

/** Footer switch: Animations On / Off. */
export function MotionToggle() {
  const reduced = useReduced();
  return (
    <button type="button" onClick={() => setMotion(reduced ? "full" : "reduced")} aria-pressed={!reduced} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]">
      <span className={`relative h-3.5 w-7 rounded-full transition-colors ${reduced ? "bg-ink/25" : "bg-[var(--green)]"}`} aria-hidden>
        <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all ${reduced ? "left-0.5" : "left-[15px]"}`} />
      </span>
      Animations: {reduced ? "Off" : "On"}
    </button>
  );
}

/** One-time notice for visitors whose device asks for reduced motion and who haven't chosen yet:
 *  explains why the site looks calmer and offers the full experience. */
export function MotionHint() {
  const reduced = useReduced();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let show = false;
    try { show = document.documentElement.dataset.motion === "reduced" && !localStorage.getItem(MOTION_KEY) && !sessionStorage.getItem("edusoft-motion-hint"); } catch {}
    const t = setTimeout(() => setOpen(show), 2500);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setOpen(false); try { sessionStorage.setItem("edusoft-motion-hint", "1"); } catch {} };
  return (
    <AnimatePresence>
      {open && reduced && (
        <motion.div role="status" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed bottom-4 left-4 z-[120] max-w-[340px] rounded-2xl border border-ink/15 bg-card/95 p-4 text-sm shadow-2xl backdrop-blur-xl">
          <p className="leading-snug">Animations are reduced because your device has “reduce motion” turned on.</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setMotion("full")} className="rounded-full bg-[var(--orange)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black">Turn on animations</button>
            <button onClick={dismiss} className="rounded-full border border-ink/20 px-4 py-2 text-xs font-bold uppercase tracking-wider">OK</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
