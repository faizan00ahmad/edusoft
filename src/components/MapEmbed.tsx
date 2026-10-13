"use client";
import { useState } from "react";
import { motion } from "framer-motion";

/** Google map with a shimmering skeleton until it has loaded, plus a pulsing pin hint. */
export default function MapEmbed({ src, className = "h-[460px]" }: { src: string; className?: string }) {
  const [ready, setReady] = useState(false);
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-ink/10 ${className}`}>
      {!ready && (
        <div aria-hidden className="absolute inset-0 grid place-items-center bg-ink/[0.04]">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/10 to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }} />
          <motion.svg animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></motion.svg>
        </div>
      )}
      <iframe title="Edusoft System Solutions on Google Maps" src={src} loading="lazy" onLoad={() => setReady(true)} className={`h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}
