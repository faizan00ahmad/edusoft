import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import ContactInfoBand from "@/components/ContactInfoBand";
import MapEmbed from "@/components/MapEmbed";
import { Reveal } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Us", description: "Reach EduSoft System Solutions in Multan Cantt, Pakistan." };

export default function Page() {
  return (
    <>
      <PageHero title="Contact Us" crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="font-display text-5xl font-light">Stay Connected</h2>
          <p className="mb-8 mt-4 text-lg leading-relaxed text-ink/70">
            if you&apos;d like extra information about anything that we do, or you&apos;d simply like to discus with our creative team about your project. Feel free to contact us for any of your queries and we will get back to you as soon as possible.
          </p>
          <InquiryForm
            kind="contact"
            fields={[
              { name: "name", label: "Your Name", placeholder: "Your Name", required: true, autoComplete: "name" },
              { name: "email", label: "Your Email", placeholder: "Your Email", type: "email", required: true, autoComplete: "email" },
              { name: "phone", label: "Your Phone", placeholder: "Your Phone", type: "tel", required: true, autoComplete: "tel" },
              { name: "message", label: "Your Message", placeholder: "Your Message", type: "textarea", required: true },
            ]}
          />
        </div>
        <Reveal className="self-start">
          <MapEmbed src={SITE.mapEmbed} />
        </Reveal>
      </section>
      <ContactInfoBand />
    </>
  );
}
