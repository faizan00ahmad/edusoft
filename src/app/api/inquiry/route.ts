import { NextResponse } from "next/server";

/** Receives contact / free-offer submissions.
 *  Validates on the server (never trust the browser), rate-limits per IP, drops bots (honeypot + too-fast submits),
 *  then forwards to INQUIRY_WEBHOOK_URL if configured, otherwise logs. Wire real email delivery here when ready. */

const LIMITS: Record<string, number> = { name: 120, email: 160, phone: 40, message: 8000, business_name: 160, business_nature: 160, business_address: 300, designation: 120 };
const REQUIRED: Record<string, string[]> = {
  contact: ["name", "email", "phone", "message"],
  "free-offer": ["business_name", "business_nature", "name", "email", "phone"],
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// naive in-memory limiter: 5 submissions / 10 min / IP (resets on server restart; use Redis/Upstash for multi-instance)
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000;
const MAX = 5;

export async function POST(req: Request) {
  let body: { kind?: string; website?: string; elapsed?: number; fields?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // bots: hidden field filled, or form submitted impossibly fast → pretend success
  if (body.website || (typeof body.elapsed === "number" && body.elapsed < 1500)) return NextResponse.json({ ok: true });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= MAX) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please wait a few minutes or call us." }, { status: 429 });
  }

  const kind = body.kind && REQUIRED[body.kind] ? body.kind : "contact";
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.fields ?? {})) {
    if (!(k in LIMITS)) continue;
    fields[k] = String(v ?? "").replace(/\s+/g, " ").trim().slice(0, LIMITS[k]);
    if (k === "message") fields[k] = String(v ?? "").replace(/\r\n/g, "\n").trim().slice(0, LIMITS.message);
  }

  const errors: Record<string, string> = {};
  for (const k of REQUIRED[kind]) if (!fields[k]) errors[k] = "This field is required.";
  if (fields.email && !EMAIL.test(fields.email)) errors.email = "Please enter a valid email address.";
  if (fields.phone) {
    const digits = fields.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15 || /[^\d+()\-\s]/.test(fields.phone)) errors.phone = "Please enter a valid phone number.";
  }
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const payload = { kind, fields, at: new Date().toISOString(), ip };
  const hook = process.env.INQUIRY_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(8000) });
      if (!r.ok) throw new Error(String(r.status));
    } catch {
      return NextResponse.json({ ok: false, error: "We couldn't deliver your message just now. Please try again or call us." }, { status: 502 });
    }
  } else {
    console.log("[inquiry]", JSON.stringify(payload));
  }

  hits.set(ip, [...recent, now]);
  return NextResponse.json({ ok: true });
}
