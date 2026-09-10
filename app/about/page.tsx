import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "Nosotros — JOANA",
  description:
    "Joana es arquitecta radicada en Guadalajara, México. Su práctica explora la arquitectura a través de la materialidad, la luz, la proporción y el contexto.",
};

export default function AboutPage() {
  return <About />;
}
