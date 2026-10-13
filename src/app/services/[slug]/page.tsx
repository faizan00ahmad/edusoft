import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ServiceSections from "@/components/ServiceSections";
import { services } from "@/lib/data";
import { SERVICE_NAV } from "@/lib/site";

const navName = (slug: string) => SERVICE_NAV.find((n) => n.slug === slug)?.name ?? slug;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: navName(slug), description: s.sections[0]?.blocks.find((b) => b.tag === "p")?.text.slice(0, 160) } : {};
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const name = navName(slug);
  return (
    <>
      <PageHero title={name} crumbs={[{ label: "Home", href: "/" }, { label: name }]} />
      <ServiceSections sections={s.sections} nav={SERVICE_NAV} current={slug} />
    </>
  );
}
