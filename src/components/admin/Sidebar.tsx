"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  FolderKanban,
  Wrench,
  GraduationCap,
  Mail,
  User,
  ExternalLink,
  LogOut,
  ChevronRight,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Section Order", href: "/admin/sections", icon: Layers },
  { label: "Hero & About", href: "/admin/content", icon: User },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Skills", href: "/admin/skills", icon: Wrench },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Contact Config", href: "/admin/contact", icon: ExternalLink },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 bg-[#1E293B] border-r border-[#334155] flex flex-col h-screen fixed top-0 left-0">
      <div className="p-6 border-b border-[#334155]">
        <Link
          href="/"
          className="font-archivo font-bold text-xl flex items-center gap-2 group"
        >
          <span className="text-[#22C55E]">{"<"}</span>
          Admin
          <span className="text-[#22C55E] group-hover:translate-x-1 transition-transform cursor-pointer">{"/>"}</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {SIDEBAR_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#22C55E] text-[#0F172A] font-semibold shadow-lg shadow-[#22C55E]/20"
                  : "text-[#94A3B8] hover:bg-[#334155] hover:text-[#F8FAFC]"
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon size={20} />
                <span className="text-sm">{link.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#334155] bg-[#1E293B]/50">
        <div className="flex items-center gap-3 px-4 py-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center text-[#0F172A] font-bold text-xs">
            {session?.user?.name?.[0] || session?.user?.email?.[0] || "A"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#F8FAFC] truncate">
              {session?.user?.name || "Admin"}
            </span>
            <span className="text-[10px] text-[#94A3B8] truncate">
              {session?.user?.email}
            </span>
          </div>
        </div>

        <button
          id="admin-logout"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#94A3B8] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 cursor-pointer"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
