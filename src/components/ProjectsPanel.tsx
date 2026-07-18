import { motion } from 'framer-motion';
import { PROJECTS } from '../data/content';
import styles from './ProjectsPanel.module.css';

/**
 * Real project case studies, each with a summary, impact bullets, stack
 * chips, and live/repo links where available. `liveUrl` is left undefined
 * until real URLs are supplied — the button simply doesn't render rather
 * than pointing somewhere fake.
 */
export function ProjectsPanel() {
  return (
    <div className={styles.wrapper}>
      {PROJECTS.map((project, index) => (
        <motion.article
          key={project.id}
          className={styles.card}
          style={{ ['--project-accent' as string]: project.accent }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.period}>{project.period}</p>
              <h3 className={styles.name}>{project.name}</h3>
            </div>
          </div>

          <p className={styles.summary}>{project.summary}</p>

          <ul className={styles.bullets}>
            {project.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>

          <div className={styles.stackRow}>
            {project.stack.map((tech) => (
              <span key={tech} className={styles.stackChip}>
                {tech}
              </span>
            ))}
          </div>

          <div className={styles.linkRow}>
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.linkPill} data-cursor="interactive">
                Live demo ↗
              </a>
            ) : (
              <span className={styles.linkPillDisabled}>Live link coming soon</span>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.linkPill} data-cursor="interactive">
                Source ↗
              </a>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
