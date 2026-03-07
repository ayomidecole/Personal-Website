"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
] as const;

export function FolderNav() {
  const pathname = usePathname();

  return (
    <nav
      className="nav-bar sticky top-0 z-50 flex justify-center pb-0 pt-6"
      aria-label="Main navigation"
    >
      <div className="flex gap-0">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`nav-tab no-underline relative px-6 py-2.5 font-mono text-sm font-medium rounded-t-lg border border-b-0 transition-colors ${
                isActive ? "nav-tab-active -mb-px z-10 border-b-[var(--background)]" : ""
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
