import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sections } from "../data/sections";

export default function NavigationControls({ currentIndex, onPrev, onNext, fg, disabled }) {
  return (
    <div
      className="fixed left-4 sm:left-6 md:left-10 bottom-20 sm:bottom-10 z-30 flex items-center gap-3"
      style={{ color: fg, opacity: disabled ? 0.5 : 1, transition: "opacity 0.3s" }}
    >
      <motion.button
        type="button"
        aria-label="Previous section"
        onClick={onPrev}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.12 }}
        whileTap={disabled ? {} : { scale: 0.92 }}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center disabled:cursor-not-allowed"
        style={{ border: `1px solid ${fg}3a` }}
      >
        <ArrowLeft size={16} strokeWidth={1.75} />
      </motion.button>

      <span className="text-[11px] sm:text-xs tracking-[0.2em] tabular-nums opacity-70 select-none">
        {String(currentIndex + 1).padStart(2, "0")} — {String(sections.length).padStart(2, "0")}
      </span>

      <motion.button
        type="button"
        aria-label="Next section"
        onClick={onNext}
        disabled={disabled}
        whileHover={disabled ? {} : { scale: 1.12 }}
        whileTap={disabled ? {} : { scale: 0.92 }}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center disabled:cursor-not-allowed"
        style={{ border: `1px solid ${fg}3a` }}
      >
        <ArrowRight size={16} strokeWidth={1.75} />
      </motion.button>
    </div>
  );
}
