import { motion } from "framer-motion";
import { staggerItem } from "../lib/motion";

export default function SectionInfo({ items, fg, className = "" }) {
  return (
    <dl className={`flex flex-row md:flex-col gap-6 md:gap-7 flex-wrap ${className}`}>
      {items.map((item) => (
        <motion.div variants={staggerItem} key={item.label} className="min-w-[7.5rem]">
          <dt
            className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase opacity-55 mb-1"
            style={{ color: fg }}
          >
            {item.label}
          </dt>
          <dd className="text-sm sm:text-base font-medium" style={{ color: fg }}>
            {item.value}
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}
