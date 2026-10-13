import productsJson from "@/data/products.json";
import servicesJson from "@/data/services.json";
import miscJson from "@/data/misc.json";
export { testimonials, sponsors } from "./content";
import { CATEGORY_ORDER, BREADCRUMB_NAMES, PRODUCT_BANNERS, PRODUCT_NAMES, type CategoryKey } from "./site";

export type Panel = { title: string; blocks: ({ type: "list"; items: string[] } | { type: "p" | "h"; text: string })[] };
export type Product = {
  slug: string;
  category: CategoryKey;
  title: string;
  name: string;
  heading: string;
  accent: string;
  modulesHeading: string;
  crumb: string;
  description: string[];
  modules: { label: string; icon: string | null }[];
  accordion: Panel[];
  clients: string[];
  brochure: string | null;
  banner: string;
};

export const products: Product[] = (productsJson as unknown as Product[]).map((p) => {
  const name = PRODUCT_NAMES[p.slug] ?? p.title;
    return { ...p, name, heading: p.title, accent: p.accent, crumb: BREADCRUMB_NAMES[p.slug] ?? name, banner: `/img/banner/${PRODUCT_BANNERS[p.slug] ?? "process-automation"}.jpg` };
});

export const productsByCategory = (c: CategoryKey) => products.filter((p) => p.category === c);
export const getProduct = (category: string, slug: string) => products.find((p) => p.category === category && p.slug === slug);

export type ServiceSection = { title: string; image: string | null; blocks: { tag: "p" | "h"; text: string }[] };
export const services = servicesJson as { slug: string; title: string; sections: ServiceSection[] }[];
export const portfolio = (miscJson as unknown as { portfolio: { title: string; src: string }[] }).portfolio;
import privacyJson from "@/data/privacy.json";
export const privacy = privacyJson as { tag: string; text: string }[];

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
export const allClients = Array.from(new Map(products.flatMap((p) => p.clients).map((c) => [norm(c), c])).values()).sort((a, b) => a.localeCompare(b));

export const stats = {
  years: Number(process.env.NEXT_PUBLIC_YEAR ?? 2026) - 2000,
  products: products.length,
  clients: allClients.length,
  industries: CATEGORY_ORDER.length,
};
