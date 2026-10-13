"use client";
import { MotionConfig } from "framer-motion";

/** App-wide motion settings: framer-motion animations respect the visitor's "reduce motion" OS setting. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
