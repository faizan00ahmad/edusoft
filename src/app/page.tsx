import Hero from "@/components/Hero";
import { About, ClientLogos, ServicesTrio, SolutionsScroller, Stats, Testimonials, TopManagement } from "@/components/HomeSections";
import { productsByCategory, stats } from "@/lib/data";
import { CATEGORY_ORDER, type CategoryKey } from "@/lib/site";

export default function Home() {
  const byCategory = Object.fromEntries(CATEGORY_ORDER.map((c) => [c, productsByCategory(c).map((p) => ({ slug: p.slug, name: p.name }))])) as Record<CategoryKey, { slug: string; name: string }[]>;
  return (
    <>
      <Hero />
      <Stats stats={{ years: stats.years, clients: stats.clients, products: stats.products }} />
      <About />
      <ClientLogos />
      <ServicesTrio />
      <SolutionsScroller byCategory={byCategory} />
      <Testimonials />
      <TopManagement />
    </>
  );
}
