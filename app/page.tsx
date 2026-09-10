import { projects } from "@/lib/projects";
import { Photo } from "@/components/ArchPhoto";
import { RevealImage, RevealText, ParallaxLayer } from "@/components/Reveal";
import ProjectIndexHome from "@/components/ProjectIndexHome";
import BeforeAfter from "@/components/BeforeAfter";

export default function HomePage() {
  const renovation = projects.find((p) => p.beforeAfter);

  return (
    <>
      {/* Hero */}
      <section className="pt-[var(--header-h)]">
        <RevealImage className="h-[78vh] min-h-[420px] w-full sm:h-[88vh]">
          <ParallaxLayer strength={30} className="h-full w-full">
            <Photo
              seed="home-hero"
              src="/images/home-hero.jpg"
              alt="Proyecto arquitectónico destacado de JOANA"
              className="h-full w-full"
              priority
            />
          </ParallaxLayer>
        </RevealImage>
        <div className="editorial-container flex items-baseline justify-between pt-3">
          <p className="text-micro uppercase tracking-label text-stone">
            Trabajos seleccionados — 2024 / 2026
          </p>
          <p className="hidden text-micro uppercase tracking-label text-stone sm:block">
            Guadalajara, MX
          </p>
        </div>
      </section>

      {/* Editorial statement */}
      <section className="editorial-container grid grid-cols-1 gap-10 py-28 sm:grid-cols-12 sm:py-40">
        <RevealText className="sm:col-span-6 sm:col-start-1">
          <p className="max-w-md text-[1.15rem] font-medium uppercase leading-[1.35] tracking-tightest sm:text-[1.4rem]">
            Joana es un estudio de arquitectura y diseño de interiores
            enfocado en crear espacios que equilibran función, materialidad
            y emoción.
          </p>
        </RevealText>
        <RevealText delay={0.12} className="sm:col-span-5 sm:col-start-8 sm:self-end">
          <p className="max-w-sm text-[0.95rem] uppercase leading-[1.5] text-stone">
            Abordamos cada proyecto como una exploración única de la luz, la
            proporción, el contexto y la forma en que las personas
            experimentan el espacio.
          </p>
        </RevealText>
      </section>

      {/* Secondary full-bleed image */}
      <section>
        <RevealImage className="h-[60vh] min-h-[320px] w-full">
          <Photo
            seed="home-secondary"
            src="/images/home-secondary.jpg"
            alt="Detalle interior"
            className="h-full w-full"
          />
        </RevealImage>
      </section>

      {/* Featured projects */}
      <section id="projects" className="pt-28 sm:pt-40">
        <div className="editorial-container mb-14 flex items-end justify-between sm:mb-20">
          <RevealText as="h2" className="text-[0.95rem] uppercase tracking-label text-stone">
            Proyectos Destacados
          </RevealText>
          <RevealText delay={0.08} className="hidden text-micro uppercase tracking-label text-stoneLight sm:block">
            001 — 005
          </RevealText>
        </div>

        <ProjectIndexHome projects={projects.slice(0, 5)} />
      </section>

      {/* Before / after highlight */}
      {renovation && renovation.beforeAfter && (
        <section className="editorial-container py-28 sm:py-40">
          <RevealText as="h2" className="mb-10 text-[0.95rem] uppercase tracking-label text-stone sm:mb-14">
            Antes / Después — {renovation.name}
          </RevealText>
          <div className="sm:mx-auto sm:max-w-4xl">
            <RevealImage>
              <BeforeAfter {...renovation.beforeAfter} />
            </RevealImage>
          </div>
        </section>
      )}
    </>
  );
}
