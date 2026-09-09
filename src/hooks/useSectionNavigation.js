import { useEffect, useRef } from "react";

// Keyboard arrows + touch swipe for section navigation.
export function useSectionNavigation({ onNext, onPrev, disabled }) {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (disabled) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, disabled]);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (disabled || touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onNext();
        else onPrev();
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onNext, onPrev, disabled]);
}

export function usePrefersReducedMotion() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return prefersReduced;
}
