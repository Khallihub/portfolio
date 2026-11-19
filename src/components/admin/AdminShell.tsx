"use client";

import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/components/admin/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminShell({
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
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 lg:p-12">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
