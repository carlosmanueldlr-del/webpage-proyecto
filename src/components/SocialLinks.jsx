import { Linkedin, Instagram, Github } from "lucide-react";

const ICONS = { linkedin: Linkedin, instagram: Instagram, github: Github };

export default function SocialLinks({ socials, fg, variant = "icons", className = "" }) {
  if (variant === "text") {
    return (
      <ul className={`flex flex-col gap-1.5 ${className}`}>
        {socials.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm sm:text-base tracking-wide opacity-70 hover:opacity-100 transition-opacity underline-offset-4 hover:underline"
              style={{ color: fg }}
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{ border: `1px solid ${fg}33`, color: fg }}
          >
            {Icon && <Icon size={15} strokeWidth={1.75} />}
          </a>
        );
      })}
    </div>
  );
}
