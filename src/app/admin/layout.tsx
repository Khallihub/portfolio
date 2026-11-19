import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import AdminShell from "@/components/admin/AdminShell";

// The admin keeps its original typefaces; they load only on /admin routes.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${archivo.variable} ${spaceGrotesk.variable} admin-root`}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
