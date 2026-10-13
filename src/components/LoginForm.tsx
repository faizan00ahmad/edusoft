"use client";
import { useState } from "react";
import { motion } from "framer-motion";

/** User Name / Password / Login — same three controls as the live site, with a show-password toggle and a pressed state. */
export default function LoginForm({ action }: { action: string }) {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const field = "block w-full bg-[#337ab7] px-6 py-3 text-white outline-none transition-shadow placeholder:text-white/80 focus:shadow-[0_0_0_3px_rgba(245,154,12,0.6)]";
  return (
    <form method="post" action={action} onSubmit={() => setBusy(true)} className="space-y-4">
      {[0, 1].map((i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.12 }} className="relative">
          {i === 0 ? (
            <input name="user" type="text" placeholder="User Name" required autoComplete="username" aria-label="User Name" className={field} />
          ) : (
            <>
              <input name="password" type={show ? "text" : "password"} placeholder="Password" required autoComplete="current-password" aria-label="Password" className={`${field} pr-14`} />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                  {!show && <path d="M3 3l18 18" />}
                </svg>
              </button>
            </>
          )}
        </motion.div>
      ))}
      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileTap={{ scale: 0.98 }} type="submit" disabled={busy} className="btn-shine mt-4 block w-full bg-[#337ab7] py-4 text-white transition-colors hover:bg-[#286090] disabled:opacity-70">
        {busy ? "Login…" : "Login"}
      </motion.button>
    </form>
  );
}
