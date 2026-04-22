import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// ── Skills API ──────────────────────────────────────────────────────────────

export async function GET_SKILLS() {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { category: "asc" } });
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST_SKILL(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const skill = await prisma.skill.create({ data: body });
    revalidatePath("/");
    return NextResponse.json(skill);
  } catch {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}

export async function DELETE_SKILL(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.skill.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}

// ── Education API ───────────────────────────────────────────────────────────

export async function GET_EDUCATION() {
  try {
    const edu = await prisma.education.findMany({ orderBy: { startYear: "desc" } });
    return NextResponse.json(edu);
  } catch {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST_EDUCATION(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const edu = await prisma.education.create({ data: body });
    revalidatePath("/");
    return NextResponse.json(edu);
  } catch {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 });
  }
}

export async function DELETE_EDUCATION(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.education.delete({ where: { id } });
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 });
  }
}

// Route exports
export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    if (type === "skills") return GET_SKILLS();
    if (type === "education") return GET_EDUCATION();
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
};

export const POST = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    if (type === "skills") return POST_SKILL(req);
    if (type === "education") return POST_EDUCATION(req);
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
};

export const DELETE = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    if (type === "skills") return DELETE_SKILL(req);
    if (type === "education") return DELETE_EDUCATION(req);
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
};
