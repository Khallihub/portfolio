import { prisma } from "@/lib/prisma";
import {
  MessageSquare,
  Eye,
  Layers,
  ArrowUpRight,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [messagesCount, projectsCount, sectionsCount, recentMessages] =
    await Promise.all([
      prisma.contactSubmission.count(),
      prisma.project.count(),
      prisma.section.count({ where: { isVisible: true } }),
      prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);
  return { messagesCount, projectsCount, sectionsCount, recentMessages };
}

export default async function AdminDashboard() {
  const { messagesCount, projectsCount, sectionsCount, recentMessages } =
    await getStats();

  const stats = [
    {
      label: "Total Messages",
      value: messagesCount,
      icon: MessageSquare,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Total Projects",
      value: projectsCount,
      icon: Layers,
      color: "text-[#22C55E]",
      bg: "bg-[#22C55E]/10",
    },
    {
      label: "Live Sections",
      value: sectionsCount,
      icon: Eye,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header>
        <h1 className="font-archivo text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-[#94A3B8]">
          Here&apos;s what is happening on your portfolio.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1E293B] border border-[#334155] p-6 rounded-2xl shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-bold">
                Lifetime
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#94A3B8] font-medium">{stat.label}</p>
              <p className="text-3xl font-bold font-archivo">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#334155] flex items-center justify-between">
            <h2 className="font-archivo font-semibold">Recent Messages</h2>
            <Link
              href="/admin/messages"
              className="text-xs text-[#22C55E] hover:underline flex items-center gap-1"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#334155]">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="p-6 hover:bg-[#334155]/20 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold truncate">{msg.name}</p>
                    <p className="text-[10px] text-[#94A3B8]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-[#94A3B8]">
                <p className="text-sm">No messages yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6">
            <h2 className="font-archivo font-semibold mb-6">Quick Actions</h2>
            <div className="grid gap-3">
              <Link
                href="/admin/projects/new"
                className="flex items-center gap-3 p-4 rounded-xl border border-[#334155] hover:border-[#22C55E]/40 hover:bg-[#22C55E]/5 transition-all group"
              >
                <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E] group-hover:scale-110 transition-transform">
                  <PlusCircle size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">New Project</p>
                  <p className="text-xs text-[#94A3B8]">Add a new case study to your work.</p>
                </div>
              </Link>
              <Link
                href="/admin/sections"
                className="flex items-center gap-3 p-4 rounded-xl border border-[#334155] hover:border-blue-400/40 hover:bg-blue-400/5 transition-all group"
              >
                <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <Layers size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Manage Sections</p>
                  <p className="text-xs text-[#94A3B8]">Reorder or toggle home visibility.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
