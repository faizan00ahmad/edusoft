import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb } from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import ContactInfoBand from "@/components/ContactInfoBand";
import MapEmbed from "@/components/MapEmbed";
import { Reveal } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Free Offer" };

export default function Page() {
  return (
    <>
      <div className="relative h-[60vh] min-h-[380px] overflow-hidden">
        <Image src="/Free-download.jpg" alt="FREE Business Automation, Expansion & I.T Solution Consultancy — Trial Versions and Product Training Sessions!" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/60 via-transparent to-[#05070d]/30" />
      </div>
      <h1 className="sr-only">Free Offer</h1>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FreeOffer" }]} />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pt-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="mb-6 text-[15px] text-red-500">Please fill out the following information if you are interested in our Free Offer. One of our representative will contact you soon to fix an online meeting with our experts.</p>
          <InquiryForm
            kind="free-offer"
            success="Thank you! One of our representative will contact you soon to fix an online meeting with our experts."
            fields={[
              { name: "business_name", label: "Business Name", placeholder: "Enter Business Name", required: true, autoComplete: "organization" },
              { name: "business_nature", label: "Business Nature", placeholder: "Enter Business Nature", required: true },
              { name: "business_address", label: "Business Address", placeholder: "Enter Business Address", autoComplete: "street-address", maxLength: 300 },
              { name: "name", label: "Your Name", placeholder: "Enter Your Name", required: true, autoComplete: "name" },
              { name: "designation", label: "Your Designation", placeholder: "Enter Your Designation", autoComplete: "organization-title" },
              { name: "email", label: "Your Email", placeholder: "Enter Your Email", type: "email", required: true, autoComplete: "email" },
              { name: "phone", label: "Your Contact", placeholder: "Enter Your Contact No", type: "tel", required: true, autoComplete: "tel" },
              { name: "message", label: "Key Point For Discussion/Requirments", type: "textarea" },
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
