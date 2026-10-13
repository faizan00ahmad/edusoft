import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ABOUT } from "@/lib/site";
import { Button } from "@/components/ui";
import { MissionCards, WhyList, CompanyStory } from "@/components/AboutBlocks";

export const metadata: Metadata = { title: "Vision & Mission", description: ABOUT.mission };

export default function Page() {
  return (
    <>
      <PageHero title="Vision & Mission" crumbs={[{ label: "Home", href: "/" }, { label: "About" }, { label: "Vision & Mission" }]} />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <MissionCards mission={ABOUT.mission} vision={ABOUT.vision} />
        <CompanyStory paragraphs={ABOUT.company} />
        <WhyList items={ABOUT.why} />
        <div className="mt-20 text-center">
          <Button href="/contact">Contact us</Button>
        </div>
      </section>
    </>
  );
}
