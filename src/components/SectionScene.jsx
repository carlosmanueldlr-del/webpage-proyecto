import { AnimatePresence } from "framer-motion";
import AboutContent from "./sections/AboutContent";
import PortfolioContent from "./sections/PortfolioContent";
import ContactContent from "./sections/ContactContent";

// Text/content layer — swaps the whole "scene" (label, headline, paragraph,
// CTA, secondary info) when the active section changes. Sits above
// VisualStage's background/visual layers.
export default function SectionScene({ section, projectIndex, setProjectIndex, reducedMotion }) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_textarea]:pointer-events-auto">
      <AnimatePresence mode="sync" initial={false}>
        {section.id === "about" && (
          <AboutContent key="about" section={section} reducedMotion={reducedMotion} />
        )}
        {section.id === "portfolio" && (
          <PortfolioContent
            key="portfolio"
            section={section}
            projectIndex={projectIndex}
            setProjectIndex={setProjectIndex}
            reducedMotion={reducedMotion}
          />
        )}
        {section.id === "contact" && (
          <ContactContent key="contact" section={section} reducedMotion={reducedMotion} />
        )}
      </AnimatePresence>
    </div>
  );
}
