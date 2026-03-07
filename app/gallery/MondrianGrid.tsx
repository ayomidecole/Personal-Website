"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Placement = { row: number; col: number; rowSpan: number; colSpan: number };

const SIZE = 8; // 8x8 square grid = 64 cells
const N = 37;

// 37 blocks in 64 cells: 28 single (1x1) + 9 double (2x2) = 28 + 36 = 64 exactly
function buildSquareLayout(twoByTwoIndices: number[]): Placement[] {
  const used = new Set<string>();
  const key = (r: number, c: number) => `${r},${c}`;
  const mark = (r: number, c: number, h: number, w: number) => {
    for (let y = r; y < r + h; y++)
      for (let x = c; x < c + w; x++) used.add(key(y, x));
  };
  const nextCell = () => {
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (!used.has(key(r, c))) return { r, c };
    return null;
  };
  const fits = (r: number, c: number, h: number, w: number) => {
    if (r + h > SIZE || c + w > SIZE) return false;
    for (let y = r; y < r + h; y++)
      for (let x = c; x < c + w; x++)
        if (used.has(key(y, x))) return false;
    return true;
  };
  const placements: Placement[] = [];
  for (let idx = 0; idx < N; idx++) {
    const cell = nextCell();
    if (!cell) break;
    const { r, c } = cell;
    if (twoByTwoIndices.includes(idx) && fits(r, c, 2, 2)) {
      placements.push({ row: r, col: c, rowSpan: 2, colSpan: 2 });
      mark(r, c, 2, 2);
    } else {
      placements.push({ row: r, col: c, rowSpan: 1, colSpan: 1 });
      mark(r, c, 1, 1);
    }
  }
  return placements;
}

// Three layouts: different indices get 2x2 blocks (9 each), rest 1x1. Fills 8x8 exactly.
const LAYOUTS = [
  buildSquareLayout([0, 4, 8, 12, 16, 20, 24, 28, 32]),
  buildSquareLayout([2, 6, 10, 14, 18, 22, 26, 30, 34]),
  buildSquareLayout([1, 5, 9, 13, 17, 21, 25, 29, 33]),
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type GalleryImage = { src: string; alt: string };

export function MondrianGrid({ images }: { images: GalleryImage[] }) {
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(() =>
    images.map((_, i) => i)
  );

  const layout = LAYOUTS[layoutIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setLayoutIndex((prev) => (prev + 1) % LAYOUTS.length);
      setOrder((prev) => shuffle(prev));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="mx-auto"
      style={{
        width: "98vw",
        maxWidth: "98vw",
        aspectRatio: "1 / 1",
      }}
    >
      <div
        className="mondrian-grid w-full overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${SIZE}, 1fr)`,
          gap: "clamp(8px, 1.5vw, 16px)",
          background: "#0a0a0a",
          padding: "clamp(8px, 1.5vw, 16px)",
          aspectRatio: "1 / 1",
        }}
      >
      {images.map((img, i) => {
        const place = layout[i];
        const imageIndex = order[i];
        const { src, alt } = images[imageIndex];
        return (
          <div
            key={`${layoutIndex}-${i}-${imageIndex}`}
            className="relative min-h-0 min-w-0 overflow-hidden bg-[var(--background)] transition-[grid-row,grid-column] duration-500 ease-out"
            style={{
              gridRow: `${place.row + 1} / span ${place.rowSpan}`,
              gridColumn: `${place.col + 1} / span ${place.colSpan}`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 14vw"
            />
          </div>
        );
      })}
      </div>
    </div>
  );
}
