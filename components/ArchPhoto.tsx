"use client";

import { useState } from "react";
import type { ImageRatio } from "@/lib/projects";

/**
 * Generative architectural placeholder photography.
 *
 * Every image on the site is addressed by a `seed` (see lib/projects.ts).
 * Until a real photograph is dropped in at /public/images/<seed>.jpg,
 * this renders a deterministic, editorial-toned abstract composition so the
 * layout always reads as a finished, art-directed page rather than empty
 * boxes. Replace an image by adding a file at that path — no code changes
 * required.
 */

const TONES = [
  "#e7e3d8",
  "#ddd7c8",
  "#cdc5b1",
  "#b3aa94",
  "#948a76",
  "#655d4e",
  "#3a352c",
  "#211e19",
];

function hashSeed(seed: string): number {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 33) ^ seed.charCodeAt(i);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Band {
  y: number;
  h: number;
  fill: string;
  opacity: number;
}

function buildComposition(seed: string) {
  const rand = mulberry32(hashSeed(seed));
  const pick = (arr: number[]) => arr[Math.floor(rand() * arr.length)];

  const baseIndex = Math.floor(rand() * 3); // lighter bases only
  const base = TONES[baseIndex];

  const bandCount = 3 + Math.floor(rand() * 4);
  const bands: Band[] = [];
  let cursor = 0;
  for (let i = 0; i < bandCount; i++) {
    const remaining = 600 - cursor;
    const h =
      i === bandCount - 1
        ? remaining
        : Math.max(40, Math.floor((remaining / (bandCount - i)) * (0.6 + rand() * 0.8)));
    bands.push({
      y: cursor,
      h,
      fill: TONES[Math.min(TONES.length - 1, baseIndex + Math.floor(rand() * 4))],
      opacity: 0.35 + rand() * 0.5,
    });
    cursor += h;
    if (cursor >= 600) break;
  }

  const mullionCount = pick([2, 3, 4, 5]);
  const mullions: number[] = [];
  for (let i = 1; i <= mullionCount; i++) {
    mullions.push(Math.round((800 / (mullionCount + 1)) * i) + Math.floor(rand() * 12 - 6));
  }

  const horizonY = Math.round(330 + rand() * 140);
  const lightAngle = rand() > 0.5;
  const grainSeed = (rand() * 1000).toFixed(2);

  return { base, bands, mullions, horizonY, lightAngle, grainSeed };
}

export function ArchPlaceholder({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const c = buildComposition(seed);
  const gradId = `g-${seed}`;
  const grainId = `n-${seed}`;

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1={c.lightAngle ? "0" : "1"}
          y1="0"
          x2={c.lightAngle ? "1" : "0"}
          y2="1"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
        <filter id={grainId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed={c.grainSeed}
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
        </filter>
      </defs>

      <rect x="0" y="0" width="800" height="600" fill={c.base} />

      {c.bands.map((band, i) => (
        <rect
          key={i}
          x="0"
          y={band.y}
          width="800"
          height={band.h}
          fill={band.fill}
          opacity={band.opacity}
        />
      ))}

      <line
        x1="0"
        y1={c.horizonY}
        x2="800"
        y2={c.horizonY}
        stroke="#1c1a16"
        strokeOpacity="0.14"
        strokeWidth="1"
      />

      {c.mullions.map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="0"
          x2={x}
          y2="600"
          stroke="#1c1a16"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      ))}

      <rect x="0" y="0" width="800" height="600" fill={`url(#${gradId})`} />
      <rect x="0" y="0" width="800" height="600" filter={`url(#${grainId})`} opacity="0.05" />
    </svg>
  );
}

export function Photo({
  seed,
  ratio,
  src,
  alt = "",
  className = "",
  sizes,
  priority,
}: {
  seed: string;
  ratio?: ImageRatio;
  src?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  // No `src` means no real photograph has been supplied yet: render the
  // generative placeholder directly rather than requesting a path that is
  // known in advance to 404. Once a real file exists, pass its path as
  // `src` (or set it on the project's image entry in lib/projects.ts) and
  // it will be used automatically, falling back to the placeholder only if
  // that file turns out to be missing.
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  // Plain <img src="/images/..."> paths are absolute and Next.js only
  // rewrites its own managed assets (next/link, next/image, /_next/*) for a
  // configured basePath — not hand-written strings like this one. Prefix
  // manually so images still resolve when the site is served from a
  // subpath (e.g. the GitHub Pages deploy at /webpage-proyecto).
  const resolvedSrc = src ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : undefined;

  const ratioClass =
    ratio === "portrait"
      ? "aspect-[4/5]"
      : ratio === "square"
        ? "aspect-square"
        : ratio === "landscape"
          ? "aspect-[3/2]"
          : "";

  return (
    <div className={`relative overflow-hidden bg-canvas ${ratioClass} ${className}`}>
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolvedSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {!showImage && (
        <ArchPlaceholder seed={seed} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
