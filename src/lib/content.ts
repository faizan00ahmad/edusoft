import testimonialsJson from "@/data/testimonials.json";
import sponsorsJson from "@/data/sponsors.json";
import categoriesJson from "@/data/categories.json";
import { PRODUCT_NAMES, type CategoryKey } from "./site";

/** Small, client-safe content. Never import the full product dataset (@/lib/data) from a client component. */
export const testimonials = testimonialsJson as { quote: string; name: string; company: string; photo: string | null }[];
export const sponsors = sponsorsJson as string[];

const cats = categoriesJson as unknown as Record<CategoryKey, { items: string[] }>;
/** Menu entries per solution family, in the live site's order. */
export const navProducts = (c: CategoryKey) => cats[c].items.map((slug) => ({ slug, name: PRODUCT_NAMES[slug] ?? slug }));
