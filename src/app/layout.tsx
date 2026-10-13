import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ABOUT, SITE } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Providers from "@/components/Providers";
import FloatingActions from "@/components/FloatingActions";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Edusoft System Solutions", template: "%s | EduSoft System Solutions" },
  description: ABOUT.company[0],
  icons: { icon: "/img/fevicon.png" },
  openGraph: { title: SITE.name, description: ABOUT.company[0], type: "website", siteName: SITE.name },
};
export const viewport: Viewport = { themeColor: "#05070d" };

// runs before first paint: saved choice, else the OS preference
const THEME_SCRIPT = `try{var t=localStorage.getItem("edusoft-theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/img/logo-hq.png`,
    foundingDate: String(SITE.founded),
    email: SITE.emails[0],
    telephone: SITE.phones[1],
    address: { "@type": "PostalAddress", streetAddress: "Bakhtawar Hall, 1st Floor, Khawar Center", addressLocality: "Multan Cantt", addressCountry: "PK" },
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.linkedin],
  };
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`} data-theme="dark" suppressHydrationWarning>
      <body className="grain min-h-screen">
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <a href="#main" className="skip-link">Skip to content</a>
        <Providers>
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingActions />
        </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
