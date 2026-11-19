"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/lib/site";

export interface MastheadItem {
  id: string;
  label: string;
  numeral: string;
}

export default function Masthead({ items }: { items: MastheadItem[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Highlight the chapter currently in view (homepage only).
  useEffect(() => {
    if (!isHome) return;
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, items]);

  // Escape closes the contents menu and returns focus to its toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const hasNav = items.length > 0;

  return (
    <header className="masthead sticky top-0 z-40 border-b border-rule bg-ground">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="wrap flex h-[58px] items-center justify-between gap-6">
        <Link
          href="/"
          className="text-[19px] italic leading-none tracking-[-0.005em]"
        >
          {site.name}
        </Link>

        {hasNav && (
          <nav aria-label="Chapters" className="hidden lg:block">
            <ul className="sc flex gap-7">
              {items.map((item) => {
                const current = isHome && active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`/#${item.id}`}
                      aria-current={current ? "location" : undefined}
                      className={`py-2 transition-colors duration-200 ${
                        current ? "text-bone" : "text-muted hover:text-bone"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {site.availability && (
          <p className="sc hidden text-muted xl:block">{site.availability}</p>
        )}

        {hasNav && (
          <button
            ref={toggleRef}
            type="button"
            className="sc -mr-2 min-h-11 px-2 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Contents"}
          </button>
        )}
      </div>
      <span className="progress" aria-hidden="true" />

      {hasNav && open && (
        <nav
          id={menuId}
          aria-label="Chapters"
          className="border-t border-rule bg-ground lg:hidden"
        >
          <ol className="wrap pb-6 pt-2">
            {items.map((item) => (
              <li key={item.id} className="border-b border-rule">
                <Link
                  href={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-baseline gap-4 py-3"
                >
                  <span className="sc w-8 shrink-0 text-muted">
                    {item.numeral}
                  </span>
                  <span className="text-[23px] leading-tight">{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
          {site.availability && (
            <p className="wrap sc pb-6 text-muted">{site.availability}</p>
          )}
        </nav>
      )}
    </header>
  );
}
