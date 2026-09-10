import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contacto — JOANA",
  description: "Ponte en contacto con el estudio de arquitectura JOANA, Guadalajara, México.",
};

export default function ContactPage() {
  return <Contact />;
}
