import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

/**
 * Every content area (Projects, Tech Stack, Education, Terminal, Contact)
 * renders inline on the same scrollable page using this wrapper, instead
 * of opening as a separate modal "window". The id is the anchor target
 * the nav bar and command palette scroll to.
 */
export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>{title}</h2>
        </motion.div>
        <motion.div
          className={`${styles.panel} glass`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
