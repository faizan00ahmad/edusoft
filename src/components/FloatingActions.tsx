"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { SITE } from "@/lib/site";
import { WhatsApp } from "./Icons";

/** Bottom-right helpers: WhatsApp chat (always) + back-to-top with a scroll-progress ring (after the first screen). */
export default function FloatingActions() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const top = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <div className="fixed bottom-5 right-4 z-[110] flex flex-col items-center gap-3 sm:right-6">
      <AnimatePresence>
        {show && (
          <motion.button
            key="top"
            onClick={top}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="relative grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-card/80 text-ink shadow-xl backdrop-blur-xl"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
              <motion.circle cx="24" cy="24" r="22" fill="none" stroke="var(--orange)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: p }} />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 15 6-6 6 6" /></svg>
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        href={SITE.social.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3.2, type: "spring", stiffness: 200, damping: 12 }}
        whileHover={{ scale: 1.1 }}
        className="relative grid h-12 w-12 place-items-center rounded-full bg-[#25d366] sm:h-14 sm:w-14 text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.7)]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30" aria-hidden />
        <WhatsApp className="relative h-6 w-6 sm:h-7 sm:w-7" />
      </motion.a>
    </div>
  );
}
