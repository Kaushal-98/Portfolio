import { useState } from 'react';
import { PROFILE } from '../data/content';
import { MagneticButton } from './MagneticButton';
import styles from './ContactPanel.module.css';

/**
 * Contact section. Since there's no backend yet, submitting composes a
 * pre-filled mailto: to PROFILE.email — honest about what it actually
 * does rather than faking a "message sent" state with nowhere to go.
 */
export function ContactPanel() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Let's build something.</h2>
      <p className={styles.subheading}>
        Open to internships, freelance projects, and anything that involves shipping real software.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <MagneticButton type="submit">Send message →</MagneticButton>
      </form>

      <div className={styles.socials}>
        <a href={`mailto:${PROFILE.email}`} data-cursor="interactive">
          {PROFILE.email}
        </a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor="interactive">
          GitHub
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor="interactive">
          LinkedIn
        </a>
      </div>
    </div>
  );
}
