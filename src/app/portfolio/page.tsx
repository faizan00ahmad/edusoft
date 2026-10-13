import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PortfolioGallery from "@/components/PortfolioGallery";
import { SplitText } from "@/components/ui";
import { portfolio } from "@/lib/data";

export const metadata: Metadata = { title: "Design Portfolio", description: "Logo design, website design & development and PDF designs from EduSoft." };

export default function Page() {
  return (
    <>
      <PageHero title="Design Portfolio" crumbs={[{ label: "Home", href: "/" }, { label: "Design Portfolio" }]} />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SplitText text="Our Successful Projects" accent={["Projects"]} className="font-display mb-12 text-4xl font-light md:text-6xl" />
        <PortfolioGallery items={portfolio} />
      </section>
    </>
  );
}
