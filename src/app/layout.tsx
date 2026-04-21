import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description:
    "A high-impact, dynamic portfolio experience. Explore my projects, experience, and skills.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Portfolio",
    description:
      "A high-impact, dynamic portfolio experience. Explore my projects, experience, and skills.",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description:
      "A high-impact, dynamic portfolio experience. Explore my projects, experience, and skills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#0F172A] text-[#F8FAFC] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
