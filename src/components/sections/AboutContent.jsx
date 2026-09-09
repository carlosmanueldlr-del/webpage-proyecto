import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem } from "../../lib/motion";
import SectionInfo from "../SectionInfo";
import SectionMainVisual from "../SectionMainVisual";

export default function AboutContent({ section, reducedMotion }) {
  const fg = section.theme.fg;
  const variants = reducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : staggerContainer;
  const itemVariants = reducedMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : staggerItem;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="absolute inset-0 overflow-y-auto scene-scroll flex flex-col gap-5 pt-20 pb-40 px-5 sm:px-8 md:px-14 lg:px-20 md:pb-16"
      style={{ color: fg }}
    >
      {/* Header block: label + kicker + headline */}
      <div className="flex flex-col gap-4 md:absolute md:left-14 lg:left-20 md:top-[16%] md:max-w-md">
        <motion.p variants={itemVariants} className="text-xs tracking-[0.25em] uppercase opacity-60">
          {section.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="font-extrabold leading-[0.98]"
          style={{ fontSize: "clamp(2.4rem, 6.2vw, 4.6rem)" }}
        >
          {section.kicker}
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="font-semibold leading-[1.05] opacity-90"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)" }}
        >
          {section.headline[0]}
          <br />
          {section.headline[1]}
        </motion.h2>
      </div>

      {/* Main visual: inline on mobile, centered over the full viewport on desktop */}
      <SectionMainVisual section={section} reducedMotion={reducedMotion} />

      {/* Body block: paragraph + CTA */}
      <div className="flex flex-col gap-5 md:absolute md:left-14 lg:left-20 md:bottom-[16%] md:max-w-md">
        <motion.p variants={itemVariants} className="text-sm sm:text-base leading-relaxed opacity-75 max-w-sm">
          {section.paragraph}
        </motion.p>
        <motion.a
          variants={itemVariants}
          href={section.cta.href}
          className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold"
        >
          {section.cta.label}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
        </motion.a>
      </div>

      {/* Right info column */}
      <div className="md:absolute md:right-14 lg:right-20 md:top-1/2 md:-translate-y-1/2">
        <SectionInfo items={section.info} fg={fg} />
      </div>

      {/* Bottom center editorial phrase (desktop/tablet only — omitted on mobile to keep the stack short) */}
      <motion.div
        variants={itemVariants}
        className="hidden md:block md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-10 text-center leading-tight"
      >
        {section.footerPhrase.map((line) => (
          <p key={line} className="text-sm sm:text-base font-medium opacity-70">
            {line}
          </p>
        ))}
      </motion.div>
    </motion.div>
  );
}
