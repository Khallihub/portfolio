import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(sections);
  } catch {
    return NextResponse.json({ error: "Failed to fetch sections" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { id, isVisible, order } = body as { id: string; isVisible?: boolean; order?: number };

    const updated = await prisma.section.update({
      where: { id },
      data: {
        ...(isVisible !== undefined && { isVisible }),
        ...(order !== undefined && { order }),
      },
    });
    revalidatePath("/");
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update section" }, { status: 500 });
  }
}

// Bulk update for reordering
export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { orders } = body as { orders: { id: string; order: number }[] };

    await prisma.$transaction(
      orders.map((item) =>
        prisma.section.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to reorder sections" }, { status: 500 });
  }
}
