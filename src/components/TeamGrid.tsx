"use client";
import Image from "next/image";
import { Reveal, SpotCard } from "./ui";

export default function TeamGrid({ team, className = "" }: { team: { name: string; role: string; photo: string }[]; className?: string }) {
  return (
    <ul className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {team.map((m, i) => (
        <Reveal as="li" key={m.name} delay={(i % 3) * 0.1}>
          <SpotCard className="group relative aspect-[4/5] overflow-hidden rounded-3xl" tilt={5}>
            <Image src={m.photo} alt={m.name} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-x-0 bottom-0 translate-y-3 p-6 transition-transform duration-500 group-hover:translate-y-0">
              <div className="mb-2 h-[3px] w-10 bg-[var(--orange)] transition-all duration-500 group-hover:w-24" />
              <h3 className="font-display text-xl font-semibold">{m.name}</h3>
              <p className="text-sm uppercase tracking-widest text-[var(--orange)]">{m.role}</p>
            </div>
          </SpotCard>
        </Reveal>
      ))}
    </ul>
  );
}
