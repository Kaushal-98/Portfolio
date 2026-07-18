import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice } from '../hooks/useIsTouchDevice';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Replaces the system cursor with a dot + spring-trailing ring.
 * The ring grows/morphs when hovering anything with data-cursor="interactive".
 * Also drives a CSS custom property (--spotlight-x/y) on <body> so any
 * .glass panel can render a mouse-following spotlight highlight purely in CSS.
 *
 * Disabled entirely on touch devices and simplified under reduced motion.
 */
export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInteractive = useRef(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 500, damping: 40, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (isTouch) return;

    function handleMove(event: MouseEvent) {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      document.body.style.setProperty('--spotlight-x', `${event.clientX}px`);
      document.body.style.setProperty('--spotlight-y', `${event.clientY}px`);

      const target = event.target as HTMLElement;
      isInteractive.current = Boolean(target.closest('[data-cursor="interactive"]'));
    }

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
    // dotX/dotY are stable MotionValue refs, safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent-violet)',
          translateX: dotX,
          translateY: dotY,
          x: -4,
          y: -4,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1px solid var(--border-hairline-strong)',
          translateX: ringX,
          translateY: ringY,
          x: -16,
          y: -16,
          zIndex: 99,
          pointerEvents: 'none',
          transition: prefersReducedMotion ? 'none' : 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
    </>
  );
}
