import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './AuroraBackground.module.css';

/**
 * Fixed, full-viewport aurora wash made of three blurred, drifting
 * gradient blobs. CSS-driven (not canvas) so it's cheap, GPU-composited,
 * and trivially paused for prefers-reduced-motion.
 */
export function AuroraBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blobOne} ${prefersReducedMotion ? styles.still : ''}`} />
      <div className={`${styles.blob} ${styles.blobTwo} ${prefersReducedMotion ? styles.still : ''}`} />
      <div className={`${styles.blob} ${styles.blobThree} ${prefersReducedMotion ? styles.still : ''}`} />
    </div>
  );
}
