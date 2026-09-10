import type { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Services — JOANA",
  description: "Architecture, interior design, renovation, space planning and design consulting.",
};

export default function ServicesPage() {
  return <Services />;
}
