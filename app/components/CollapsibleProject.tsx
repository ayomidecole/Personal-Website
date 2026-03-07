"use client";

import { useState } from "react";

type Props = {
  name: string;
  url: string;
  defaultOpen?: boolean;
};

export function CollapsibleProject({
  name,
  url,
  defaultOpen = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-[#141414]">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`sticky top-0 z-10 flex w-full items-center justify-between bg-[#141414] px-4 py-3 text-left transition-colors hover:bg-[#1a1a1a] ${isOpen ? "border-b border-zinc-800" : ""}`}
        aria-expanded={isOpen}
        aria-controls={`iframe-${encodeURIComponent(url)}`}
      >
        <span className="font-mono text-sm font-medium text-[#e5e5e5]">
          <span className="text-[#d97706]">&gt;</span> {name}
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d97706] font-mono text-sm font-medium text-[#0d0d0d]"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div
          id={`iframe-${encodeURIComponent(url)}`}
          className="rounded-b-lg border-t border-zinc-800 bg-[#0d0d0d]"
        >
          <iframe
            src={url}
            title={name}
            className="h-[calc(100vh-7rem)] min-h-[420px] w-full"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
