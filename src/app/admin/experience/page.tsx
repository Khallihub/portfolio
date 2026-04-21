"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, Plus, Pencil, Trash2, Calendar, MapPin, Loader2 } from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  order: number;
}

export default function ExperienceListPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/experience")
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data || []);
        setLoading(false);
      });
  }, []);

  const deleteExperience = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
           <h1 className="font-archivo text-3xl font-bold mb-2">Work Experience</h1>
           <p className="text-[#94A3B8]">Your professional journey and key achievements.</p>
        </div>
        <Link
          href="/admin/experience/new"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] transition-all cursor-pointer shadow-lg shadow-[#22C55E]/20"
        >
          <Plus size={20} /> Add Experience
        </Link>
      </header>

      {experiences.length === 0 ? (
        <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-20 text-center">
            <div className="w-16 h-16 bg-[#334155] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
                <Briefcase size={32} />
            </div>
            <p className="text-[#94A3B8] mb-8">No experience entries found.</p>
            <Link href="/admin/experience/new" className="text-[#22C55E] font-semibold hover:underline">
                Add your first job →
            </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 group hover:border-[#22C55E]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-archivo font-bold text-lg">{exp.role}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#334155] text-[#94A3B8] font-mono">#{exp.order}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#94A3B8]">
                  <span className="text-[#22C55E] font-semibold">{exp.company}</span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {exp.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/experience/${exp.id}`}
                  className="p-3 rounded-xl border border-[#334155] text-[#94A3B8] hover:text-blue-400 hover:border-blue-400/40 transition-all cursor-pointer"
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  disabled={deleting === exp.id}
                  className="p-3 rounded-xl border border-[#334155] text-[#94A3B8] hover:text-red-400 hover:border-red-400/40 transition-all cursor-pointer disabled:opacity-50"
                >
                   {deleting === exp.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
