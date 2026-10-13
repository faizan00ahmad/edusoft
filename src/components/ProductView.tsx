"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data";
import { CATEGORY_META } from "@/lib/site";
import { Breadcrumb } from "./PageHero";
import { Accordion, BarHeading, ClientList, ModuleGrid, TestimonialBand } from "./ProductParts";
import { Button, Reveal, SplitText } from "./ui";
import AccentSetter from "./AccentSetter";
import { Download } from "./Icons";
import { FactBadges, RelatedProducts, StickyCTA, type Related } from "./ProductExtras";

export default function ProductView({ product, related }: { product: Product; related: Related[] }) {
  const meta = CATEGORY_META[product.category];
  const style = { ["--accent" as string]: meta.color, ["--accent-rgb" as string]: meta.glow } as React.CSSProperties;
  const [lead, ...rest] = product.description;
  return (
    <div style={style}>
      <AccentSetter color={meta.color} rgb={meta.glow} />

      {/* banner */}
      <section className="relative isolate flex h-[62vh] min-h-[420px] items-end overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}>
          <Image src={product.banner} alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/55 to-bg/40" />
        <div className="absolute inset-0 -z-10 opacity-60" style={{ background: `radial-gradient(60% 80% at 15% 100%, rgba(${meta.glow},0.45), transparent 70%)` }} />
        <div className="mx-auto w-full max-w-7xl px-6 pb-14">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--accent)]">{meta.title}</motion.p>
          <SplitText as="h1" text={product.name} className="font-display text-4xl font-bold leading-[1.02] md:text-7xl" />
        </div>
      </section>

      <TestimonialBand />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: meta.title, href: `/solutions/${product.category}` }, { label: product.crumb }]} />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            <h2 className="font-display text-3xl font-medium md:text-5xl">
              {product.heading} {product.accent && <span className="align-baseline text-lg font-bold uppercase tracking-wider text-[var(--accent)] md:text-2xl">{product.accent}</span>}
            </h2>
            <div className="mt-6 max-w-3xl space-y-4">
              {lead && <p className="text-lg leading-relaxed text-ink/80">{lead}</p>}
              {rest.map((p, i) => <p key={i} className="leading-relaxed text-ink/60">{p}</p>)}
            </div>
            <FactBadges product={product} />
          </div>
          {product.brochure && (
            <Reveal className="glass relative self-start rounded-2xl p-6 text-center">
              <h3 className="font-display mb-5 text-xl font-semibold uppercase tracking-wide">PDF Broucher</h3>
              <Button href={product.brochure} external><Download /> Download</Button>
            </Reveal>
          )}
        </div>

        <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest">
          {[["Modules", "#modules"], ...(product.accordion.length ? [["Features", "#features"]] : []), ...(product.clients.length ? [["Clients", "#clients"]] : [])].map(([l, h]) => (
            <a key={h} href={h} className="rounded-full border border-ink/20 px-4 py-2 transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-black">{l}</a>
          ))}
        </nav>

        <div id="modules" className="mt-10 space-y-6">
          <BarHeading>{product.modulesHeading}</BarHeading>
          <ModuleGrid modules={product.modules} />
        </div>

        {product.accordion.length > 0 && <div id="features" className="mt-14"><Accordion panels={product.accordion} /></div>}

        {product.clients.length > 0 && (
          <div id="clients" className="mt-16 space-y-6">
            <BarHeading>Our Valuable Clients:</BarHeading>
            <ClientList clients={product.clients} />
          </div>
        )}

        <RelatedProducts product={product} others={related} />
      </div>
      <StickyCTA product={product} />
    </div>
  );
}
