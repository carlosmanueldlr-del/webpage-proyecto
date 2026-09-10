"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMenu } from "./MenuContext";
import { projects, studio } from "@/lib/projects";
import { Photo } from "./ArchPhoto";

const EASE = [0.65, 0, 0.35, 1] as const;

const PRIMARY_LINKS = [
  { label: "Proyectos", href: "/#projects" },
  { label: "Nosotros", href: "/about" },
  { label: "Servicios", href: "/services" },
  { label: "Contacto", href: "/contact" },
  { label: "Instagram", href: "https://instagram.com", external: true },
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.35 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function FullscreenMenu() {
  const { isOpen, close } = useMenu();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string>(projects[0].slug);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const activeProject = projects.find((p) => p.slug === hovered) ?? projects[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="fullscreen-menu"
          className="fixed inset-0 z-[65] flex flex-col bg-ink text-paper"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="flex-1 overflow-y-auto pt-[calc(var(--header-h)+1.5rem)]">
            <div className="editorial-container">
              {/* Primary nav */}
              <motion.nav
                variants={reduced ? undefined : listVariants}
                initial={reduced ? false : "hidden"}
                animate={reduced ? undefined : "show"}
                className="flex flex-wrap gap-x-8 gap-y-2 border-b border-white/15 pb-8"
              >
                {PRIMARY_LINKS.map((link) => (
                  <motion.div key={link.label} variants={reduced ? undefined : itemVariants}>
                    <Link
                      href={link.href}
                      onClick={close}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      data-cursor="link"
                      className="text-sm uppercase tracking-label text-paper/90 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Project index */}
              <motion.ul
                variants={reduced ? undefined : listVariants}
                initial={reduced ? false : "hidden"}
                animate={reduced ? undefined : "show"}
                className="py-8"
              >
                {projects.map((project) => (
                  <motion.li
                    key={project.slug}
                    variants={reduced ? undefined : itemVariants}
                    className="border-b border-white/10"
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={close}
                      onMouseEnter={() => setHovered(project.slug)}
                      data-cursor="view"
                      className="group flex items-baseline gap-4 py-3.5 sm:gap-8 sm:py-4"
                    >
                      <span className="w-8 shrink-0 text-micro text-paper/50">
                        {project.index}
                      </span>
                      <span className="flex-1 text-[1.5rem] font-medium leading-none tracking-tightest transition-transform duration-500 ease-soft group-hover:translate-x-2 sm:text-[2.4rem]">
                        {project.name}
                      </span>
                      <span className="hidden shrink-0 text-micro text-paper/50 sm:block">
                        {project.category}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* Preview + footer info */}
          <div className="editorial-container flex flex-col gap-6 border-t border-white/15 py-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="hidden w-48 shrink-0 sm:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <Photo
                    seed={activeProject.cover.seed}
                    src={activeProject.cover.src}
                    ratio="landscape"
                    alt={activeProject.name}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 gap-4 text-micro text-paper/60 xs:grid-cols-3 sm:gap-10">
              <div>
                <p className="mb-1 text-paper/40">Instagram</p>
                <p className="text-paper/85">{studio.instagram}</p>
              </div>
              <div>
                <p className="mb-1 text-paper/40">Correo</p>
                <p className="text-paper/85">{studio.email}</p>
              </div>
              <div>
                <p className="mb-1 text-paper/40">Ubicación</p>
                <p className="text-paper/85">{studio.location}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
