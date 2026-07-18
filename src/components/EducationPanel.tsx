import { motion } from 'framer-motion';
import { EDUCATION } from '../data/content';
import styles from './EducationPanel.module.css';

/**
 * Academic history as a vertical timeline rail with nodes, most recent
 * first. The rail itself draws in on mount (stroke-like reveal via
 * scaleY), then each entry card staggers in beside its node.
 */
export function EducationPanel() {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.rail}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      />
      <ul className={styles.list}>
        {EDUCATION.map((entry, index) => (
          <motion.li
            key={entry.id}
            className={styles.item}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.12, ease: [0.25, 1, 0.5, 1] }}
          >
            <span className={styles.node} aria-hidden="true" />
            <div className={styles.card}>
              <p className={styles.period}>{entry.period}</p>
              <h3 className={styles.institution}>{entry.institution}</h3>
              <p className={styles.credential}>{entry.credential}</p>
              <div className={styles.metaRow}>
                <span>{entry.detail}</span>
                <span>{entry.location}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
