"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Giant outlined wordmark that drifts sideways as the footer scrolls into view. */
export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["12%", "-4%"]);
  return (
    <div ref={ref} className="pointer-events-none select-none overflow-hidden" aria-hidden>
      <motion.div style={{ x }} className="font-display whitespace-nowrap text-center text-[22vw] font-bold leading-[0.8] tracking-tighter text-outline opacity-60">
        EDUSOFT
      </motion.div>
    </div>
  );
}
