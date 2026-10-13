// Scrapes edusoftsolutions.com into src/data/*.json and downloads images into public/img.
// Usage: node scripts/scrape.mjs
import * as cheerio from "cheerio";
import fs from "node:fs/promises";
import path from "node:path";

const BASE = "https://edusoftsolutions.com";
const ROOT = process.cwd();
const DATA = path.join(ROOT, "src", "data");
const IMG = path.join(ROOT, "public");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clean = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
const slugify = (s) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const CATEGORIES = {
  retail: { title: "Retail Solutions", hub: "RetailSolutions/RetailSolution", items: ["RestaurantManager", "StoreManager", "BusinessSolutionRetail", "FuelStationManager", "BookShopManager"] },
  healthcare: { title: "Healthcare Solutions", hub: "HealthCare/HealthCareSolutions", items: ["PharmaManager", "Labiz", "HMIS"], dir: "HealthCare" },
  enterprise: { title: "Enterprise Solutions", hub: "EnterpriseSolutions/EnterpriseSolution", items: ["BusinessSolutionEnterprise", "BusinessSolutionStandard", "AutoDealer", "PropertyManager", "GinningManager", "AgriManager", "StudioManager", "BusinessSolutionsAccountsInventory"], dir: "EnterpriseSolutions" },
  more: { title: "More Solutions", hub: "MoreSolutions/OtherSolutions", items: ["AccountantGold", "HotelManager", "TransportManager", "TicketingManager", "SMSManager", "TailorManager", "CarriageManager", "EduQuill", "ScaleOperator", "FinanceManager"], dir: "MoreSolutions" },
};
CATEGORIES.retail.dir = "RetailSolutions";
const SERVICES = ["BusinessConsultancy", "WebDesignNDevelopment", "MobileAppDevelopment", "eCommerceSolution", "ProductMaintenance"];

const images = new Set();
const img = (src) => {
  if (!src) return null;
  const u = new URL(src, BASE);
  if (!/^\/(img|downloads|portfolio)\//.test(u.pathname)) return u.href;
  images.add(u.pathname);
  return u.pathname;
};

async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 EdusoftMigration" } });
      if (r.ok) return r;
      if (r.status === 404) return null;
    } catch {}
    await sleep(1500 * (i + 1));
  }
  console.warn("FAILED", url);
  return null;
}
async function page(p) {
  const r = await get(`${BASE}/${p}`);
  await sleep(250);
  return r ? cheerio.load(await r.text()) : null;
}

function parsePanels($, root) {
  return $(root).find(".panel").map((_, p) => {
    const title = clean($(p).find(".panel-title").text());
    const blocks = [];
    $(p).find(".panel-body").first().find("h3,h4,h5,p,ul").each((_, el) => {
      const t = el.tagName;
      if (t === "ul") {
        if ($(el).parents("ul").length) return;
        const items = $(el).children("li").map((_, li) => clean($(li).text())).get().filter(Boolean);
        if (items.length) blocks.push({ type: "list", items });
      } else {
        const text = clean($(el).text());
        if (text) blocks.push({ type: t === "p" ? "p" : "h", text });
      }
    });
    return { title: title.replace(/:$/, ""), blocks };
  }).get();
}

async function parseProduct(category, dir, key) {
  const $ = await page(`${dir}/${key}`);
  if (!$) return null;
  const h2 = $(".common-heading h2").first();
  const accent = clean(h2.children("span").first().text());
  const title = clean(h2.clone().children().remove().end().text());
  const desc = [];
  $(".rochure-desc").first().contents().each((_, n) => { const t = clean($(n).text()); if (t) desc.push(t); });
  const modules = $(".icon-container").map((_, e) => ({
    label: clean($(e).find(".icon-text").text()),
    icon: img($(e).find("img").attr("src")),
  })).get().filter((m) => m.label);
  const accordion = parsePanels($, "#accordion");
  const modulesHeading = clean($("h2.top-h").first().text());
  // Clients: every <li> that is not inside the accordion or nav and appears after the "Valuable Clients" heading
  const clients = [];
  let seen = false;
  $("body *").each((_, el) => {
    if (el.tagName === "h2" && /Valuable Clients/i.test($(el).text())) { seen = true; return; }
    if (seen && el.tagName === "li" && !$(el).parents("#accordion, nav, footer, .navbar, header").length) {
      const t = clean($(el).text());
      if (t && !clients.includes(t)) clients.push(t);
    }
  });
  const pdf = $("a[href$='.pdf']").first().attr("href");
  const modPrefix = modulesHeading.replace(/\s*Operational Modules:?$/i, "");
  return {
    slug: slugify(key.replace(/([a-z])([A-Z])/g, "$1-$2")),
    key, category, title: title || modPrefix, accent, modulesHeading, description: desc,
    modules, accordion, clients: clients.filter((c) => !/^(home|about|retail|sitemap|career|media)/i.test(c)),
    brochure: pdf ? img(pdf) : null,
    sourceUrl: `${BASE}/${dir}/${key}`,
  };
}

async function main() {
  await fs.mkdir(DATA, { recursive: true });

  // ---- Home
  const $h = await page("Home");
  const testimonials = $h(".single-tesm-slider").map((_, e) => {
    const a = $h(e).find(".person-desig a");
    const [name, company] = a.html().split(/<br\s*\/?>/i).map((s) => clean(cheerio.load(s || "").text()));
    return { quote: clean($h(e).find(".sn-tesm-content p").text()), name, company: company || "", photo: img($h(e).find("img").attr("src")) };
  }).get();
  const sponsors = [...new Set($h("img").map((_, e) => $h(e).attr("src")).get().filter((s) => /\/img\/sponsor\//.test(s)))].map(img);

  const $p = await page("About/PrivacyPolicy");
  const privacy = $p("p, li, h2, h3, h4").map((_, e) => ({ tag: e.tagName, text: clean($p(e).text()) })).get().filter((b) => b.text);

  // ---- Solutions
  const products = [];
  const categories = {};
  for (const [cat, c] of Object.entries(CATEGORIES)) {
    const $hub = await page(c.hub);
    const intro = $hub ? $hub("h2, p").map((_, e) => clean($hub(e).text())).get().filter((t) => t.length > 60).slice(0, 3) : [];
    const cards = $hub ? $hub("h3, h2, h4").map((_, e) => {
      const a = $hub(e).closest("div").find("a[href*='/']").first().attr("href") || "";
      return { title: clean($hub(e).text()), href: a, blurb: clean($hub(e).nextAll("p").first().text()) };
    }).get() : [];
    categories[cat] = { slug: cat, title: c.title, intro, cards, items: [] };
    for (const key of c.items) {
      console.log("→", cat, key);
      const p = await parseProduct(cat, c.dir, key);
      if (p) { products.push(p); categories[cat].items.push(p.slug); }
    }
  }

  // ---- Services & misc
  const services = [];
  for (const key of SERVICES) {
    console.log("→ service", key);
    const $s = await page(`OurServices/${key}`);
    if (!$s) continue;
    const sections = $s(".about-area-left").map((_, sec) => {
      const el = $s(sec);
      const blocks = el.find(".about-desc").first().children("h4, h3, p").map((_, b) => ({ tag: b.tagName === "p" ? "p" : "h", text: clean($s(b).text()) })).get().filter((x) => x.text);
      return { title: clean(el.find("h2").first().text()), image: img(el.find("img").first().attr("src")), blocks };
    }).get();
    services.push({ slug: slugify(key.replace(/([a-z])([A-Z])/g, "$1-$2")), key, title: sections[0]?.title ?? key, sections });
  }
  const misc = {};
  {
    const $x = await page("DesignPortfolio/Index");
    misc.portfolio = [];
    $x("img[src*='/portfolio/']").each((_, e) => {
      const el = $x(e);
      misc.portfolio.push({ title: clean(el.closest("div").parent().text()).replace(/Our Successful.*$/, "").trim(), src: img(el.attr("src")) });
    });
    misc.portfolio = misc.portfolio.map((p, i) => ({ ...p, title: ["Logo Design", "Website Design & Development", "Pdf Designs"][i] || p.title }));
  }
  images.add("/Free-download.jpg");
  for (const k of ["service/04.png", "service/05.png", "service/06.png"]) images.add("/img/" + k);

  const write = (n, d) => fs.writeFile(path.join(DATA, n), JSON.stringify(d, null, 2));
  await write("products.json", products);
  await write("categories.json", categories);
  await write("services.json", services);
  await write("testimonials.json", testimonials);
  await write("misc.json", { ...misc, privacy, sponsors });

  // ---- Images
  for (const extra of ["/img/logo.png", "/img/fevicon.png", "/img/client/quote.png", ...Array.from({ length: 4 }, (_, i) => `/img/banner/banner-${i + 1}.jpg`)]) images.add(extra);
  for (const n of ["process-automation", "product-maintenance", "quill", "re-engineering", "scale", "sms", "studio", "tailor", "ticketing", "web-design"]) images.add(`/img/banner/${n}.jpg`);
  console.log("downloading", images.size, "assets");
  for (const p of images) {
    const out = path.join(IMG, p);
    try { await fs.access(out); continue; } catch {}
    const r = await get(BASE + p, 2);
    if (!r) continue;
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, Buffer.from(await r.arrayBuffer()));
    await sleep(60);
  }
  console.log(`done: ${products.length} products, ${services.length} services, ${testimonials.length} testimonials`);
}
main();
