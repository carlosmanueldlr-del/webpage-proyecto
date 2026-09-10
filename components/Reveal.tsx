"use client";

import { ReactNode, Ref, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  Variants,
} from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

export function RevealImage({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        className="h-full w-full"
        initial={reduced ? false : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        animate={
          inView
            ? { clipPath: "inset(0 0 0% 0)", opacity: 1 }
            : reduced
              ? {}
              : { clipPath: "inset(0 0 100% 0)", opacity: 0 }
        }
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        <motion.div
          className="h-full w-full"
          initial={reduced ? false : { scale: 1.08 }}
          animate={inView ? { scale: 1 } : reduced ? {} : { scale: 1.08 }}
          transition={{ duration: 1.3, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

const MOTION_TAGS = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export function RevealText({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof MOTION_TAGS;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      ref={ref as Ref<HTMLHeadingElement>}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : reduced ? {} : { opacity: 0, y: 18 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={reduced ? undefined : staggerContainer}
      initial={reduced ? false : "hidden"}
      animate={inView ? "show" : reduced ? undefined : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} variants={reduced ? undefined : staggerItem}>
      {children}
    </motion.div>
  );
}

export function ParallaxLayer({
  children,
  strength = 40,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        style={reduced ? undefined : { y, scale: 1.15 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
