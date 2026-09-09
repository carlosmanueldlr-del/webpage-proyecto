import { motion, AnimatePresence } from "framer-motion";

const shapes = [
  { left: "18%", top: "22%", size: 10, kind: "square", delay: 0 },
  { left: "76%", top: "30%", size: 6, kind: "dot", delay: 0.06 },
  { left: "64%", top: "70%", size: 40, kind: "circle", delay: 0.02 },
  { left: "30%", top: "76%", size: 26, kind: "line", delay: 0.1 },
  { left: "10%", top: "60%", size: 6, kind: "dot", delay: 0.14 },
];

// Extremely subtle decorative flourishes shown briefly during a section
// transition. Purely cosmetic — never rendered when reduced motion is on.
export default function Particles({ active, fg, reducedMotion }) {
  if (reducedMotion) return null;
  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {active && (
          <motion.div key="particles" className="absolute inset-0">
            {shapes.map((s, i) => (
              <motion.span
                key={i}
                className="absolute"
                style={{
                  left: s.left,
                  top: s.top,
                  width: s.kind === "line" ? s.size : s.size,
                  height: s.kind === "line" ? 1 : s.size,
                  borderRadius: s.kind === "square" ? 2 : s.kind === "line" ? 0 : "50%",
                  background: s.kind === "circle" ? "transparent" : fg,
                  border: s.kind === "circle" ? `1px solid ${fg}55` : "none",
                  opacity: 0.35,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.35, 0], scale: [0.6, 1, 1.1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, delay: s.delay, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
