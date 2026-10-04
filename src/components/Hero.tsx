"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Clock from "./Clock";
import { nav, site } from "@/lib/site";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const forms = ["Sphere", "Ridge", "Cube"];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [form, setForm] = useState(0);
  const [gl, setGl] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setGl(hasWebGL());
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const onScroll = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      progress.current = p;
      setForm(Math.min(2, Math.floor(p * 3)));
    };
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={wrap} id="top" className="relative h-[320vh] bg-ink text-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* WebGL centerpiece */}
        <div className="absolute inset-0" aria-hidden>
          {gl ? (
            <HeroScene progress={progress} pointer={pointer} reduced={reduced} />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,#ff5a1f55,transparent_45%)]" />
          )}
        </div>

        {/* Top bar */}
        <header className="pointer-events-none absolute inset-x-0 top-0 z-10 grid grid-cols-3 items-start px-5 pt-5 md:px-8 md:pt-7">
          <a href="#top" className="pointer-events-auto micro font-semibold [font-variant-caps:all-small-caps] text-[13px] tracking-[0.14em]">
            {site.name}
            <span className="block opacity-50 normal-case tracking-normal text-[11px] font-normal">{site.role}</span>
          </a>
          <Clock />
          <div className="flex justify-end">
            <span className="pointer-events-auto micro inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
          </div>
        </header>

        {/* Headline */}
        <h1 className="pointer-events-none absolute inset-x-0 top-[44%] z-10 -translate-y-1/2 px-5 md:top-1/2 md:px-8">
          <span className="display block text-white max-md:!text-[17vw]">Ideas that</span>
          <span className="display serif block pl-[8vw] text-accent !text-[clamp(5rem,16vw,14rem)] md:pl-[12vw] !leading-[0.8]">move</span>
          <span className="display block text-right text-white max-md:!text-[17vw]">People</span>
        </h1>

        {/* Bottom area */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 md:px-8 md:pb-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-3">
              <div className="micro hidden max-w-[11rem] leading-relaxed text-white/70 sm:block">
                Marketing strategy &amp; social content that people choose to share.
              </div>
              <div className="hidden gap-3 md:flex">
                <GlassStat value="50+" label="Campaigns delivered" />
                <GlassStat value="3×" label="Avg. engagement lift" />
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-ink"
              >
                View Work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-white/40 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-ink"
              >
                Get in Touch
              </a>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
            <nav className="micro flex gap-6 md:gap-12">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="group flex gap-2 text-white/60 transition hover:text-white">
                  <span className="text-accent">{n.n}</span>
                  <span className="hidden sm:inline">{n.label}</span>
                </a>
              ))}
            </nav>
            <div className="micro hidden items-center gap-3 text-white/60 sm:flex" aria-live="polite">
              {forms.map((f, i) => (
                <span key={f} className={`transition ${i === form ? "text-white" : "opacity-40"}`}>
                  0{i + 1} {f}
                </span>
              ))}
              <span className="hidden sm:inline text-white/40">· Scroll</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlassStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
      <div className="text-2xl font-semibold leading-none tracking-tight">{value}</div>
      <div className="micro mt-1.5 text-[10px] text-white/60">{label}</div>
    </div>
  );
}
