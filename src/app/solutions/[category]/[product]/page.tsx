import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/data";
import { CATEGORY_META } from "@/lib/site";
import ProductView from "@/components/ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[category]/[product]">): Promise<Metadata> {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) return {};
  return { title: p.name, description: p.description[0] ?? `${p.name} — ${CATEGORY_META[p.category].title} by EduSoft System Solutions.` };
}

export default async function Page({ params }: PageProps<"/solutions/[category]/[product]">) {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) notFound();
  const related = products
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 6)
    .map((x) => ({ slug: x.slug, category: x.category, name: x.name, icon: x.modules[0]?.icon ?? null, modules: x.modules.length }));
  return <ProductView product={p} related={related} />;
}
