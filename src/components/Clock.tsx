"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  // Rendered only after mount to avoid a server/client hydration mismatch.
  return (
    <div className="micro text-center leading-relaxed tabular-nums" aria-label="Local date and time">
      <div>{now ? now.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }) : " "}</div>
      <div className="opacity-60">{now ? now.toLocaleTimeString("en-GB") : " "}</div>
    </div>
  );
}
