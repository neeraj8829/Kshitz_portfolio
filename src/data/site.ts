import { THEMES, DEFAULT_THEME_ID, ThemeOption } from "./themes";

export type ProjectCategory = "web" | "design" | "apps";
export type ProjectMockupType = "dashboard" | "store" | "travel" | "fitness" | "portfolio" | "chat";
export type ProjectTint = "accent" | "accent-2" | "surface-2";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  subtitle?: string; // Backwards compatibility
  description: string;
  category: ProjectCategory;
  year: string;
  role: string;
  duration: string;
  tech: string[];
  tags?: string[]; // Backwards compatibility
  metrics: ProjectMetric[];
  links: {
    live?: string;
    github?: string;
  };
  mockup: ProjectMockupType;
  tint: ProjectTint;
  screenshot?: string;
  mobileScreenshot?: string;
  // Compatibility fields
  featured?: boolean;
  bentoSize?: "large" | "medium" | "small";
  image?: string;
  heroImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    overview: string;
    role: string;
    timeline: string;
    client: string;
    challenge: string;
    solution: string;
    results: string[];
    techStack: string[];
    gallery: string[];
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: "work" | "education";
  description: string;
  bullets: string[];
  skills: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface ProcessStep {
  number: string;
  step?: string; // backwards compatibility
  title: string;
  duration: string;
  timeline?: string; // backwards compatibility
  summary: string;
  description?: string; // backwards compatibility
  points: string[];
  deliverables: string[];
  icon: "search" | "pen-tool" | "code-2" | "rocket";
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ColorTheme = ThemeOption;

export interface FontOption {
  id: "jakarta" | "manrope" | "dmsans";
  name: string;
  headingFont: string;
  bodyFont: string;
  description: string;
}

export interface SkillDetail {
  id: string;
  name: string;
  icon: string;
  category: "Frontend" | "Backend" | "Design" | "Tools";
  level: number;
  years: number;
  description: string;
}

export type SkillLevel = "Daily" | "Strong" | "Familiar";

export interface ExpertiseSkill {
  name: string;
  note: string;
  icon: string;
  level: SkillLevel;
}

export interface ExpertiseDomain {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: "layout" | "server" | "palette" | "wrench";
  exploring: string;
  relatedCategory: "Web" | "Design" | "Apps";
  skills: ExpertiseSkill[];
}

export interface SiteData {
  config: {
    showFontSwitcher: boolean;
    showThemeSwitcher: boolean;
    showSkillsViewSwitcher: boolean;
    showExpertiseViewSwitcher: boolean;
    showProjectsViewSwitcher: boolean;
    defaultFont: "jakarta" | "manrope" | "dmsans";
    defaultTheme: string;
    defaultSkillsView: "ring" | "orbit" | "sphere";
    defaultExpertiseView: "explorer" | "bento";
    defaultProjectsView: "showcase" | "bento" | "index";
  };
  fontOptions: FontOption[];
  colorThemes: ColorTheme[];
  skills: SkillDetail[];
  expertiseDomains: ExpertiseDomain[];
  profile: {
    name: string;
    fullName: string;
    role: string;
    eyebrow: string;
    heroHeadline: {
      line1: string;
      line2: string;
      highlightWord: string;
      line3: string;
    };
    intro: string;
    aboutParagraphs: {
      lead: string;
      body1: string;
      body2: string;
    };
    location: string;
    experienceYears: string;
    educationDegree: string;
    languages: string;
    availability: string;
    email: string;
    phone: string;
    cvUrl: string;
    heroImage: string;
    aboutImage: string;
    aboutInsetImage: string;
    avatarPlaceholder: string;
    socials: {
      github: string;
      linkedin: string;
      twitter: string;
      instagram: string;
    };
  };
  stats: {
    value: number;
    suffix: string;
    label: string;
    description: string;
  }[];
  whatIDo: {
    title: string;
    description: string;
    icon: string;
  }[];
  marqueeRow1: string[];
  marqueeRow2: string[];
  projects: Project[];
  experience: ExperienceItem[];
  services: ServiceItem[];
  process: ProcessStep[];
  processSteps: ProcessStep[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
}

export const siteData: SiteData = {
  config: {
    showFontSwitcher: true,
    showThemeSwitcher: true,
    showSkillsViewSwitcher: false,
    showExpertiseViewSwitcher: true,
    showProjectsViewSwitcher: true,
    defaultFont: "jakarta",
    defaultTheme: DEFAULT_THEME_ID,
    defaultSkillsView: "ring",
    defaultExpertiseView: "explorer",
    defaultProjectsView: "showcase",
  },
  fontOptions: [
    {
      id: "jakarta",
      name: "Jakarta + Inter",
      headingFont: "Plus Jakarta Sans",
      bodyFont: "Inter",
      description: "Modern, friendly, and structured. (Recommended)",
    },
    {
      id: "manrope",
      name: "Manrope + Inter",
      headingFont: "Manrope",
      bodyFont: "Inter",
      description: "Clean, geometric, and neutral architectural feel.",
    },
    {
      id: "dmsans",
      name: "DM Sans + DM Sans",
      headingFont: "DM Sans",
      bodyFont: "DM Sans",
      description: "Ultra-clean single-family minimal aesthetic.",
    },
  ],
  colorThemes: THEMES,
  skills: [
    {
      id: "react",
      name: "React",
      icon: "react",
      category: "Frontend",
      level: 95,
      years: 5,
      description: "Declarative component-driven UI architecture, hooks & modern patterns.",
    },
    {
      id: "nextjs",
      name: "Next.js",
      icon: "nextjs",
      category: "Frontend",
      level: 96,
      years: 4,
      description: "App Router, SSR, Server Components & edge rendering performance.",
    },
    {
      id: "typescript",
      name: "TypeScript",
      icon: "typescript",
      category: "Frontend",
      level: 94,
      years: 5,
      description: "Type-safe scalability, complex generics, and clean interfaces.",
    },
    {
      id: "javascript",
      name: "JavaScript",
      icon: "javascript",
      category: "Frontend",
      level: 96,
      years: 6,
      description: "ESNext standards, event loops, DOM performance, and async flows.",
    },
    {
      id: "nodejs",
      name: "Node.js",
      icon: "nodejs",
      category: "Backend",
      level: 88,
      years: 5,
      description: "Server-side runtimes, asynchronous microservices & REST APIs.",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      icon: "tailwind",
      category: "Frontend",
      level: 98,
      years: 4,
      description: "Design token architecture, JIT compilation, and fluid layouts.",
    },
    {
      id: "htmlcss",
      name: "HTML & CSS",
      icon: "htmlcss",
      category: "Frontend",
      level: 98,
      years: 6,
      description: "Semantic markup, CSS Grid/Flexbox, fluid typography & accessibility.",
    },
    {
      id: "figma",
      name: "Figma",
      icon: "figma",
      category: "Design",
      level: 92,
      years: 4,
      description: "High-fidelity UI/UX prototyping, design systems, and components.",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      icon: "mongodb",
      category: "Backend",
      level: 86,
      years: 4,
      description: "Document data modeling, aggregation pipelines, and indexing.",
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      icon: "postgresql",
      category: "Backend",
      level: 89,
      years: 4,
      description: "Relational database schema design, complex joins, and Prisma ORM.",
    },
    {
      id: "git",
      name: "Git & GitHub",
      icon: "git",
      category: "Tools",
      level: 95,
      years: 6,
      description: "Branching strategies, CI/CD automated actions, and code review.",
    },
    {
      id: "docker",
      name: "Docker",
      icon: "docker",
      category: "Tools",
      level: 82,
      years: 3,
      description: "Containerization, multi-stage builds, and repeatable environments.",
    },
    {
      id: "gsap",
      name: "GSAP",
      icon: "gsap",
      category: "Frontend",
      level: 92,
      years: 4,
      description: "High-performance scroll-driven storytelling, timelines & ScrollTrigger.",
    },
    {
      id: "framermotion",
      name: "Framer Motion",
      icon: "framermotion",
      category: "Frontend",
      level: 94,
      years: 4,
      description: "Gesture-driven spring physics, layout animations & page transitions.",
    },
    {
      id: "graphql",
      name: "REST & GraphQL",
      icon: "graphql",
      category: "Backend",
      level: 90,
      years: 5,
      description: "Type-safe query schemas, RESTful best practices, and caching.",
    },
    {
      id: "vercel",
      name: "Vercel",
      icon: "vercel",
      category: "Tools",
      level: 94,
      years: 4,
      description: "Zero-config edge deployments, analytics, serverless functions & CI/CD.",
    },
  ],
  profile: {
    name: "Kshitiz",
    fullName: "Kshitiz",
    role: "Full-Stack Developer & UI Designer",
    eyebrow: "Full-Stack Developer & UI Designer",
    heroHeadline: {
      line1: "Hi, I'm Kshitiz.",
      line2: "I design & build",
      highlightWord: "digital",
      line3: "experiences.",
    },
    intro:
      "Crafting tactile, high-performance web applications and fluid interfaces that merge architectural rigor with warm, human-centered aesthetics.",
    aboutParagraphs: {
      lead:
        "I am Kshitiz, a passionate full-stack developer and UI designer dedicated to building purposeful digital products.",
      body1:
        "Over the past 5+ years, I have architected responsive web systems, design systems, and creative digital installations for startups and global brands alike. I bridge the gap between engineering precision and aesthetic nuance.",
      body2:
        "When I'm not writing clean TypeScript or tuning 60fps GSAP scroll choreography, you'll find me exploring typography, tinkering with spatial computing, and contributing to open-source software.",
    },
    location: "Bengaluru, India (Available Worldwide / Remote)",
    experienceYears: "5+ Years",
    educationDegree: "B.Tech in Computer Science & Engineering",
    languages: "English, Hindi",
    availability: "Available for Q1 / Q2 Projects",
    email: "hello@kshitiz.dev",
    phone: "+91 98765 43210",
    cvUrl: "/cv.pdf",
    heroImage: "/images/kshitiz-portrait.jpg",
    aboutImage: "/images/kshitiz-about.jpg",
    aboutInsetImage: "/images/kshitiz-workspace.jpg",
    avatarPlaceholder: "/images/kshitiz-placeholder.svg",
    socials: {
      github: "https://github.com/kshitiz",
      linkedin: "https://linkedin.com/in/kshitiz",
      twitter: "https://twitter.com/kshitiz",
      instagram: "https://instagram.com/kshitiz",
    },
  },
  stats: [
    {
      value: 5,
      suffix: "+",
      label: "Years Experience",
      description: "Delivering modern web products",
    },
    {
      value: 40,
      suffix: "+",
      label: "Projects Completed",
      description: "From SaaS to design flagships",
    },
    {
      value: 28,
      suffix: "+",
      label: "Happy Clients",
      description: "Across US, Europe & Asia",
    },
    {
      value: 99,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Consistent 5-star delivery",
    },
  ],
  whatIDo: [
    {
      title: "Web Development",
      description:
        "Full-stack applications using Next.js App Router, TypeScript, robust API design, and serverless edge databases.",
      icon: "Code2",
    },
    {
      title: "UI/UX Design",
      description:
        "High-fidelity responsive interfaces in Figma, interactive design systems, and tactile kinetic micro-interactions.",
      icon: "Palette",
    },
    {
      title: "Performance & SEO",
      description:
        "Sub-second load times, 95+ Core Web Vitals, accessible semantic HTML, and search-optimized architectures.",
      icon: "Zap",
    },
  ],
  marqueeRow1: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Figma",
    "PostgreSQL",
    "GSAP",
    "Framer Motion",
    "GraphQL",
    "Docker",
    "Lenis",
  ],
  marqueeRow2: [
    "Prisma",
    "MongoDB",
    "Redis",
    "Git & GitHub",
    "WebSockets",
    "Three.js",
    "Supabase",
    "Vercel",
    "RESTful APIs",
    "Storybook",
    "Zustand",
    "Jest & Vitest",
  ],
  expertiseDomains: [
    {
      id: "frontend",
      number: "01",
      title: "Frontend Development",
      shortDesc: "Fluid, accessible interfaces & client state",
      fullDesc: "Fluid, accessible interfaces with resilient client-side state.",
      icon: "layout",
      exploring: "WebGPU, React Server Actions, Edge Streaming",
      relatedCategory: "Web",
      skills: [
        { name: "Next.js & React", note: "App Router, server components, caching", icon: "react", level: "Daily" },
        { name: "TypeScript", note: "Typed APIs and safer refactors", icon: "typescript", level: "Daily" },
        { name: "Tailwind CSS", note: "Design tokens and fast, consistent UI", icon: "tailwind", level: "Daily" },
        { name: "Framer Motion & GSAP", note: "Scroll storytelling and micro-interactions", icon: "framer", level: "Strong" },
        { name: "HTML & Semantic CSS", note: "Accessible, standards-first markup", icon: "code", level: "Daily" },
      ],
    },
    {
      id: "backend",
      number: "02",
      title: "Backend & Systems",
      shortDesc: "Scalable APIs, data models & real-time flows",
      fullDesc: "Scalable APIs, data models and real-time features.",
      icon: "server",
      exploring: "Distributed Cache, Vector DBs, Edge runtimes",
      relatedCategory: "Apps",
      skills: [
        { name: "Node.js & Express", note: "REST services and middleware", icon: "node", level: "Strong" },
        { name: "PostgreSQL & Prisma", note: "Relational modelling and migrations", icon: "database", level: "Strong" },
        { name: "REST & GraphQL", note: "Clean contracts and docs", icon: "network", level: "Strong" },
        { name: "Redis & WebSockets", note: "Caching and realtime updates", icon: "zap", level: "Familiar" },
        { name: "Docker & CI/CD", note: "Repeatable builds and deploys", icon: "docker", level: "Familiar" },
      ],
    },
    {
      id: "design",
      number: "03",
      title: "Design & Creative Craft",
      shortDesc: "Thoughtful systems & visual direction",
      fullDesc: "Thoughtful systems and editorial visual direction.",
      icon: "palette",
      exploring: "Generative Tokens, Spatial UI, Motion Design Systems",
      relatedCategory: "Design",
      skills: [
        { name: "Figma Prototyping", note: "Flows, components and handoff", icon: "figma", level: "Strong" },
        { name: "Design Systems & Tokens", note: "Scalable, themeable UI libraries", icon: "layers", level: "Daily" },
        { name: "Kinetic Typography", note: "Expressive but readable motion type", icon: "type", level: "Strong" },
        { name: "User Journeys & Wireframing", note: "Research-led structure", icon: "compass", level: "Strong" },
        { name: "Responsive Layouts", note: "Mobile-first, fluid grids", icon: "maximize", level: "Daily" },
      ],
    },
    {
      id: "tools",
      number: "04",
      title: "Tools & Quality",
      shortDesc: "Velocity, accessibility & clean hygiene",
      fullDesc: "Velocity, accessibility and clean code hygiene.",
      icon: "wrench",
      exploring: "Automated A11y Audits, Turbopack, AI DevTools",
      relatedCategory: "Web",
      skills: [
        { name: "Git & GitHub Workflows", note: "Branching, reviews, automation", icon: "git", level: "Daily" },
        { name: "WCAG AA Accessibility", note: "Keyboard, contrast, screen readers", icon: "shield", level: "Strong" },
        { name: "Lighthouse Performance", note: "Core Web Vitals tuning", icon: "gauge", level: "Strong" },
        { name: "VS Code & Terminal", note: "Fast, scriptable workflows", icon: "terminal", level: "Daily" },
        { name: "Vercel & Cloudflare Deploy", note: "Edge hosting and previews", icon: "cloud", level: "Strong" },
      ],
    },
  ],
  projects: [
    {
      slug: "lumen-analytics-dashboard",
      number: "01",
      title: "Lumen",
      tagline: "Enterprise analytics dashboard",
      subtitle: "Enterprise analytics dashboard",
      description:
        "A real-time analytics platform with dense data visualisation, live metric aggregation and chart updates under 16ms.",
      category: "web",
      year: "2024",
      role: "Lead UI Architect & Frontend Engineer",
      duration: "10 Weeks",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "D3.js"],
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "D3.js"],
      metrics: [
        { value: "<16ms", label: "Chart updates" },
        { value: "2.4M", label: "Events per day" },
        { value: "-38%", label: "Load time" },
      ],
      links: {
        live: "https://lumen.kshitiz.dev",
        github: "https://github.com/kshitiz/lumen-dashboard",
      },
      mockup: "dashboard",
      tint: "accent",
      featured: true,
      bentoSize: "large",
      liveUrl: "https://lumen.kshitiz.dev",
      githubUrl: "https://github.com/kshitiz/lumen-dashboard",
      caseStudy: {
        overview:
          "Lumen was conceived to provide quantitative traders and treasury teams with effortless clarity over fragmented liquidity pools. Built with Next.js App Router and double-buffered HTML5 canvas pipelines.",
        role: "Lead Full-Stack Developer & UI Architect",
        timeline: "10 Weeks (Q1 2024)",
        client: "Lumen Technologies, London",
        challenge:
          "Handling hundreds of incoming WebSocket ticks per second without blocking the React main thread or triggering frame drops on low-power devices.",
        solution:
          "Decoupled computation into dedicated Web Workers, implemented ring buffers for incoming market depth, and styled the UI with custom warm design tokens.",
        results: [
          "Eliminated UI thread latency under peak market volatility events.",
          "Adopted by over 14 institutional hedge funds within 90 days of launch.",
          "Achieved a 99/100 Google Lighthouse Desktop performance rating.",
        ],
        techStack: ["Next.js 14", "TypeScript", "WebSockets", "D3.js", "Tailwind CSS", "Zustand"],
        gallery: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
        ],
      },
    },
    {
      slug: "bloom-ecommerce-store",
      number: "02",
      title: "Bloom",
      tagline: "Artisanal botanical store",
      subtitle: "Artisanal botanical store",
      description:
        "A fast, beautiful e-commerce store with a custom cart, plant-care guides and a streamlined checkout.",
      category: "web",
      year: "2024",
      role: "Design Systems & Frontend Lead",
      duration: "8 Weeks",
      tech: ["Next.js", "Stripe", "Tailwind CSS", "Sanity"],
      tags: ["Next.js", "Stripe", "Tailwind CSS", "Sanity"],
      metrics: [
        { value: "+42%", label: "Conversion" },
        { value: "1.2s", label: "Largest paint" },
        { value: "98", label: "Lighthouse score" },
      ],
      links: {
        live: "https://bloom.kshitiz.dev",
        github: "https://github.com/kshitiz/bloom-store",
      },
      mockup: "store",
      tint: "accent-2",
      featured: true,
      bentoSize: "medium",
      liveUrl: "https://bloom.kshitiz.dev",
      githubUrl: "https://github.com/kshitiz/bloom-store",
      caseStudy: {
        overview:
          "Bloom merges editorial plant journalism with high-conversion commerce. The design reflects organic soil tones, tactile typography, and bespoke micro-interactions.",
        role: "UI/UX Designer & Frontend Engineer",
        timeline: "8 Weeks (Q2 2024)",
        client: "Bloom Botanics, Melbourne",
        challenge:
          "Standard e-commerce templates felt cold and failed to convey the delicate care instructions and living nature of the specimens.",
        solution:
          "Built a customized headless Shopify store with responsive story sliders, climate zone calculators, and instant optimistic cart drawer states.",
        results: [
          "Increased average order value (AOV) by 24%.",
          "Cut checkout bounce rates by 19% with an ultra-streamlined checkout.",
          "Featured on Awwwards Mobile Excellence.",
        ],
        techStack: ["Next.js", "Shopify Storefront API", "Framer Motion", "Tailwind CSS", "Lenis"],
        gallery: [
          "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80",
        ],
      },
    },
    {
      slug: "nomad-travel-planner",
      number: "03",
      title: "Nomad",
      tagline: "Smart travel planner",
      subtitle: "Smart travel planner",
      description:
        "A mobile-first travel planner that builds day-by-day itineraries, maps routes and works offline.",
      category: "apps",
      year: "2023",
      role: "Mobile Architect & Product Designer",
      duration: "12 Weeks",
      tech: ["React Native", "TypeScript", "Mapbox", "Firebase"],
      tags: ["React Native", "TypeScript", "Mapbox", "Firebase"],
      metrics: [
        { value: "12k", label: "Active users" },
        { value: "4.8", label: "Store rating" },
        { value: "30+", label: "Countries" },
      ],
      links: {
        live: "https://nomad.kshitiz.dev",
        github: "https://github.com/kshitiz/nomad-planner",
      },
      mockup: "travel",
      tint: "surface-2",
      featured: true,
      bentoSize: "medium",
      liveUrl: "https://nomad.kshitiz.dev",
      githubUrl: "https://github.com/kshitiz/nomad-planner",
      caseStudy: {
        overview:
          "Nomad simplifies multi-city travel planning for friends and distributed teams. Includes real-time budget splitting and collaborative pin drops.",
        role: "Full-Stack Product Engineer",
        timeline: "12 Weeks (Q3 2023)",
        client: "Nomad Labs Inc.",
        challenge:
          "Ensuring complete functionality even in spotty airport Wi-Fi or remote mountain areas without connectivity.",
        solution:
          "Designed an offline-first architecture with IndexedDB caching and CRDT conflict-free resolution when returning online.",
        results: [
          "Zero lost itineraries during intermittent network states.",
          "Over 35,000 itineraries organized in the first 6 months.",
          "Nominated for Best Mobile Web App at Product Hunt Awards.",
        ],
        techStack: ["React", "Mapbox GL", "IndexedDB", "Tailwind CSS", "Node.js", "Express"],
        gallery: [
          "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1200&q=80",
        ],
      },
    },
    {
      slug: "pulse-fitness-tracker",
      number: "04",
      title: "Pulse",
      tagline: "Fitness and habit tracker",
      subtitle: "Fitness and habit tracker",
      description:
        "A habit and workout tracker with progress rings, streaks and weekly insights that keep people consistent.",
      category: "apps",
      year: "2023",
      role: "Full-Stack Engineer",
      duration: "6 Weeks",
      tech: ["React Native", "Node.js", "PostgreSQL", "Charts"],
      tags: ["React Native", "Node.js", "PostgreSQL", "Charts"],
      metrics: [
        { value: "65%", label: "30-day retention" },
        { value: "8k", label: "Workouts logged" },
        { value: "4.7", label: "Store rating" },
      ],
      links: {
        live: "https://pulse.kshitiz.dev",
        github: "https://github.com/kshitiz/pulse-fitness",
      },
      mockup: "fitness",
      tint: "accent",
      featured: false,
      bentoSize: "small",
      liveUrl: "https://pulse.kshitiz.dev",
      githubUrl: "https://github.com/kshitiz/pulse-fitness",
      caseStudy: {
        overview:
          "Pulse strips away the friction of complex fitness spreadsheets into a single glanceable ring interface that motivates consistency.",
        role: "Mobile Web & UI Developer",
        timeline: "6 Weeks (Q4 2023)",
        client: "Pulse Health Co.",
        challenge: "Rendering fluid workout graphs smoothly on older smartphones.",
        solution:
          "Replaced heavy SVG charts with lightweight Canvas 2D render loops wrapped in accessible ARIA descriptions.",
        results: [
          "98% customer retention over 30 days.",
          "Over 2 million logged sets and reps.",
        ],
        techStack: ["React", "Canvas 2D", "Tailwind CSS", "Framer Motion"],
        gallery: [
          "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
        ],
      },
    },
    {
      slug: "folio-photographer-portfolio",
      number: "05",
      title: "Folio",
      tagline: "Photographer portfolio",
      subtitle: "Photographer portfolio",
      description:
        "A minimal, image-first portfolio with fluid galleries, smooth page transitions and a fast CMS workflow.",
      category: "design",
      year: "2023",
      role: "Creative Developer & Art Director",
      duration: "5 Weeks",
      tech: ["Next.js", "Framer Motion", "Figma", "Sanity"],
      tags: ["Next.js", "Framer Motion", "Figma", "Sanity"],
      metrics: [
        { value: "3x", label: "Enquiries" },
        { value: "0.9s", label: "Load time" },
        { value: "100", label: "Accessibility score" },
      ],
      links: {
        live: "https://folio.kshitiz.dev",
        github: "https://github.com/kshitiz/folio-photography",
      },
      mockup: "portfolio",
      tint: "accent-2",
      featured: false,
      bentoSize: "small",
      liveUrl: "https://folio.kshitiz.dev",
      githubUrl: "https://github.com/kshitiz/folio-photography",
      caseStudy: {
        overview:
          "Designed to let monolithic brutalist buildings and subtle shadow details breathe with generous whitespace and smooth scroll momentum.",
        role: "Creative Developer & Art Director",
        timeline: "5 Weeks (Q2 2023)",
        client: "Studio Hélène, Zurich",
        challenge: "Displaying 4K uncompressed photographs without stalling page load.",
        solution:
          "Integrated Next.js next/image with AVIF dynamic optimization and custom blur-up placeholder hashes.",
        results: [
          "Won CSS Design Awards Site of the Day.",
          "Average visitor session lengthened to 3.8 minutes.",
        ],
        techStack: ["Next.js 14", "GSAP", "Lenis", "Tailwind CSS"],
        gallery: [
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        ],
      },
    },
    {
      slug: "chatterbox-realtime-chat",
      number: "06",
      title: "Chatterbox",
      tagline: "Realtime team chat",
      subtitle: "Realtime team chat",
      description:
        "A realtime messaging app with channels, typing presence, reactions and instant delivery over WebSockets.",
      category: "web",
      year: "2024",
      role: "Distributed Systems & Frontend",
      duration: "7 Weeks",
      tech: ["React", "Node.js", "Socket.io", "Redis"],
      tags: ["React", "Node.js", "Socket.io", "Redis"],
      metrics: [
        { value: "<50ms", label: "Delivery" },
        { value: "5k", label: "Concurrent users" },
        { value: "99.9%", label: "Uptime" },
      ],
      links: {
        live: "https://chatterbox.kshitiz.dev",
        github: "https://github.com/kshitiz/chatterbox-app",
      },
      mockup: "chat",
      tint: "surface-2",
      featured: false,
      bentoSize: "small",
      liveUrl: "https://chatterbox.kshitiz.dev",
      githubUrl: "https://github.com/kshitiz/chatterbox-app",
      caseStudy: {
        overview:
          "Chatterbox provides a secure communication conduit for distributed teams, featuring channels, presence indicators and instant delivery.",
        role: "Full-Stack Security & Web Developer",
        timeline: "7 Weeks (Q1 2024)",
        client: "Open Source Project",
        challenge: "Balancing client-side state synchronization with low latency across thousands of concurrent rooms.",
        solution:
          "Utilized Redis Pub/Sub, optimized binary WebSocket frames, and structured an optimistic message queue in React.",
        results: [
          "Over 1,200 GitHub stars within the first two months.",
          "Audited for high availability with sub-50ms message propagation.",
        ],
        techStack: ["React", "Node.js", "Socket.io", "Redis", "Tailwind CSS"],
        gallery: [
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        ],
      },
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Full-Stack Developer",
      company: "Atelier Studio",
      period: "2023 — Present",
      location: "Bengaluru, India (Remote)",
      type: "work",
      description:
        "Leading the development of bespoke e-commerce and SaaS platforms for global clientele, supervising technical architecture and performance standards.",
      bullets: [
        "Architected Next.js micro-frontends serving over 300,000 monthly active users.",
        "Created an internal UI component system cutting feature delivery time by 35%.",
        "Pioneered GSAP & Lenis smooth interaction guidelines across client engagements.",
      ],
      skills: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Architecture"],
    },
    {
      id: "exp-2",
      role: "Frontend Developer & UI Designer",
      company: "Hyperion Digital",
      period: "2021 — 2023",
      location: "Bengaluru, India",
      type: "work",
      description:
        "Designed and engineered responsive web flagships, interactive landing pages, and web applications for tech startups.",
      bullets: [
        "Implemented real-time data visualizers and dashboards using React and D3.",
        "Refactored legacy codebases to TypeScript and modern CSS utility standards.",
        "Collaborated directly with founders to translate brand values into kinetic interfaces.",
      ],
      skills: ["React", "TypeScript", "Figma", "Framer Motion", "REST APIs"],
    },
    {
      id: "exp-3",
      role: "Junior Web Developer",
      company: "PixelCraft Interactive",
      period: "2019 — 2021",
      location: "Bengaluru, India",
      type: "work",
      description:
        "Built responsive client websites, maintained CMS integrations, and optimized web performance across varied device viewports.",
      bullets: [
        "Delivered over 18 client websites with 95+ mobile Lighthouse ratings.",
        "Automated deployment pipelines and image optimization routines.",
      ],
      skills: ["JavaScript", "HTML5", "CSS3", "Git", "Responsive Design"],
    },
    {
      id: "edu-1",
      role: "B.Tech in Computer Science & Engineering",
      company: "National Institute of Technology",
      period: "2015 — 2019",
      location: "India",
      type: "education",
      description:
        "Graduated with First Class Distinction. Focused on Algorithms, Web Engineering, Database Management Systems, and Human-Computer Interaction.",
      bullets: [
        "Led the University Web Development & Design Society.",
        "Conducted workshops on modern JavaScript and UI principles.",
      ],
      skills: ["Algorithms", "Data Structures", "HCI", "Software Architecture"],
    },
    {
      id: "edu-2",
      role: "Certification in Advanced Interaction Design & Web Performance",
      company: "Design Systems Academy",
      period: "2020",
      location: "Online / Global",
      type: "education",
      description:
        "Comprehensive specialization in WCAG 2.1 AA accessibility, multi-brand token workflows, and sub-100ms interaction latency.",
      bullets: [
        "Mastered headless accessible component design with Radix and ARIA.",
        "Completed capstone project on micro-interaction choreographies.",
      ],
      skills: ["WCAG AA", "Design Tokens", "Accessibility", "Animation Physics"],
    },
  ],
  services: [
    {
      id: "srv-1",
      number: "01",
      title: "Web Development",
      description:
        "End-to-end development of modern web applications using Next.js App Router, TypeScript, and high-performance serverless backends.",
      deliverables: ["Full-Stack App Architecture", "API Integration", "Database Design", "Speed Optimization"],
      icon: "Code2",
    },
    {
      id: "srv-2",
      number: "02",
      title: "UI/UX Design",
      description:
        "Transforming complex product logic into clear, aesthetic, and human-friendly user journeys with interactive Figma prototypes.",
      deliverables: ["Wireframes & User Flows", "High-Fidelity Mockups", "Interactive Prototypes", "Design Systems"],
      icon: "Palette",
    },
    {
      id: "srv-3",
      number: "03",
      title: "E-Commerce Flagships",
      description:
        "Custom, high-conversion headless storefronts engineered for fast browsing, effortless checkout, and rich editorial storytelling.",
      deliverables: ["Custom Storefronts", "Stripe & Shopify Integration", "Cart Choreography", "Conversion Tuning"],
      icon: "ShoppingBag",
    },
    {
      id: "srv-4",
      number: "04",
      title: "Optimization & Care",
      description:
        "Ongoing performance auditing, accessibility certification (WCAG AA), SEO enhancements, and modern framework upgrades.",
      deliverables: ["Lighthouse 95+ Audits", "Accessibility Repairs", "Core Web Vitals", "Security & Upgrades"],
      icon: "Gauge",
    },
  ],
  process: [
    {
      number: "01",
      step: "01",
      title: "Discover & Define",
      duration: "Week 1",
      timeline: "Week 1",
      summary:
        "We start by understanding your goals, your audience and your constraints, so the project has a sharp, shared blueprint.",
      description:
        "We start by understanding your goals, your audience and your constraints, so the project has a sharp, shared blueprint.",
      points: [
        "Stakeholder and goals workshop",
        "Audience and competitor research",
        "Scope, sitemap and technical plan",
      ],
      deliverables: ["Project brief", "Sitemap", "Tech plan"],
      icon: "search",
    },
    {
      number: "02",
      step: "02",
      title: "Design & Prototype",
      duration: "Weeks 2–3",
      timeline: "Weeks 2–3",
      summary:
        "Layouts, typography and colour come together in interactive prototypes you can click through before any code is written.",
      description:
        "Layouts, typography and colour come together in interactive prototypes you can click through before any code is written.",
      points: [
        "Moodboard and visual direction",
        "High-fidelity Figma screens",
        "Clickable prototype and feedback rounds",
      ],
      deliverables: ["Style guide", "Figma screens", "Prototype link"],
      icon: "pen-tool",
    },
    {
      number: "03",
      step: "03",
      title: "Develop & Build",
      duration: "Weeks 4–6",
      timeline: "Weeks 4–6",
      summary:
        "Approved designs become fast, accessible, well-structured code with smooth, purposeful motion.",
      description:
        "Approved designs become fast, accessible, well-structured code with smooth, purposeful motion.",
      points: [
        "Component-based Next.js and TypeScript build",
        "Responsive, accessible and animated UI",
        "Weekly staging previews",
      ],
      deliverables: ["Staging site", "Clean codebase", "CMS or content setup"],
      icon: "code-2",
    },
    {
      number: "04",
      step: "04",
      title: "Launch & Support",
      duration: "Week 7",
      timeline: "Week 7",
      summary:
        "Rigorous testing, performance and SEO tuning, then a smooth launch with support afterwards.",
      description:
        "Rigorous testing, performance and SEO tuning, then a smooth launch with support afterwards.",
      points: [
        "Cross-browser and device testing",
        "Lighthouse, SEO and accessibility audit",
        "Deployment, handover and support",
      ],
      deliverables: ["Live website", "Audit report", "Handover docs"],
      icon: "rocket",
    },
  ],
  processSteps: [
    {
      number: "01",
      step: "01",
      title: "Discover & Define",
      duration: "Week 1",
      timeline: "Week 1",
      summary:
        "We start by understanding your goals, your audience and your constraints, so the project has a sharp, shared blueprint.",
      description:
        "We start by understanding your goals, your audience and your constraints, so the project has a sharp, shared blueprint.",
      points: [
        "Stakeholder and goals workshop",
        "Audience and competitor research",
        "Scope, sitemap and technical plan",
      ],
      deliverables: ["Project brief", "Sitemap", "Tech plan"],
      icon: "search",
    },
    {
      number: "02",
      step: "02",
      title: "Design & Prototype",
      duration: "Weeks 2–3",
      timeline: "Weeks 2–3",
      summary:
        "Layouts, typography and colour come together in interactive prototypes you can click through before any code is written.",
      description:
        "Layouts, typography and colour come together in interactive prototypes you can click through before any code is written.",
      points: [
        "Moodboard and visual direction",
        "High-fidelity Figma screens",
        "Clickable prototype and feedback rounds",
      ],
      deliverables: ["Style guide", "Figma screens", "Prototype link"],
      icon: "pen-tool",
    },
    {
      number: "03",
      step: "03",
      title: "Develop & Build",
      duration: "Weeks 4–6",
      timeline: "Weeks 4–6",
      summary:
        "Approved designs become fast, accessible, well-structured code with smooth, purposeful motion.",
      description:
        "Approved designs become fast, accessible, well-structured code with smooth, purposeful motion.",
      points: [
        "Component-based Next.js and TypeScript build",
        "Responsive, accessible and animated UI",
        "Weekly staging previews",
      ],
      deliverables: ["Staging site", "Clean codebase", "CMS or content setup"],
      icon: "code-2",
    },
    {
      number: "04",
      step: "04",
      title: "Launch & Support",
      duration: "Week 7",
      timeline: "Week 7",
      summary:
        "Rigorous testing, performance and SEO tuning, then a smooth launch with support afterwards.",
      description:
        "Rigorous testing, performance and SEO tuning, then a smooth launch with support afterwards.",
      points: [
        "Cross-browser and device testing",
        "Lighthouse, SEO and accessibility audit",
        "Deployment, handover and support",
      ],
      deliverables: ["Live website", "Audit report", "Handover docs"],
      icon: "rocket",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Kshitiz is that rare creative engineer who doesn't just write immaculate code, but genuinely elevates the aesthetic soul of the product. Our users constantly compliment how fast and tactile the interface feels.",
      name: "Marcus Vance",
      role: "VP of Product",
      company: "Lumen Technologies",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "t2",
      quote:
        "Working with Kshitiz was effortless. He took our rough concept sketches and delivered a high-conversion e-commerce flagship that boosted our sales by nearly 40% in two months.",
      name: "Hélène Rostova",
      role: "Founder & Creative Director",
      company: "Bloom Botanics",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "t3",
      quote:
        "His attention to detail in kinetic animations and scroll choreography is world-class. Kshitiz delivered ahead of schedule with zero bugs. I wouldn't hesitate to hire him again.",
      name: "Daniel Lindqvist",
      role: "Chief Technology Officer",
      company: "Nomad Labs Inc.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "t4",
      quote:
        "From accessibility to Lighthouse 100 performance scores, Kshitiz builds web apps the right way. An exceptional engineer and a delight to collaborate with.",
      name: "Sophia Chen",
      role: "Lead Systems Architect",
      company: "Vanguard Studio",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  ],
  faqs: [
    {
      question: "What is your typical project timeline?",
      answer:
        "Most comprehensive website builds take between 4 to 8 weeks depending on scope, custom animations, and backend requirements. Smaller landing pages and design systems can be delivered in 2 to 3 weeks.",
    },
    {
      question: "Are you available for freelance projects or full-time roles?",
      answer:
        "I am currently taking on select freelance contracts, creative advisory, and high-impact full-stack development projects for Q1/Q2. I am also open to discussing compelling full-time staff opportunities.",
    },
    {
      question: "How do we handle communication and project updates?",
      answer:
        "I provide transparent async communication via Slack or Discord, weekly video checkpoints, and live preview staging deployments so you can test real progress at every milestone.",
    },
    {
      question: "Can you help optimize or refactor an existing codebase?",
      answer:
        "Yes! I frequently audit existing Next.js and React applications to resolve performance bottlenecks, modernize legacy CSS, implement design systems, and ensure WCAG AA accessibility compliance.",
    },
    {
      question: "What do you need from me before we can start?",
      answer:
        "A brief overview of your product goals, timeline, and any existing design files or wireframes. If you don't have designs ready yet, I can lead the UI/UX design phase from scratch.",
    },
  ],
};

