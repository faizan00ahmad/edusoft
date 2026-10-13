"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

export type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
};

type Values = Record<string, string>;
type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function check(f: Field, raw: string): string {
  const v = raw.trim();
  if (!v) return f.required ? "This field is required." : "";
  if (f.type === "email" && !EMAIL.test(v)) return "Please enter a valid email address (name@example.com).";
  if (f.type === "tel") {
    const d = v.replace(/\D/g, "");
    if (d.length < 7 || d.length > 15) return "Please enter a valid phone number (7–15 digits).";
  }
  if (f.type === "textarea" && v.length < 5) return "Please write a little more.";
  return "";
}

/** Contact-style form: labels above, inline validation on blur, focus jumps to the first problem,
 *  draft kept in the tab until sent, spam traps (honeypot + timing), clear sending/success/error states. */
export default function InquiryForm({ kind, fields, submit = "Submit", success = "Thank you! We will get back to you as soon as possible." }: { kind: string; fields: Field[]; submit?: string; success?: string }) {
  const uid = useId();
  const draftKey = `edusoft-draft-${kind}`;
  const empty = useMemo(() => Object.fromEntries(fields.map((f) => [f.name, ""])) as Values, [fields]);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [banner, setBanner] = useState("");
  const shake = useAnimationControls();
  const started = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  // restore an unsent draft (per tab)
  useEffect(() => {
    started.current = Date.now();
    let saved: Values | null = null;
    try {
      const raw = sessionStorage.getItem(draftKey);
      if (raw) saved = JSON.parse(raw);
    } catch {}
    if (saved) {
      const restore = saved;
      const t = setTimeout(() => setValues({ ...empty, ...restore }), 0);
      return () => clearTimeout(t);
    }
  }, [draftKey, empty]);
  useEffect(() => {
    if (state === "done") return;
    try {
      if (Object.values(values).some(Boolean)) sessionStorage.setItem(draftKey, JSON.stringify(values));
    } catch {}
  }, [values, draftKey, state]);

  const set = (f: Field, raw: string) => {
    let v = raw;
    if (f.type === "tel") v = v.replace(/[^\d+()\-\s]/g, ""); // keep phone numbers clean while typing
    setValues((p) => ({ ...p, [f.name]: v }));
    if (touched[f.name]) setErrors((p) => ({ ...p, [f.name]: check(f, v) }));
  };
  const blur = (f: Field) => {
    setTouched((p) => ({ ...p, [f.name]: true }));
    setErrors((p) => ({ ...p, [f.name]: check(f, values[f.name]) }));
  };
  const focusField = (name: string) => formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const next: Errors = {};
    for (const f of fields) next[f.name] = check(f, values[f.name]);
    setErrors(next);
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));
    const firstBad = fields.find((f) => next[f.name]);
    if (firstBad) {
      shake.start({ x: [0, -10, 9, -6, 4, 0], transition: { duration: 0.45 } });
      setTimeout(() => focusField(firstBad.name), 50);
      return;
    }
    setState("sending");
    setBanner("");
    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, website: fd.get("website"), elapsed: Date.now() - started.current, fields: values }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) {
        if (j.errors) {
          setErrors(j.errors);
          setState("idle");
          focusField(Object.keys(j.errors)[0]);
          return;
        }
        throw new Error(j.error || "Something went wrong. Please try again.");
      }
      try { sessionStorage.removeItem(draftKey); } catch {}
      setState("done");
    } catch (x) {
      setBanner(x instanceof Error ? x.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  const base = "w-full border bg-field px-5 py-4 text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-ink/45 focus:shadow-[0_0_0_3px_rgba(245,154,12,0.25)]";

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="ok" role="status" initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="glass grid place-items-center rounded-3xl p-10 text-center md:p-14">
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} aria-hidden className="absolute inset-0 rounded-full border-2 border-[var(--green)]" initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 1.8, delay: 0.5 + i * 0.35, repeat: 1 }} />
              ))}
              <motion.svg width="88" height="88" viewBox="0 0 52 52" fill="none" stroke="#12b862" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="relative">
                <motion.circle cx="26" cy="26" r="23" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }} />
                <motion.path d="M14 27l8 8 16-17" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.55, duration: 0.5 }} />
              </motion.svg>
            </div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="font-display mt-7 max-w-md text-2xl leading-snug">{success}</motion.p>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} onClick={() => { setValues(empty); setTouched({}); setErrors({}); setState("idle"); started.current = Date.now(); }} className="mt-8 rounded-full border border-ink/25 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[var(--orange)] hover:text-[var(--orange)]">
              Send another message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form key="form" ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" animate={shake}>
            {fields.map((f, i) => {
              const id = `${uid}-${f.name}`;
              const err = errors[f.name];
              const ok = touched[f.name] && !err && values[f.name].trim();
              return (
                <motion.div key={f.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-5% 0px" }} transition={{ delay: i * 0.05, duration: 0.6 }}>
                  <label htmlFor={id} className="mb-2 flex items-center justify-between text-[15px] font-semibold">
                    <span>{f.label} :{f.required && <span className="ml-1 text-[var(--orange)]" aria-hidden>*</span>}</span>
                    {f.type === "textarea" && <span className="text-xs font-normal tabular-nums text-ink/45">{values[f.name].length} / {f.maxLength ?? 8000}</span>}
                  </label>
                  <div className="relative">
                    {f.type === "textarea" ? (
                      <textarea id={id} name={f.name} value={values[f.name]} onChange={(e) => set(f, e.target.value)} onBlur={() => blur(f)} rows={7} maxLength={f.maxLength ?? 8000} placeholder={f.placeholder} aria-required={f.required} aria-invalid={!!err} aria-describedby={err ? `${id}-err` : undefined} className={`${base} resize-y ${err ? "border-red-500" : ok ? "border-[var(--green)]/60" : "border-ink/10 focus:border-[var(--orange)]"}`} />
                    ) : (
                      <input id={id} name={f.name} value={values[f.name]} onChange={(e) => set(f, e.target.value)} onBlur={() => blur(f)} type={f.type ?? "text"} inputMode={f.type === "tel" ? "tel" : f.type === "email" ? "email" : undefined} autoComplete={f.autoComplete ?? "off"} maxLength={f.maxLength ?? 200} placeholder={f.placeholder} aria-required={f.required} aria-invalid={!!err} aria-describedby={err ? `${id}-err` : undefined} className={`${base} pr-12 ${err ? "border-red-500" : ok ? "border-[var(--green)]/60" : "border-ink/10 focus:border-[var(--orange)]"}`} />
                    )}
                    <AnimatePresence>
                      {ok && f.type !== "textarea" && (
                        <motion.svg initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--green)]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="m5 12 5 5 9-10" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </div>
                  {err && (
                    <motion.p id={`${id}-err`} role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-sm text-red-500">
                      {err}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}

            {/* spam trap: invisible to people, tempting to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <AnimatePresence>
              {state === "error" && (
                <motion.div role="alert" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {banner}
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={state === "sending"} className="btn-shine group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-[#a02a2a] py-4 font-semibold text-white transition-colors hover:bg-[#c43434] disabled:cursor-wait disabled:opacity-80">
              {state === "sending" ? (
                <>
                  <motion.span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                  Submitting…
                </>
              ) : (
                <>
                  {state === "error" ? "Try again" : submit}
                  <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
