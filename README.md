# Portfolio — marketing strategist & content creator

Next.js (App Router) · TypeScript · Tailwind CSS v4 · react-three-fiber + drei + postprocessing.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where things live
- `src/lib/site.ts` — **all copy**: name, email, socials, skills, projects, results, archive.
- `src/components/Blob.tsx` — the morphing blob: a `MeshPhysicalMaterial` (chrome + iridescence) with simplex-noise
  vertex displacement injected via `onBeforeCompile`. Scroll drives `uMorph` (sphere → twisted ridge → soft cube → sphere);
  the cursor pulls the surface and raises distortion locally.
- `src/components/HeroScene.tsx` — canvas, procedural studio lighting (`Lightformer`s, no HDRI download), contact shadows, bloom.
- `src/components/Hero.tsx` — 320vh sticky hero; overlay UI, live clock, scroll progress.
- Tile artwork is pure CSS (`TileArt.tsx`) — swap for real renders/videos.

Honors `prefers-reduced-motion` and falls back to a static gradient when WebGL is unavailable.
