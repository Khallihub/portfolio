import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Sections ──────────────────────────────────────────────────────────────
  await prisma.section.deleteMany();
  await prisma.section.createMany({
    data: [
      { type: "hero",       title: "Hero",       order: 1, isVisible: true },
      { type: "about",      title: "About",      order: 2, isVisible: true },
      { type: "projects",   title: "Projects",   order: 3, isVisible: true },
      { type: "experience", title: "Experience", order: 4, isVisible: true },
      { type: "skills",     title: "Skills",     order: 5, isVisible: true },
      { type: "education",  title: "Education",  order: 6, isVisible: true },
      { type: "contact",    title: "Contact",    order: 7, isVisible: true },
    ],
  });

  // ── Hero ──────────────────────────────────────────────────────────────────
  await prisma.heroContent.deleteMany();
  await prisma.heroContent.create({
    data: {
      headline: "I build *systems* that scale and *experiences* that matter",
      subheadline:
        "Full-stack engineer focused on AI-powered products, clean architecture, and delightful interfaces.",
      ctaText: "See My Work",
      ctaLink: "/#projects",
    },
  });

  // ── About ─────────────────────────────────────────────────────────────────
  await prisma.aboutContent.deleteMany();
  await prisma.aboutContent.create({
    data: {
      statement: "I turn complex problems into elegant, scalable solutions.",
      bio: "With a background spanning AI systems, backend engineering, and frontend craftsmanship, I approach every project with a product mindset. I care deeply about the intersection of great technology and great design.",
    },
  });

  // ── Projects ─────────────────────────────────────────────────────────────
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "AI Document Intelligence Platform",
        slug: "ai-document-intelligence",
        shortDescription:
          "End-to-end document processing pipeline powered by LLMs. Extracts, classifies, and indexes unstructured data at scale.",
        fullStory:
          "## Overview\n\nA production-grade AI pipeline that processes thousands of documents per hour using LLM-based extraction, vector embeddings, and a custom classification layer.\n\n## Architecture\n\nBuilt on Next.js + FastAPI with a PostgreSQL + pgvector database for semantic search. Deployed on AWS ECS with auto-scaling.\n\n## Results\n\n- 94% accuracy on extraction tasks\n- 10× faster than manual processing\n- Processing 50k+ documents/day in production",
        challenges:
          "Handling diverse document formats (PDFs, images, tables) while maintaining high accuracy and low latency at scale.",
        outcomes:
          "Reduced document processing time by 10× and improved data accuracy to 94%, enabling the client to scale operations without headcount.",
        techStack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "OpenAI", "AWS"],
        isFeatured: true,
        order: 1,
      },
      {
        title: "Real-time Collaboration Engine",
        slug: "realtime-collaboration-engine",
        shortDescription:
          "WebSocket-based collaboration layer enabling real-time multi-user editing with conflict resolution.",
        fullStory:
          "## Overview\n\nA low-latency collaboration engine built with operational transform (OT) for conflict-free concurrent edits.\n\n## Tech\n\nSocket.IO, Redis for state sync, PostgreSQL for persistence, and a custom OT algorithm.\n\n## Impact\n\n- Sub-100ms latency\n- Supports 500+ concurrent users per room\n- Zero data loss in conflict scenarios",
        challenges:
          "Implementing conflict-free concurrent edits across hundreds of simultaneous users without data loss.",
        outcomes:
          "Sub-100ms latency with support for 500+ concurrent users per room, zero data loss recorded in production.",
        techStack: ["Socket.IO", "Redis", "PostgreSQL", "Node.js", "React"],
        isFeatured: true,
        order: 2,
      },
    ],
  });

  // ── Experience ────────────────────────────────────────────────────────────
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        slug: "senior-fullstack-engineer-acme",
        role: "Senior Full-Stack Engineer",
        company: "Acme Corp",
        location: "Remote",
        description:
          "Led the redesign and re-architecture of the core product platform, improving performance and enabling new AI features.",
        fullStory:
          "## Context\n\nJoined as the team lead for the platform team. Inherited a monolithic Rails app and transformed it into a modular Next.js + microservices architecture.\n\n## Achievements\n\n- Migrated 2M+ users to new platform with zero downtime\n- Introduced AI-powered search reducing query time by 60%\n- Mentored 4 junior engineers",
        highlights: [
          "Led migration of 2M+ users to new platform with zero downtime",
          "Reduced query time by 60% via AI-powered semantic search",
          "Designed and shipped 3 major product features end-to-end",
          "Mentored 4 junior engineers, 2 of whom were promoted",
        ],
        startDate: new Date("2023-01-01"),
        endDate: null,
        order: 1,
      },
      {
        slug: "fullstack-engineer-beta-labs",
        role: "Full-Stack Engineer",
        company: "Beta Labs",
        location: "Istanbul, TR",
        description:
          "Built and shipped multiple product features for a B2B SaaS platform serving 500+ enterprise clients.",
        fullStory:
          "## Context\n\nEarly-stage startup building B2B SaaS tooling. Fast-paced environment with end-to-end ownership.\n\n## Achievements\n\n- Shipped dashboard analytics feature used by 95% of customers\n- Built internal CMS reducing content update time by 80%\n- Improved API response times by 40% via query optimization",
        highlights: [
          "Shipped dashboard analytics feature adopted by 95% of customers",
          "Built internal CMS cutting content update time by 80%",
          "Improved API response times by 40% via query optimization",
        ],
        startDate: new Date("2021-03-01"),
        endDate: new Date("2022-12-31"),
        order: 2,
      },
    ],
  });

  // ── Skills ────────────────────────────────────────────────────────────────
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
      { category: "AI Systems",  name: "LLM Integration"  },
      { category: "AI Systems",  name: "RAG Pipelines"    },
      { category: "AI Systems",  name: "Vector Databases" },
      { category: "AI Systems",  name: "LangChain"        },
      { category: "AI Systems",  name: "OpenAI API"       },
      { category: "Backend",     name: "Node.js"          },
      { category: "Backend",     name: "Python / FastAPI" },
      { category: "Backend",     name: "PostgreSQL"       },
      { category: "Backend",     name: "Redis"            },
      { category: "Backend",     name: "Prisma ORM"       },
      { category: "Backend",     name: "REST & GraphQL"   },
      { category: "Frontend",    name: "React"            },
      { category: "Frontend",    name: "Next.js"          },
      { category: "Frontend",    name: "TypeScript"       },
      { category: "Frontend",    name: "Tailwind CSS"     },
      { category: "Frontend",    name: "Framer Motion"    },
      { category: "DevOps",      name: "Docker"           },
      { category: "DevOps",      name: "AWS"              },
      { category: "DevOps",      name: "CI/CD (GitHub Actions)" },
      { category: "DevOps",      name: "Vercel"           },
    ],
  });

  // ── Education ────────────────────────────────────────────────────────────
  await prisma.education.deleteMany();
  await prisma.education.create({
    data: {
      institution: "Istanbul Technical University",
      degree: "B.Sc. Computer Engineering",
      description: "Focused on algorithms, distributed systems, and machine learning.",
      startYear: 2016,
      endYear: 2020,
    },
  });

  // ── Contact Config ────────────────────────────────────────────────────────
  await prisma.contactConfig.deleteMany();
  await prisma.contactConfig.create({
    data: {
      email: "hello@example.com",
      ctaText: "Let's Build Something Together",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      twitterUrl: "https://twitter.com",
    },
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
