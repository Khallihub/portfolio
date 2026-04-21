"use client";

import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/admin/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <SessionProvider>{children}</SessionProvider>;
  }

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-[#0F172A] text-[#F8FAFC]">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 lg:p-12">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
