"use client";

import { useState, useEffect } from "react";
import { Trash2, Loader2, Mail, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, []);

  const deleteMessage = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="font-archivo text-3xl font-bold mb-2">Messages</h1>
        <p className="text-[#94A3B8]">
          Review inquiries and contact requests from your portfolio visitors.
        </p>
      </header>

      {messages.length === 0 ? (
        <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-20 text-center">
          <div className="w-16 h-16 bg-[#334155] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#94A3B8]">
            <Mail size={32} />
          </div>
          <p className="text-[#94A3B8]">No messages yet. Keep up the great work!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 group hover:border-[#22C55E]/40 transition-all shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC]">
                        <User size={16} className="text-[#22C55E]" />
                        {msg.name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                        <Mail size={16} />
                        {msg.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#475569]">
                        <Calendar size={14} />
                        {new Date(msg.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteMessage(msg.id)}
                    disabled={deleting === msg.id}
                    className="p-3 rounded-xl border border-[#334155] text-[#94A3B8] hover:text-red-400 hover:border-red-400/40 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {deleting === msg.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
