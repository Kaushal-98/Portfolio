import { useEffect, useRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useIsTouchDevice } from '../hooks/useIsTouchDevice';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}

const PULL_RADIUS = 60;
const MAX_DISPLACEMENT = 12;

/**
 * A button that's gently pulled toward the cursor when nearby (GSAP quickTo),
 * and springs back with an elastic ease when the cursor leaves.
 * Falls back to a plain static button on touch devices / reduced motion.
 */
export function MagneticButton({ children, variant = 'primary', className, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const disableMagnetism = prefersReducedMotion || isTouch;

  useEffect(() => {
    const el = ref.current;
    if (!el || disableMagnetism) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });

    function handleMove(event: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = event.clientX - centerX;
      const distY = event.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < rect.width / 2 + PULL_RADIUS) {
        const pullX = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, distX * 0.3));
        const pullY = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, distY * 0.3));
        xTo(pullX);
        yTo(pullY);
      } else {
        xTo(0);
        yTo(0);
      }
    }

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [disableMagnetism]);

  return (
    <button
      ref={ref}
      data-cursor="interactive"
      className={`${styles.button} ${variant === 'ghost' ? styles.ghost : styles.primary} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}
