import { nav, site } from "@/lib/site";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="bg-ink px-5 pb-8 pt-24 text-white md:px-8 md:pt-36">
      <div className="micro mb-10 flex justify-between text-white/40">
        <span>/ Contact</span>
        <span>04 — Contact</span>
      </div>
      <Reveal>
        <h2 className="display">
          Let&apos;s make
          <br />
          something <span className="serif text-accent !text-[1.1em]">move.</span>
        </h2>
      </Reveal>
      <div className="mt-14 flex flex-wrap gap-3">
        <a
          href={`mailto:${site.email}`}
          className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-medium transition hover:bg-white hover:text-ink"
        >
          {site.email}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
        {[
          ["Instagram", site.instagram],
          ["LinkedIn", site.linkedin],
          ["TikTok", site.tiktok],
        ].map(([l, h]) => (
          <a
            key={l}
            href={h}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/30 px-7 py-4 text-sm font-medium transition hover:bg-white hover:text-ink"
          >
            {l}
          </a>
        ))}
      </div>

      <footer className="micro mt-28 flex flex-col gap-4 border-t border-white/15 pt-6 text-white/45 md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <nav className="flex gap-6">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="transition hover:text-white">
              {n.n} {n.label}
            </a>
          ))}
        </nav>
        <span>{site.location}</span>
      </footer>
    </section>
  );
}
