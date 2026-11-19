import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
    // Enables React <ViewTransition> integration for route navigations
    // (case-study titles morph between the homepage and detail pages).
    viewTransition: true,
  },
  // Experience slugs renamed in Nov 2026 (placeholder company names, stray
  // hyphens). The old addresses were linked from the previous site.
  async redirects() {
    return [
      ["senior-fullstack-engineer-acme", "senior-software-engineer-eaglepoint-ai"],
      ["fullstack-engineer-beta-labs", "back-end-engineer-aladia"],
      ["full-stack-developer-nextjs-developer-", "full-stack-developer-nextjs-freelance"],
      ["full-stack-developer-nuxtjs-developer-", "full-stack-developer-nuxtjs-freelance"],
      ["backend-developer-net-", "backend-developer-dotnet-eskalate"],
      ["full-stack-developer-angular--net-aait", "full-stack-developer-angular-dotnet-aait"],
    ].map(([from, to]) => ({
      source: `/experience/${from}`,
      destination: `/experience/${to}`,
      permanent: true,
    }));
  },
  // Browsers and link unfurlers still request /favicon.ico directly; serve the
  // generated icon (src/app/icon.tsx) there instead of a 404.
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
