import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const config = await prisma.contactConfig.findFirst();
    return Response.json({ config });
  } catch {
    return Response.json({ error: "Failed to fetch contact config" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Save to DB
    const saved = await prisma.contactSubmission.create({
      data: { name: name.trim(), email: email.trim(), message: message.trim() },
    });

    // Send email notification (non-blocking — don't fail the request if email fails)
    try {
      await sendContactNotification({ name: name.trim(), email: email.trim(), message: message.trim() });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    return Response.json({ success: true, id: saved.id }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
