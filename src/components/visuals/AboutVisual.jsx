import { motion } from "framer-motion";

export default function AboutVisual({ section, role, reducedMotion }) {
  const isMain = role === "main";
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[60%] h-[14%] rounded-[50%] blur-2xl"
        style={{ background: "rgba(28,24,21,0.22)" }}
        aria-hidden="true"
      />
      <motion.img
        src={section.image}
        alt="Portrait of Charly, creative developer"
        className="relative w-full h-full object-contain select-none"
        draggable={false}
        animate={
          isMain && !reducedMotion
            ? { y: [0, -10, 0] }
            : { y: 0 }
        }
        transition={
          isMain && !reducedMotion
            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      />
    </div>
  );
}
