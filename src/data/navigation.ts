export interface NavItem {
  id: string;
  label: string;
  icon: string;
  description: string;
}

/** Section ids double as anchor targets, nav bar links, and command-palette entries. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: '◒', description: 'Back to the top' },
  { id: 'projects', label: 'Projects', icon: '▣', description: '3 shipped projects' },
  { id: 'techstack', label: 'Tech Stack', icon: '⌁', description: 'Languages, tools, frameworks' },
  { id: 'education', label: 'Education', icon: '◷', description: 'Academic timeline' },
  { id: 'terminal', label: 'Terminal', icon: '❯_', description: 'A real command line' },
  { id: 'contact', label: 'Contact', icon: '↗', description: "Let's talk" },
];
