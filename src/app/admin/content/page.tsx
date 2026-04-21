"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

interface AboutData {
  statement: string;
  bio: string;
}

export default function ContentPage() {
  const [hero, setHero] = useState<HeroData>({
    headline: "",
    subheadline: "",
    ctaText: "",
    ctaLink: "",
  });
  const [about, setAbout] = useState<AboutData>({
    statement: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [savingHero, setSavingHero] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);
  const [status, setStatus] = useState<{ type: "hero" | "about"; success: boolean } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [heroRes, aboutRes] = await Promise.all([
        fetch("/api/hero"),
        fetch("/api/about"),
      ]);
      const heroData = await heroRes.json();
      const aboutData = await aboutRes.json();
      if (heroData) setHero(heroData);
      if (aboutData) setAbout(aboutData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const saveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHero(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hero),
      });
      if (!res.ok) throw new Error();
      setStatus({ type: "hero", success: true });
    } catch {
      setStatus({ type: "hero", success: false });
    } finally {
      setSavingHero(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const saveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAbout(true);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });
      if (!res.ok) throw new Error();
      setStatus({ type: "about", success: true });
    } catch {
      setStatus({ type: "about", success: false });
    } finally {
      setSavingAbout(false);
      setTimeout(() => setStatus(null), 3000);
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
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <header>
        <h1 className="font-archivo text-3xl font-bold mb-2">Core Content</h1>
        <p className="text-[#94A3B8]">
          Update the essential text and calls-to-action that greet your visitors.
        </p>
      </header>

      {/* Hero Content Form */}
      <section className="bg-[#1E293B] border border-[#334155] rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-[#334155] flex items-center justify-between">
          <h2 className="font-archivo text-xl font-bold">Hero Section</h2>
          {status?.type === "hero" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 text-sm ${
                status.success ? "text-[#22C55E]" : "text-red-400"
              }`}
            >
              {status.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {status.success ? "Saved successfully" : "Failed to save"}
            </motion.div>
          )}
        </div>
        <form onSubmit={saveHero} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">Headline</label>
              <textarea
                value={hero.headline}
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                rows={2}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                placeholder="Wrap words in *asterisks* to highlight them in accent color"
              />
              <p className="text-[10px] text-[#22C55E] flex items-center gap-1">
                <Info size={10} /> Tip: I build *scalable* systems → &quot;scalable&quot; will be green.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">Subheadline</label>
              <textarea
                value={hero.subheadline}
                onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
                rows={3}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">CTA Text</label>
              <input
                type="text"
                value={hero.ctaText}
                onChange={(e) => setHero({ ...hero, ctaText: e.target.value })}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">CTA Link</label>
              <input
                type="text"
                value={hero.ctaLink}
                onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingHero}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-[#22C55E]/20"
          >
            {savingHero ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Update Hero
          </button>
        </form>
      </section>

      {/* About Content Form */}
      <section className="bg-[#1E293B] border border-[#334155] rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-[#334155] flex items-center justify-between">
          <h2 className="font-archivo text-xl font-bold">About Section</h2>
          {status?.type === "about" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 text-sm ${
                status.success ? "text-[#22C55E]" : "text-red-400"
              }`}
            >
              {status.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {status.success ? "Saved successfully" : "Failed to save"}
            </motion.div>
          )}
        </div>
        <form onSubmit={saveAbout} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">Mission Statement (Large Text)</label>
              <textarea
                value={about.statement}
                onChange={(e) => setAbout({ ...about, statement: e.target.value })}
                rows={2}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">Bio / Detail (Right Column)</label>
              <textarea
                value={about.bio}
                onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                rows={6}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors leading-relaxed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingAbout}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-[#22C55E]/20"
          >
            {savingAbout ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Update About
          </button>
        </form>
      </section>
    </div>
  );
}
