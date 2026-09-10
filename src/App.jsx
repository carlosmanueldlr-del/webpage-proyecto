import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { sections, getSectionIndex, getNextSection, getPrevSection } from "./data/sections";
import { projects } from "./data/projects";
import { useSectionNavigation, usePrefersReducedMotion } from "./hooks/useSectionNavigation";
import BackgroundLayer from "./components/BackgroundLayer";
import VisualStage from "./components/VisualStage";
import SectionScene from "./components/SectionScene";
import Header from "./components/Header";
import NavigationControls from "./components/NavigationControls";
import Particles from "./components/Particles";
import LoadingScreen from "./components/LoadingScreen";
import GrainOverlay from "./components/GrainOverlay";

export default function App() {
  const [currentId, setCurrentId] = useState("about");
  const [projectIndex, setProjectIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [introDone, setIntroDone] = useState(() => {
    try {
      return sessionStorage.getItem("charlylab-intro-seen") === "1";
    } catch {
      return false;
    }
  });
  const transitionTimeout = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const currentSection = useMemo(() => sections.find((s) => s.id === currentId), [currentId]);
  const nextSection = useMemo(() => getNextSection(currentId), [currentId]);
  const currentIndex = getSectionIndex(currentId);
  const isLooping = nextSection.id === "about";

  const goTo = useCallback(
    (id) => {
      if (id === currentId || transitioning) return;
      setCurrentId(id);
      setTransitioning(true);
      clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => setTransitioning(false), 950);
    },
    [currentId, transitioning]
  );

  const goNext = useCallback(() => goTo(getNextSection(currentId).id), [currentId, goTo]);
  const goPrev = useCallback(() => goTo(getPrevSection(currentId).id), [currentId, goTo]);

  useSectionNavigation({ onNext: goNext, onPrev: goPrev, disabled: transitioning || !introDone });

  const activeProject = projects[projectIndex];

  return (
    <main
      id="top"
      className="app-shell fixed inset-x-0 top-0 w-full overflow-hidden select-none"
      style={{ fontFamily: "Manrope, Inter, system-ui, sans-serif" }}
    >
      <BackgroundLayer section={currentSection} />

      <Particles active={transitioning} fg={currentSection.theme.fg} reducedMotion={reducedMotion} />

      <VisualStage
        currentSection={currentSection}
        nextSection={nextSection}
        project={activeProject}
        onNext={goNext}
        reducedMotion={reducedMotion}
        isLooping={isLooping}
        disabled={transitioning}
      />

      <SectionScene
        section={currentSection}
        projectIndex={projectIndex}
        setProjectIndex={setProjectIndex}
        reducedMotion={reducedMotion}
        onNavigate={goTo}
      />

      <Header currentId={currentId} onNavigate={goTo} fg={currentSection.theme.fg} />

      <NavigationControls
        currentIndex={currentIndex}
        onPrev={goPrev}
        onNext={goNext}
        fg={currentSection.theme.fg}
        bg={currentSection.theme.bg}
        disabled={transitioning}
      />

      <GrainOverlay />

      <AnimatePresence>
        {!introDone && (
          <LoadingScreen
            key="intro"
            onComplete={() => {
              setIntroDone(true);
              try {
                sessionStorage.setItem("charlylab-intro-seen", "1");
              } catch {
                /* private browsing or storage disabled — just skip persisting */
              }
            }}
            reducedMotion={reducedMotion}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
