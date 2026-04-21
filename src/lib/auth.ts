import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  callbacks: {
    async session({ session }) {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (session.user?.email === adminEmail) {
        (session.user as typeof session.user & { isAdmin: boolean }).isAdmin =
          true;
      }
      return session;
    },
    async signIn({ user }) {
      // Only allow the admin email to sign in
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail) return false;
      return user.email === adminEmail;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
});
