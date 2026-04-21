"use client";

import { useState, useEffect } from "react";
import { Wrench, GraduationCap, Plus, X, Loader2, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  startYear: number;
  endYear?: number | null;
}

export default function MiscPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newSkill, setNewSkill] = useState({ name: "", category: "Backend" });
  const [newEdu, setNewEdu] = useState({ institution: "", degree: "", startYear: new Date().getFullYear(), endYear: null as number | null });
  
  const [savingSkill, setSavingSkill] = useState(false);
  const [savingEdu, setSavingEdu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [sRes, eRes] = await Promise.all([
        fetch("/api/admin/misc?type=skills"),
        fetch("/api/admin/misc?type=education")
      ]);
      setSkills(await sRes.json());
      setEducation(await eRes.json());
      setLoading(false);
    };
    fetchData();
  }, []);

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    setSavingSkill(true);
    try {
      const res = await fetch("/api/admin/misc?type=skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      });
      const saved = await res.json();
      setSkills([...skills, saved]);
      setNewSkill({ name: "", category: "Backend" });
    } finally {
      setSavingSkill(false);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await fetch(`/api/admin/misc?type=skills&id=${id}`, { method: "DELETE" });
      setSkills(skills.filter((s) => s.id !== id));
    } catch (err) { console.error(err); }
  };

  const addEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEdu(true);
    try {
      const res = await fetch("/api/admin/misc?type=education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEdu),
      });
      const saved = await res.json();
      setEducation([...education, saved]);
      setNewEdu({ institution: "", degree: "", startYear: new Date().getFullYear(), endYear: null });
    } finally {
      setSavingEdu(false);
    }
  };

  const deleteEdu = async (id: string) => {
    try {
      await fetch(`/api/admin/misc?type=education&id=${id}`, { method: "DELETE" });
      setEducation(education.filter((e) => e.id !== id));
    } catch (err) { console.error(err); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header>
        <h1 className="font-archivo text-3xl font-bold mb-2">Skills & Education</h1>
        <p className="text-[#94A3B8]">Manage your technical toolbox and academic history.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Skills Section */}
        <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                    <Wrench size={20} />
                </div>
                <h2 className="font-archivo text-xl font-bold">Skills</h2>
            </div>

            <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6">
                <form onSubmit={addSkill} className="flex gap-3 mb-8">
                    <input
                        type="text"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="Skill (e.g. Docker)"
                    />
                    <input
                        list="categories"
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                        className="w-40 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="Category"
                    />
                    <datalist id="categories">
                        {Array.from(new Set(skills.map(s => s.category))).map(cat => (
                            <option key={cat} value={cat} />
                        ))}
                    </datalist>
                    <button
                        type="submit"
                        disabled={savingSkill}
                        className="p-2 rounded-xl bg-[#22C55E] text-[#0F172A] hover:bg-[#16A34A] transition-all cursor-pointer"
                    >
                        <Plus size={20} />
                    </button>
                </form>

                <div className="space-y-4">
                    {Array.from(new Set(skills.map(s => s.category)))
                        .sort((a, b) => {
                            const preferred = ["AI Systems", "Backend", "Frontend", "DevOps"];
                            const aIdx = preferred.indexOf(a);
                            const bIdx = preferred.indexOf(b);
                            if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
                            if (aIdx !== -1) return -1;
                            if (bIdx !== -1) return 1;
                            return a.localeCompare(b);
                        })
                        .map((cat) => {
                            const catSkills = skills.filter(s => s.category === cat);
                            if (catSkills.length === 0) return null;
                            return (
                                <div key={cat} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] uppercase tracking-widest text-[#475569] font-bold">{cat}</p>
                                        <span className="text-[10px] text-[#334155]">{catSkills.length} skills</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {catSkills.map(skill => (
                                            <div key={skill.id} className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#0F172A] border border-[#334155] rounded-lg group">
                                                <span className="text-xs text-[#F8FAFC]">{skill.name}</span>
                                                <button onClick={() => deleteSkill(skill.id)} className="text-[#475569] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </section>

        {/* Education Section */}
        <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-400/10 text-blue-400">
                    <GraduationCap size={20} />
                </div>
                <h2 className="font-archivo text-xl font-bold">Education</h2>
            </div>

            <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6">
                <form onSubmit={addEdu} className="space-y-4 mb-8">
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            required
                            value={newEdu.institution}
                            onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                            className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                            placeholder="Institution"
                        />
                        <input
                            type="text"
                            required
                            value={newEdu.degree}
                            onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                            className="bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                            placeholder="Degree"
                        />
                    </div>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            required
                            value={newEdu.startYear}
                            onChange={(e) => setNewEdu({ ...newEdu, startYear: parseInt(e.target.value) })}
                            className="w-24 bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                            placeholder="Start"
                        />
                         <input
                            type="number"
                            value={newEdu.endYear || ""}
                            onChange={(e) => setNewEdu({ ...newEdu, endYear: e.target.value ? parseInt(e.target.value) : null })}
                            className="w-24 bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-2 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                            placeholder="End"
                        />
                        <button
                            type="submit"
                            disabled={savingEdu}
                            className="flex-1 rounded-xl bg-blue-400 text-[#0F172A] font-bold py-2 hover:bg-blue-300 transition-all cursor-pointer"
                        >
                            {savingEdu ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Add Education"}
                        </button>
                    </div>
                </form>

                <div className="space-y-3">
                    {education.map(edu => (
                        <div key={edu.id} className="bg-[#0F172A] border border-[#334155] p-4 rounded-xl flex items-center justify-between group">
                            <div>
                                <p className="text-sm font-bold">{edu.degree}</p>
                                <p className="text-xs text-[#94A3B8]">{edu.institution} · {edu.startYear}—{edu.endYear || "Present"}</p>
                            </div>
                            <button onClick={() => deleteEdu(edu.id)} className="p-2 text-[#475569] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}
