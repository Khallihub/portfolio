"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2, Plus, CheckCircle, Trash2 } from "lucide-react";

interface ExperienceData {
  role: string;
  company: string;
  location: string;
  description: string;
  fullStory: string;
  slug: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

const INITIAL_DATA: ExperienceData = {
  role: "",
  company: "",
  location: "",
  description: "",
  fullStory: "",
  slug: "",
  startDate: "",
  endDate: "",
  highlights: [],
};

export default function ExperienceFormPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";
  const router = useRouter();
  
  const [data, setData] = useState<ExperienceData>(INITIAL_DATA);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [newHighlight, setNewHighlight] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch("/api/admin/experience")
        .then((res) => res.json())
        .then((experiences: { id: string; role?: string; company?: string; location?: string; description?: string; fullStory?: string; slug?: string; startDate?: string; endDate?: string; highlights?: string[] }[]) => {
          const exp = experiences.find((e) => e.id === resolvedParams.id);
          if (exp) {
            setData({
              role: exp.role || "",
              company: exp.company || "",
              location: exp.location || "",
              description: exp.description || "",
              fullStory: exp.fullStory || "",
              slug: exp.slug || "",
              startDate: exp.startDate ? new Date(exp.startDate).toISOString().split("T")[0] : "",
              endDate: exp.endDate ? new Date(exp.endDate).toISOString().split("T")[0] : "",
              highlights: exp.highlights || [],
            });
          }
          setLoading(false);
        });
    }
  }, [isNew, resolvedParams.id]);

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setData({ ...data, highlights: [...data.highlights, newHighlight.trim()] });
      setNewHighlight("");
    }
  };

  const removeHighlight = (index: number) => {
    setData({ ...data, highlights: data.highlights.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/experience", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? data : { ...data, id: resolvedParams.id }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(() => router.push("/admin/experience"), 1500);
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
       <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-3 rounded-xl border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] transition-all cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-archivo text-3xl font-bold">
              {isNew ? "Add Experience" : "Edit Experience"}
            </h1>
            <p className="text-[#94A3B8]">Detail your impact and achievements at this role.</p>
          </div>
        </div>
        {status === "success" && (
          <div className="flex items-center gap-2 text-[#22C55E] text-sm font-bold bg-[#22C55E]/10 px-4 py-2 rounded-xl">
            <CheckCircle size={18} /> Entry Saved!
          </div>
        )}
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">Job Role</label>
                    <input
                        type="text"
                        required
                        value={data.role}
                        onChange={(e) => {
                            const role = e.target.value;
                            const slug = role.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + data.company.toLowerCase().replace(/ /g, "-");
                            setData({ ...data, role, slug: isNew ? slug : data.slug });
                        }}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="e.g. Senior Software Engineer"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">Company</label>
                    <input
                        type="text"
                        required
                        value={data.company}
                        onChange={(e) => setData({ ...data, company: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="e.g. Acme Corp"
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">Location</label>
                    <input
                        type="text"
                        value={data.location}
                        onChange={(e) => setData({ ...data, location: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors text-sm"
                        placeholder="e.g. Istanbul, TR (Remote)"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">Start Date</label>
                    <input
                        type="date"
                        required
                        value={data.startDate}
                        onChange={(e) => setData({ ...data, startDate: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors text-sm"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">End Date (Leave blank if current)</label>
                    <input
                        type="date"
                        value={data.endDate}
                        onChange={(e) => setData({ ...data, endDate: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors text-sm"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#94A3B8]">Description (Short Summary)</label>
                <textarea
                    required
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    rows={3}
                    className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                />
            </div>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 space-y-6">
            <h2 className="font-archivo text-xl font-bold border-b border-[#334155] pb-4">Key Highlights</h2>
            <div className="space-y-3">
                {data.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#0F172A] border border-[#334155] p-3 rounded-xl group">
                        <span className="text-[#22C55E] shrink-0 font-bold">▸</span>
                        <p className="flex-1 text-sm text-[#94A3B8]">{h}</p>
                        <button type="button" onClick={() => removeHighlight(i)} className="text-[#475569] hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                    className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60"
                    placeholder="e.g. Optimized API response times by 40%..."
                />
                <button
                    type="button"
                    onClick={addHighlight}
                    className="p-3 bg-[#334155] text-white rounded-xl hover:bg-[#22C55E] hover:text-[#0F172A] transition-all"
                >
                    <Plus size={20} />
                </button>
            </div>
        </div>

        <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 space-y-6">
             <h2 className="font-archivo text-xl font-bold border-b border-[#334155] pb-4">Full Story (Markdown)</h2>
             <textarea
                value={data.fullStory}
                onChange={(e) => setData({ ...data, fullStory: e.target.value })}
                rows={10}
                className="w-full bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-sm text-[#F8FAFC] font-mono leading-relaxed focus:outline-none focus:border-[#22C55E]/60"
                placeholder="## My Role\n\nExplain your journey in detail..."
             />
        </div>

        <div className="flex items-center gap-4 pt-10">
            <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] disabled:opacity-50 transition-all cursor-pointer shadow-xl shadow-[#22C55E]/20"
            >
                {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {isNew ? "Add Experience" : "Save Changes"}
            </button>
            <button
                type="button"
                onClick={() => router.back()}
                className="px-10 py-4 rounded-2xl border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
            >
                Cancel
            </button>
        </div>
      </form>
    </div>
  );
}
