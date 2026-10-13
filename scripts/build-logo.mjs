// High-quality logo rebuild. Keeps the ORIGINAL artwork exactly (same shapes, colours, fonts) but removes the blur that comes
// from stretching a 141×44px picture: enlarge 10× with Lanczos, then steepen the soft anti-aliased edge so outlines are crisp.
// Usage: node scripts/build-logo.mjs   →  public/img/logo-hq.png (white tagline) + public/img/logo-hq-light.png (navy tagline)
import sharp from "sharp";
import fs from "node:fs";

const SRC = process.argv[2] ?? "https://edusoftsolutions.com/img/logo.png";
const K = 10;
const buf = SRC.startsWith("http") ? Buffer.from(await (await fetch(SRC)).arrayBuffer()) : fs.readFileSync(SRC);

const trimmed = await sharp(buf).ensureAlpha().trim({ threshold: 10 }).toBuffer();

// straight-alpha pixels need premultiplying while resampling, otherwise dark fringes appear on the edges
const { data: raw, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const pm = Buffer.alloc(raw.length);
for (let i = 0; i < raw.length; i += 4) {
  const a = raw[i + 3] / 255;
  pm[i] = raw[i] * a; pm[i + 1] = raw[i + 1] * a; pm[i + 2] = raw[i + 2] * a; pm[i + 3] = raw[i + 3];
}
const big = await sharp(pm, { raw: { width: info.width, height: info.height, channels: 4 } })
  .resize(info.width * K, info.height * K, { kernel: "lanczos3" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const smooth = (a, lo, hi) => {
  const t = Math.min(1, Math.max(0, (a - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};

const make = (navyTagline) => {
  const out = Buffer.alloc(big.data.length);
  for (let i = 0; i < big.data.length; i += 4) {
    const a0 = big.data[i + 3] / 255;
    if (a0 < 0.02) continue;
    // un-premultiply
    let r = Math.min(255, big.data[i] / a0), g = Math.min(255, big.data[i + 1] / a0), b = Math.min(255, big.data[i + 2] / a0);
    // crisp edge: the original 1-pixel soft ramp becomes a ~2-pixel ramp at the new size
    const a = smooth(a0, 0.3, 0.7);
    if (navyTagline) {
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      if (mn > 150 && mx - mn < 70) {
        const t = Math.min(1, (mn - 150) / 90);
        r = r * (1 - t) + 11 * t; g = g * (1 - t) + 18 * t; b = b * (1 - t) + 32 * t;
      }
    }
    out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: big.info.width, height: big.info.height, channels: 4 } }).png({ compressionLevel: 9 });
};

await make(false).toFile("public/img/logo-hq.png");
await make(true).toFile("public/img/logo-hq-light.png");
console.log(`done: ${big.info.width}×${big.info.height}px (aspect ${(big.info.width / big.info.height).toFixed(3)})`);
