import { ImageResponse } from "next/og";
import { monogram } from "@/lib/og";

// A multiple of 48px, which Google asks for in search-result favicons.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  const { element, fonts } = await monogram({ size: size.width, radius: 20 });
  return new ImageResponse(element, { ...size, fonts });
}
