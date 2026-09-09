import AboutVisual from "./visuals/AboutVisual";
import PortfolioVisual from "./visuals/PortfolioVisual";
import ContactVisual from "./visuals/ContactVisual";

// Dispatches to the right visual "actor" for a given section id.
// role: "main" (large, centered) | "preview" (small, corner) — sizing is
// controlled by the parent wrapper in VisualStage; this just fills it.
export default function MainVisual({ section, role, project, reducedMotion }) {
  switch (section.id) {
    case "about":
      return <AboutVisual section={section} role={role} reducedMotion={reducedMotion} />;
    case "portfolio":
      return <PortfolioVisual project={project} role={role} />;
    case "contact":
      return <ContactVisual role={role} reducedMotion={reducedMotion} />;
    default:
      return null;
  }
}
