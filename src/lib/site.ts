export const SITE = {
  name: "EduSoft System Solutions",
  short: "EduSoft",
  tagline: "Business Consultancy & Automation since 2000",
  founded: 2000,
  url: "https://edusoftsolutions.com",
  address: "Bakhtawar Hall, 1st Floor, Khawar Center, Multan Cantt, Pakistan.",
  phones: ["+92-61-4511542", "+92-300 8481 677"],
  emails: ["info@edusoftsolutions.com", "edusoft@live.com"],
  social: {
    facebook: "https://www.facebook.com/edusoftsol/",
    instagram: "https://www.instagram.com/edusoftsol",
    linkedin: "https://www.linkedin.com/company/edusoft-system-solutions/",
    whatsapp: "https://wa.me/923008489698",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.605190440549!2d71.43879711563139!3d30.19127008182919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b33d792c0b577%3A0xc17a068cb61aa504!2sEdusoft+System+Solutions!5e0!3m2!1sen!2s!4v1507275010128",
  loginUrl: "https://edusoftsolutions.com/ContactUs/EduSoftLogin",
  feedbackUrl: "https://edusoftsolutions.com/ContactUs/Login",
};

export type CategoryKey = "retail" | "healthcare" | "enterprise" | "more";

export const CATEGORY_META: Record<
  CategoryKey,
  { title: string; short: string; color: string; glow: string; banner: string; tagline: string }
> = {
  retail: { title: "Retail Solutions", short: "Retail", color: "#f59a0c", glow: "245,154,12", banner: "/img/banner/banner-1.jpg", tagline: "Restaurants, stores, fuel stations and book shops — run on one smart system." },
  healthcare: { title: "Healthcare Solutions", short: "Healthcare", color: "#12b862", glow: "18,184,98", banner: "/img/banner/banner-3.jpg", tagline: "Pharmacies, laboratories and hospitals, fully automated and paperless." },
  enterprise: { title: "Enterprise Solutions", short: "Enterprise", color: "#2f8fe8", glow: "47,143,232", banner: "/img/banner/banner-2.jpg", tagline: "Distribution, dealerships, property, agriculture and more at corporate scale." },
  more: { title: "More Solutions", short: "More", color: "#9150a6", glow: "145,80,166", banner: "/img/banner/banner-4.jpg", tagline: "Hotels, transport, tailoring, ticketing, schools and finance — specialised tools." },
};
export const CATEGORY_ORDER: CategoryKey[] = ["retail", "healthcare", "enterprise", "more"];

/** Display names used in the navigation (match the live site). */
export const PRODUCT_NAMES: Record<string, string> = {
  "restaurant-manager": "Restaurant Manager",
  "store-manager": "Store Manager",
  "business-solution-retail": "Business Solution Retail",
  "fuel-station-manager": "Fuel Station Manager",
  "book-shop-manager": "Book Shop Manager",
  "pharma-manager": "Pharma Manager",
  labiz: "Labiz",
  hmis: "Hospital Information Management System",
  "business-solution-enterprise": "Business Solutions Enterprise",
  "business-solution-standard": "Business Solution Standard",
  "auto-dealer": "Auto Dealer Solutions",
  "property-manager": "Property Manager",
  "ginning-manager": "Ginning Manager",
  "agri-manager": "Agri Manager",
  "studio-manager": "Studio Manager",
  "business-solutions-accounts-inventory": "Business Solutions Accounts & Inventory",
  "accountant-gold": "Accountant Gold",
  "hotel-manager": "Hotel Manager",
  "transport-manager": "Transport Manager",
  "ticketing-manager": "Ticketing Manager",
  smsmanager: "SMS Manager",
  "tailor-manager": "Tailor Manager",
  "carriage-manager": "Carriage Manager",
  "edu-quill": "School Management Software",
  "scale-operator": "Scale Operator",
  "finance-manager": "Finance Manager",
};

/** Hero banners (one per product) as used on the live site's product pages. */
export const PRODUCT_BANNERS: Record<string, string> = {
  "restaurant-manager": "web-design", "store-manager": "process-automation", "business-solution-retail": "quill",
  "fuel-station-manager": "scale", "book-shop-manager": "process-automation", "pharma-manager": "product-maintenance",
  labiz: "sms", hmis: "studio", "business-solution-enterprise": "re-engineering", "business-solution-standard": "process-automation",
  "auto-dealer": "re-engineering", "property-manager": "re-engineering", "ginning-manager": "product-maintenance",
  "agri-manager": "product-maintenance", "studio-manager": "studio", "business-solutions-accounts-inventory": "process-automation",
  "accountant-gold": "re-engineering", "hotel-manager": "ticketing", "transport-manager": "scale", "ticketing-manager": "ticketing",
  smsmanager: "sms", "tailor-manager": "tailor", "carriage-manager": "scale", "edu-quill": "quill", "scale-operator": "scale",
  "finance-manager": "re-engineering",
};

export const SERVICE_ICONS: Record<string, string> = {
  "business-consultancy": "/img/service/01.png",
  "web-design-ndevelopment": "/img/service/02.png",
  "mobile-app-development": "/img/service/03.png",
};

export const SERVICE_NAV = [
  { slug: "business-consultancy", name: "Business Consultancy" },
  { slug: "web-design-ndevelopment", name: "Web Design & Development" },
  { slug: "mobile-app-development", name: "Mobile App Development" },
  { slug: "e-commerce-solution", name: "E-Commerce Solutions" },
  { slug: "product-maintenance", name: "Product Maintenance" },
];

export const TEAM = [
  { name: "Sajid Hameed", role: "CEO", photo: "/img/team/Sajjid-Sb.png" },
  { name: "Mohsin Qayyum", role: "General Manager", photo: "/img/team/Muhammad-Mohsin.png" },
  { name: "Modassir Qadeer", role: "Operations Manager", photo: "/img/team/Modassir-Qadeer.png" },
  { name: "Abdul Basit", role: "Support Head", photo: "/img/team/Abdul-Basit.png" },
  { name: "Abdul Razzaq", role: "Quality Assurance Manager", photo: "/img/team/Abdul-Razaq.png" },
  { name: "Sibtain Ahmed", role: "HR Manager", photo: "/img/team/Sibtain.png" },
];

export const ABOUT = {
  blurb:
    "EduSoft System Solutions a name of trusted Business Consultancy and Automation firm in Pakistan, serving various Business Industries since year 2000. Edusoft is engaged in providing optimized business solutions and systems to our clients according to their business needs and requirements.",
  mission:
    "We want to hunt every problem throughout the world with a worth existing solution by having innovation, perfection & efficiency in our product.",
  vision: "We intend to provide our customers optimized solutions.",
  company: [
    "EduSoft System Solutions a name of trusted Business Consultancy and Automation firm in Pakistan, serving various Business Industries since year 2000.",
    "Edusoft is engaged in providing optimized business solutions and systems to our clients according to their business needs and requirements.",
    "We proudly maintain pool of hundreds of clients from different industries and segments providing a wide variety of not only desktop but web based tailored ERP solutions developing efficiency, productivity and strong internal controls.",
    "Our qualified and competent team remains engaged in producing quality solutions on global standards.",
  ],
  why: [
    "We have more than 20 years of working experience",
    "Our products cater to almost every business present out there",
    "Multi functional products, catering to the entire need of the business",
    "Customization option available with our entire products",
    "In house development",
    "Free training for the entire line of products",
    "Both online and onsite training facility available",
    "Updates on regular basis for even more better experience",
    "Website Designing and Website Development at very reasonable pricing",
    "Quick & efficient after sales services",
    "Separate departments means more specialized work",
    "Economical pricing for our entire services",
    "Easily accessible location of the Head Office",
    "Lifetime activated software",
  ],
  mgmtIntro: [
    "Highly qualified and experienced Programmers and System Analysts",
    "Accounting and Finance Professionals serving our clients as Functional Consultants",
    "Highly qualified and well versed Business Analyst including Business Process Reengineering, Business Automation Experts",
  ],
};

export const CEO = {
  name: "Muhammad Sajid Hameed",
  role: "CEO",
  photo: "/img/team/Sajjid-Sb.png",
  paragraphs: [
    "EduSoft System Solutions is not only a name or an organization. It has enthusiasm in it, an aspiration to grow, serve & having a capacity to go through conundrum situations and to become luminous. This organization has a history of responsible business conduct. We have a cogent believe on “Allah”. Business is not all about earning profits measured in numbers but also, as importantly, about how those numbers are achieved. For our clients EduSoft Solutions is not only a name but a prodigy which stands for its commitment, customer care, integrity, product knowledge, trouble free services and competitive prices. All this have been achieved by the grace of Allah almighty & untiring hard work of our team. We believe in long come strong relationship with our clients and perfection in our products.",
    "In all these years, we have gathered and trained some of the finest people who are now part of EduSoft System Solutions. We have taught all our employees to treat each and every customer equally and never disappoint them, whether they are part of our organization or are just there to gather some kind of information. By the grace of Allah, we have earned some remarkable success in customer satisfaction and all the positive word of mouth have given us more courage and even more confidence to get going for all these years.",
    "We are always looking for new and advanced ways in our product development. Our team is always ready to take any challenge i.e. put in front of them. For the past sometime, we have started working on international market for website designing and website development and it has shown quite immense positive response. We have a separate team which deals with all the international clients and do their job because we believe in quality and nothing gives our client more satisfaction that specialized solutions.",
    "We give our very best efforts and make sure that client can benefit from our services, in a way that it was meant to be benefitted from. Firstly, it is because of almighty Allah and secondly it is because of such hard working employees which have lead EduSoft System Solutions to the place which it is now and still has a lot of potential to grow in the foreseeable future. It has been almost 14 years till now and we hope that for all the upcoming years, we work with such dedication and keep more and more clients happy. Our clients and employees means equal to me than my very own family. The platform which we are standing now wouldn’t be possible if it weren’t the support and dedication of our hard working employees. These people are the reason I can stand tall and proudly tell everyone that I am part of this wonderful organization named EduSoft System Solutions.",
  ],
};

export const FOOTER_LINKS = [
  { label: "Sitemap", href: "/sitemap" },
  { label: "Career", href: "/career" },
  { label: "Media & News", href: "/media-news" },
  { label: "Privacy Policy", href: "/about/privacy-policy" },
];


/** Home hero slides — text copied verbatim from the live site's banner images. */
export const HERO_SLIDES: Record<CategoryKey, { n: number; title: string; text: string; cards: { name: string; slug: string; text: string }[] }> = {
  retail: {
    n: 1,
    title: "RETAIL SOLUTIONS",
    text: "Small Shop or Retail Chain, Manage your business with a powerful Retail Management System having all your industry needs.",
    cards: [
      { name: "Store Manager", slug: "store-manager", text: "Perfect software to manage inventory and keep track of commodity present in your departmental store." },
      { name: "Restaurant Manager", slug: "restaurant-manager", text: "All in One Product for Restaurant Business Ventures catering all complex business needs." },
      { name: "Business Solution Retail", slug: "business-solution-retail", text: "We have designed this software for retail industries for any type of business ." },
    ],
  },
  enterprise: {
    n: 2,
    title: "ENTERPRISE SOLUTIONS",
    text: "Enterprise Resource Planning (ERP) Solution completely integrated and modular based for a competent Decision Support ..",
    cards: [
      { name: "Business Solutions (Enterprise)", slug: "business-solution-enterprise", text: "We have designed this software for corporate industries for any type of business ..." },
      { name: "Auto Dealer Solutions", slug: "auto-dealer", text: "Perfect software to manage inventory and keep track of commodity present in your departmental store..." },
      { name: "Property Manager", slug: "property-manager", text: "This particular software is to provide you with all the relevant details in regard to your plotting,.." },
    ],
  },
  healthcare: {
    n: 3,
    title: "HEALTHCARE SOLUTIONS",
    text: "A complete range of Automated Solutions for Healthcare. Promoting a complete Paper-less Work Environment with high efficiency.",
    cards: [
      { name: "Labiz", slug: "labiz", text: "A complete solution designed to cater needs of medical diagnostic laboratories working independently ..." },
      { name: "Pharma Manager", slug: "pharma-manager", text: "A Comprehensive solution to manage Medical Laboratories/Diagnostic Centers inside hospitals ..." },
      { name: "Hospital Managment", slug: "hmis", text: "Fully Automated and Paperless Hospital Management, Available in Web Based ..." },
    ],
  },
  more: {
    n: 4,
    title: "MORE SOLUTIONS",
    text: "We proudly maintain pool of hundreds of clients from different industries and segments providing a wide variety of not only desktop but web ...",
    cards: [
      { name: "Accountant Gold", slug: "accountant-gold", text: "" },
      { name: "Hotel Manager", slug: "hotel-manager", text: "" },
      { name: "Transport manager", slug: "transport-manager", text: "" },
    ],
  },
};

/** Breadcrumb labels exactly as shown on the live product pages (where they differ from the menu). */
export const BREADCRUMB_NAMES: Record<string, string> = {
  hmis: "HIMS",
  "pharma-manager": "Pharmacy",
  "auto-dealer": "Auto Dealer",
  "business-solution-standard": "Business Solution Standards",
  "business-solution-enterprise": "Business Solution Enterprise",
  "business-solutions-accounts-inventory": "Business Solution Accounts & Inventory",
};
