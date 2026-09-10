"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studio } from "@/lib/projects";
import { RevealText } from "./Reveal";

const EASE = [0.65, 0, 0.35, 1] as const;

const FIELDS = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "projectType", label: "Project Type", type: "text" },
  { name: "location", label: "Location", type: "text" },
] as const;

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="editorial-container pb-28 pt-[calc(var(--header-h)+3rem)] sm:pb-40">
      <RevealText as="h1" className="max-w-2xl text-[1.6rem] font-medium uppercase leading-[1.25] tracking-tightest sm:text-[2.6rem]">
        Let&rsquo;s create something together.
      </RevealText>

      <RevealText delay={0.1} className="mt-16 grid grid-cols-1 gap-8 sm:mt-24 sm:max-w-xl sm:grid-cols-3 sm:gap-6">
        <div>
          <p className="text-micro uppercase tracking-label text-stone">Email</p>
          <p className="mt-2 text-[0.95rem]">{studio.email}</p>
        </div>
        <div>
          <p className="text-micro uppercase tracking-label text-stone">Instagram</p>
          <p className="mt-2 text-[0.95rem]">{studio.instagram}</p>
        </div>
        <div>
          <p className="text-micro uppercase tracking-label text-stone">Location</p>
          <p className="mt-2 text-[0.95rem]">Guadalajara, Mexico</p>
        </div>
      </RevealText>

      <div className="mt-16 max-w-xl sm:mt-24">
        {!submitted && (
          <button
            type="button"
            data-cursor="link"
            onClick={() => setFormOpen((v) => !v)}
            className="text-[0.9rem] uppercase tracking-label text-ink"
          >
            Start a project {formOpen ? "↑" : "→"}
          </button>
        )}

        <AnimatePresence initial={false}>
          {formOpen && !submitted && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-7">
                {FIELDS.map((field) => (
                  <label key={field.name} className="block">
                    <span className="block text-micro uppercase tracking-label text-stone">
                      {field.label}
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      className="mt-2 w-full border-0 border-b border-line bg-transparent pb-2 text-[0.95rem] outline-none transition-colors focus:border-ink"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="block text-micro uppercase tracking-label text-stone">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    className="mt-2 w-full resize-none border-0 border-b border-line bg-transparent pb-2 text-[0.95rem] outline-none transition-colors focus:border-ink"
                  />
                </label>
                <button
                  type="submit"
                  data-cursor="link"
                  className="mt-2 self-start text-[0.9rem] uppercase tracking-label text-ink underline underline-offset-4"
                >
                  Send →
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {submitted && (
          <RevealText className="text-[0.95rem] uppercase tracking-label text-stone">
            Thank you — we&rsquo;ll be in touch shortly.
          </RevealText>
        )}
      </div>
    </section>
  );
}
