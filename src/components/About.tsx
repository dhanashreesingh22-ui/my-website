import Reveal from "./Reveal";

const stats = [
  ["50+", "Campaigns shipped"],
  ["10M+", "Organic impressions"],
  ["3×", "Avg. engagement lift"],
  ["6 yrs", "In social & content"],
];

export default function About() {
  return (
    <section id="about" className="border-t border-ink/15 bg-paper px-5 py-24 md:px-8 md:py-36">
      <div className="micro mb-10 flex justify-between text-ink/50">
        <span>/ About</span>
        <span>02 — About</span>
      </div>
      <Reveal>
        <p className="max-w-6xl text-[clamp(2rem,4.8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          I&apos;m a marketing strategist who <span className="serif">makes things people actually want to watch.</span>{" "}
          Strategy gives the work direction; content gives it a pulse. I plan, shoot, write and measure social campaigns
          that move people <span className="text-accent">and</span> numbers.
        </p>
      </Reveal>
      <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-ink/15 pt-8 md:grid-cols-4">
        {stats.map(([v, l], i) => (
          <Reveal key={l} delay={i * 80}>
            <dt className="text-5xl font-semibold tracking-[-0.05em] md:text-6xl">{v}</dt>
            <dd className="micro mt-2 text-ink/50">{l}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
