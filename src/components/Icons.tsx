type P = { className?: string };
const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

export const Facebook = ({ className }: P) => (
  <svg {...base} className={className}><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.5V13h2.9v8h3.1z" /></svg>
);
export const Instagram = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21 8.3c-.1-1.5-.4-2.800-1.500-3.900S17.200 2.900 15.700 2.800c-1.600-.1-6.400-.1-8 0C6.200 2.900 4.900 3.200 3.800 4.300S2.900 6.800 2.800 8.300c-.1 1.600-.1 6.400 0 8 .1 1.500.4 2.800 1.500 3.900s2.400 1.400 3.900 1.500c1.600.1 6.400.1 8 0 1.500-.1 2.800-.4 3.900-1.500s1.400-2.400 1.500-3.900c.1-1.600.1-6.400 0-8zm-2 9.700a3.300 3.300 0 0 1-1.900 1.900c-1.300.5-4.300.4-5.700.4s-4.400.1-5.700-.4A3.300 3.300 0 0 1 3.900 18c-.5-1.300-.4-4.300-.4-5.700s-.1-4.400.4-5.700a3.300 3.300 0 0 1 1.900-1.900c1.300-.5 4.300-.4 5.700-.4s4.400-.1 5.700.4A3.300 3.300 0 0 1 19 6.600c.5 1.300.4 4.300.4 5.700s.1 4.400-.4 5.700z" /></svg>
);
export const LinkedIn = ({ className }: P) => (
  <svg {...base} className={className}><path d="M6.940 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.480H3V21h4V8.480zm6.320 0H9.340V21h3.940v-6.570c0-3.660 4.770-4 4.770 0V21H22v-7.930c0-6.170-7.060-5.940-8.720-2.910l.04-1.680z" /></svg>
);
export const WhatsApp = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm5.800 14.200c-.2.700-1.400 1.300-1.900 1.300-.5.100-1.100.100-1.800-.1a16 16 0 0 1-1.600-.6c-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.3.500-.4.400c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1.100c.2-.3.400-.2.600-.1l2 1c.3.100.5.200.5.300.1.200.1.800-.1 1.500z" /></svg>
);
export const Arrow = ({ className }: P) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Chevron = ({ className }: P) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><path d="m6 9 6 6 6-6" /></svg>
);
export const Quote = ({ className }: P) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden><path d="M10 7H5.500A1.500 1.500 0 0 0 4 8.500V13a1.500 1.500 0 0 0 1.500 1.500H8c0 2-1 3-3 3.500V20c4-.5 6-3 6-7V8.500A1.500 1.500 0 0 0 10 7zm9 0h-4.500A1.500 1.500 0 0 0 13 8.500V13a1.500 1.500 0 0 0 1.500 1.500H17c0 2-1 3-3 3.500V20c4-.5 6-3 6-7V8.500A1.500 1.500 0 0 0 19 7z" /></svg>
);
export const Phone = ({ className }: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><path d="M22 16.900v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2z" /></svg>
);
export const Mail = ({ className }: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
);
export const Pin = ({ className }: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const Download = ({ className }: P) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
);
export const Search = ({ className }: P) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.500-3.500" /></svg>
);
