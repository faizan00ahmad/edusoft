import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PrivacyDoc from "@/components/PrivacyDoc";
import { privacy } from "@/lib/data";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  // the first <h2> is the page title ("Privacy Policy"), already shown in the banner
  const blocks = privacy.filter((b, i) => !(i === 0 && b.tag === "h2"));
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <PrivacyDoc blocks={blocks} />
    </>
  );
}
