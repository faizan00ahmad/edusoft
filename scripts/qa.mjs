// Crawl QA: node scripts/qa.mjs http://localhost:3100
// Walks every internal link from "/", then checks status codes, <title>, <h1>, image alt/URLs, in-page anchors and junk text.
import * as cheerio from "cheerio";

const BASE = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const seen = new Map(); // path -> status
const queue = ["/"];
const problems = [];
const imgs = new Set();
const external = new Set();
const add = (p, msg) => problems.push(`${p}  →  ${msg}`);

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  let res;
  try {
    res = await fetch(BASE + path, { redirect: "manual" });
  } catch (e) {
    seen.set(path, "ERR");
    add(path, "fetch failed " + e.message);
    continue;
  }
  seen.set(path, res.status);
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get("location") ?? "";
    if (loc.startsWith("/")) queue.push(loc.split("#")[0]);
    else if (loc) external.add(loc);
    continue;
  }
  if (res.status !== 200) {
    add(path, `status ${res.status}`);
    continue;
  }
  if (!(res.headers.get("content-type") ?? "").includes("html")) continue;
  const html = await res.text();
  const $ = cheerio.load(html);

  if (!$("title").text().trim()) add(path, "missing <title>");
  const h1 = $("h1").length;
  if (h1 !== 1) add(path, `${h1} <h1> elements (want 1)`);
  if (!$('meta[name="description"]').attr("content")) add(path, "missing meta description");
  if (/undefined|\[object Object\]|NaN/.test($("main").text())) add(path, "junk text (undefined / [object Object] / NaN)");

  $("img").each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined) add(path, `img without alt: ${$(el).attr("src")?.slice(0, 70)}`);
    const s = $(el).attr("src");
    if (s) imgs.add(s.startsWith("http") ? s : s);
  });
  const ids = new Set($("[id]").map((_, e) => $(e).attr("id")).get());
  $("a[href]").each((_, el) => {
    const h = $(el).attr("href");
    if (!h || h.startsWith("mailto:") || h.startsWith("tel:") || h.startsWith("javascript:")) return;
    if (h.startsWith("#")) {
      if (h.length > 1 && !ids.has(h.slice(1))) add(path, `anchor ${h} has no target`);
      return;
    }
    if (h.startsWith("http")) {
      if (!h.startsWith(BASE)) external.add(h);
      return;
    }
    if ($(el).text().trim() === "" && !$(el).attr("aria-label")) add(path, `link without accessible name → ${h}`);
    queue.push(h.split("#")[0].split("?")[0] || "/");
  });
  $("button").each((_, el) => {
    if (!$(el).text().trim() && !$(el).attr("aria-label") && !$(el).attr("title")) add(path, "button without accessible name");
  });
}

// images
let bad = 0;
for (const src of imgs) {
  const url = src.startsWith("http") ? src : BASE + src;
  try {
    const r = await fetch(url, { method: "GET" });
    if (r.status !== 200) {
      bad++;
      add("(image)", `${r.status} ${src.slice(0, 90)}`);
    }
  } catch {
    bad++;
    add("(image)", `fetch failed ${src.slice(0, 90)}`);
  }
}

const pages = [...seen.entries()];
console.log(`pages crawled: ${pages.length}  (200 OK: ${pages.filter(([, s]) => s === 200).length})`);
console.log(`images checked: ${imgs.size}  (broken: ${bad})`);
console.log(`external links: ${external.size}`);
for (const e of [...external].slice(0, 12)) console.log("  ", e);
console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n` + problems.join("\n") : "\nNo problems found.");
process.exitCode = problems.length ? 1 : 0;
