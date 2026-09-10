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
              alt="Estudio JOANA"
              className="h-full w-full"
              priority
            />
          </ParallaxLayer>
        </RevealImage>
      </section>

      <section className="editorial-container grid grid-cols-1 gap-10 py-24 sm:grid-cols-12 sm:py-32">
        <RevealText className="sm:col-span-3">
          <p className="text-micro uppercase tracking-label text-stone">Sobre Joana</p>
        </RevealText>

        <div className="sm:col-span-8 sm:col-start-5">
          <RevealText>
            <p className="max-w-2xl text-[1.3rem] font-medium leading-[1.4] tracking-tightest sm:text-[1.9rem]">
              Joana es arquitecta radicada en Guadalajara, México.
            </p>
          </RevealText>
          <RevealText delay={0.1} className="mt-8">
            <p className="max-w-xl text-[0.95rem] uppercase leading-[1.7] text-stone">
              Su práctica explora la arquitectura a través de la
              materialidad, la luz, la proporción y el contexto, creando
              espacios que se sienten funcionales y emocionales a la vez.
            </p>
          </RevealText>
          <RevealText delay={0.18} className="mt-6">
            <p className="max-w-xl text-[0.95rem] uppercase leading-[1.7] text-stone">
              Formada entre México y Europa, Joana fundó su estudio para
              trabajar de cerca con sus clientes en un número limitado de
              proyectos cada año — obra residencial, de interiorismo y
              renovaciones a pequeña escala en Jalisco y Ciudad de México.
            </p>
          </RevealText>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-6">
        <RevealImage>
          <Photo seed="about-materials" ratio="portrait" alt="Muestras de materiales" />
        </RevealImage>
        <RevealImage delay={0.1}>
          <Photo seed="about-model" ratio="portrait" alt="Maqueta de trabajo" />
        </RevealImage>
      </section>

      <section className="editorial-container grid grid-cols-1 gap-8 py-24 sm:grid-cols-3 sm:gap-10 sm:py-32">
        {[
          { label: "Estudio", value: "Fundado en 2019, Guadalajara" },
          { label: "Alcance", value: "Arquitectura, interiorismo, renovación" },
          { label: "Enfoque", value: "Un número limitado de proyectos, a profundidad" },
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
