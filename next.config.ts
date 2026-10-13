import type { NextConfig } from "next";

/** Old ASP.NET URLs → new routes, so existing links and Google results keep working. */
const old = (from: string, to: string) => ({ source: from, destination: to, permanent: true });
const retail = { RestaurantManager: "restaurant-manager", StoreManager: "store-manager", BusinessSolutionRetail: "business-solution-retail", FuelStationManager: "fuel-station-manager", BookShopManager: "book-shop-manager" };
const health = { PharmaManager: "pharma-manager", Labiz: "labiz", HMIS: "hmis" };
const enterprise = { BusinessSolutionEnterprise: "business-solution-enterprise", BusinessSolutionStandard: "business-solution-standard", AutoDealer: "auto-dealer", PropertyManager: "property-manager", GinningManager: "ginning-manager", AgriManager: "agri-manager", StudioManager: "studio-manager", BusinessSolutionsAccountsInventory: "business-solutions-accounts-inventory" };
const more = { AccountantGold: "accountant-gold", HotelManager: "hotel-manager", TransportManager: "transport-manager", TicketingManager: "ticketing-manager", SMSManager: "smsmanager", TailorManager: "tailor-manager", CarriageManager: "carriage-manager", EduQuill: "edu-quill", ScaleOperator: "scale-operator", FinanceManager: "finance-manager" };
const services = { BusinessConsultancy: "business-consultancy", WebDesignNDevelopment: "web-design-ndevelopment", MobileAppDevelopment: "mobile-app-development", eCommerceSolution: "e-commerce-solution", ProductMaintenance: "product-maintenance" };

const group = (dir: string, cat: string, hub: string, map: Record<string, string>) => [
  old(`/${dir}/${hub}`, `/solutions/${cat}`),
  ...Object.entries(map).map(([k, v]) => old(`/${dir}/${k}`, `/solutions/${cat}/${v}`)),
];

const nextConfig: NextConfig = {
  images: { qualities: [75, 95] },
  env: { NEXT_PUBLIC_YEAR: String(new Date().getFullYear()) },
  async redirects() {
    return [
      old("/Home", "/"),
      { source: "/career", destination: "/", permanent: false },
      { source: "/media-news", destination: "/", permanent: false },
      old("/Home/Index", "/"),
      old("/About/VisionNMission", "/about/vision-mission"),
      old("/About/CEOMessage", "/about/ceo-message"),
      old("/About/ManagementTeam", "/about/management-team"),
      old("/About/PrivacyPolicy", "/about/privacy-policy"),
      ...group("RetailSolutions", "retail", "RetailSolution", retail),
      ...group("HealthCare", "healthcare", "HealthCareSolutions", health),
      ...group("EnterpriseSolutions", "enterprise", "EnterpriseSolution", enterprise),
      ...group("MoreSolutions", "more", "OtherSolutions", more),
      ...Object.entries(services).map(([k, v]) => old(`/OurServices/${k}`, `/services/${v}`)),
      old("/DesignPortfolio/Index", "/portfolio"),
      old("/ContactUs", "/contact"),
      old("/ContactUs/Index", "/contact"),
      old("/FreeOffer", "/free-offer"),
      old("/ContactUs/Login", "/feedback"),
      old("/ContactUs/EduSoftLogin", "/login"),
    ];
  },
};

export default nextConfig;
