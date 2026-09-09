import { useEffect } from "react";
import { motion } from "framer-motion";
import { EASE } from "../lib/motion";

// One-time intro shown before the site's first render: the Charly Lab logo
// fades in, holds briefly, then the whole overlay fades to reveal the page.
export default function LoadingScreen({ onComplete, reducedMotion }) {
  useEffect(() => {
    const t = setTimeout(onComplete, reducedMotion ? 700 : 2000);
    return () => clearTimeout(t);
  }, [reducedMotion, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#0A0A0C" }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
    >
      <motion.img
        src="/images/charly-lab-logo.png"
        alt="Charly Lab"
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.3 : 0.7, ease: EASE }}
        className="w-[52vw] max-w-[280px]"
        draggable={false}
      />
    </motion.div>
  );
}
