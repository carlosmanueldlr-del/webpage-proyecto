import type { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Servicios — JOANA",
  description: "Arquitectura, diseño de interiores, renovación, planeación de espacios y consultoría de diseño.",
};

export default function ServicesPage() {
  return <Services />;
}
