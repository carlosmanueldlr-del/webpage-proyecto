// Extremely subtle film-grain texture over the whole canvas. Flat color
// fields read as "template" — a faint grain gives the surface a printed,
// tactile quality without being visible as a distinct effect.
export default function GrainOverlay() {
  return (
    <svg
      className="fixed inset-0 z-[90] w-full h-full pointer-events-none"
      style={{ opacity: 0.05, mixBlendMode: "overlay" }}
      aria-hidden="true"
    >
      <filter id="charlyGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#charlyGrain)" />
    </svg>
  );
}
