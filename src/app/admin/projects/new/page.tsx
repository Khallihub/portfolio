"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  ArrowLeft,
  Loader2,
  X,
  Plus,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Play,
  ExternalLink,
} from "lucide-react";
import { GitHub } from "@/components/ui/Icons";

interface ProjectData {
  title: string;
  slug: string;
  shortDescription: string;
  fullStory: string;
  challenges: string;
  outcomes: string;
  videoUrl: string;
  demoUrl: string;
  githubUrl: string;
  techStack: string[];
  coverImage: string;
  gallery: string[];
  isFeatured: boolean;
}

const INITIAL_DATA: ProjectData = {
  title: "",
  slug: "",
  shortDescription: "",
  fullStory: "",
  challenges: "",
  outcomes: "",
  videoUrl: "",
  demoUrl: "",
  githubUrl: "",
  techStack: [],
  coverImage: "",
  gallery: [],
  isFeatured: true,
};

export default function ProjectFormPage({ params }: { params: Promise<{ id?: string }> }) {
  const resolvedParams = use(params);
  // It's a new project if the ID is missing (from the /new route) or explicitly 'new'
  const isNew = !resolvedParams?.id || resolvedParams.id === "new";
  const router = useRouter();
  const [data, setData] = useState<ProjectData>(INITIAL_DATA);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [newTech, setNewTech] = useState("");
  const [uploading, setUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  useEffect(() => {
    if (!isNew) {
      // For simplicity, we fetch all projects and find the one. 
      // In a real app we'd have a specific GET endpoint but we can use the main one.
      fetch("/api/admin/projects")
        .then((res) => res.json())
        .then((projects: { id: string; title?: string; slug?: string; shortDescription?: string; fullStory?: string; challenges?: string; outcomes?: string; videoUrl?: string; demoUrl?: string; githubUrl?: string; techStack?: string[]; coverImage?: string; gallery?: string[]; isFeatured?: boolean }[]) => {
          const project = projects.find((p) => p.id === resolvedParams.id);
          if (project) {
            setData({
              title: project.title || "",
              slug: project.slug || "",
              shortDescription: project.shortDescription || "",
              fullStory: project.fullStory || "",
              challenges: project.challenges || "",
              outcomes: project.outcomes || "",
              videoUrl: project.videoUrl || "",
              demoUrl: project.demoUrl || "",
              githubUrl: project.githubUrl || "",
              techStack: project.techStack || [],
              coverImage: project.coverImage || "",
              gallery: project.gallery || [],
              isFeatured: project.isFeatured ?? true,
            });
          }
          setLoading(false);
        });
    }
  }, [isNew, resolvedParams.id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      const blob = await response.json();
      setData({ ...data, coverImage: blob.url });
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setGalleryUploading(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });
        const blob = await response.json();
        newUrls.push(blob.url);
      }
      setData((prev) => ({ ...data, gallery: [...prev.gallery, ...newUrls] }));
    } catch (err) {
      console.error("Gallery upload failed", err);
    } finally {
      setGalleryUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const addTech = () => {
    if (newTech.trim() && !data.techStack.includes(newTech.trim())) {
      setData({ ...data, techStack: [...data.techStack, newTech.trim()] });
      setNewTech("");
    }
  };

  const removeTech = (tech: string) => {
    setData({ ...data, techStack: data.techStack.filter((t) => t !== tech) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/admin/projects", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? data : { ...data, id: resolvedParams.id }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(() => router.push("/admin/projects"), 1500);
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
    <div className="max-w-5xl mx-auto pb-20">
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
              {isNew ? "New Project" : "Edit Project"}
            </h1>
            <p className="text-[#94A3B8]">Describe the challenge, the process, and the result.</p>
          </div>
        </div>

        {status === "success" && (
          <div className="flex items-center gap-2 text-[#22C55E] text-sm font-bold bg-[#22C55E]/10 px-4 py-2 rounded-xl">
            <CheckCircle size={18} /> Project Saved!
          </div>
        )}
      </header>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 space-y-6">
            <h2 className="font-archivo text-xl font-bold border-b border-[#334155] pb-4">General Info</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">Project Title</label>
              <input
                type="text"
                required
                value={data.title}
                onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
                    setData({ ...data, title, slug: isNew ? slug : data.slug });
                }}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                placeholder="e.g. Next-Gen Commerce"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">Slug</label>
              <input
                type="text"
                required
                value={data.slug}
                onChange={(e) => setData({ ...data, slug: e.target.value })}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors font-mono text-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">Short Description</label>
              <textarea
                required
                value={data.shortDescription}
                onChange={(e) => setData({ ...data, shortDescription: e.target.value })}
                rows={3}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors leading-relaxed"
                placeholder="A concise summary for the card grid..."
              />
            </div>
          </section>

          <section className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 space-y-6">
            <h2 className="font-archivo text-xl font-bold border-b border-[#334155] pb-4">Full Case Study</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">The Challenge</label>
                    <textarea
                        value={data.challenges}
                        onChange={(e) => setData({ ...data, challenges: e.target.value })}
                        rows={4}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-xs text-[#94A3B8] focus:outline-none focus:border-[#22C55E]/60 transition-colors leading-relaxed"
                        placeholder="What problem were you solving?"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#94A3B8]">The Outcome</label>
                    <textarea
                        value={data.outcomes}
                        onChange={(e) => setData({ ...data, outcomes: e.target.value })}
                        rows={4}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-xs text-[#94A3B8] focus:outline-none focus:border-[#22C55E]/60 transition-colors leading-relaxed"
                        placeholder="What was the result or impact?"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#94A3B8]">The Story (Markdown Supported)</label>
              <textarea
                value={data.fullStory}
                onChange={(e) => setData({ ...data, fullStory: e.target.value })}
                rows={12}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors leading-relaxed font-mono text-sm"
                placeholder="## Overview\n\nUse markdown to tell the full story..."
              />
            </div>
          </section>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <section className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 space-y-6">
            <h2 className="font-archivo text-sm font-bold text-[#F8FAFC] uppercase tracking-widest">Publish Settings</h2>
            
            <div className="flex items-center justify-between p-4 bg-[#0F172A] rounded-2xl border border-[#334155]">
                <div className="flex flex-col">
                    <span className="text-sm font-bold">Featured Project</span>
                    <span className="text-[10px] text-[#94A3B8]">Show on homepage grid</span>
                </div>
                <button
                    type="button"
                    onClick={() => setData({ ...data, isFeatured: !data.isFeatured })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${data.isFeatured ? "bg-[#22C55E]" : "bg-[#334155]"}`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${data.isFeatured ? "left-7" : "left-1"}`} />
                </button>
            </div>

            <button
                id="submit-project"
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] disabled:opacity-50 transition-all cursor-pointer shadow-xl shadow-[#22C55E]/20"
            >
                {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {isNew ? "Create Project" : "Save Changes"}
            </button>
          </section>

          <section className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 space-y-6">
            <h2 className="font-archivo text-sm font-bold text-[#F8FAFC] uppercase tracking-widest">Media & Links</h2>
            
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#94A3B8] flex items-center gap-1">
                        <ImageIcon size={12} /> Cover Image
                    </label>
                    <div className="relative aspect-video rounded-xl bg-[#0F172A] border border-[#334155] overflow-hidden flex flex-col items-center justify-center group">
                        {data.coverImage ? (
                            <>
                                <img src={data.coverImage} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center border-4 border-dashed border-[#22C55E]/50">
                                    <label className="cursor-pointer bg-[#22C55E] text-[#0F172A] px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2">
                                        <Upload size={14} /> Change Image
                                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                    </label>
                                </div>
                            </>
                        ) : (
                            <label className="cursor-pointer flex flex-col items-center gap-2 text-[#475569] hover:text-[#94A3B8] transition-colors">
                                {uploading ? <Loader2 className="animate-spin" /> : <Plus size={32} />}
                                <span className="text-xs font-medium">Upload Cover</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                            </label>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#94A3B8] flex items-center justify-between">
                        <span className="flex items-center gap-1"><ImageIcon size={12} /> Project Gallery</span>
                        {galleryUploading && <Loader2 size={12} className="animate-spin text-[#22C55E]" />}
                    </label>
                    
                    <div className="grid grid-cols-2 gap-3">
                        {data.gallery.map((url, index) => (
                            <div key={`${url}-${index}`} className="relative aspect-video rounded-lg border border-[#334155] overflow-hidden group">
                                <img src={url} className="w-full h-full object-cover" alt="Gallery item" />
                                <button 
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute top-1 right-1 p-1 bg-red-500/80 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        <label className="aspect-video rounded-lg border border-dashed border-[#334155] hover:border-[#22C55E]/50 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors group">
                            {galleryUploading ? <Loader2 className="w-4 h-4 text-[#22C55E] animate-spin" /> : <Plus size={16} className="text-[#475569] group-hover:text-[#22C55E]" />}
                            <span className="text-[10px] font-medium text-[#475569] group-hover:text-[#22C55E]">Add Images</span>
                            <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryUpload} />
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#94A3B8] flex items-center gap-1">
                        <Play size={12} /> YouTube URL
                    </label>
                    <input
                        type="text"
                        value={data.videoUrl}
                        onChange={(e) => setData({ ...data, videoUrl: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                        placeholder="https://youtube.com/watch?v=..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#94A3B8] flex items-center gap-1">
                        <GitHub size={12} /> GitHub URL
                    </label>
                    <input
                        type="text"
                        value={data.githubUrl}
                        onChange={(e) => setData({ ...data, githubUrl: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#94A3B8] flex items-center gap-1">
                        <ExternalLink size={12} /> Demo URL
                    </label>
                    <input
                        type="text"
                        value={data.demoUrl}
                        onChange={(e) => setData({ ...data, demoUrl: e.target.value })}
                        className="bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-sm text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                    />
                </div>
            </div>
          </section>

          <section className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 space-y-4">
            <h2 className="font-archivo text-sm font-bold text-[#F8FAFC] uppercase tracking-widest">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
                {data.techStack.map((tech) => (
                    <span key={tech} className="flex items-center gap-1 px-3 py-1 bg-[#0F172A] border border-[#334155] text-xs text-[#94A3B8] rounded-lg">
                        {tech}
                        <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-400">
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                    className="flex-1 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-2 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#22C55E]/60 transition-colors"
                    placeholder="Add tech..."
                />
                <button
                    type="button"
                    onClick={addTech}
                    className="p-2 rounded-xl bg-[#334155] text-[#F8FAFC] hover:bg-[#22C55E] hover:text-[#0F172A] transition-all"
                >
                    <Plus size={16} />
                </button>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
}
