export const PROFILE = {
  name: 'Kaushal Sharma',
  title: 'Full-Stack Developer',
  tagline: 'B.Tech CS student building real, shipped products — not just class projects.',
  bio: "I'm a Computer Science undergraduate at Dronacharya College of Engineering, driven by curiosity and a passion for creating meaningful digital experiences. I enjoy transforming ideas into thoughtful solutions and believe that great work comes from simplicity, creativity, and attention to detail. Every challenge is an opportunity to learn, grow, and become a better developer.",
  location: 'Gurugram, Haryana, India',
  email: 'sharmakaushal77777@gmail.com',
  github: 'https://github.com/Kaushal-98',
  linkedin: 'https://www.linkedin.com/in/kaushal-sharma-302900296/',
  photo: '/images/kaushal-headshot.png',
};

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  detail: string;
  period: string;
  location: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    id: 'dce',
    institution: 'Dronacharya College of Engineering',
    credential: 'B.Tech, Computer Science',
    detail: 'CGPA 8.81',
    period: 'Aug 2024 — Aug 2028',
    location: 'Gurugram, Haryana',
  },
  {
    id: 'kv-senior',
    institution: 'Kendriya Vidyalaya',
    credential: 'Senior Secondary School',
    detail: '74%',
    period: 'March 2023',
    location: 'New Delhi',
  },
  {
    id: 'kv-secondary',
    institution: 'Kendriya Vidyalaya',
    credential: 'Secondary School (Class 10)',
    detail: '91%',
    period: 'March 2021',
    location: 'New Delhi',
  },
];

export interface TechCategory {
  id: string;
  label: string;
  items: string[];
}

export const TECH_STACK: TechCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['Python', 'Golang', 'C', 'C++', 'Java', 'R', 'JavaScript (ES6)'],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Tech',
    items: ['React', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3', 'REST APIs', 'Google Gemini API', 'Linux'],
  },
  {
    id: 'tools',
    label: 'Developer Tools',
    items: ['VS Code', 'Git', 'GitHub', 'Netlify', 'Supabase'],
  },
  {
    id: 'concepts',
    label: 'Concepts',
    items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Responsive Web Design'],
  },
];

export interface Project {
  id: string;
  name: string;
  period: string;
  stack: string[];
  summary: string;
  bullets: string[];
  liveUrl?: string;
  repoUrl?: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'blood-donor-connector',
    name: 'BloodSync',
    period: 'Jul 2026',
    stack: ['React', 'Vite', 'Tailwind', 'Supabase'],
    summary: 'A full-stack blood donation platform that finds the nearest donor in an emergency, in real time.',
    bullets: [
      'Built with Supabase Auth, Row-Level Security policies, and real-time WebSocket subscriptions for instant emergency alerts and donor–requester chat.',
      'Geolocation-based nearest-donor matching using the Haversine distance formula, plus nearby-hospital discovery via the OpenStreetMap/Overpass API.',
      'Gamified badge system and a bilingual (EN/HI) interface to widen accessibility.',
    ],
    liveUrl: 'https://blood-donor-connector.vercel.app/',
    accent: 'var(--accent-rose)',
  },
  {
    id: 'dce-junior-help-portal',
    name: 'Campus_Saathi',
    period: 'May 2025',
    stack: ['HTML', 'CSS', 'JavaScript', 'Gemini API', 'Netlify'],
    summary: 'A responsive student hub for an entire college branch — notes, syllabus, PYQs, and an AI chatbot.',
    bullets: [
      'Branch/semester navigation for notes, syllabus, previous-year questions, and career roadmaps, plus a built-in CGPA calculator.',
      'AI chatbot powered by the Google Gemini API for instant student queries.',
      'Glassmorphism UI, particle background, 3D hover effects, and dark/light mode — optimized for mobile, deployed on Netlify.',
    ],
    liveUrl: 'https://drona-hub.netlify.app/',
    accent: 'var(--accent-cyan)',
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    period: 'Aug 2025',
    stack: ['HTML', 'CSS', 'JavaScript'],
    summary: 'A responsive resume builder with a live, real-time preview as you type.',
    bullets: [
      'Lets users design and preview resumes dynamically with a clean, modern interface.',
      'Real-time preview pane keeps formatting in sync with input, with no page reloads.',
    ],
    liveUrl: 'https://kaushalresumebuilder.netlify.app/',
    accent: 'var(--accent-violet)',
  },
];

export const CERTIFICATIONS = [
  { label: 'Oracle AI Foundations Associate', issuer: 'Oracle', year: '2025' },
  { label: 'Claude Skilljar', issuer: 'Anthropic', year: '2024' },
  { label: 'Microsoft Azure Fundamentals', issuer: 'Microsoft', year: '2024' },
];