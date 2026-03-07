"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Placement = { row: number; col: number; rowSpan: number; colSpan: number };

const COLS = 10;
const ROWS = 8;
const N = 37;

type BlockSpec = { h: number; w: number; indices: number[] };

// Build Mondrian layout with varied block sizes: try larger shapes first
function buildLayout(specs: BlockSpec[]): Placement[] {
  const used = new Set<string>();
  const key = (r: number, c: number) => `${r},${c}`;
  const mark = (r: number, c: number, h: number, w: number) => {
    for (let y = r; y < r + h; y++)
      for (let x = c; x < c + w; x++) used.add(key(y, x));
  };
  const nextCell = () => {
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (!used.has(key(r, c))) return { r, c };
    return null;
  };
  const fits = (r: number, c: number, h: number, w: number) => {
    if (r + h > ROWS || c + w > COLS) return false;
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
    let placed = false;
    for (const { h, w, indices } of specs) {
      if (!indices.includes(idx) || !fits(r, c, h, w)) continue;
      placements.push({ row: r, col: c, rowSpan: h, colSpan: w });
      mark(r, c, h, w);
      placed = true;
      break;
    }
    if (!placed) {
      placements.push({ row: r, col: c, rowSpan: 1, colSpan: 1 });
      mark(r, c, 1, 1);
    }
  }
  return placements;
}

// Specs: try bigger shapes first (order matters for packing). 10x8 = 80 cells, 37 blocks.
const LAYOUTS = [
  buildLayout([
    { h: 3, w: 3, indices: [0] },
    { h: 3, w: 2, indices: [8] },
    { h: 2, w: 3, indices: [5, 18] },
    { h: 2, w: 2, indices: [12, 28] },
    { h: 1, w: 3, indices: [3, 15, 30] },
    { h: 3, w: 1, indices: [7, 22] },
    { h: 1, w: 2, indices: [10, 25] },
    { h: 2, w: 1, indices: [14, 32] },
  ]),
  buildLayout([
    { h: 3, w: 3, indices: [11] },
    { h: 2, w: 3, indices: [2, 21] },
    { h: 3, w: 2, indices: [6, 24] },
    { h: 2, w: 2, indices: [0, 16] },
    { h: 3, w: 1, indices: [4, 19] },
    { h: 1, w: 3, indices: [13, 31] },
    { h: 1, w: 2, indices: [9, 26] },
    { h: 2, w: 1, indices: [17, 33] },
  ]),
  buildLayout([
    { h: 3, w: 2, indices: [1, 23] },
    { h: 2, w: 3, indices: [8, 27] },
    { h: 2, w: 2, indices: [5, 14, 30] },
    { h: 3, w: 1, indices: [11, 25] },
    { h: 1, w: 3, indices: [3, 20] },
    { h: 1, w: 2, indices: [7, 18, 32] },
    { h: 2, w: 1, indices: [10, 22, 34] },
  ]),
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
      className="mondrian-grid w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gap: "clamp(10px, 2vw, 20px)",
        background: "#0a0a0a",
        padding: "clamp(10px, 2vw, 20px)",
        aspectRatio: `${COLS} / ${ROWS}`,
        minHeight: "75vh",
        maxHeight: "92vh",
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
  );
}
