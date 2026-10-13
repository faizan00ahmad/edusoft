import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
import { CATEGORY_ORDER, SERVICE_NAV, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string, priority = 0.6) => ({ url: `${SITE.url}${p}`, priority });
  return [
    u("/", 1),
    u("/about/vision-mission"), u("/about/ceo-message"), u("/about/management-team"), u("/about/privacy-policy", 0.3),
    ...CATEGORY_ORDER.map((c) => u(`/solutions/${c}`, 0.9)),
    ...products.map((p) => u(`/solutions/${p.category}/${p.slug}`, 0.8)),
    ...SERVICE_NAV.map((s) => u(`/services/${s.slug}`, 0.7)),
    u("/portfolio"), u("/contact", 0.8), u("/free-offer", 0.7),
  ];
}
