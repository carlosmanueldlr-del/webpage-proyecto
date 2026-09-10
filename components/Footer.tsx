import Link from "next/link";
import { studio } from "@/lib/projects";

export default function Footer() {
  return (
    <footer className="editorial-container border-t border-line py-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[1.1rem] font-medium uppercase tracking-tightest">
            {studio.name}
          </p>
          <p className="mt-1 text-micro text-stone">{studio.descriptor}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-micro uppercase tracking-label text-stone">
          <Link href="/about" className="hover:text-ink" data-cursor="link">
            About
          </Link>
          <Link href="/services" className="hover:text-ink" data-cursor="link">
            Services
          </Link>
          <Link href="/contact" className="hover:text-ink" data-cursor="link">
            Contact
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
            data-cursor="link"
          >
            Instagram
          </a>
        </nav>

        <div className="text-micro text-stone">
          <p>{studio.email}</p>
          <p className="mt-1">{studio.location}</p>
        </div>
      </div>

      <p className="mt-10 text-micro text-stoneLight">
        © {new Date().getFullYear()} {studio.name}. All rights reserved.
      </p>
    </footer>
  );
}
