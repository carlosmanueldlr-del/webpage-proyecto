import { motion } from "framer-motion";

export default function ContactVisual({ role, reducedMotion }) {
  const isMain = role === "main";
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          border: "1.5px solid rgba(255,246,238,0.28)",
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,217,160,0.16), transparent 60%)",
        }}
        animate={
          isMain && !reducedMotion
            ? { rotate: [0, 4, 0, -4, 0] }
            : { rotate: 0 }
        }
        transition={
          isMain && !reducedMotion
            ? { duration: 10, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0 }
        }
      >
        <span
          className="font-semibold select-none"
          style={{
            color: "#FFD9A0",
            fontSize: "clamp(2rem, 12vw, 7rem)",
            lineHeight: 1,
          }}
        >
          @
        </span>
      </motion.div>
    </div>
  );
}
