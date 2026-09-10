"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMenu } from "./MenuContext";
import { studio } from "@/lib/projects";

export default function Header() {
  const { isOpen, toggle, close } = useMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[75] flex h-[var(--header-h)] items-center justify-between transition-colors duration-500 ease-soft editorial-container lg:hidden ${
        isOpen
          ? "text-paper"
          : scrolled
            ? "bg-paper/85 text-ink backdrop-blur-sm"
            : "text-ink"
      }`}
    >
      <Link
        href="/"
        onClick={close}
        className="text-[0.8rem] font-medium uppercase tracking-label"
        data-cursor="link"
      >
        {studio.name}
      </Link>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="fullscreen-menu"
        className="text-[0.8rem] uppercase tracking-label"
        data-cursor="link"
      >
        {isOpen ? "Cerrar" : "Menú"}
      </button>
    </header>
  );
}
