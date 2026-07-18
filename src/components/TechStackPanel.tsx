import { motion } from 'framer-motion';
import { TECH_STACK } from '../data/content';
import styles from './TechStackPanel.module.css';

/**
 * Tech stack shown as grouped categories of pill chips, staggering in
 * on mount. Deliberately not a "skill bar" — those percentages are
 * usually meaningless; a grouped, scannable list is more honest.
 */
export function TechStackPanel() {
  return (
    <div className={styles.wrapper}>
      {TECH_STACK.map((category, categoryIndex) => (
        <div key={category.id} className={styles.category}>
          <p className={styles.categoryLabel}>{category.label}</p>
          <div className={styles.chipRow}>
            {category.items.map((item, i) => (
              <motion.span
                key={item}
                className={styles.chip}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: categoryIndex * 0.08 + i * 0.03,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
