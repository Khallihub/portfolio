import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-t-2 border-b-2 border-[#22C55E] animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-[#22C55E] animate-pulse" />
          </div>
        </div>
        <p className="font-archivo text-sm font-medium text-[#22C55E] animate-pulse tracking-widest uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
