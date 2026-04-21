"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { GitHub, LinkedIn, X } from "@/components/ui/Icons";
import { fadeUp, fadeLeft, staggerContainer, viewportOnce, motionNone } from "@/lib/animations";

interface ContactConfig {
  email: string;
  ctaText?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
}

interface ContactProps {
  config: ContactConfig;
}

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact({ config }: ContactProps) {
  const shouldReduce = useReducedMotion();
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const socialLinks = [
    { href: config.githubUrl, icon: GitHub, label: "GitHub" },
    { href: config.linkedinUrl, icon: LinkedIn, label: "LinkedIn" },
    { href: config.twitterUrl, icon: X, label: "X (Twitter)" },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-[#22C55E] text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Contact
        </motion.p>
        <motion.h2
          variants={shouldReduce ? motionNone : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
          className="font-archivo text-4xl md:text-5xl font-bold mb-16"
        >
          {config.ctaText ?? "Let's Work Together"}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: info */}
          <motion.div
            variants={shouldReduce ? motionNone : fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
              Have a project in mind or just want to say hi? My inbox is always
              open. I&apos;ll get back to you as soon as possible.
            </p>
            <a
              href={`mailto:${config.email}`}
              className="inline-block text-[#22C55E] font-semibold text-lg hover:underline mb-10 cursor-pointer"
            >
              {config.email}
            </a>

            {socialLinks.length > 0 && (
              <div>
                <p className="text-xs text-[#94A3B8] uppercase tracking-widest mb-4">
                  Find me on
                </p>
                <div className="flex gap-4">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-3 rounded-xl bg-[#1E293B] border border-[var(--color-border)] text-[#94A3B8] hover:text-[#22C55E] hover:border-[#22C55E]/40 transition-colors duration-200 cursor-pointer"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: form */}
          <motion.form
            variants={shouldReduce ? motionNone : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm text-[#94A3B8] font-medium">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="px-4 py-3 rounded-xl bg-[#1E293B] border border-[var(--color-border)] text-[#F8FAFC] placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#22C55E]/60 transition-colors duration-200 text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm text-[#94A3B8] font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="px-4 py-3 rounded-xl bg-[#1E293B] border border-[var(--color-border)] text-[#F8FAFC] placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#22C55E]/60 transition-colors duration-200 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-sm text-[#94A3B8] font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="px-4 py-3 rounded-xl bg-[#1E293B] border border-[var(--color-border)] text-[#F8FAFC] placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#22C55E]/60 transition-colors duration-200 text-sm resize-none"
              />
            </div>

            {/* Status messages */}
            {formState === "success" && (
              <div className="flex items-center gap-2 text-[#22C55E] text-sm">
                <CheckCircle size={16} /> Message sent! I&apos;ll be in touch soon.
              </div>
            )}
            {formState === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} /> Something went wrong. Please try again.
              </div>
            )}

            <button
              id="contact-submit"
              type="submit"
              disabled={formState === "sending"}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#22C55E] text-[#0F172A] font-semibold hover:bg-[#16A34A] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer self-start"
            >
              {formState === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
