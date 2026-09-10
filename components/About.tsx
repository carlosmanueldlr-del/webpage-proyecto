import { Photo } from "./ArchPhoto";
import { RevealImage, RevealText, ParallaxLayer } from "./Reveal";

export default function About() {
  return (
    <>
      <section className="pt-[var(--header-h)]">
        <RevealImage className="h-[70vh] min-h-[380px] w-full">
          <ParallaxLayer strength={26} className="h-full w-full">
            <Photo
              seed="about-studio"
              src="/images/about-studio.jpg"
              alt="JOANA studio"
              className="h-full w-full"
              priority
            />
          </ParallaxLayer>
        </RevealImage>
      </section>

      <section className="editorial-container grid grid-cols-1 gap-10 py-24 sm:grid-cols-12 sm:py-32">
        <RevealText className="sm:col-span-3">
          <p className="text-micro uppercase tracking-label text-stone">About Joana</p>
        </RevealText>

        <div className="sm:col-span-8 sm:col-start-5">
          <RevealText>
            <p className="max-w-2xl text-[1.3rem] font-medium leading-[1.4] tracking-tightest sm:text-[1.9rem]">
              Joana is an architect based in Guadalajara, Mexico.
            </p>
          </RevealText>
          <RevealText delay={0.1} className="mt-8">
            <p className="max-w-xl text-[0.95rem] uppercase leading-[1.7] text-stone">
              Her practice explores architecture through materiality, light,
              proportion and context, creating spaces that feel both
              functional and emotional.
            </p>
          </RevealText>
          <RevealText delay={0.18} className="mt-6">
            <p className="max-w-xl text-[0.95rem] uppercase leading-[1.7] text-stone">
              Trained between Mexico and Europe, Joana founded her studio to
              work closely with clients on a limited number of projects each
              year — residential, interior and small-scale renovation work
              across Jalisco and Mexico City.
            </p>
          </RevealText>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-6">
        <RevealImage>
          <Photo seed="about-materials" ratio="portrait" alt="Material samples" />
        </RevealImage>
        <RevealImage delay={0.1}>
          <Photo seed="about-model" ratio="portrait" alt="Working model" />
        </RevealImage>
      </section>

      <section className="editorial-container grid grid-cols-1 gap-8 py-24 sm:grid-cols-3 sm:gap-10 sm:py-32">
        {[
          { label: "Studio", value: "Founded 2019, Guadalajara" },
          { label: "Scope", value: "Architecture, interiors, renovation" },
          { label: "Approach", value: "A limited number of projects, in depth" },
        ].map((item, i) => (
          <RevealText key={item.label} delay={i * 0.08}>
            <p className="text-micro uppercase tracking-label text-stone">
              {item.label}
            </p>
            <p className="mt-2 text-[0.95rem] uppercase leading-relaxed text-ink">
              {item.value}
            </p>
          </RevealText>
        ))}
      </section>
    </>
  );
}
