// Central content config. Edit text, colors and copy here without touching components.

export const sections = [
  {
    id: "about",
    index: "01",
    nav: "About Me",
    theme: {
      bg: "#EEF0F8",
      bg2: "#E1E5F3",
      fg: "#171B2E",
      fgSoft: "rgba(23,27,46,0.6)",
      accent: "#5B6FA8",
    },
    label: "01 / About Me",
    kicker: "Hi, I'm Charly.",
    headline: ["I turn ideas into", "digital experiences."],
    paragraph:
      "I combine strategy, creativity, technology and web development to design and build useful, elegant digital experiences — from first sketch to shipped product.",
    cta: { label: "Get in touch", action: "contact" },
    info: [
      { label: "Based in", value: "Guadalajara, MX" },
      { label: "Focus", value: "Digital Experiences" },
      { label: "Currently", value: "Creating things on the web" },
    ],
    footerPhrase: ["Strategy.", "Design.", "Technology."],
    image: "/images/carlos.png",
  },
  {
    id: "portfolio",
    index: "02",
    nav: "Portfolio",
    theme: {
      bg: "#10121C",
      bg2: "#191D2E",
      fg: "#F2F1F7",
      fgSoft: "rgba(242,241,247,0.6)",
      accent: "#8C93D9",
    },
    label: "02 / Portfolio",
    kicker: "Selected",
    headline: ["Selected", "Work."],
    paragraph:
      "A collection of digital products, websites and experiments I've created for clients, studios and personal exploration.",
    cta: { label: "View project", href: "#portfolio" },
  },
  {
    id: "contact",
    index: "03",
    nav: "Contact Me",
    theme: {
      bg: "#2E3A8C",
      bg2: "#1C2560",
      fg: "#F6F4FF",
      fgSoft: "rgba(246,244,255,0.65)",
      accent: "#FF9F6B",
    },
    label: "03 / Contact Me",
    kicker: "Let's create",
    headline: ["Let's create", "something together."],
    paragraph:
      "Have an idea, project or collaboration in mind? I'd love to hear about it.",
    cta: { label: "Let's talk", email: "hello@yourdomain.com" },
  },
];

export const getSectionIndex = (id) => sections.findIndex((s) => s.id === id);
export const getNextSection = (id) => {
  const i = getSectionIndex(id);
  return sections[(i + 1) % sections.length];
};
export const getPrevSection = (id) => {
  const i = getSectionIndex(id);
  return sections[(i - 1 + sections.length) % sections.length];
};
