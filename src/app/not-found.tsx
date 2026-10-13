import Link from "next/link";
import { Button } from "@/components/ui";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden px-6 pt-32 text-center">
      <div className="aurora -z-10"><i /><i /><i /></div>
      <div>
        <p className="font-display text-[28vw] font-bold leading-none text-outline sm:text-[200px]">404</p>
        <h1 className="font-display -mt-4 text-3xl font-light md:text-5xl">This page has moved or doesn&apos;t exist</h1>
        <p className="mx-auto mt-4 max-w-md text-ink/70">Try one of our solution families or head back home.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {CATEGORY_ORDER.map((c) => (
            <Link key={c} href={`/solutions/${c}`} className="rounded-full border border-ink/20 px-5 py-2 text-sm transition-colors hover:text-black" style={{ ["--c" as string]: CATEGORY_META[c].color }}>
              <span className="hover:text-black">{CATEGORY_META[c].title}</span>
            </Link>
          ))}
        </div>
        <div className="mt-10"><Button href="/">Home</Button></div>
      </div>
    </section>
  );
}
