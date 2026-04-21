import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Static routes
  const routes = [""];
  
  // Dynamic routes
  const [projects, experiences] = await Promise.all([
    prisma.project.findMany({ select: { slug: true, createdAt: true } }),
    prisma.experience.findMany({ select: { slug: true } }),
  ]);

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/project/${p.slug}`,
    lastModified: p.createdAt,
  }));

  const experienceUrls = experiences.map((e) => ({
    url: `${baseUrl}/experience/${e.slug}`,
    lastModified: new Date(),
  }));

  const staticUrls = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...projectUrls, ...experienceUrls];
}
