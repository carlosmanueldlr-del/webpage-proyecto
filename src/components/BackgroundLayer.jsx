import { motion, AnimatePresence } from "framer-motion";

// Crossfades full-bleed background layers between sections instead of an
// instant background-color swap, with a soft radial "spotlight" behind the
// main visual.
export default function BackgroundLayer({ section }) {
  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence>
        <motion.div
          key={section.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(160deg, ${section.theme.bg} 0%, ${section.theme.bg2} 100%)`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 48%, ${section.theme.fg}14, transparent 60%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
