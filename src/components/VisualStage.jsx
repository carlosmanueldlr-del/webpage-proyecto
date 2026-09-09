import { AnimatePresence } from "framer-motion";
import NextSectionPreview from "./NextSectionPreview";

// Global floating layer for the small bottom-right "next section" preview.
// The large hero visual itself lives inline inside each section's content
// (see SectionMainVisual) so it can behave responsively on mobile; both
// share a `layoutId`, so Framer Motion still morphs this corner preview into
// the next scene's hero element when the section changes.
export default function VisualStage({
  currentSection,
  nextSection,
  project,
  onNext,
  reducedMotion,
  isLooping,
  disabled,
}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[25]">
      <AnimatePresence initial={false}>
        <NextSectionPreview
          key={`preview-${nextSection.id}`}
          section={nextSection}
          project={project}
          onClick={onNext}
          fgColor={currentSection.theme.fg}
          reducedMotion={reducedMotion}
          isLooping={isLooping}
          disabled={disabled}
        />
      </AnimatePresence>
    </div>
  );
}
