import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About — JOANA",
  description:
    "Joana is an architect based in Guadalajara, Mexico. Her practice explores architecture through materiality, light, proportion and context.",
};

export default function AboutPage() {
  return <About />;
}
