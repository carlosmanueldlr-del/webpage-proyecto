import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/lib/projects";
import { Photo } from "@/components/ArchPhoto";
import { RevealImage, RevealText } from "@/components/Reveal";
import ProjectGallery from "@/components/ProjectGallery";
import BeforeAfter from "@/components/BeforeAfter";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — JOANA`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <>
      <section className="pt-[calc(var(--header-h)+2.5rem)]">
        <div className="editorial-container">
          <RevealText>
            <p className="text-micro text-stone">{project.index}</p>
            <h1 className="mt-2 text-[2.4rem] font-medium leading-[1.02] tracking-tightest sm:text-[4.5rem]">
              {project.name}
            </h1>
          </RevealText>

          <RevealText delay={0.08} className="mt-6 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-5">
            <span className="text-micro uppercase tracking-label text-stone">
              {project.location}
            </span>
            <span className="text-micro uppercase tracking-label text-stone">
              {project.year}
            </span>
            <span className="text-micro uppercase tracking-label text-stone">
              {project.category}
            </span>
          </RevealText>
        </div>

        <div className="mt-12 sm:mt-16">
          <RevealImage className="h-[62vh] min-h-[360px] w-full">
            <Photo
              seed={project.cover.seed}
              src={project.cover.src}
              alt={project.name}
              className="h-full w-full"
              priority
            />
          </RevealImage>
        </div>

        <div className="editorial-container mt-10 sm:mt-14">
          <RevealText className="max-w-2xl text-[1rem] uppercase leading-[1.6] text-ink sm:text-[1.15rem]">
            {project.description}
          </RevealText>
        </div>
      </section>

      <section className="mt-24 sm:mt-32">
        <ProjectGallery images={project.gallery} projectName={project.name} />
      </section>

      {project.beforeAfter && (
        <section className="editorial-container py-24 sm:py-32">
          <RevealText as="h2" className="mb-10 text-[0.95rem] uppercase tracking-label text-stone sm:mb-14">
            Antes / Después
          </RevealText>
          <div className="sm:mx-auto sm:max-w-4xl">
            <RevealImage>
              <BeforeAfter {...project.beforeAfter} />
            </RevealImage>
          </div>
        </section>
      )}

      <nav className="editorial-container grid grid-cols-1 gap-8 border-t border-line py-16 sm:grid-cols-2 sm:py-24">
        <Link
          href={`/projects/${previous.slug}`}
          data-cursor="view"
          className="group"
        >
          <p className="text-micro uppercase tracking-label text-stone">
            Proyecto Anterior
          </p>
          <p className="mt-3 text-[1.6rem] font-medium leading-none tracking-tightest transition-transform duration-500 ease-soft group-hover:-translate-x-1 sm:text-[2.2rem]">
            {previous.name}
          </p>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          data-cursor="view"
          className="group text-left sm:text-right"
        >
          <p className="text-micro uppercase tracking-label text-stone">
            Siguiente Proyecto
          </p>
          <p className="mt-3 text-[1.6rem] font-medium leading-none tracking-tightest transition-transform duration-500 ease-soft group-hover:translate-x-1 sm:text-[2.2rem]">
            {next.name}
          </p>
        </Link>
      </nav>
    </>
  );
}
