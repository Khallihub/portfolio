"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FolderKanban, Plus, Pencil, Trash2, ExternalLink, Loader2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  isFeatured: boolean;
  order: number;
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
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
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="font-archivo text-3xl font-bold mb-2">Projects</h1>
          <p className="text-[#94A3B8]">Manage your case studies and featured work.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] transition-all cursor-pointer shadow-lg shadow-[#22C55E]/20"
        >
          <Plus size={20} /> New Project
        </Link>
      </header>

      {projects.length === 0 ? (
        <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-20 text-center">
          <div className="w-16 h-16 bg-[#334155] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
            <FolderKanban size={32} />
          </div>
          <p className="text-[#94A3B8] mb-8">No projects found. Add your first work to get started.</p>
          <Link
            href="/admin/projects/new"
            className="text-[#22C55E] font-semibold hover:underline"
          >
            Create first project →
          </Link>
        </div>
      ) : (
        <div className="bg-[#1E293B] border border-[#334155] rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#0F172A]/50 border-b border-[#334155]">
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-[#475569]">Order</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-[#475569]">Title</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-[#475569]">Slug</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-[#475569]">Featured</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider font-bold text-[#475569] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-[#334155]/20 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-[#475569]">#{project.order}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#F8FAFC]">{project.title}</span>
                      <span className="text-[10px] text-[#94A3B8] line-clamp-1 max-w-[200px]">{project.shortDescription}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#94A3B8] font-mono">/{project.slug}</td>
                  <td className="px-6 py-4">
                    {project.isFeatured ? (
                      <span className="px-2 py-1 rounded-lg bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold uppercase tracking-tight">Featured</span>
                    ) : (
                      <span className="px-2 py-1 rounded-lg bg-[#334155] text-[#94A3B8] text-[10px] font-bold uppercase tracking-tight">Standard</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link
                        href={`/project/${project.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-[#94A3B8] hover:text-[#22C55E] hover:bg-[#22C55E]/10 transition-all cursor-pointer"
                        title="View live"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-2 rounded-lg text-[#94A3B8] hover:text-blue-400 hover:bg-blue-400/10 transition-all cursor-pointer"
                        title="Edit project"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteProject(project.id)}
                        disabled={deleting === project.id}
                        className="p-2 rounded-lg text-[#94A3B8] hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer disabled:opacity-50"
                        title="Delete project"
                      >
                        {deleting === project.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
