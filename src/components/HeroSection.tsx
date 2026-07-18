import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useScrollToSection } from '../context/LenisContext';
import { MagneticButton } from './MagneticButton';
import { PROFILE } from '../data/content';
import styles from './HeroSection.module.css';

const BOOT_LINES = ['> initializing portfolio.sys', '> loading profile: kaushal sharma', '> ready.'];

/**
 * The top-of-page hero, rendered inline as the `home` section — not a
 * separate screen. A brief terminal-style boot line plays once, then the
 * real hero (photo, name, bio, links) reveals directly on the page.
 * Everything below it (Projects, Tech Stack, etc.) is already mounted
 * and scrollable immediately; boot is purely decorative, not a gate.
 */
export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollToSection = useScrollToSection();
  const [lineIndex, setLineIndex] = useState(prefersReducedMotion ? BOOT_LINES.length : 0);
  const [charIndex, setCharIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (lineIndex >= BOOT_LINES.length) {
      const timeout = setTimeout(() => setHeroVisible(true), 250);
      return () => clearTimeout(timeout);
    }

    const currentLine = BOOT_LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const delay = 12 + Math.random() * 14;
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), delay);
      return () => clearTimeout(timeout);
    }

    const lineDelay = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 160);
    return () => clearTimeout(lineDelay);
  }, [lineIndex, charIndex, prefersReducedMotion]);

  return (
    <section id="home" className={styles.wrapper}>
      {!heroVisible && (
        <div className={styles.terminalBlock} role="status" aria-live="polite">
          {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
            <p key={i} className={styles.line}>
              {line}
            </p>
          ))}
          {!prefersReducedMotion && lineIndex < BOOT_LINES.length && (
            <p className={styles.line}>
              {BOOT_LINES[lineIndex].slice(0, charIndex)}
              <span className={styles.cursor}>▍</span>
            </p>
          )}
        </div>
      )}

      {heroVisible && (
        <motion.div
          className={styles.hero}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.div
            className={styles.photoFrame}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          >
            <img src={PROFILE.photo} alt={`Portrait of ${PROFILE.name}`} className={styles.photo} />
          </motion.div>

          <p className={styles.eyebrow}>
            {PROFILE.title} &middot; {PROFILE.location}
          </p>
          <h1 className={styles.headline}>{PROFILE.name}</h1>
          <p className={styles.tagline}>{PROFILE.tagline}</p>
          <p className={styles.bio}>{PROFILE.bio}</p>

          <div className={styles.linkRow}>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className={styles.socialLink} data-cursor="interactive">
              GitHub ↗
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={styles.socialLink} data-cursor="interactive">
              LinkedIn ↗
            </a>
            <a href={`mailto:${PROFILE.email}`} className={styles.socialLink} data-cursor="interactive">
              Email ↗
            </a>
          </div>

          <div className={styles.ctaRow}>
            <MagneticButton onClick={() => scrollToSection('projects')}>See my projects ↓</MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollToSection('contact')}>
              Get in touch
            </MagneticButton>
          </div>
        </motion.div>
      )}
    </section>
  );
}
