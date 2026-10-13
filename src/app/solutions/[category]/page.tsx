import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsByCategory } from "@/lib/data";
import { CATEGORY_META, CATEGORY_ORDER, HERO_SLIDES, type CategoryKey } from "@/lib/site";
import CategoryView from "@/components/CategoryView";

export function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[category]">): Promise<Metadata> {
  const { category } = await params;
  const m = CATEGORY_META[category as CategoryKey];
  return m ? { title: m.title, description: HERO_SLIDES[category as CategoryKey].text } : {};
}

export default async function Page({ params }: PageProps<"/solutions/[category]">) {
  const { category } = await params;
  if (!(category in CATEGORY_META)) notFound();
  const list = productsByCategory(category as CategoryKey);
  const items = list.map((p) => ({
    slug: p.slug,
    category: p.category,
    name: p.name,
    banner: p.banner,
    modules: p.modules.length,
    clients: p.clients.length,
    summary: p.description[0] ?? "",
    icons: p.modules.slice(0, 4).map((m) => m.icon).filter((x): x is string => !!x),
  }));
  const uniqueClients = new Set(list.flatMap((p) => p.clients.map((c) => c.toLowerCase().replace(/[^a-z0-9]/g, "")))).size;
  const totals = { products: list.length, modules: list.reduce((a, p) => a + p.modules.length, 0), clients: uniqueClients };
  return <CategoryView category={category as CategoryKey} items={items} totals={totals} />;
}
