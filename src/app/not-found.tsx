import Link from "next/link";
import { FileQuestion, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-[#1E293B] border border-[#334155] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#22C55E]">
          <FileQuestion size={40} />
        </div>
        
        <h1 className="font-archivo text-4xl font-bold text-[#F8FAFC] mb-4">
          404
        </h1>
        
        <h2 className="text-xl font-semibold text-[#F8FAFC] mb-4">
          Page Not Found
        </h2>
        
        <p className="text-[#94A3B8] mb-10 leading-relaxed">
          The page you are looking for might have been moved, deleted, or never existed in the first place.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] transition-all cursor-pointer"
        >
          <MoveLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
