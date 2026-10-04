"use client";

import { useState } from "react";
import { categories, projects, type Category } from "@/lib/site";
import Reveal from "./Reveal";
import TileArt from "./TileArt";

const R = 210;
const STEP = 17; // degrees between labels

export default function Work() {
  const [active, setActive] = useState<Category>("All");
  const idx = categories.indexOf(active);
  const list = projects.filter((p) => active === "All" || p.category === active);

  return (
    <section id="work" className="relative bg-paper px-5 py-24 md:px-8 md:py-36">
      <div className="micro mb-10 flex justify-between text-ink/50">
        <span>/ Selected work</span>
        <span>01 — Work</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <div className="lg:sticky lg:top-12 lg:self-start">
          <Reveal>
            <h2 className="display !text-[clamp(5rem,13vw,11rem)]">Work.</h2>
            <div className="mt-8 flex gap-4">
              <span className="mt-2.5 h-px w-8 bg-ink" />
              <p className="max-w-[18rem] text-sm leading-relaxed text-ink/70">
                You can&apos;t use up creativity. The more you use, the more you have.
              </p>
            </div>
          </Reveal>

          {/* Circular category selector */}
          <div className="relative mt-14 h-[440px] w-[290px] overflow-hidden" role="tablist" aria-label="Project categories">
            <div
              className="absolute rounded-full border border-ink/20"
              style={{ width: R * 2, height: R * 2, left: -R, top: 220 - R }}
            />
            <div
              className="absolute rounded-full border-[3px] border-ink/70"
              style={{ width: R * 2 - 70, height: R * 2 - 70, left: -(R - 35), top: 220 - (R - 35), clipPath: "inset(0 0 0 50%)" }}
            />
            {categories.map((c, i) => {
              const a = (i - idx) * STEP;
              const on = i === idx;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(c)}
                  className={`absolute left-0 top-[220px] origin-left whitespace-nowrap text-left transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                    on ? "text-[15px] font-semibold text-ink" : "text-[13px] text-ink/40 hover:text-ink/80"
                  }`}
                  style={{
                    transform: `rotate(${a}deg) translateX(${R + 28}px) rotate(${-a}deg) translateY(-50%)`,
                    opacity: Math.abs(i - idx) > 2 ? 0 : 1,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <ul key={active} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {list.map((p, i) => (
            <li key={p.n} className={i % 2 === 1 ? "sm:mt-16" : ""}>
              <Reveal delay={i * 80}>
                <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
                  <TileArt
                    variant={p.art}
                    className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-110 group-hover:rotate-1"
                  />
                  <span className="absolute right-4 top-3 text-6xl font-semibold leading-none tracking-tighter text-white/25 mix-blend-difference">
                    {p.n}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                    <div>
                      <div className="micro text-[10px] text-accent">{p.category}</div>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight">{p.title}</h3>
                      <p className="text-xs text-white/60">{p.metric}</p>
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink transition group-hover:bg-accent group-hover:text-white">
                      ↗
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
