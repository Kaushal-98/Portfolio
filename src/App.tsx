import { useEffect, useState } from 'react';
import { LenisProvider, useScrollToSection } from './context/LenisContext';
import { AuroraBackground } from './components/AuroraBackground';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CustomCursor } from './components/CustomCursor';
import { NavBar } from './components/NavBar';
import { HeroSection } from './components/HeroSection';
import { Section } from './components/Section';
import { ProjectsPanel } from './components/ProjectsPanel';
import { TechStackPanel } from './components/TechStackPanel';
import { EducationPanel } from './components/EducationPanel';
import { TerminalPanel } from './components/TerminalPanel';
import { ContactPanel } from './components/ContactPanel';
import { CommandPalette } from './components/CommandPalette';

function AppShell() {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      if (isCmdK) {
        event.preventDefault();
        setIsPaletteOpen((open) => !open);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <CustomCursor />
      <AuroraBackground />
      <NoiseOverlay />

      <NavBar onOpenCommandPalette={() => setIsPaletteOpen(true)} />

      <main id="main-content">
        <HeroSection />

        <Section id="projects" eyebrow="Shipped work" title="Projects">
          <ProjectsPanel />
        </Section>

        <Section id="techstack" eyebrow="What I build with" title="Tech Stack">
          <TechStackPanel />
        </Section>

        <Section id="education" eyebrow="Academic background" title="Education">
          <EducationPanel />
        </Section>

        <Section id="terminal" eyebrow="Try it yourself" title="Terminal">
          <TerminalPanel />
        </Section>

        <Section id="contact" eyebrow="Open to opportunities" title="Contact">
          <ContactPanel />
        </Section>
      </main>

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onNavigate={(id) => scrollToSection(id)}
      />
    </>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <AppShell />
    </LenisProvider>
  );
}
