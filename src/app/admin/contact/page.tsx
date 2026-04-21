"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { GitHub, LinkedIn, X } from "@/components/ui/Icons";
import { motion } from "framer-motion";

interface ConfigData {
  email: string;
  ctaText: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

export default function ContactConfigPage() {
  const [data, setData] = useState<ConfigData>({
    email: "",
    ctaText: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact-config")
      .then((res) => res.json())
      .then((config) => {
        if (config) setData(config);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/contact-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
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
      <header className="mb-10">
        <h1 className="font-archivo text-3xl font-bold mb-2">Contact Configuration</h1>
        <p className="text-[#94A3B8]">Set your reachability details and social presence.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 space-y-6">
            <h2 className="font-archivo text-xl font-bold border-b border-[#334155] pb-4 flex items-center gap-3">
                <Mail size={20} className="text-[#22C55E]" /> Direct Contact
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">Primary Email</label>
                    <input
                        type="email"
                        required
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="hello@yourdomain.com"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">Section CTA Headline</label>
                    <input
                        type="text"
                        value={data.ctaText}
                        onChange={(e) => setData({ ...data, ctaText: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="Let's build something together"
                    />
                </div>
            </div>
        </section>

        <section className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 space-y-6">
            <h2 className="font-archivo text-xl font-bold border-b border-[#334155] pb-4 flex items-center gap-3">
                <MessageSquare size={20} className="text-blue-400" /> Social Presence
            </h2>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#94A3B8]">
                        <GitHub size={20} />
                    </div>
                    <input
                        type="text"
                        value={data.githubUrl}
                        onChange={(e) => setData({ ...data, githubUrl: e.target.value })}
                        className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="GitHub URL"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#94A3B8]">
                        <LinkedIn size={20} />
                    </div>
                    <input
                        type="text"
                        value={data.linkedinUrl}
                        onChange={(e) => setData({ ...data, linkedinUrl: e.target.value })}
                        className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="LinkedIn URL"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#94A3B8]">
                        <X size={20} />
                    </div>
                    <input
                        type="text"
                        value={data.twitterUrl}
                        onChange={(e) => setData({ ...data, twitterUrl: e.target.value })}
                        className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="Twitter / X URL"
                    />
                </div>
            </div>
        </section>

        <div className="flex items-center gap-6">
            <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] disabled:opacity-50 transition-all cursor-pointer shadow-xl shadow-[#22C55E]/20"
            >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? "Saving..." : "Save Configuration"}
            </button>
            {success && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-[#22C55E] font-bold text-sm"
                >
                    <CheckCircle size={18} /> Settings updated!
                </motion.div>
            )}
        </div>
      </form>
    </div>
  );
}
