"use client";
import { useSyncExternalStore } from "react";
import { MotionConfig } from "framer-motion";

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => mo.disconnect();
};

/** App-wide motion settings. Follows <html data-motion>: "reduced" turns off transform/layout animation in framer-motion
 *  (fades still play); "full" plays everything, even if the OS asks for less, because the visitor can choose that in the footer. */
export default function Providers({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, () => document.documentElement.dataset.motion === "reduced", () => false);
  return <MotionConfig reducedMotion={reduced ? "always" : "never"}>{children}</MotionConfig>;
}
