import Link from "next/link";
import { ABOUT, FOOTER_LINKS, SITE } from "@/lib/site";
import { Facebook, Instagram, LinkedIn, Mail, Phone, Pin, WhatsApp } from "./Icons";
import { Button } from "./ui";
import FooterWordmark from "./FooterWordmark";
import Logo from "./Logo";

export default function Footer() {
  const socials = [
    { href: SITE.social.facebook, I: Facebook, l: "Facebook" },
    { href: SITE.social.instagram, I: Instagram, l: "Instagram" },
    { href: SITE.social.linkedin, I: LinkedIn, l: "LinkedIn" },
    { href: SITE.social.whatsapp, I: WhatsApp, l: "WhatsApp" },
  ];
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* CTA band */}
      <div className="relative text-black transition-colors duration-700" style={{ background: "var(--page-accent, #12b862)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
          <p className="font-display text-3xl font-medium leading-tight md:text-5xl">We would love to Get in Touch.<br className="hidden md:block" /> <span className="text-white">Contact Us</span></p>
          <Button href="/contact" variant="ghost" className="!border-black !text-black hover:!bg-field hover:!text-ink">Contact Us</Button>
        </div>
        <svg className="absolute bottom-0 left-1/2 h-8 w-40 -translate-x-1/2 text-bg" viewBox="0 0 160 32" fill="currentColor" aria-hidden><path d="M0 32C40 32 50 0 80 0s40 32 80 32z" /></svg>
      </div>

      <div className="relative bg-bg">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo size="lg" className="mb-5" />
            <p className="max-w-sm text-sm leading-relaxed text-ink/60">{ABOUT.company[0]}</p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, I, l }) => (
                <a key={l} href={href} target="_blank" rel="noreferrer" aria-label={l} className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-ink/80 transition-all hover:-translate-y-1 hover:border-[var(--orange)] hover:bg-[var(--orange)] hover:text-black">
                  <I />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4 text-sm text-ink/70">
            <h4 className="font-display mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink">Visit & Call</h4>
            <p className="flex gap-3"><Pin className="mt-0.5 shrink-0 text-[var(--orange)]" />{SITE.address}</p>
            {SITE.phones.map((p) => (
              <p key={p} className="flex gap-3"><Phone className="shrink-0 text-[var(--orange)]" /><a href={`tel:${p.replace(/[^+\d]/g, "")}`} className="hover:text-ink">{p}</a></p>
            ))}
            {SITE.emails.map((e) => (
              <p key={e} className="flex gap-3"><Mail className="shrink-0 text-[var(--orange)]" /><a href={`mailto:${e}`} className="hover:text-ink">{e}</a></p>
            ))}
          </div>
          <div>
            <h4 className="font-display mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-ink">Explore</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink/70">
              {[["Home", "/"], ["Vision & Mission", "/about/vision-mission"], ["CEO Message", "/about/ceo-message"], ["Management Team", "/about/management-team"], ["Retail Solutions", "/solutions/retail"], ["Healthcare", "/solutions/healthcare"], ["Enterprise", "/solutions/enterprise"], ["More Solutions", "/solutions/more"], ["Design Portfolio", "/portfolio"], ["Free Offer", "/free-offer"], ["Feed Backs And Complaints", "/feedback"], ["Contact", "/contact"]].map(([l, h]) => (
                <li key={h}><Link href={h} className="transition-colors hover:text-[var(--orange)]">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <FooterWordmark />

        <div className="border-t border-ink/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-ink/60 md:flex-row">
            <p>Copyright © {process.env.NEXT_PUBLIC_YEAR} Edusoft System Solutions</p>
            <ul className="flex gap-6">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-ink">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
