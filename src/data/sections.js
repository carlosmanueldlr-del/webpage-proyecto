// Central content config. Edit text, colors and copy here without touching components.

export const sections = [
  {
    id: "about",
    index: "01",
    nav: "About Me",
    theme: {
      bg: "#F1E7D6",
      bg2: "#EADDC6",
      fg: "#1C1815",
      fgSoft: "rgba(28,24,21,0.6)",
      accent: "#C96A3F",
    },
    label: "01 / About Me",
    kicker: "Hi, I'm Carlos.",
    headline: ["I turn ideas into", "digital experiences."],
    paragraph:
      "I combine strategy, creativity, technology and web development to design and build useful, elegant digital experiences — from first sketch to shipped product.",
    cta: { label: "More about me", href: "#about" },
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
      bg: "#121216",
      bg2: "#1B1B22",
      fg: "#F4F1EA",
      fgSoft: "rgba(244,241,234,0.6)",
      accent: "#8F8CFF",
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
      bg: "#B93E22",
      bg2: "#8F2C18",
      fg: "#FFF6EE",
      fgSoft: "rgba(255,246,238,0.65)",
      accent: "#FFD9A0",
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
