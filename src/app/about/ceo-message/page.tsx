import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CeoLetter from "@/components/CeoLetter";
import { CEO } from "@/lib/site";

export const metadata: Metadata = { title: "CEO Message" };

export default function Page() {
  return (
    <>
      <PageHero title="CEO Message" crumbs={[{ label: "Home", href: "/" }, { label: "About" }, { label: "CEO Message" }]} />
      <CeoLetter name={CEO.name} role={CEO.role} photo={CEO.photo} paragraphs={CEO.paragraphs} />
    </>
  );
}
