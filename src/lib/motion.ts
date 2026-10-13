/** Single source of truth for "should heavy motion run?".
 *  <html data-motion="full | reduced"> is set before first paint (see layout.tsx):
 *  an explicit visitor choice wins, otherwise it follows the device's "reduce motion" setting. */
export const isReduced = () => typeof document !== "undefined" && document.documentElement.dataset.motion === "reduced";

export const MOTION_KEY = "edusoft-motion";

/** Remembers the visitor's choice and reloads so every animation system (smooth scroll, 3D, intro…) starts or stops cleanly. */
export function setMotion(mode: "full" | "reduced") {
  try { localStorage.setItem(MOTION_KEY, mode); } catch {}
  document.documentElement.dataset.motion = mode;
  window.location.reload();
}
