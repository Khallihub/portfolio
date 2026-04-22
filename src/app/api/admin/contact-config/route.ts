import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const config = await prisma.contactConfig.findFirst();
    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: "Failed to fetch contact config" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await prisma.contactConfig.findFirst();

    const data = {
      email: body.email,
      ctaText: body.ctaText,
      githubUrl: body.githubUrl,
      linkedinUrl: body.linkedinUrl,
      twitterUrl: body.twitterUrl,
    };

    let updated;
    if (existing) {
      updated = await prisma.contactConfig.update({
        where: { id: existing.id },
        data,
      });
    } else {
      updated = await prisma.contactConfig.create({ data });
    }

    revalidatePath("/");
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update contact config" }, { status: 500 });
  }
}
