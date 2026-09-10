"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Photo } from "./ArchPhoto";
import type { BeforeAfterPair } from "@/lib/projects";

export default function BeforeAfter({ before, after, caption }: BeforeAfterPair) {
  const [state, setState] = useState<"before" | "after">("after");

  return (
    <div>
      <div className="relative">
        <Photo seed={after.seed} src={after.src} ratio={after.ratio} alt="After" />
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: state === "before" ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <Photo seed={before.seed} src={before.src} ratio={before.ratio} alt="Before" />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, rgba(21,20,18,0.55), rgba(21,20,18,0))",
          }}
        />

        {/* Fixed white-on-dark-scrim, independent of the paper/ink theme
            tokens: these controls sit on top of an arbitrary photograph,
            not the site's own background, so they must stay legible
            regardless of which theme variant is active. */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
          <button
            type="button"
            data-cursor="link"
            onClick={() => setState("before")}
            className={`text-micro uppercase tracking-label transition-colors ${
              state === "before" ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            Before
          </button>
          <span className="text-white/30">/</span>
          <button
            type="button"
            data-cursor="link"
            onClick={() => setState("after")}
            className={`text-micro uppercase tracking-label transition-colors ${
              state === "after" ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            After
          </button>
        </div>
      </div>

      {caption && (
        <p className="mt-3 text-micro uppercase tracking-label text-stone">
          {caption}
        </p>
      )}
    </div>
  );
}
