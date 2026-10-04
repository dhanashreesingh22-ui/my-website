import type { CSSProperties } from "react";

// Pure-CSS "render" placeholders in the spirit of dark 3D tiles. Swap for real images/videos any time.
const arts: CSSProperties[] = [
  {
    background:
      "radial-gradient(circle at 70% 30%, #ff5a1f 0 8%, transparent 30%), repeating-linear-gradient(115deg,#0d0d0d 0 12px,#262626 12px 16px,#0d0d0d 16px 30px)",
  },
  {
    background:
      "radial-gradient(circle at 40% 35%, #e9dccb 0, #a89478 22%, #3b3126 48%, #0d0d0d 62%), repeating-radial-gradient(circle at 40% 55%, transparent 0 14px, rgba(0,0,0,.45) 14px 18px)",
  },
  {
    background:
      "repeating-linear-gradient(160deg,#0c0c0c 0 12px,#ff5a1f 12px 16px,#ff8a57 16px 18px,#1b1b1b 18px 38px)",
  },
  {
    background:
      "radial-gradient(circle at 30% 40%, #fff 0 1.5px, transparent 2px) 0 0/10px 10px, radial-gradient(circle at 60% 40%, #3a3cff 0, transparent 60%), #f1f1f4",
  },
  {
    background:
      "conic-gradient(from 210deg at 50% 60%, #0b0b0b, #3a2f26, #ff5a1f, #0b0b0b 55%, #0b0b0b)",
  },
  {
    background:
      "radial-gradient(ellipse at 60% 70%, #ff9a3c 0, #ff5a1f 18%, transparent 19%), radial-gradient(circle at 35% 40%, #8a7a6a 0, #2a2420 40%, #0b0b0b 70%)",
  },
];

export default function TileArt({ variant, className = "" }: { variant: number; className?: string }) {
  return <div className={className} style={arts[variant % arts.length]} aria-hidden />;
}
