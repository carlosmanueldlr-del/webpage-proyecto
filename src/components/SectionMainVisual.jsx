import { motion } from "framer-motion";
import MainVisual from "./MainVisual";
import { EASE } from "../lib/motion";

// The large "hero" visual for the active section. Lives inline in each
// section's content flow (see AboutContent/PortfolioContent/ContactContent)
// so it can sit centered-over-viewport on desktop but participate in the
// normal stacked flow on mobile. Shares `layoutId` with NextSectionPreview
// so Framer Motion morphs the corner preview into this element.
export default function SectionMainVisual({ section, project, reducedMotion }) {
  return (
    <div className="flex items-center justify-center md:absolute md:inset-0 pointer-events-none my-2 md:my-0">
      <motion.div
        layoutId={`visual-${section.id}`}
        layout
        variants={{
          hidden: {},
          show: {},
          exit: reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08, y: -90 },
        }}
        transition={{
          layout: { duration: 0.95, ease: EASE },
          default: { duration: 0.7, ease: EASE },
        }}
        className="w-[clamp(150px,48vw,260px)] h-[clamp(150px,48vw,260px)] sm:w-[clamp(200px,44vw,340px)] sm:h-[clamp(200px,44vw,340px)] md:w-[clamp(220px,32vw,440px)] md:h-[clamp(220px,32vw,440px)]"
      >
        <MainVisual section={section} role="main" project={project} reducedMotion={reducedMotion} />
      </motion.div>
    </div>
  );
}
