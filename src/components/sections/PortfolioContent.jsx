import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem } from "../../lib/motion";
import ProjectCarousel from "../ProjectCarousel";
import SectionMainVisual from "../SectionMainVisual";
import { projects } from "../../data/projects";

export default function PortfolioContent({ section, projectIndex, setProjectIndex, reducedMotion }) {
  const fg = section.theme.fg;
  const accent = section.theme.accent;
  const project = projects[projectIndex];
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
      className="absolute inset-0 overflow-y-auto scene-scroll pointer-events-auto flex flex-col gap-5 pt-20 pb-40 px-5 sm:px-8 md:px-14 lg:px-20 md:pb-16"
      style={{ color: fg }}
    >
      {/* Header block: label + headline + supporting line */}
      <div className="flex flex-col gap-4 md:absolute md:left-14 lg:left-20 md:top-[16%] md:max-w-md">
        <motion.p variants={itemVariants} className="text-xs tracking-[0.25em] uppercase opacity-60">
          {section.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="font-display font-bold leading-[0.95]"
          style={{ fontSize: "clamp(2.6rem, 6.6vw, 5rem)" }}
        >
          {section.headline[0]}
          <br />
          {section.headline[1]}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-sm sm:text-base leading-relaxed opacity-70 max-w-sm">
          {section.paragraph}
        </motion.p>
      </div>

      {/* Main visual: inline on mobile, centered over the full viewport on desktop */}
      <SectionMainVisual section={section} project={project} reducedMotion={reducedMotion} />

      {/* Project meta + in-section carousel */}
      <div className="flex flex-col gap-4 md:absolute md:left-14 lg:left-20 md:bottom-16">
        <motion.div variants={itemVariants}>
          <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-1">
            {project.category} · {project.year}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold">{project.title}</h3>
        </motion.div>
        <ProjectCarousel index={projectIndex} setIndex={setProjectIndex} fg={fg} />
        <motion.a
          variants={itemVariants}
          href={project.url}
          className="group inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: accent }}
        >
          View project
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1.5" />
        </motion.a>
      </div>
    </motion.div>
  );
}
