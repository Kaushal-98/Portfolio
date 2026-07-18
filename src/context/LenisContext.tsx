import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const LenisInstanceContext = createContext<Lenis | null>(null);

/**
 * Initializes a single Lenis instance for the whole app and makes it
 * available to any component (so nav links can smooth-scroll to a
 * section id via lenis.scrollTo). Skips entirely under reduced motion,
 * in which case consumers fall back to native scrollIntoView.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, smoothWheel: true });
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    let rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [prefersReducedMotion]);

  return <LenisInstanceContext.Provider value={lenisInstance}>{children}</LenisInstanceContext.Provider>;
}

/** Returns a function that smooth-scrolls to a section by id, with a sensible top offset for the fixed nav bar. */
export function useScrollToSection() {
  const lenis = useContext(LenisInstanceContext);

  return function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
}
