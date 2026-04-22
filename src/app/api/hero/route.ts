import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const hero = await prisma.heroContent.findFirst();
    return NextResponse.json(hero);
  } catch {
    return NextResponse.json({ error: "Failed to fetch hero content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await prisma.heroContent.findFirst();

    const data = {
      headline: body.headline,
      subheadline: body.subheadline,
      ctaText: body.ctaText,
      ctaLink: body.ctaLink,
    };

    let updated;
    if (existing) {
      updated = await prisma.heroContent.update({
        where: { id: existing.id },
        data,
      });
    } else {
      updated = await prisma.heroContent.create({ data });
    }

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update hero content" }, { status: 500 });
  }
}
