"use client";
import { useEffect } from "react";

/** Sets the page accent colour on <html> so the shared footer band & cursor glow can pick it up. */
export default function AccentSetter({ color, rgb }: { color: string; rgb: string }) {
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--page-accent", color);
    r.style.setProperty("--accent", color);
    r.style.setProperty("--accent-rgb", rgb);
    return () => {
      r.style.removeProperty("--page-accent");
      r.style.setProperty("--accent", "#f59a0c");
      r.style.setProperty("--accent-rgb", "245,154,12");
    };
  }, [color, rgb]);
  return null;
}
