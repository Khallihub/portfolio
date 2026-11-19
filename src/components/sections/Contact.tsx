"use client";

import { useRef, useState } from "react";
import type { Chapter } from "@/lib/content";
import { site } from "@/lib/site";

interface ContactConfig {
  email: string;
  ctaText?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
}

interface ContactProps {
  chapter: Chapter;
  config: ContactConfig;
}

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<Field, string>) {
  const errors: Partial<Record<Field, string>> = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.email.trim()) errors.email = "Please add your email address.";
  else if (!EMAIL.test(values.email.trim()))
    errors.email = "That email address doesn't look right.";
  if (!values.message.trim()) errors.message = "Please write a short note.";
  return errors;
}

export default function Contact({ chapter, config }: ContactProps) {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as Field;
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (["name", "email", "message"] as Field[]).find((f) => found[f]);
    if (first) {
      const target = { name: nameRef, email: emailRef, message: messageRef }[first];
      target.current?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const socials = [
    { href: config.githubUrl, label: "GitHub" },
    { href: config.linkedinUrl, label: "LinkedIn" },
    { href: config.twitterUrl, label: "X" },
  ].filter((s): s is { href: string; label: string } => Boolean(s.href));

  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: "field",
  });

  const errorText = (field: Field) =>
    errors[field] ? (
      <span id={`contact-${field}-error`} className="note text-alert">
        {errors[field]}
      </span>
    ) : null;

  return (
    <section
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
      className="wrap pb-24 md:pb-32"
    >
      <div className="folio gap-y-8 border-t border-rule pt-7">
        <h2 id={`${chapter.id}-title`} className="folio-label sc text-muted">
          {chapter.numeral} — {chapter.label}
        </h2>
        <p className="folio-wide text-[clamp(42px,6vw,92px)] font-light italic leading-none tracking-[-0.028em] text-balance">
          {config.ctaText ?? "Let's work together."}
        </p>
        <p className="folio-text text-[21px] leading-[1.5] text-pretty md:text-[24px]">
          Write to{" "}
          <a href={`mailto:${config.email}`} className="link">
            {config.email}
          </a>
          , or leave a note below. I&apos;ll get back to you as soon as possible.
        </p>

        <form
          onSubmit={onSubmit}
          noValidate
          className="folio-text mt-2 grid gap-x-8 gap-y-8 sm:grid-cols-2"
        >
          <label htmlFor="contact-name" className="flex flex-col gap-1.5">
            <span className="sc text-muted">Your name</span>
            <input ref={nameRef} type="text" autoComplete="name" required {...fieldProps("name")} />
            {errorText("name")}
          </label>
          <label htmlFor="contact-email" className="flex flex-col gap-1.5">
            <span className="sc text-muted">Your email</span>
            <input
              ref={emailRef}
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              {...fieldProps("email")}
            />
            {errorText("email")}
          </label>
          <label htmlFor="contact-message" className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="sc text-muted">The note</span>
            <textarea ref={messageRef} rows={4} required {...fieldProps("message")} className="field resize-y" />
            {errorText("message")}
          </label>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
            <button type="submit" className="btn sc" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            <p role="status" aria-live="polite" className="note">
              {status === "success" && (
                <span className="text-bone">Thank you — your note is on its way.</span>
              )}
              {status === "error" && (
                <span className="text-alert">
                  Something went wrong. Please try again, or write to {config.email}.
                </span>
              )}
            </p>
          </div>
        </form>

        {(socials.length > 0 || site.resume) && (
          <div className="folio-note note lg:self-end">
            <p className="sc mb-1.5">Elsewhere</p>
            <ul className="flex flex-col gap-1 text-[14px]">
              {site.resume && (
                <li>
                  <a href={site.resume} type="application/pdf" className="link text-bone">
                    Résumé (PDF)
                  </a>
                </li>
              )}
              {socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="link text-bone" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
