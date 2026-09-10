"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Photo } from "./ArchPhoto";

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
      {/* Abstract architectural photograph, always behind the panels */}
      <motion.div
        className="absolute inset-0 bg-paper"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Photo
          seed="intro-bg"
          src="/images/intro-bg.jpg"
          alt=""
          className="h-full w-full"
          priority
        />
        {/* Soft paper wash so the wordmark stays legible regardless of crop */}
        <div className="absolute inset-0 bg-paper/60" />
      </motion.div>

      {/* Reveal panels — sit above the photo, slide away on exit to uncover it */}
      <div className="absolute inset-0 flex">
        {panels.map((i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-paper"
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

      {/* Center wordmark — always on top, above both the photo and the panels */}
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
    </div>
  );
}
