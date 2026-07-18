import { useState } from 'react';
import { NAV_ITEMS } from '../data/navigation';
import { useScrollToSection } from '../context/LenisContext';
import styles from './NavBar.module.css';

interface NavBarProps {
  onOpenCommandPalette: () => void;
}

/**
 * Fixed top nav bar. Every section lives on the same scrollable page —
 * clicking a link smooth-scrolls to it rather than opening a modal.
 * Collapses to a simple menu button on small screens.
 */
export function NavBar({ onOpenCommandPalette }: NavBarProps) {
  const scrollToSection = useScrollToSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleNavClick(id: string) {
    scrollToSection(id);
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} glass`} aria-label="Primary">
        <button
          type="button"
          className={styles.brand}
          onClick={() => handleNavClick('home')}
          data-cursor="interactive"
        >
          KS
        </button>

        <ul className={styles.linkList}>
          {NAV_ITEMS.filter((item) => item.id !== 'home').map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.navLink}
                onClick={() => handleNavClick(item.id)}
                data-cursor="interactive"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button type="button" className={styles.cmdButton} onClick={onOpenCommandPalette} data-cursor="interactive">
            ⌘K
          </button>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            data-cursor="interactive"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className={`${styles.mobileMenu} glass`}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.mobileLink}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
