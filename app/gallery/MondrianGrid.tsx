"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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

type ModalRect = { top: number; left: number; width: number; height: number };

export function MondrianGrid({ images }: { images: GalleryImage[] }) {
  const [layoutIndex, setLayoutIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(() =>
    images.map((_, i) => i)
  );
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [modalRect, setModalRect] = useState<ModalRect | null>(null);
  const [expanded, setExpanded] = useState(false);

  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const layout = LAYOUTS[layoutIndex];

  // Pause grid rotation while modal is open
  useEffect(() => {
    if (selectedSlot !== null) return;
    const id = setInterval(() => {
      setLayoutIndex((prev) => (prev + 1) % LAYOUTS.length);
      setOrder((prev) => shuffle(prev));
    }, 5000);
    return () => clearInterval(id);
  }, [selectedSlot]);

  // After opening, expand modal in next frame so transition runs
  useEffect(() => {
    if (selectedSlot === null || !modalRect) return;
    const frame = requestAnimationFrame(() => setExpanded(true));
    return () => cancelAnimationFrame(frame);
  }, [selectedSlot, modalRect]);

  const openModal = useCallback((slotIndex: number, el: HTMLDivElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setModalRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setSelectedSlot(slotIndex);
    setExpanded(false);
  }, []);

  const MODAL_TRANSITION_MS = 300;
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeModal = useCallback(() => {
    if (selectedSlot === null) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    const el = cellRefs.current[selectedSlot];
    if (el) {
      const rect = el.getBoundingClientRect();
      setModalRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    setExpanded(false);
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedSlot(null);
      setModalRect(null);
      closeTimeoutRef.current = null;
    }, MODAL_TRANSITION_MS);
  }, [selectedSlot]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="mx-auto w-full max-w-full min-w-0"
      style={{ aspectRatio: "1 / 1" }}
    >
      <div
        className="mondrian-grid w-full overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${SIZE}, 1fr)`,
          gap: "clamp(8px, 1.5vw, 16px)",
          background: "var(--background)",
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
              ref={(el) => {
                cellRefs.current[i] = el;
              }}
              role="button"
              tabIndex={0}
              className="relative min-h-0 min-w-0 cursor-pointer overflow-hidden bg-[var(--background)] transition-[grid-row,grid-column] duration-500 ease-out"
              style={{
                gridRow: `${place.row + 1} / span ${place.rowSpan}`,
                gridColumn: `${place.col + 1} / span ${place.colSpan}`,
              }}
              onClick={() => openModal(i, cellRefs.current[i])}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(i, cellRefs.current[i]);
                }
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

      {selectedSlot !== null &&
        modalRect &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-50 transition-opacity duration-300 ease-out"
              style={{
                backgroundColor: "rgba(5, 8, 16, 0.88)",
                opacity: expanded ? 1 : 0,
                pointerEvents: expanded ? "auto" : "none",
              }}
              aria-hidden
            />
            <div
              className="fixed z-50 overflow-hidden rounded-lg border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_0_0_2px_var(--border-dark),0_2px_0_var(--border-dark),0_4px_0_var(--border-dark)] transition-[top,left,width,height,transform,opacity] duration-300 ease-out"
              style={
                expanded
                  ? {
                      top: "50%",
                      left: "50%",
                      width: "min(85vw, 75vh)",
                      height: "min(85vw, 75vh)",
                      maxWidth: "900px",
                      maxHeight: "900px",
                      transform: "translate(-50%, -50%)",
                      opacity: 1,
                    }
                  : {
                      top: modalRect.top,
                      left: modalRect.left,
                      width: modalRect.width,
                      height: modalRect.height,
                      transform: "none",
                      opacity: 1,
                    }
              }
            >
              <Image
                src={images[order[selectedSlot]]?.src ?? ""}
                alt={images[order[selectedSlot]]?.alt ?? ""}
                fill
                className="object-contain"
                sizes="900px"
              />
              <button
                type="button"
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-colors hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)]"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                <span className="text-xl leading-none" aria-hidden>
                  ×
                </span>
              </button>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
