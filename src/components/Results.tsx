import { results } from "@/lib/site";
import Reveal from "./Reveal";

export default function Results() {
  return (
    <section id="results" className="bg-ink px-5 py-24 text-white md:px-8 md:py-36">
      <div className="micro mb-10 flex justify-between text-white/40">
        <span>/ Trust &amp; results</span>
        <span>Case studies</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <Reveal>
          <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] font-medium uppercase leading-[0.95] tracking-[-0.04em]">
            Trusted by
            <br />
            <span className="text-accent">→</span> teams <span className="serif normal-case">at scale</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-md text-white/55 md:ml-auto">
            From fast-growing startups to established brands, I partner with teams that demand performance, not just
            visuals.
          </p>
        </Reveal>
      </div>

      <ul className="no-scrollbar mt-16 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
        {results.map((r, i) => (
          <li key={r.sector} className={`min-w-[72%] shrink-0 sm:min-w-[44%] md:min-w-0 ${i % 2 ? "md:mt-12" : ""}`}>
            <Reveal delay={i * 90}>
              <article className="group flex aspect-[3/4.4] flex-col transition-transform duration-500 hover:-translate-y-2">
                <div className={`relative flex flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b ${r.tone} p-5`}>
                  <span className="micro w-fit rounded-full bg-white/20 px-3 py-1 text-[10px] backdrop-blur">{r.tag}</span>
                  <div>
                    <div className="text-[clamp(3.5rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.05em]">{r.metric}</div>
                    <p className="mt-3 max-w-[16rem] text-sm leading-snug text-white/85">{r.note}</p>
                  </div>
                </div>
                <h3 className="micro mt-4 text-[11px] text-white/80">{r.sector}</h3>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
