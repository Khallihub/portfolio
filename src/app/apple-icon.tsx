import { ImageResponse } from "next/og";
import { monogram } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so the square is left square.
export default async function AppleIcon() {
  const { element, fonts } = await monogram({ size: size.width, radius: 0 });
  return new ImageResponse(element, { ...size, fonts });
}
