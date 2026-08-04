"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Schemes" },
  { href: "/news", label: "News" },
  { href: "/learn", label: "Learn" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            BF
          </span>
          <span className="text-sm font-bold leading-tight text-primary-dark sm:text-base">
            Bajaj Finserv AMC
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "bg-primary-light text-primary"
                  : "text-gray-600 hover:bg-surface-muted hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="rounded-lg p-2 text-gray-600 hover:bg-surface-muted md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                pathname === l.href
                  ? "bg-primary-light text-primary"
                  : "text-gray-600 hover:bg-surface-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
