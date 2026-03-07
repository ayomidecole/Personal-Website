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
      className="sticky top-0 z-50 flex justify-center border-b border-zinc-800 bg-[#0d0d0d] pb-0 pt-6"
      aria-label="Main navigation"
    >
      <div className="flex gap-0">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`no-underline relative px-6 py-2.5 font-mono text-sm font-medium rounded-t-lg border border-b-0 transition-colors ${
                isActive
                  ? "bg-[#1a1a1a] text-[#d97706] border-amber-600/50 border-b-[#0d0d0d] -mb-px z-10 shadow-[0_-2px_8px_rgba(0,0,0,0.3)]"
                  : "bg-[#141414] text-[#a3a3a3] border-zinc-800 hover:bg-[#171717] hover:text-[#e5e5e5]"
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
