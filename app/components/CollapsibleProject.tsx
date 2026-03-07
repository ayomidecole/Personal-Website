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
    <div className="panel overflow-hidden rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`panel-header sticky top-0 z-10 flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${isOpen ? "border-b border-[var(--border)]" : ""}`}
        aria-expanded={isOpen}
        aria-controls={`iframe-${encodeURIComponent(url)}`}
      >
        <span className="font-mono text-sm font-medium">
          <span className="panel-prompt">&gt;</span> {name}
        </span>
        <span
          className="panel-button flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div
          id={`iframe-${encodeURIComponent(url)}`}
          className="panel-body rounded-b-lg border-t"
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
