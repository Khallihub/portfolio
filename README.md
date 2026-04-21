# 🚀 Port-Max: High-Performance Engineer Portfolio

A premium, modern developer portfolio built with **Next.js 16**, **Prisma 7**, and **PostgreSQL**. Designed for maximum visual impact, blazing-fast performance, and extreme ease of management via a custom admin dashboard.

![Portfolio Preview](https://antgravity.vercel.app/og.png) _(Placeholder image link)_

## ✨ Key Features

- **💎 Premium UI/UX**: Dark-mode first design with glassmorphism, fluid Framer Motion animations, and custom SVG iconography.
- **🛠️ Dynamic Admin Dashboard**: Full CRUD management for Projects, Experience, Skills, and Sections without touching the code.
- **📊 Adaptive Skill System**: Create and categorize skills dynamically. The frontend automatically adjusts its grid and grouping based on your admin entries.
- **📁 Standardized Project Grid**: Professional masonry-style grid with uniform card heights and normalized image aspect ratios.
- **🛤️ Comprehensive Archive**: In addition to the "Featured Work" on the home page, a full `/projects` archive route allows visitors to browse your entire portfolio history.
- **📬 Dynamic Contact Flow**: Integrated with **Resend** for instant email notifications when you receive a message.
- **🔒 Secure Auth**: Built-in GitHub OAuth authentication for administrative access.
- **🔍 SEO Optimized**: Server-rendered, clean heading hierarchy, and a dynamically generated `sitemap.xml` with automatic route discovery.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org) - Utilizing the latest Turbopack and React 19 features.
- **Database**: [PostgreSQL (Supabase)](https://supabase.com) - Reliable, relational data storage.
- **ORM**: [Prisma 7](https://www.prisma.io) - Type-safe database queries.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) - Modern utility-first CSS.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Smooth, production-grade transitions.
- **Authentication**: [NextAuth.js (Auth.js)](https://authjs.dev) - Secure session management.
- **Mailing**: [Resend](https://resend.com) - High-deliverability email service.

## 🏁 Getting Started

### 1. Requirements

- Node.js 20+
- PostgreSQL database (e.g., Supabase)
- GitHub OAuth App (for Admin login)
- Resend API Key (for contact form)

### 2. Environment Setup

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgres://..."

# Auth (GitHub)
AUTH_SECRET="generate-with: openssl rand -base64 32"
AUTH_GITHUB_ID="your-client-id"
AUTH_GITHUB_SECRET="your-client-secret"
ADMIN_EMAIL="your-github-email@example.com"

# Email (Resend)
RESEND_API_KEY="re_..."
RESEND_FROM="Portfolio <contact@yourdomain.com>"
RESEND_TO="your@email.com"

# Optimization
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Installation & Database Sync

```bash
npm install
npm run db:push
npm run db:seed  # Optional: Seed with initial sample data
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio!

## 🚀 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

**Note on Build optimization:** This project includes `experimental: { cpus: 1 }` in `next.config.ts` to ensure stable static generation when connecting to specific database pools.

---

Built with ❤️ for High-Impact Engineers.
