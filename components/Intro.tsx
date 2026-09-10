"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"hold" | "exit">("hold");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const holdMs = reduced ? 200 : 1250;
    const holdTimer = setTimeout(() => setPhase("exit"), holdMs);
    return () => clearTimeout(holdTimer);
  }, [reduced]);

  useEffect(() => {
    if (phase !== "exit") return;
    const exitMs = reduced ? 50 : 1050;
    const doneTimer = setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, exitMs);
    return () => clearTimeout(doneTimer);
  }, [phase, reduced, onComplete]);

  const panels = [0, 1, 2, 3];

  return (
    <div
      className="fixed inset-0 z-[95]"
      aria-hidden="true"
      style={{ pointerEvents: phase === "exit" ? "none" : "auto" }}
    >
      {/* Abstract architectural plan lines, always behind the panels */}
      <div className="absolute inset-0 bg-paper">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <motion.line
            x1="0" y1="30" x2="100" y2="30"
            stroke="#d9d5c9" strokeWidth="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <motion.line
            x1="62" y1="0" x2="62" y2="100"
            stroke="#d9d5c9" strokeWidth="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          />
          <motion.rect
            x="62" y="30" width="28" height="34"
            fill="none" stroke="#c9c4b8" strokeWidth="0.15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Center wordmark */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={
          phase === "exit"
            ? { opacity: 0, y: -14, scale: 0.98 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: phase === "exit" ? 0.5 : 0.8, ease: EASE }}
      >
        <h1 className="text-[13vw] leading-none font-medium tracking-tightest text-ink sm:text-[7vw]">
          JOANA
        </h1>
        <p className="mt-4 text-micro uppercase tracking-wide2 text-stone">
          Architecture / Interiors
        </p>
      </motion.div>

      {/* Reveal panels */}
      <div className="absolute inset-0 flex">
        {panels.map((i) => (
          <motion.div
            key={i}
            className="h-full flex-1"
            style={{
              background: i % 2 === 0 ? "#f4f2ee" : "#eeece6",
              borderLeft: i === 0 ? "none" : "1px solid #e2ded2",
            }}
            initial={{ y: 0 }}
            animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
            transition={{
              duration: 0.95,
              ease: EASE,
              delay: reduced ? 0 : i * 0.07,
            }}
          />
        ))}
      </div>
    </div>
  );
}
