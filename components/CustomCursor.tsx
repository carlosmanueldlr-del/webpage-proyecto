"use client";

import { useEffect, useRef, useState } from "react";
import { useMenu } from "./MenuContext";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "link" | "view">("default");
  const { isOpen } = useMenu();

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      setEnabled(mq.matches);
      document.documentElement.classList.toggle("has-cursor", mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setVariant(interactive.getAttribute("data-cursor") === "view" ? "view" : "link");
      } else {
        setVariant("default");
      }
    };

    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-ink text-paper transition-all duration-300 ease-soft"
        style={{
          width: variant === "default" ? 7 : variant === "view" ? 64 : 40,
          height: variant === "default" ? 7 : variant === "view" ? 64 : 40,
          opacity: isOpen ? 0 : 1,
        }}
      >
        {variant === "view" && (
          <span className="text-micro uppercase tracking-label">View</span>
        )}
        {variant === "link" && (
          <span className="block h-[5px] w-[5px] rounded-full bg-paper" />
        )}
      </div>
    </div>
  );
}
