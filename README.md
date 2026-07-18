# Developer OS — Kaushal Sharma's Portfolio

A single-page portfolio: a top nav bar links to every section, and
everything — About/Hero, Projects, Tech Stack, Education, a working
Terminal, and Contact — lives on the same scrollable page. No modals,
no "click to open" gating. Premium visuals (aurora background, glass
panels, custom cursor, magnetic buttons, noise texture, smooth scroll)
layered on top of straightforward, familiar structure.

## Layout

- **Nav bar** (top, fixed) — links to Projects / Tech Stack / Education / Terminal / Contact, smooth-scrolls to each on click. Collapses to a hamburger menu on mobile.
- **Hero** (`#home`) — your photo, name, tagline, bio, and social links, visible immediately on load after a brief terminal-style boot line.
- **Projects** (`#projects`) — Blood Donor Connector, DCE Junior Help Portal, Resume Builder.
- **Tech Stack** (`#techstack`) — your languages/frameworks/tools, grouped.
- **Education** (`#education`) — Dronacharya College + Kendriya Vidyalaya, as a timeline.
- **Terminal** (`#terminal`) — a real command parser: `help`, `whoami`, `projects`, `education`, `skills`, `contact`, `sudo hire-me`, `clear`.
- **Contact** (`#contact`) — a form that opens a pre-filled email to you.
- **⌘K / Ctrl+K** — command palette, jumps to any section by name.

## Still to do

- **Project live links** — your resume said "Live site here" for each
  project but the actual URLs weren't in the extracted text. Add them
  in `src/data/content.ts` under `PROJECTS` (`liveUrl` / `repoUrl`).
  Until then the button reads "Live link coming soon."
- **Real icons** — nav/command-palette currently use text glyphs (▣, ⌁, ◷...) as placeholders.
- **Contact form backend** — "Send message" currently opens your email client with the message pre-filled (`mailto:`). Wire it to a real backend (Formspree, Resend, your own API route) if you want silent submission.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Project structure

```
public/images/kaushal-headshot.png   — your photo, used in the hero

src/
  data/
    content.ts       — ALL your real content: profile, education, tech stack, projects, certifications
    navigation.ts     — the 6 nav items (Home, Projects, Tech Stack, Education, Terminal, Contact)
  context/
    LenisContext.tsx  — shared smooth-scroll instance + scrollToSection helper used by the nav bar and command palette
  components/
    NavBar.tsx              — fixed top nav, smooth-scrolls to sections
    HeroSection.tsx         — photo + name + bio, the #home section
    Section.tsx             — shared wrapper (heading + glass panel) used by every other section
    ProjectsPanel.tsx       — 3 project case study cards
    TechStackPanel.tsx      — grouped, animated tech chips
    EducationPanel.tsx      — timeline with drawn rail
    TerminalPanel.tsx       — real command-line parser
    ContactPanel.tsx        — working contact form (mailto for now)
    CommandPalette.tsx      — Ctrl/Cmd+K fuzzy nav
    CustomCursor.tsx, AuroraBackground.tsx, MagneticButton.tsx, NoiseOverlay.tsx — shared visual/interactive layer
  hooks/              — usePrefersReducedMotion, useIsTouchDevice
  styles/global.css   — design tokens (color/type/spacing)
```

## To edit your content

Everything text-based lives in **`src/data/content.ts`** — edit that one
file to change your bio, add a project, add a certification, etc. No need
to touch any component file for content changes.

## Notes

- `gsap` — magnetic button physics
- `framer-motion` — scroll-triggered reveals, springs
- `lenis` — smooth scrolling, shared via context so nav links can scroll to a section
- Fonts via Google Fonts: Space Grotesk (display), Inter (body/UI), JetBrains Mono (code/terminal)
