import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[#0F172A]">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-archivo font-semibold text-lg">
            <span className="text-[#22C55E]">{"<"}</span>
            dev
            <span className="text-[#22C55E]">{"/>"}</span>
          </span>
          <p className="text-sm text-[#94A3B8]">
            Built with Next.js, Prisma & Framer Motion
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="#top"
            aria-label="Back to top"
            className="p-2 rounded-lg text-[#94A3B8] hover:text-[#22C55E] hover:bg-[#1E293B] transition-colors duration-200 cursor-pointer"
          >
            <ArrowUp size={18} />
          </Link>
        </div>

        <p className="text-sm text-[#94A3B8]">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
