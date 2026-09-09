import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { staggerContainer, staggerItem } from "../../lib/motion";
import ContactForm from "../ContactForm";
import SocialLinks from "../SocialLinks";
import SectionMainVisual from "../SectionMainVisual";
import { socials } from "../../data/socials";

export default function ContactContent({ section, reducedMotion }) {
  const fg = section.theme.fg;
  const email = section.cta.email;
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
      className="absolute inset-0 overflow-y-auto scene-scroll flex flex-col gap-6 pt-20 pb-40 px-5 sm:px-8 md:px-14 lg:px-20 md:pb-16"
      style={{ color: fg }}
    >
      {/* Header block: label + headline */}
      <div className="flex flex-col gap-4 md:absolute md:left-14 lg:left-20 md:top-[18%] md:max-w-lg">
        <motion.p variants={itemVariants} className="text-xs tracking-[0.25em] uppercase opacity-70">
          {section.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="font-extrabold leading-[0.95]"
          style={{ fontSize: "clamp(2.6rem, 6.6vw, 5rem)" }}
        >
          {section.headline[0]}
          <br />
          {section.headline[1]}
        </motion.h1>
      </div>

      {/* Main visual: inline on mobile, centered over the full viewport on desktop */}
      <SectionMainVisual section={section} reducedMotion={reducedMotion} />

      {/* Body block: paragraph + CTA + email + socials */}
      <div className="flex flex-col gap-5 md:absolute md:left-14 lg:left-20 md:bottom-[12%] md:max-w-lg">
        <motion.p variants={itemVariants} className="text-sm sm:text-base leading-relaxed opacity-80 max-w-sm">
          {section.paragraph}
        </motion.p>
        <motion.a variants={itemVariants} href={`mailto:${email}`} className="group inline-flex items-baseline gap-2">
          <span className="text-lg sm:text-2xl font-extrabold tracking-tight">Let's talk</span>
          <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.a>
        <motion.a
          variants={itemVariants}
          href={`mailto:${email}`}
          className="block text-sm sm:text-base opacity-75 hover:opacity-100 transition-opacity underline-offset-4 hover:underline"
        >
          {email}
        </motion.a>
        <motion.div variants={itemVariants}>
          <SocialLinks socials={socials} fg={fg} variant="text" />
        </motion.div>
      </div>

      {/* Contact form */}
      <div className="w-full md:w-auto md:absolute md:right-14 lg:right-20 md:top-1/2 md:-translate-y-1/2">
        <ContactForm fg={fg} />
      </div>
    </motion.div>
  );
}
