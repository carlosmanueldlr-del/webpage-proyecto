import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MainVisual from "./MainVisual";
import { EASE } from "../lib/motion";

// The small bottom-right preview. Shares `layoutId` with the main visual so
// Framer Motion morphs this box into the next scene's hero element.
export default function NextSectionPreview({
  section,
  project,
  onClick,
  fgColor,
  reducedMotion,
  isLooping,
  disabled,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Go to ${section.nav}`}
      aria-disabled={disabled}
      layoutId={`visual-${section.id}`}
      layout
      className="group absolute bottom-5 right-4 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 text-left"
      style={{
        width: "clamp(84px, 20vw, 132px)",
        height: "clamp(84px, 20vw, 132px)",
        pointerEvents: disabled ? "none" : "auto",
        cursor: disabled ? "default" : "pointer",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      whileHover={reducedMotion || disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      transition={{
        layout: { duration: 0.9, ease: EASE },
        default: { duration: 0.5, ease: EASE },
      }}
    >
      <div
        className="w-full h-full rounded-xl sm:rounded-2xl p-2 sm:p-3"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(6px)",
          border: `1px solid ${fgColor}22`,
        }}
      >
        <MainVisual section={section} role="preview" project={project} reducedMotion={reducedMotion} />
      </div>
      <div
        className="mt-2 flex items-center gap-1.5 text-[10px] sm:text-xs tracking-wide uppercase"
        style={{ color: fgColor }}
      >
        <span style={{ opacity: 0.55 }}>{isLooping ? "Back to" : "Next"}</span>
        <span className="inline-flex items-center gap-1 font-semibold group-hover:gap-2 transition-all">
          {section.nav}
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}
