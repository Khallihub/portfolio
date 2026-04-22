import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "Filename is required" }, { status: 400 });
  }

  try {
    const blob = await put(filename, request.body!, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json(blob);
  } catch (error) {
    const message = (error as Error).message;
    console.error("[UPLOAD_API_ERROR]", message);
    return NextResponse.json({ 
      error: message,
      hint: message.includes("token") ? "Check your BLOB_READ_WRITE_TOKEN in .env" : "Ensure your store is set to Public"
    }, { status: 500 });
  }
}
