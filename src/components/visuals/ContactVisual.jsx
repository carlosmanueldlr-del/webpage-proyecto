import { motion } from "framer-motion";

export default function ContactVisual({ role, reducedMotion }) {
  const isMain = role === "main";
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-[6%] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(255,217,160,0.22), transparent 70%)" }}
        aria-hidden="true"
      />
      <motion.img
        src="/images/contact-envelope.png"
        alt="Floating envelope, get in touch"
        className="relative w-[82%] h-[82%] object-contain select-none"
        draggable={false}
        animate={
          isMain && !reducedMotion
            ? { rotate: [-3, 3, -3], y: [0, -10, 0] }
            : { rotate: 0, y: 0 }
        }
        transition={
          isMain && !reducedMotion
            ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      />
    </div>
  );
}
