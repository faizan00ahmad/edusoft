import Image from "next/image";

const SIZES = {
  nav: "h-11 sm:h-14",
  lg: "h-16",
  xl: "h-24 md:h-32",
  fill: "h-auto w-full",
} as const;

/** EduSoft logo, no box. High-resolution artwork (1410px wide, rebuilt from the original with crisp edges) so it stays sharp on retina / 4K screens. Two files are swapped by CSS so the tagline is always readable:
 *  white lettering on dark backgrounds, navy lettering on light ones.
 *  A shine sweeps across the lettering only (masked to the logo shape) and a soft glow pulses behind it. */
export default function Logo({ size = "nav", className = "", animated = true }: { size?: keyof typeof SIZES; className?: string; animated?: boolean }) {
  const img = size === "fill" ? "h-auto w-full object-contain" : `${SIZES[size]} w-auto object-contain`;
  return (
    <span className={`logo-wrap relative inline-block align-middle ${size === "fill" ? "w-full" : ""} ${animated ? "logo-glow" : ""} ${className}`}>
      <Image src="/img/logo-hq.png" alt="EduSoft System Solutions" width={1410} height={440} quality={95} priority className={`logo-d ${img}`} />
      <Image src="/img/logo-hq-light.png" alt="" aria-hidden width={1410} height={440} quality={95} priority className={`logo-l ${img}`} />
      {animated && <span aria-hidden className="logo-shine" />}
    </span>
  );
}
