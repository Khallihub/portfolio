"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (!isHomePage) return;
    const id = href.replace("/#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-[#0F172A]/80 backdrop-blur-xl border border-[var(--color-border)] shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-archivo font-700 text-xl tracking-tight text-[#F8FAFC] hover:text-[#22C55E] transition-colors duration-200"
          >
            <span className="text-[#22C55E]">{"<"}</span>
            dev
            <span className="text-[#22C55E]">{"/>"}</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/#contact"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  handleNavClick("/#contact");
                }
              }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22C55E] text-[#0F172A] text-sm font-semibold hover:bg-[#16A34A] transition-colors duration-200 cursor-pointer"
            >
              Hire Me
            </Link>
            <button
              id="nav-menu-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] transition-colors duration-200 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 bg-[#1E293B]/95 backdrop-blur-xl rounded-2xl border border-[var(--color-border)] shadow-2xl p-6"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (isHomePage) e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="block py-2 text-[#94A3B8] hover:text-[#F8FAFC] font-medium transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contact"
                  onClick={(e) => {
                    if (isHomePage) e.preventDefault();
                    handleNavClick("/#contact");
                  }}
                  className="block text-center py-3 rounded-xl bg-[#22C55E] text-[#0F172A] font-semibold hover:bg-[#16A34A] transition-colors duration-200 cursor-pointer"
                >
                  Hire Me
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
