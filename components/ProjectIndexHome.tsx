"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Photo } from "./ArchPhoto";
import { RevealImage, RevealText } from "./Reveal";
import type { Project } from "@/lib/projects";

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="text-micro text-stone">{project.index}</span>
      <span className="text-[1.6rem] font-medium leading-none tracking-tightest sm:text-[2.1rem]">
        {project.name}
      </span>
      <span className="text-micro uppercase tracking-label text-stone">
        {project.category}
      </span>
      <span className="text-micro text-stone">{project.year}</span>
    </div>
  );
}

function Frame({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="view"
      className="group block"
    >
      {children}
    </Link>
  );
}

function ImageZoom({
  seed,
  src,
  ratio,
  alt,
  className,
}: {
  seed: string;
  src?: string;
  ratio: "landscape" | "portrait" | "square";
  alt: string;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileHover="hover"
    >
      <motion.div
        variants={{ hover: { scale: 1.045 } }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className="h-full w-full"
      >
        <Photo seed={seed} src={src} ratio={ratio} alt={alt} />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectIndexHome({ projects }: { projects: Project[] }) {
  const [p1, p2, p3, p4, p5] = projects;

  return (
    <div className="flex flex-col gap-24 sm:gap-32">
      {/* 001 — full width */}
      {p1 && (
        <Frame project={p1}>
          <RevealImage>
            <ImageZoom seed={p1.cover.seed} src={p1.cover.src} ratio="landscape" alt={p1.name} />
          </RevealImage>
          <div className="editorial-container mt-5">
            <Meta project={p1} />
          </div>
        </Frame>
      )}

      {/* 002 — two side by side */}
      {p2 && (
        <Frame project={p2}>
          <div className="editorial-container grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <RevealImage>
              <ImageZoom seed={p2.cover.seed} src={p2.cover.src} ratio="landscape" alt={p2.name} />
            </RevealImage>
            <RevealImage delay={0.08} className="hidden sm:block">
              <ImageZoom
                seed={p2.gallery[0]?.seed ?? `${p2.slug}-alt`}
                src={p2.gallery[0]?.src}
                ratio="landscape"
                alt={`${p2.name} detail`}
              />
            </RevealImage>
          </div>
          <div className="editorial-container mt-5">
            <Meta project={p2} />
          </div>
        </Frame>
      )}

      {/* 003 — large image + small meta column */}
      {p3 && (
        <Frame project={p3}>
          <div className="editorial-container grid grid-cols-1 gap-6 sm:grid-cols-[1fr_260px] sm:items-end sm:gap-10">
            <RevealImage>
              <ImageZoom seed={p3.cover.seed} src={p3.cover.src} ratio="landscape" alt={p3.name} />
            </RevealImage>
            <RevealText delay={0.1} className="sm:pb-2">
              <p className="text-micro text-stone">{p3.index}</p>
              <p className="mt-2 text-[1.6rem] font-medium leading-[1.05] tracking-tightest">
                {p3.name}
              </p>
              <p className="mt-3 text-micro uppercase tracking-label text-stone">
                {p3.category} — {p3.year}
              </p>
            </RevealText>
          </div>
        </Frame>
      )}

      {/* 004 — vertical image, offset, generous whitespace */}
      {p4 && (
        <Frame project={p4}>
          <div className="editorial-container grid grid-cols-1 sm:grid-cols-12">
            <RevealText className="order-2 flex flex-col justify-center pt-6 sm:order-1 sm:col-span-5 sm:pt-0">
              <p className="text-micro text-stone">{p4.index}</p>
              <p className="mt-2 text-[1.8rem] font-medium leading-[1.05] tracking-tightest sm:text-[2.2rem]">
                {p4.name}
              </p>
              <p className="mt-3 text-micro uppercase tracking-label text-stone">
                {p4.category} — {p4.year}
              </p>
            </RevealText>
            <RevealImage className="order-1 sm:order-2 sm:col-span-6 sm:col-start-7">
              <ImageZoom seed={p4.cover.seed} src={p4.cover.src} ratio="portrait" alt={p4.name} />
            </RevealImage>
          </div>
        </Frame>
      )}

      {/* 005 — two vertical images side by side */}
      {p5 && (
        <Frame project={p5}>
          <div className="editorial-container grid grid-cols-2 gap-3 sm:mx-auto sm:max-w-3xl sm:gap-6">
            <RevealImage>
              <ImageZoom seed={p5.cover.seed} src={p5.cover.src} ratio="portrait" alt={p5.name} />
            </RevealImage>
            <RevealImage delay={0.08}>
              <ImageZoom
                seed={p5.gallery[1]?.seed ?? `${p5.slug}-alt`}
                src={p5.gallery[1]?.src}
                ratio="portrait"
                alt={`${p5.name} detail`}
              />
            </RevealImage>
          </div>
          <div className="editorial-container mt-5 text-center sm:text-left">
            <Meta project={p5} />
          </div>
        </Frame>
      )}
    </div>
  );
}
