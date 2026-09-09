import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "../../lib/motion";

export default function PortfolioVisual({ project, role }) {
  const isMain = role === "main";
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border shadow-2xl"
        style={{
          aspectRatio: "16 / 11",
          borderColor: "rgba(244,241,234,0.14)",
          background: "#0D0D10",
        }}
      >
        <div
          className={`flex items-center gap-1.5 border-b ${
            isMain ? "px-3 py-2 sm:px-4 sm:py-2.5" : "px-2 py-1"
          }`}
          style={{ borderColor: "rgba(244,241,234,0.1)" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#F4F1EA]/20" />
          <span className="w-2 h-2 rounded-full bg-[#F4F1EA]/20" />
          <span className="w-2 h-2 rounded-full bg-[#F4F1EA]/20" />
          {isMain && (
            <span className="ml-2 text-[10px] tracking-wide text-[#F4F1EA]/35 truncate">
              {project.url === "#" ? "yourproject.com" : project.url}
            </span>
          )}
        </div>
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
              }}
            >
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover opacity-0"
                onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="absolute inset-0 opacity-[0.15]" style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
