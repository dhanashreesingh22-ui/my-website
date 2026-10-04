"use client";

import { useRef } from "react";
import { archive } from "@/lib/site";
import TileArt from "./TileArt";

export default function Archive() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const onDown = (e: React.PointerEvent) => {
    const el = scroller.current!;
    drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down) return;
    scroller.current!.scrollLeft = d.left - (e.clientX - d.x);
  };
  const onUp = () => {
    drag.current.down = false;
    if (scroller.current) scroller.current.style.cursor = "grab";
  };

  let n = 0;
  return (
    <section id="archive" className="bg-paper py-24 md:py-36">
      <div className="px-5 md:px-8">
        <div className="micro mb-10 flex justify-between text-ink/50">
          <span>Open for any collaborations and offers</span>
          <span>03 — Playground</span>
        </div>
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto_1fr]">
          <p className="micro hidden leading-relaxed text-ink/60 md:block">
            Works I have done
            <br />
            since 2022
          </p>
          <h2 className="display whitespace-nowrap text-center !text-[clamp(3.5rem,9vw,8rem)] !normal-case !tracking-[-0.05em]">
            <span className="serif">My</span> Archive
          </h2>
          <p className="micro text-right leading-relaxed text-ink/60">
            Hold and drag
            <br />
            to discover →
          </p>
        </div>
      </div>

      <div
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="no-scrollbar mt-16 flex cursor-grab select-none gap-14 overflow-x-auto px-5 pb-4 md:px-8"
        style={{ touchAction: "pan-y" }}
      >
        {archive.map((g) => (
          <div key={g.year} className="flex shrink-0 items-end gap-4">
            <span className="mb-1 text-2xl tracking-tight text-ink/80">{g.year}</span>
            {g.items.map((it, i) => {
              const k = n++;
              const tall = k % 3 === 0;
              return (
                <figure key={it} className="shrink-0">
                  <TileArt
                    variant={k}
                    className={`rounded-sm ${tall ? "h-72 w-52" : i % 2 ? "h-44 w-60" : "h-56 w-44"} pointer-events-none`}
                  />
                  <figcaption className="micro mt-2 text-[10px] text-ink/50">
                    {String(k + 1).padStart(2, "0")} {it}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
