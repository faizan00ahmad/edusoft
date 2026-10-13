"use client";
import { motion } from "framer-motion";

/** Re-mounts on every navigation: pages glide in, and a coloured curtain sweeps away. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] origin-top bg-gradient-to-br from-[var(--green)] via-[var(--green-deep)] to-[var(--orange)]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        style={{ transformOrigin: "top" }}
      />
    </>
  );
}
