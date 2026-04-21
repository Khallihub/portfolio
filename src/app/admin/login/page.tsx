"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { Loader2, Lock, AlertCircle } from "lucide-react";
import { GitHub } from "@/components/ui/Icons";

function LoginForm() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const error = searchParams.get("error");

  useEffect(() => {
    if (status === "authenticated") {
      const callbackUrl = searchParams.get("callbackUrl") || "/admin";
      router.push(callbackUrl);
    }
  }, [status, router, searchParams]);

  const handleLogin = async () => {
    setLoading(true);
    await signIn("github");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-md w-full">
      {/* Logo/Icon */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#22C55E]">
          <Lock size={32} />
        </div>
        <h1 className="font-archivo text-3xl font-bold mb-2">Admin Portal</h1>
        <p className="text-[#94A3B8]">Sign in to manage your portfolio.</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle size={18} />
          <p>
            {error === "AccessDenied"
              ? "You do not have permission to access the admin area. Make sure your email matches the ADMIN_EMAIL in .env."
              : "An error occurred during sign in. Please try again."}
          </p>
        </div>
      )}

      {/* Login Card */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-8 shadow-2xl">
        <button
          id="login-github"
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-14 bg-white text-[#0F172A] rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <GitHub size={24} />
          )}
          Continue with GitHub
        </button>

        <p className="mt-8 text-center text-xs text-[#94A3B8] leading-relaxed">
          Only the authorized administrator can sign in.
          <br />
          Access is restricted to the specific GitHub account email.
        </p>
      </div>
      
      <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
              ← Back to site
          </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6">
      <Suspense fallback={
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
