import { motion } from "framer-motion";
import { sections } from "../data/sections";
import { socials } from "../data/socials";
import SocialLinks from "./SocialLinks";

export default function Header({ currentId, onNavigate, fg }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10 py-4 sm:py-6 transition-colors duration-700"
      style={{ color: fg }}
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("about");
        }}
        className="shrink-0"
      >
        <img
          src="/images/charly-lab-logo.png"
          alt="Charly Lab"
          className="h-7 sm:h-8 md:h-9 w-auto select-none"
          draggable={false}
        />
      </a>

      <nav
        aria-label="Section navigation"
        className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center rounded-full p-1 gap-1"
        style={{
          background: `${fg}14`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${fg}1f`,
        }}
      >
        {sections.map((s) => {
          const active = s.id === currentId;
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className="relative px-4 py-2 text-[11px] md:text-xs font-semibold tracking-widest uppercase rounded-full transition-colors duration-300"
              style={{ color: active ? sections.find((x) => x.id === currentId).theme.bg : fg, opacity: active ? 1 : 0.55 }}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full -z-10"
                  style={{ background: fg }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />
              )}
              {s.nav}
            </button>
          );
        })}
      </nav>

      <SocialLinks socials={socials} fg={fg} className="shrink-0" />

      <nav
        aria-label="Section navigation mobile"
        className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center rounded-full p-1 gap-1"
        style={{
          background: `${fg}14`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${fg}1f`,
        }}
      >
        {sections.map((s) => {
          const active = s.id === currentId;
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              aria-label={s.nav}
              aria-current={active ? "page" : undefined}
              className="relative w-2.5 h-2.5 rounded-full transition-transform"
              style={{ background: fg, opacity: active ? 1 : 0.3, transform: active ? "scale(1.3)" : "scale(1)" }}
            />
          );
        })}
      </nav>
    </header>
  );
}
