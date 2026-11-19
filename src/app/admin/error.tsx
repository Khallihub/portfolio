"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-400/10 border border-red-400/20 rounded-full flex items-center justify-center mx-auto mb-8 text-red-400">
          <AlertCircle size={40} />
        </div>
        
        <h1 className="font-archivo text-3xl font-bold text-[#F8FAFC] mb-4">
          Something went wrong
        </h1>
        
        <p className="text-[#94A3B8] mb-10 leading-relaxed">
          An unexpected error occurred. We&apos;ve been notified and are looking into it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] transition-all cursor-pointer"
          >
            <RotateCcw size={18} />
            Try again
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#F8FAFC] font-bold transition-all cursor-pointer"
          >
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
