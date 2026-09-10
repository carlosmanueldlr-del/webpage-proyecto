import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — JOANA",
  description: "Get in touch with JOANA architecture studio, Guadalajara, Mexico.",
};

export default function ContactPage() {
  return <Contact />;
}
