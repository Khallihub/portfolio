import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const about = await prisma.aboutContent.findFirst();
    return NextResponse.json(about);
  } catch {
    return NextResponse.json({ error: "Failed to fetch about content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await prisma.aboutContent.findFirst();

    const data = {
      statement: body.statement,
      bio: body.bio,
    };

    let updated;
    if (existing) {
      updated = await prisma.aboutContent.update({
        where: { id: existing.id },
        data,
      });
    } else {
      updated = await prisma.aboutContent.create({ data });
    }

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 });
  }
}
