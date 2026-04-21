# Portfolio Project Plan (Next.js + PostgreSQL + Framer Motion)

## 1. Vision

Build a **high-impact, dynamic portfolio experience** that:

- Feels like a guided product, not a static website
- Is fully controlled via database (no hardcoding content)
- Uses animation intentionally (not decoration)
- Prioritizes storytelling, clarity, and interaction

---

## 2. Core Principles

- **Experience > Effects**
- **Story > Sections**
- **Control > Hardcoding**
- **Depth > Quantity**
- **Restraint > Over-animation**

---

## 3. Tech Stack

### Frontend + Backend

- Next.js (App Router)

### Database

- PostgreSQL

### ORM

- Prisma

### Animation

- Framer Motion

### Hosting

- Vercel + Neon/Supabase (Postgres)

---

## 4. System Architecture

Two main systems:

### 1. Public Portfolio (User-facing)

- Dynamic sections rendered from DB
- Scroll-based storytelling
- Interactive project exploration

### 2. Admin Panel (/admin)

- Manage all content
- Reorder sections
- Toggle visibility
- Control animations via config

---

## 5. Sitemap

### Primary Routes

```
/                  → Main experience (single-page)
/project/[slug]    → Project deep dive
/admin             → Admin panel
```

### Future (Optional)

```
/playground        → Experiments & demos
```

---

## 6. Homepage Structure (Core Experience)

All sections are dynamically rendered from DB:

```
[ Hero ]
[ About / Identity ]
[ Projects (Featured) ]
[ Experience ]
[ Skills ]
[ Education ]
[ Contact ]
```

---

## 7. Section Definitions

### 1. Hero

- Strong statement
- Minimal UI
- Subtle animation

---

### 2. About (Identity)

- Who you are (positioning)
- 1–2 strong statements
- No long paragraphs

---

### 3. Projects (Most Important)

- Interactive cards
- Expand → full screen (animated)

---

### 4. Experience

- Timeline layout
- Focus on impact, not responsibilities
- Expandable entries

---

### 5. Skills

- Grouped by domain:
  - AI Systems
  - Backend
  - Frontend
  - DevOps

- Avoid icon spam

---

### 6. Education

- Minimal
- Supporting credibility only

---

### 7. Contact

- Simple CTA
- Email or form
- Clear action

---

## 8. Database Schema

### `sections`

- id (uuid)
- type (about, projects, etc.)
- title
- order (int)
- is_visible (boolean)
- config (jsonb for animation/layout)

---

### `projects`

- id
- title
- slug
- short_description
- full_story
- cover_image
- demo_url
- github_url
- is_featured
- order

---

### `experience`

- id
- role
- company
- description
- start_date
- end_date
- order

---

### `skills`

- id
- category
- name
- level

---

### `education`

- id
- institution
- degree
- description
- year

---

## 9. Dynamic Rendering Strategy

Render sections from DB:

```tsx
sections.map((section) => {
  switch (section.type) {
    case "about":
      return <About />;
    case "projects":
      return <Projects />;
    case "experience":
      return <Experience />;
    case "skills":
      return <Skills />;
    case "education":
      return <Education />;
    case "contact":
      return <Contact />;
  }
});
```

---

### Usage

- Scroll-based reveals
- Staggered animations
- Layout transitions for projects

---

### Rules

- Animate only meaningful transitions
- Avoid excessive motion
- Use `viewport: { once: true }`

---

## 11. High-Impact Interactions

### 1. Scroll Storytelling

- Sections animate into view
- Smooth progression

### 2. Project Expansion

- Click → expand in place
- Use layout animations

### 3. Micro-interactions

- Hover effects (limited)
- Magnetic buttons
- Subtle cursor effects

---

## 12. Admin Panel Features

- CRUD for all content
- Section ordering (drag/drop)
- Visibility toggle
- Edit animation config (JSON)
- Feature projects toggle

---

## 13. Folder Structure

```
/app
  /(public)
    page.tsx
  /project/[slug]
  /admin
  /api

/components
  sections/
    Hero.tsx
    About.tsx
    Projects.tsx
    Experience.tsx
    Skills.tsx
    Education.tsx
    Contact.tsx

/lib
  prisma.ts
  animations.ts

/types
```

---

## 14. Performance Strategy

- Use Server Components where possible
- Cache responses (`revalidate`)
- Optimize images
- Limit heavy animations
- Avoid unnecessary re-renders

---

## 16. Common Mistakes to Avoid

- Too many projects
- Too many animations
- Generic content
- Cluttered UI
- Treating it like a resume instead of an experience

---

## 17. Success Criteria

The site should:

- Hook attention in < 5 seconds
- Clearly communicate value
- Show depth (not just surface)
- Feel smooth and intentional
- Be easy to update dynamically

---

## 18. Final Note

The stack enables flexibility.
The design and storytelling create impact.

If content is weak, no animation or tech will fix it.
