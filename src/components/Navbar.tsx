"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORY_META, CATEGORY_ORDER, SERVICE_NAV, SITE } from "@/lib/site";
import { navProducts } from "@/lib/content";
import { Chevron, Facebook, Instagram, LinkedIn, WhatsApp } from "./Icons";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

type Item = { label: string; href: string; external?: boolean };
type Menu = { label: string; href?: string; items?: Item[]; color?: string };

const MENUS: Menu[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    items: [
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "CEO Message", href: "/about/ceo-message" },
      { label: "Management Team", href: "/about/management-team" },
    ],
  },
  ...CATEGORY_ORDER.map((c) => ({
    label: CATEGORY_META[c].title.replace(" ", "\n"),
    href: `/solutions/${c}`,
    color: CATEGORY_META[c].color,
    items: navProducts(c).map((p) => ({ label: p.name, href: `/solutions/${c}/${p.slug}` })),
  })),
  { label: "Our\nServices", items: SERVICE_NAV.map((s) => ({ label: s.name, href: `/services/${s.slug}` })) },
  { label: "Design\nPortfolio", href: "/portfolio" },
  {
    label: "Contact Us",
    href: "/contact",
    items: [
      { label: "Free Offer", href: "/free-offer" },
      { label: "Contact Us", href: "/contact" },
      { label: "Feed Backs And Complaints", href: "/feedback" },
      { label: "EduSoft Login", href: "/login" },
    ],
  },
];

const socials = [
  { href: SITE.social.facebook, I: Facebook, l: "Facebook" },
  { href: SITE.social.instagram, I: Instagram, l: "Instagram" },
  { href: SITE.social.linkedin, I: LinkedIn, l: "LinkedIn" },
  { href: SITE.social.whatsapp, I: WhatsApp, l: "WhatsApp" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // menu state is tied to the path it was opened on, so it closes itself on navigation
  const [openState, setOpenState] = useState<{ label: string | null; path: string }>({ label: null, path: "" });
  const [mobileFor, setMobileFor] = useState<string | null>(null);
  const [mobSub, setMobSub] = useState<string | null>(null);
  const open = openState.path === pathname ? openState.label : null;
  const setOpen = (label: string | null) => setOpenState({ label, path: pathname });
  const mobile = mobileFor === pathname;
  const setMobile = (fn: boolean | ((v: boolean) => boolean)) => setMobileFor((cur) => ((typeof fn === "function" ? fn(cur === pathname) : fn) ? pathname : null));

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 160); // slide away going down, return going up
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenState({ label: null, path: pathname });
      setMobileFor(null);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [pathname]);

  const isActive = (m: Menu) => (m.href === "/" ? pathname === "/" : m.href ? pathname.startsWith(m.href) : m.items?.some((i) => !i.external && pathname.startsWith(i.href)));

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-4" onMouseLeave={() => setOpen(null)}>
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: hidden && !mobile && !open ? -130 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 20, delay: hidden ? 0 : 0.05 }}
        className={`pointer-events-auto relative mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-full border px-4 transition-[background-color,box-shadow,border-color,padding] duration-500 lg:px-7 ${
          scrolled
            ? "border-ink/15 bg-card/75 py-1.5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.03)_inset]"
            : "border-ink/10 bg-card/35 py-2.5 shadow-[0_12px_40px_-14px_rgba(0,0,0,0.6)]"
        } backdrop-blur-2xl`}
      >
        {/* animated gradient hairline along the bottom edge of the pill */}
        <span aria-hidden className="pointer-events-none absolute inset-x-10 -bottom-px h-px bg-gradient-to-r from-transparent via-[var(--orange)] to-transparent opacity-70" />
        <span aria-hidden className="pointer-events-none absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-[var(--green)] to-transparent opacity-60" />
        <Link href="/" aria-label="EduSoft home" className="relative z-10 shrink-0">
          <Logo size="nav" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {MENUS.map((m) => {
            const active = isActive(m);
            return (
              <div key={m.label} className="relative" onMouseEnter={() => setOpen(m.items ? m.label : null)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null); }}>
                <Link
                  href={m.href ?? m.items![0].href}
                  className={`group relative block whitespace-pre-line rounded-full px-3 py-2.5 text-center text-[12px] font-semibold uppercase leading-[1.15] tracking-wider transition-colors ${active ? "text-[var(--orange)]" : "text-ink/90 hover:text-[var(--orange)]"}`}
                  onFocus={() => m.items && setOpen(m.label)}
                >
                  {m.label}
                  <span className={`absolute inset-x-4 bottom-0.5 h-[2px] origin-center rounded bg-[var(--orange)] transition-transform duration-300 ${active || open === m.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
                <AnimatePresence>
                  {m.items && open === m.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: 14, clipPath: "inset(0 0 100% 0)" }}
                      animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                      exit={{ opacity: 0, y: 8, clipPath: "inset(0 0 100% 0)" }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full min-w-[270px] overflow-hidden rounded-xl border-t-[14px] bg-clip-padding border-l-[14px] border-[#0d1a30] bg-[#0c6b3a] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
                      style={{ borderTopColor: "transparent" }}
                    >
                      {m.items.map((it, i) => {
                        const content = (
                          <>
                            <span className="text-[10px] text-white/40 transition-transform group-hover/i:translate-x-1">›</span>
                            <span>{it.label}</span>
                          </>
                        );
                        const cls = "group/i flex items-center gap-4 border-b border-[#0d1a30] px-5 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[var(--orange)] hover:text-black";
                        return (
                          <motion.li key={it.href + it.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.035 }}>
                            {it.external ? <a href={it.href} target="_blank" rel="noreferrer" className={cls}>{content}</a> : <Link href={it.href} className={cls}>{content}</Link>}
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          {socials.slice(0, 3).map(({ href, I, l }) => (
            <a key={l} href={href} target="_blank" rel="noreferrer" aria-label={l} className="text-ink/80 transition-all hover:-translate-y-0.5 hover:text-[var(--orange)]">
              <I />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle />
          <button aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile((v) => !v)} className="relative z-[110] flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden">
          <span className={`h-[2px] w-6 bg-white transition-transform ${mobile ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-white transition-opacity ${mobile ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-white transition-transform ${mobile ? "-translate-y-[5px] -rotate-45" : ""}`} />
        </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 4%)" }}
            animate={{ clipPath: "circle(150% at 95% 4%)" }}
            exit={{ clipPath: "circle(0% at 95% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] overflow-y-auto bg-bg px-6 pb-10 pt-24 xl:hidden"
          >
            <div className="aurora"><i /><i /><i /></div>
            <ul className="relative space-y-1">
              {MENUS.map((m, i) => (
                <motion.li key={m.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.045 }} className="border-b border-ink/10">
                  {m.items ? (
                    <>
                      <button onClick={() => setMobSub(mobSub === m.label ? null : m.label)} className="font-display flex w-full items-center justify-between py-4 text-2xl font-medium uppercase">
                        <span style={{ color: m.color }}>{m.label.replace("\n", " ")}</span>
                        <Chevron className={`transition-transform ${mobSub === m.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobSub === m.label && (
                          <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-3">
                            {m.href && <li><Link href={m.href} className="block py-2 text-ink/60">Overview</Link></li>}
                            {m.items.map((it) => (
                              <li key={it.label}>
                                {it.external ? <a href={it.href} className="block py-2 text-ink/80">{it.label}</a> : <Link href={it.href} className="block py-2 text-ink/80">{it.label}</Link>}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={m.href!} className="font-display block py-4 text-2xl font-medium uppercase">{m.label.replace("\n", " ")}</Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-8 flex gap-5">
              {socials.map(({ href, I, l }) => (
                <a key={l} href={href} target="_blank" rel="noreferrer" aria-label={l} className="text-ink/80"><I /></a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
