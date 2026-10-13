import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui";
import { products } from "@/lib/data";
import { CATEGORY_META, CATEGORY_ORDER, FOOTER_LINKS, SERVICE_NAV } from "@/lib/site";

export const metadata: Metadata = { title: "Sitemap" };

export default function Page() {
  const groups: { title: string; href?: string; color: string; links: { label: string; href: string }[] }[] = [
    { title: "Company", color: "#f59a0c", links: [{ label: "Home", href: "/" }, { label: "Vision & Mission", href: "/about/vision-mission" }, { label: "CEO Message", href: "/about/ceo-message" }, { label: "Management Team", href: "/about/management-team" }] },
    ...CATEGORY_ORDER.map((c) => ({
      title: CATEGORY_META[c].title,
      href: `/solutions/${c}`,
      color: CATEGORY_META[c].color,
      links: products.filter((p) => p.category === c).map((p) => ({ label: p.name, href: `/solutions/${c}/${p.slug}` })),
    })),
    { title: "Our Services", color: "#12b862", links: SERVICE_NAV.map((s) => ({ label: s.name, href: `/services/${s.slug}` })) },
    { title: "More", color: "#f59a0c", links: [{ label: "Design Portfolio", href: "/portfolio" }, { label: "Free Offer", href: "/free-offer" }, { label: "Contact Us", href: "/contact" }, { label: "Feed Backs And Complaints", href: "/feedback" }, { label: "EduSoft Login", href: "/login" }, ...FOOTER_LINKS.filter((l) => l.href !== "/sitemap")] },
  ];
  return (
    <>
      <PageHero title="Sitemap" crumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]} />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 0.08} y={30}>
            <div className="glass h-full rounded-3xl p-7" style={{ borderTop: `3px solid ${g.color}` }}>
              <h2 className="font-display mb-4 text-lg font-semibold" style={{ color: g.color }}>{g.href ? <Link href={g.href}>{g.title}</Link> : g.title}</h2>
              <ul className="space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-ink/75 transition-all hover:translate-x-1 hover:bg-ink/[0.06] hover:text-ink">
                      <span className="text-ink/30 transition-colors group-hover:text-[var(--orange)]">›</span> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}
