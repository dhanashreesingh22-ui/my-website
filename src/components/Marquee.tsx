import { skills } from "@/lib/site";

export default function Marquee() {
  const row = [...skills, ...skills];
  return (
    <section aria-label="Skills" className="overflow-hidden border-y border-ink/15 bg-paper py-6 text-ink">
      <div className="marquee">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((s, i) => (
              <li key={`${k}-${i}`} className="flex items-center whitespace-nowrap text-[clamp(1.75rem,4vw,3.5rem)] font-semibold uppercase tracking-tight">
                <span className={i % 3 === 1 ? "serif normal-case" : ""}>{s}</span>
                <span className="mx-6 text-accent md:mx-10">✺</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
