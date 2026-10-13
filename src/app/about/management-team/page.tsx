import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ABOUT, TEAM } from "@/lib/site";
import { Button, Reveal, SplitText } from "@/components/ui";
import TeamGrid from "@/components/TeamGrid";

export const metadata: Metadata = { title: "Management Team" };

export default function Page() {
  return (
    <>
      <PageHero title="Management Team" crumbs={[{ label: "Home", href: "/" }, { label: "About" }, { label: "Management Team" }]} />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SplitText text="Top Management" className="font-display text-4xl font-light md:text-6xl" />
        <ul className="mt-8 grid max-w-4xl gap-3">
          {ABOUT.mgmtIntro.map((t, i) => (
            <Reveal as="li" key={t} delay={i * 0.1} y={20}>
              <div className="flex items-start gap-4 text-lg text-ink/75">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--orange)]/15 text-[var(--orange)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12.5 4.5 4.5L19 7" /></svg>
                </span>
                {t}
              </div>
            </Reveal>
          ))}
        </ul>
        <TeamGrid team={TEAM} className="mt-14" />
        <div className="mt-16 text-center"><Button href="/contact">Contact us</Button></div>
      </section>
    </>
  );
}
