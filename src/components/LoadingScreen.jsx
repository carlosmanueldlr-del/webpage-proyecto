import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { EASE } from "../lib/motion";

// One-time intro shown before the site's first render: a glassy percentage
// counter, then the Charly Lab logo, then a fade to reveal the page. Skips
// straight to a quick logo fade when the user prefers reduced motion.
export default function LoadingScreen({ onComplete, reducedMotion }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState("counting"); // "counting" | "logo"

  useEffect(() => {
    if (reducedMotion) {
      setPercent(100);
      setPhase("logo");
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setPercent(Math.round(v)),
      onComplete: () => setPhase("logo"),
    });
    return () => controls.stop();
  }, [reducedMotion]);

  useEffect(() => {
    if (phase !== "logo") return;
    const t = setTimeout(onComplete, reducedMotion ? 500 : 900);
    return () => clearTimeout(t);
  }, [phase, reducedMotion, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#0A0A0C" }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
    >
      <AnimatePresence mode="wait">
        {phase === "counting" ? (
          <motion.div
            key="counter"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative overflow-hidden rounded-[56px] sm:rounded-[64px] flex flex-col items-center justify-center"
            style={{
              width: "min(78vw, 420px)",
              height: "min(48vw, 260px)",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full"
              style={{ background: "#7A2E3A", filter: "blur(50px)", opacity: 0.55 }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-6 -right-8 w-44 h-44 rounded-full"
              style={{ background: "#3A3F7A", filter: "blur(55px)", opacity: 0.55 }}
              aria-hidden="true"
            />
            <div className="relative flex items-baseline gap-1" style={{ color: "#EDEDEF" }}>
              <span
                className="font-bold tabular-nums"
                style={{ fontSize: "clamp(3rem, 10vw, 4.5rem)", lineHeight: 1 }}
              >
                {percent}
              </span>
              <span className="font-semibold" style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}>
                %
              </span>
            </div>
            <p
              className="relative mt-2 text-xs tracking-[0.3em] uppercase"
              style={{ color: "rgba(237,237,239,0.55)" }}
            >
              Loading
            </p>
          </motion.div>
        ) : (
          <motion.img
            key="logo"
            src="/images/charly-lab-logo.png"
            alt="Charly Lab"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="w-[52vw] max-w-[280px]"
            draggable={false}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
