"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects, studio } from "@/lib/projects";

const PRIMARY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-[70] hidden w-72 flex-col overflow-y-auto border-r border-line bg-paper px-8 py-8 lg:flex">
      <Link
        href="/"
        data-cursor="link"
        className="text-[0.8rem] font-medium uppercase tracking-label"
      >
        {studio.name}
      </Link>
      <p className="mt-1 text-micro uppercase tracking-label text-stone">
        {studio.descriptor}
      </p>

      <nav className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
        {PRIMARY_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              data-cursor="link"
              className={`text-micro uppercase tracking-label transition-colors ${
                active ? "text-ink" : "text-stone hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-10 text-micro uppercase tracking-label text-stone">
        Projects
      </p>
      <ul className="mt-4 flex flex-col">
        {projects.map((project) => {
          const href = `/projects/${project.slug}`;
          const active = pathname === href;
          return (
            <li key={project.slug} className="border-t border-line first:border-t-0">
              <Link
                href={href}
                data-cursor="view"
                className="group flex items-baseline gap-3 py-3"
              >
                <span className="text-micro text-stoneLight">{project.index}</span>
                <span
                  className={`flex-1 text-[0.95rem] font-medium leading-tight tracking-tightest transition-colors ${
                    active ? "text-ink" : "text-stone group-hover:text-ink"
                  }`}
                >
                  {project.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto flex flex-col gap-3 border-t border-line pt-6 text-micro text-stone">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="hover:text-ink"
        >
          {studio.instagram}
        </a>
        <a href={`mailto:${studio.email}`} data-cursor="link" className="hover:text-ink">
          {studio.email}
        </a>
        <p>{studio.location}</p>
      </div>
    </aside>
  );
}
