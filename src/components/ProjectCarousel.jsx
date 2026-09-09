import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";
import { staggerItem } from "../lib/motion";

// Subtle in-section control for switching the featured project. Deliberately
// understated so it never competes with the big About/Portfolio/Contact
// scene transition driven by VisualStage.
export default function ProjectCarousel({ index, setIndex, fg }) {
  const go = (dir) => {
    setIndex((i) => (i + dir + projects.length) % projects.length);
  };

  return (
    <motion.div variants={staggerItem} className="flex items-center gap-3 sm:gap-4">
      <button
        type="button"
        aria-label="Previous project"
        onClick={() => go(-1)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        style={{ border: `1px solid ${fg}33`, color: fg }}
      >
        <ChevronLeft size={14} />
      </button>
      <span className="text-xs tracking-[0.2em] tabular-nums opacity-60" style={{ color: fg }}>
        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </span>
      <button
        type="button"
        aria-label="Next project"
        onClick={() => go(1)}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        style={{ border: `1px solid ${fg}33`, color: fg }}
      >
        <ChevronRight size={14} />
      </button>
    </motion.div>
  );
}
