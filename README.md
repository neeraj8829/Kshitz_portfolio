# Kshitiz — Senior Creative Technologist & Full-Stack Developer Portfolio

A modern, high-end personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scrolling. Designed with a warm cream and terracotta editorial aesthetic.

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### 1. Clone & Install Dependencies
```bash
# Navigate to the project directory
cd incarportfolio

# Install packages
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🚀 Deploy to Vercel

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Initial commit of Kshitiz portfolio"
   git push origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set the Framework Preset to **Next.js** (detected automatically).
5. Add any optional environment variables from `.env.example` (such as `RESEND_API_KEY` and `NEXT_PUBLIC_SITE_URL`).
6. Click **Deploy**. Vercel will build and deploy your site on global edge nodes with instant CDN and SSL.

---

## 🖼️ How to Replace Your Photos

All image references are configured in [`src/data/site.ts`](src/data/site.ts) under `siteData.profile`:

### Hero Portrait:
1. Save your photo to the public folder:
   ```
   public/images/kshitiz-portrait.jpg
   ```
2. Open [`src/data/site.ts`](src/data/site.ts) and set:
   ```typescript
   heroImage: "/images/kshitiz-portrait.jpg",
   ```
*(You can also use any remote image URL from Unsplash, Cloudinary, etc.)*

### About Section Photos (Stacked Notch Card Frame):
The About section features a dual-photo composition (main notched portrait + circular inset workspace):
1. **Main About Photo:**
   - Save your photo (4:5 ratio recommended) to:
     ```
     public/images/kshitiz-about.jpg
     ```
   - In [`src/data/site.ts`](src/data/site.ts), configure:
     ```typescript
     aboutImage: "/images/kshitiz-about.jpg",
     ```
2. **Circular Inset Workspace Photo:**
   - Save your workspace / laptop desk photo (1:1 square ratio, 600x600+) to:
     ```
     public/images/kshitiz-workspace.jpg
     ```
   - In [`src/data/site.ts`](src/data/site.ts), configure:
     ```typescript
     aboutInsetImage: "/images/kshitiz-workspace.jpg",
     ```
   *(Both images include automatic vector SVG fallbacks if a remote URL or missing asset occurs).*

### Downloadable CV / Resume:
Replace the placeholder PDF at `public/cv.pdf` with your real resume. The "Download CV" button automatically links to `/cv.pdf`.

---

## ✏️ How to Edit Content in `src/data/site.ts`

**All portfolio content is consolidated into a single file:** [`src/data/site.ts`](src/data/site.ts). You never have to dig into component JSX to update text.

### Configurable Sections in `src/data/site.ts`:
- **`profile`**: Name, titles, hero headline, bio paragraphs, location, email, phone, and social links.
- **`stats`**: Number counters, suffixes, and labels displayed in the hero.
- **`whatIDo`**: Core service pillars under About.
- **`marqueeRow1` & `marqueeRow2`**: Tool and skill tags scrolling in the marquees.
- **`expertiseDomains`**: 4 core capability domains (Frontend, Backend, Design, Tools) containing skill tiles with descriptive context notes and level tags (`Daily`, `Strong`, `Familiar`).
- **`projects`**: Bento grid projects with case study details (problem, solution, metrics, gallery, links).
- **`experience`**: Work and education timeline cards.
- **`services`**: Service cards with key deliverables.
- **`process`**: 4-step workflow (Discover, Design, Develop, Deliver).
- **`testimonials`**: Client recommendations with quotes, roles, and avatars.
- **`faqs`**: Frequently asked questions and answers.

### 🛠️ How to Customize Expertise Domains & Skills

Located in [`src/data/site.ts`](src/data/site.ts) under `siteData.expertiseDomains`:

```typescript
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
    { 
      name: "Next.js & React", 
      note: "App Router, server components, caching", 
      icon: "react", 
      level: "Daily" // "Daily" | "Strong" | "Familiar"
    },
    // ...
  ]
}
```

- **Level Labels**:
  - `Daily`: Highlights production-daily core tools in primary accent color.
  - `Strong`: Represents deep specialized experience in secondary accent color.
  - `Familiar`: Outlines active practical tools in clean transparent border.
- **Toggle View Switcher**:
  - In `siteData.config`, set `showExpertiseViewSwitcher: true` or `false` to toggle the "Explorer \| Bento" pill switch.
  - You can also navigate with `?expertise=explorer` or `?expertise=bento` directly.

---

## 💼 Projects Section ("03 — SELECTED WORK")

The Projects section features 3 dynamic client-ready layout presentations: **Showcase** (sticky card stacking), **Bento** (gapless 12-column layout), and **Index** (typographic list with floating spring preview).

### 1. How to Add a Project
Open [`src/data/site.ts`](src/data/site.ts) and add an entry to the `projects` array:

```typescript
{
  slug: "my-project-slug",
  number: "07",
  title: "My Project",
  tagline: "Short descriptive subtitle",
  description: "Comprehensive 1-2 sentence description of what the project does and its architectural highlights.",
  category: "web", // "web" | "design" | "apps"
  year: "2024",
  role: "Lead Full-Stack Developer",
  duration: "8 Weeks",
  tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  metrics: [
    { value: "<20ms", label: "Latency" },
    { value: "+35%", label: "Conversion" },
    { value: "99.9%", label: "Uptime" },
  ],
  links: {
    live: "https://my-project.kshitiz.dev",
    github: "https://github.com/kshitiz/my-project",
  },
  mockup: "dashboard", // "dashboard" | "store" | "travel" | "fitness" | "portfolio" | "chat"
  tint: "accent", // "accent" | "accent-2" | "surface-2"
  caseStudy: {
    overview: "Detailed project background narrative...",
    role: "Full-Stack Engineer",
    timeline: "8 Weeks",
    client: "Client Name or Company",
    challenge: "Specific problem solved...",
    solution: "Technical implementation details...",
    results: ["Key outcome 1", "Key outcome 2"],
    techStack: ["Next.js", "TypeScript"],
    gallery: [],
  },
}
```

> [!NOTE]
> **Replace Placeholder Metrics with Real Figures:** The default numbers (e.g., `<16ms`, `2.4M`, `+42%`) are high-impact placeholders provided for demonstration. Remember to replace them with your actual measured production outcomes.

### 2. How to Switch a Project to a Real Screenshot
By default, each project uses a dynamic, theme-aware coded screen (`dashboard`, `store`, `travel`, `fitness`, `portfolio`, `chat`) rendered in pure SVG/divs that reacts to your active color theme.

To use actual screenshots instead:
1. Save desktop and mobile screenshots to `public/images/projects/`:
   - `public/images/projects/my-project-desktop.jpg` (aspect ratio 16:10 recommended)
   - `public/images/projects/my-project-mobile.jpg` (aspect ratio 9:18 recommended)
2. In `src/data/site.ts`, specify the paths in your project object:
   ```typescript
   screenshot: "/images/projects/my-project-desktop.jpg",
   mobileScreenshot: "/images/projects/my-project-mobile.jpg",
   ```
*(Includes automatic fallback to the theme-aware coded screen if an image file fails to load).*

### 3. How to Change the Default View
In `siteData.config` inside [`src/data/site.ts`](src/data/site.ts):
```typescript
defaultProjectsView: "showcase", // "showcase" | "bento" | "index"
```

### 4. How to Hide the View Switcher
Once you or your client finalize your favorite layout, set:
```typescript
showProjectsViewSwitcher: false,
```
This hides the switcher controls from the header while locking the site to `defaultProjectsView`. You can also preview views in real time via URL parameters: `?projects=showcase`, `?projects=bento`, or `?projects=index`.

---

## ⚡ Methodology & Process ("06 — METHODOLOGY & PROCESS")

The Process section is built as a **Pinned Semicircular Scroll Experience** on desktop (1024px+) and a clean **Vertical Rail Timeline** on tablet and mobile.

### 1. How to Edit Steps, Durations, and Deliverables
Open [`src/data/site.ts`](src/data/site.ts) under `siteData.processSteps`:

```typescript
{
  number: "01",
  title: "Discover & Define",
  duration: "Week 1",
  summary: "We start by understanding your goals, your audience and your constraints, so the project has a sharp, shared blueprint.",
  points: [
    "Stakeholder and goals workshop",
    "Audience and competitor research",
    "Scope, sitemap and technical plan",
  ],
  deliverables: ["Project brief", "Sitemap", "Tech plan"],
  icon: "search", // "search" | "pen-tool" | "code-2" | "rocket"
}
```

### 2. How the Semicircular Ring Dynamically Adapts
The `<ProcessRing />` component automatically calculates:
- **Node Angles & Positions**: Computed dynamically for any step count $N$ (between 3 and 6) using:
  $$\text{fraction}_i = \frac{i + 0.5}{N}$$
  $$x_i = 540 - 330 \sin(\text{fraction}_i \cdot \pi)$$
  $$y_i = 380 - 330 \cos(\text{fraction}_i \cdot \pi)$$
- **Scroll Thresholds & Knob Scrub**: The traveling knob and progress arc fill from $0$ to $1$ linked directly to GSAP ScrollTrigger scrub and Lenis smooth scroll.
- **Adding or Removing Steps**: You can safely add a 5th or 6th step or reduce to 3 steps in `src/data/site.ts`. The ring, tick marks, nodes, center badge counter (`i / N`), and mobile timeline will recalibrate their geometry and snap points automatically without touching SVG coordinates.

---

## 🎨 Design System & Customization

### Colors
Defined in [`src/app/globals.css`](src/app/globals.css) and mapped in [`tailwind.config.ts`](tailwind.config.ts):

| Token | Hex | Role |
| :--- | :--- | :--- |
| `--bg` | `#F7F1E8` | Warm cream page background |
| `--surface` | `#EFE6D8` | Soft sand cards |
| `--surface-2` | `#E8DCCA` | Deeper sand / hover states |
| `--text` | `#2B2420` | Espresso primary text |
| `--muted` | `#7A6F64` | Taupe secondary text |
| `--accent` | `#D96C4A` | Terracotta primary accent & buttons |
| `--accent-2` | `#8A9A78` | Sage green status & detail accent |

To change colors, update the CSS variables in `src/app/globals.css`.

### Typography System (Clean Modern Sans)
The portfolio uses a clean, modern sans-serif typography system with zero decorative serifs:

- **Headings:** `Plus Jakarta Sans` (`--font-heading`, weights 600, 700, 800)
- **Body & UI:** `Inter` (`--font-body`, weights 400, 500, 600)
- **Fallbacks:** `system-ui, -apple-system, BlinkMacSystemFont, sans-serif`

#### Fluid Type Scale (CSS clamp):
- **Hero H1:** `clamp(2.6rem, 7vw, 6.5rem)`, weight 700, line-height 1.05, letter-spacing -0.03em
- **Section H2:** `clamp(2rem, 4.5vw, 3.75rem)`, weight 700, line-height 1.1, letter-spacing -0.025em
- **H3 (Card Titles):** `clamp(1.25rem, 2vw, 1.75rem)`, weight 600, line-height 1.25, letter-spacing -0.01em
- **Body Large (Intro):** `clamp(1.125rem, 1.5vw, 1.25rem)`, line-height 1.7, max reading width `60–68ch`
- **Body:** `1rem`, line-height 1.7
- **Small / Captions:** `0.875rem`, weight 500
- **Eyebrow Labels:** `0.75rem`, weight 600, uppercase, letter-spacing 0.14em, color `var(--accent)`
- **Buttons / Nav Links:** `0.9375rem`, weight 600
- **Stats Numbers:** `stat-number`, weight 700, `font-variant-numeric: tabular-nums`

#### How to Switch or Hide the Font Switcher:
Open [`src/data/site.ts`](src/data/site.ts) and configure:
```typescript
config: {
  showFontSwitcher: true, // Set to false to hide the font selector in the design panel
  showThemeSwitcher: true, // Set to false to hide the theme selector
  defaultFont: "jakarta", // Options: "jakarta" | "manrope" | "dmsans"
  defaultTheme: "warm-cream",
}
```

The 3 typography systems available to test:
1. `jakarta`: Plus Jakarta Sans + Inter (Default — modern, friendly, structured)
2. `manrope`: Manrope + Inter (Clean, geometric, neutral architectural feel)
3. `dmsans`: DM Sans + DM Sans (Ultra-clean single-family minimal aesthetic)

You can also test directly via URL query parameter:
- `http://localhost:3000/?font=jakarta`
- `http://localhost:3000/?font=manrope`
- `http://localhost:3000/?font=dmsans`
- Visit `http://localhost:3000/themes` for the interactive visual comparison studio.

---

### Colors & 9 Warm Palettes
The portfolio supports 9 refined warm palettes. All color variables are defined in [`src/app/globals.css`](src/app/globals.css):

| Preset | Background | Surface | Accent | Note |
| :--- | :--- | :--- | :--- | :--- |
| **Warm Cream** (Default) | `#F7F1E8` | `#EFE6D8` | `#D96C4A` | Warm editorial beige with terracotta |
| **Desert Sand** | `#F4EFEB` | `#EBE3DC` | `#C76D49` | Sun-drenched sandstone |
| **Sage Botanical** | `#F4F6F2` | `#E6EAE1` | `#4B6E4E` | Calming botanical greens |
| **Terracotta Minimal** | `#F9F3F0` | `#F0E3DC` | `#D25E39` | Rich earthenware warmth |
| **Nordic Linen** | `#F5F4F0` | `#E9E7E0` | `#B86744` | Muted Scandinavian paper |
| **Ochre Clay** | `#FAF5EB` | `#EFE7D5` | `#C88232` | Warm amber earth tones |
| **Olive Grove** | `#F5F5ED` | `#E8E8DC` | `#5F6E45` | Mediterranean olive hues |
| **Soft Canvas** | `#F8F6F2` | `#ECE8E0` | `#C55337` | Raw artist canvas & vermilion |
| **Warm Alabaster** | `#F9F7F5` | `#EFEBE7` | `#D4694E` | Pristine stone & terracotta |

---

## 📬 How to Enable Real Contact Form Emails

The contact form is pre-wired to the API route at [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts). By default, it logs messages to the server console.

To send real emails to your inbox via **Resend**:
1. Sign up at [resend.com](https://resend.com) and generate an API key.
2. In `.env.local`, set:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```
3. Install Resend:
   ```bash
   npm install resend
   ```
4. In [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts), uncomment the Resend integration code block:
   ```typescript
   import { Resend } from "resend";
   const resend = new Resend(process.env.RESEND_API_KEY);
   await resend.emails.send({
     from: "Kshitiz Portfolio <onboarding@resend.dev>",
     to: "hello@kshitiz.dev",
     subject: `New Portfolio Message: ${subject} from ${name}`,
     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
   });
   ```

---

## ➕ How to Add a New Project

In [`src/data/site.ts`](src/data/site.ts), append an item to `siteData.projects`:

```typescript
{
  slug: "your-project-slug",
  title: "Project Name",
  subtitle: "Category / One-liner",
  description: "Short 2-sentence description for the bento card.",
  category: "Web", // "Web" | "Design" | "Apps"
  year: "2024",
  featured: true,
  bentoSize: "medium", // "large" | "medium" | "small"
  tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  metrics: "Key achievement or metric",
  image: "https://images.unsplash.com/...",
  heroImage: "https://images.unsplash.com/...",
  liveUrl: "https://demo.example.com",
  githubUrl: "https://github.com/kshitiz/...",
  caseStudy: {
    overview: "In-depth summary...",
    role: "Lead Engineer",
    timeline: "6 Weeks",
    client: "Client Name",
    challenge: "What made this project complex...",
    solution: "How you built and solved it...",
    results: ["Key metric 1", "Key metric 2"],
    techStack: ["Next.js", "TypeScript", "Tailwind"],
    gallery: [
      "https://images.unsplash.com/...",
    ],
  },
}
```
Next.js will automatically generate the dynamic route at `/projects/your-project-slug` at build time!

---

## 🎨 Theme Switcher System (9 Light Themes)

The portfolio includes an advanced, production-grade Theme Switcher system built for client presentations and live finalization. All 9 themes are strictly **light themes** with warm, tactile palettes and WCAG AA contrast compliance.

### The 9 Curated Light Themes:
1. **Warm Beige & Terracotta** (`warm-beige`, Default): `#F7F1E8` bg, `#D96C4A` accent — warm, premium editorial feel.
2. **Sage & Linen** (`sage-linen`): `#F4F1EA` bg, `#6F8F72` accent — calm, organic sustainability.
3. **Lavender & Cream** (`lavender-cream`): `#FAF7F2` bg, `#8E78C9` accent — creative, editorial design studios.
4. **Blush & Sand** (`blush-sand`): `#FBF4EF` bg, `#C9677A` accent — soft, refined lifestyle aesthetic.
5. **Ice Blue & Slate** (`ice-blue`): `#F6F9FC` bg, `#3B6FE0` accent — clean, tech-forward engineering.
6. **Butter & Ivory** (`butter-ivory`): `#FFFBEF` bg, `#F2B731` accent — playful, sunny agency vibe.
7. **Mint & Porcelain** (`mint-porcelain`): `#F5FAF7` bg, `#2FA37A` accent — fresh, crisp modern apps.
8. **Peach & Oat** (`peach-oat`): `#FAF3EA` bg, `#E8875B` accent — friendly, human consulting.
9. **Greige & Navy** (`greige-navy`): `#F2EFEA` bg, `#1F3A6E` accent — corporate, confident enterprise.

---

### How to Use the Theme Switcher

- **Bottom-Left Floating Button:** Click the pill with 3 color swatches or press `T` on your keyboard to open the Theme Panel.
- **Auto-Cycle Presentation Mode:** Click "Play All" in the panel to cycle through all 9 themes every 4 seconds with a live progress bar. Stop anytime by clicking a card, pausing, or pressing `Esc`.
- **Keyboard Navigation:** Press `Left Arrow` or `Right Arrow` to switch themes when the panel is open or while in presentation mode.
- **Favorites & Finalisation:** Tap the heart icon to save favorite themes, or click "Finalise" to store the client's decision.
- **Dedicated Showcase Page:** Visit `/themes` for a full overview of all 9 themes with larger live previews, complete hex palettes, and 1-click application.

---

### How to Share `?theme=` Links with Clients

You can send direct, deep-linked URLs to clients to open any specific theme instantly:
- `https://kshitiz.dev/?theme=sage-linen`
- `https://kshitiz.dev/?theme=ice-blue`
- `https://kshitiz.dev/?theme=butter-ivory`

Click the **"Copy Link"** button inside the Theme Panel or on any card on `/themes` to copy the exact URL with toast confirmation. An inline anti-flash script in `<head>` ensures the client sees the requested theme before the first paint without layout shift or hydration mismatches.

---

### How to Set the Final Theme as Default

Once the client decides on their favorite theme:
1. Open [`src/data/themes.ts`](src/data/themes.ts).
2. Update `DEFAULT_THEME_ID` to the chosen theme ID (for example, `"sage-linen"`):
   ```typescript
   export const DEFAULT_THEME_ID = "sage-linen";
   ```
3. In [`src/app/globals.css`](src/app/globals.css), ensure the `:root` variables match the chosen theme values, or leave them as tokens since `data-theme` will default to `DEFAULT_THEME_ID`.

---

### How to Hide the Theme Switcher After Client Sign-off

When you are ready to launch and want to hide the floating switcher button, drawer, and `/themes` navigation:

**Option 1: In Code (`src/data/site.ts`)**
Set `showThemeSwitcher: false`:
```typescript
// src/data/site.ts
export const siteData: SiteData = {
  config: {
    showFontSwitcher: false,
    showThemeSwitcher: false, // Disables floating button, drawer, and footer link
    defaultFont: "jakarta",
    defaultTheme: DEFAULT_THEME_ID,
  },
  // ...
};
```

**Option 2: Environment Variable (Without Code Changes)**
Set in your `.env.local` or Vercel dashboard:
```env
NEXT_PUBLIC_SHOW_THEME_SWITCHER=false
```

---

### How to Add or Edit a Theme

1. Open [`src/data/themes.ts`](src/data/themes.ts) and add or edit your theme object in `THEMES`:
   ```typescript
   {
     id: "my-custom-theme",
     name: "Custom Theme Name",
     mood: "tactile, serene",
     category: "warm", // "warm" | "cool" | "neutral"
     bestFor: "specialized portfolios",
     tokens: {
       bg: "#F9F6F0",
       surface: "#EFEBE1",
       surface2: "#E5DFC0",
       text: "#2A2522",
       muted: "#766F6A",
       accent: "#D66B47",
       accentHover: "#C15835",
       accentText: "#D66B47",
       accent2: "#7F9477",
       onAccent: "#FFFFFF",
       border: "rgba(42, 37, 34, 0.12)",
     },
   }
   ```
2. Open [`src/app/globals.css`](src/app/globals.css) and add the matching CSS block:
   ```css
   [data-theme="my-custom-theme"] {
     --bg: #F9F6F0;
     --surface: #EFEBE1;
     --surface-2: #E5DFC0;
     --text: #2A2522;
     --muted: #766F6A;
     --accent: #D66B47;
     --accent-hover: #C15835;
     --accent-text: #D66B47;
     --accent-2: #7F9477;
     --on-accent: #FFFFFF;
     --border: rgba(42, 37, 34, 0.12);
   }
   ```
The new theme will automatically appear in the switcher, presentation auto-cycler, and `/themes` showcase page!

---

## 🔮 3D Skills Animation System

The Skills section features a high-performance 3D interactive showcase offering three distinct spatial perspectives, replacing static marquee tickers with tactile 60fps animations.

### The 3 Interactive 3D Views:
1. **Ring (Default):** A rotating 3D carousel cylinder of glass cards tilted at `-8deg` with realistic depth shading, front/back opacity attenuation (`cos`-weighted), mouse parallax tilt, and momentum drag inertia.
2. **Orbit:** A central "K" monogram core surrounded by 3 concentric elliptical orbits with counter-rotating glass chips at alternating speeds and directions. Hovering lights up the ring in `var(--accent)` and expands the chip with proficiency metrics.
3. **Sphere:** A 3D tag-cloud globe distributed evenly via the **Fibonacci sphere algorithm**. Supports trackball drag inertia in any direction with depth-scaled items and idle auto-rotation.

---

### How to Add or Remove Skills

All skills are configured in [`src/data/site.ts`](src/data/site.ts) under `siteData.skills`. Each skill object contains:
```typescript
{
  id: "graphql",
  name: "REST & GraphQL",
  icon: "graphql", // maps to clean inline SVG in SkillIcons.tsx
  category: "Backend", // "Frontend" | "Backend" | "Design" | "Tools"
  level: 90, // 0 to 100 percentage
  years: 5,
  description: "Type-safe query schemas, RESTful best practices, and caching.",
}
```
To add a new skill, append a new object to `siteData.skills`. To add a custom icon, add a matching case in [`src/components/skills/SkillIcons.tsx`](src/components/skills/SkillIcons.tsx).

---

### How to Change the Default View

In [`src/data/site.ts`](src/data/site.ts), update `defaultSkillsView`:
```typescript
export const siteData: SiteData = {
  config: {
    // ...
    defaultSkillsView: "ring", // "ring" | "orbit" | "sphere"
  },
  // ...
};
```
You can also share direct deep-links that automatically activate a specific view:
- `https://kshitiz.dev/?skills=ring`
- `https://kshitiz.dev/?skills=orbit`
- `https://kshitiz.dev/?skills=sphere`

---

### How to Hide the View Switcher

If you want to lock the section into a single view (e.g., after the client selects "Ring"):
In [`src/data/site.ts`](src/data/site.ts), set:
```typescript
showSkillsViewSwitcher: false,
```
The pill switcher will be hidden, and the site will render the chosen `defaultSkillsView`.

---

### How to Adjust Rotation Speed & Radius

- **Ring Speed & Radius:**
  - Adjust base speed in [`src/components/skills/SkillRing3D.tsx`](src/components/skills/SkillRing3D.tsx) via `baseSpeed: 0.16` (degrees per frame).
  - Adjust cylinder radius in the responsive `updateRadius()` hook (defaults: `420px` desktop, `320px` tablet, `230px` mobile).
- **Orbit Speeds & Radii:**
  - Adjust individual orbit speeds in [`src/components/skills/SkillOrbit3D.tsx`](src/components/skills/SkillOrbit3D.tsx) (defaults: inner `0.28`, mid `-0.18`, outer `0.12`).
  - Adjust elliptical radii in `ringRadii` state.
- **Sphere Speed & Trackball Sensitivity:**
  - In [`src/components/skills/SkillSphere3D.tsx`](src/components/skills/SkillSphere3D.tsx), tweak `velRef.current` defaults and trackball inertia multiplier in `handlePointerMove`.

---

## 🎨 Theme Switcher System (9 Light Themes)

The portfolio includes an advanced, production-grade Theme Switcher system built for client presentations and live finalization. All 9 themes are strictly **light themes** with warm, tactile palettes and WCAG AA contrast compliance.

### The 9 Curated Light Themes:
1. **Warm Beige & Terracotta** (`warm-beige`, Default): `#F7F1E8` bg, `#D96C4A` accent — warm, premium editorial feel.
2. **Sage & Linen** (`sage-linen`): `#F4F1EA` bg, `#6F8F72` accent — calm, organic sustainability.
3. **Lavender & Cream** (`lavender-cream`): `#FAF7F2` bg, `#8E78C9` accent — creative, editorial design studios.
4. **Blush & Sand** (`blush-sand`): `#FBF4EF` bg, `#C9677A` accent — soft, refined lifestyle aesthetic.
5. **Ice Blue & Slate** (`ice-blue`): `#F6F9FC` bg, `#3B6FE0` accent — clean, tech-forward engineering.
6. **Butter & Ivory** (`butter-ivory`): `#FFFBEF` bg, `#F2B731` accent — playful, sunny agency vibe.
7. **Mint & Porcelain** (`mint-porcelain`): `#F5FAF7` bg, `#2FA37A` accent — fresh, crisp modern apps.
8. **Peach & Oat** (`peach-oat`): `#FAF3EA` bg, `#E8875B` accent — friendly, human consulting.
9. **Greige & Navy** (`greige-navy`): `#F2EFEA` bg, `#1F3A6E` accent — corporate, confident enterprise.

---

### How to Use the Theme Switcher

- **Bottom-Left Floating Button:** Click the pill with 3 color swatches or press `T` on your keyboard to open the Theme Panel.
- **Auto-Cycle Presentation Mode:** Click "Play All" in the panel to cycle through all 9 themes every 4 seconds with a live progress bar. Stop anytime by clicking a card, pausing, or pressing `Esc`.
- **Keyboard Navigation:** Press `Left Arrow` or `Right Arrow` to switch themes when the panel is open or while in presentation mode.
- **Favorites & Finalisation:** Tap the heart icon to save favorite themes, or click "Finalise" to store the client's decision.
- **Dedicated Showcase Page:** Visit `/themes` for a full overview of all 9 themes with larger live previews, complete hex palettes, and 1-click application.

---

### How to Share `?theme=` Links with Clients

You can send direct, deep-linked URLs to clients to open any specific theme instantly:
- `https://kshitiz.dev/?theme=sage-linen`
- `https://kshitiz.dev/?theme=ice-blue`
- `https://kshitiz.dev/?theme=butter-ivory`

Click the **"Copy Link"** button inside the Theme Panel or on any card on `/themes` to copy the exact URL with toast confirmation. An inline anti-flash script in `<head>` ensures the client sees the requested theme before the first paint without layout shift or hydration mismatches.

---

### How to Set the Final Theme as Default

Once the client decides on their favorite theme:
1. Open [`src/data/themes.ts`](src/data/themes.ts).
2. Update `DEFAULT_THEME_ID` to the chosen theme ID (for example, `"sage-linen"`):
   ```typescript
   export const DEFAULT_THEME_ID = "sage-linen";
   ```
3. In [`src/app/globals.css`](src/app/globals.css), ensure the `:root` variables match the chosen theme values, or leave them as tokens since `data-theme` will default to `DEFAULT_THEME_ID`.

---

### How to Hide the Theme Switcher After Client Sign-off

When you are ready to launch and want to hide the floating switcher button, drawer, and `/themes` navigation:

**Option 1: In Code (`src/data/site.ts`)**
Set `showThemeSwitcher: false`:
```typescript
// src/data/site.ts
export const siteData: SiteData = {
  config: {
    showFontSwitcher: false,
    showThemeSwitcher: false, // Disables floating button, drawer, and footer link
    defaultFont: "jakarta",
    defaultTheme: DEFAULT_THEME_ID,
  },
  // ...
};
```

**Option 2: Environment Variable (Without Code Changes)**
Set in your `.env.local` or Vercel dashboard:
```env
NEXT_PUBLIC_SHOW_THEME_SWITCHER=false
```

---

### How to Add or Edit a Theme

1. Open [`src/data/themes.ts`](src/data/themes.ts) and add or edit your theme object in `THEMES`:
   ```typescript
   {
     id: "my-custom-theme",
     name: "Custom Theme Name",
     mood: "tactile, serene",
     category: "warm", // "warm" | "cool" | "neutral"
     bestFor: "specialized portfolios",
     tokens: {
       bg: "#F9F6F0",
       surface: "#EFEBE1",
       surface2: "#E5DFC0",
       text: "#2A2522",
       muted: "#766F6A",
       accent: "#D66B47",
       accentHover: "#C15835",
       accentText: "#D66B47",
       accent2: "#7F9477",
       onAccent: "#FFFFFF",
       border: "rgba(42, 37, 34, 0.12)",
     },
   }
   ```
2. Open [`src/app/globals.css`](src/app/globals.css) and add the matching CSS block:
   ```css
   [data-theme="my-custom-theme"] {
     --bg: #F9F6F0;
     --surface: #EFEBE1;
     --surface-2: #E5DFC0;
     --text: #2A2522;
     --muted: #766F6A;
     --accent: #D66B47;
     --accent-hover: #C15835;
     --accent-text: #D66B47;
     --accent-2: #7F9477;
     --on-accent: #FFFFFF;
     --border: rgba(42, 37, 34, 0.12);
   }
   ```
The new theme will automatically appear in the switcher, presentation auto-cycler, and `/themes` showcase page!

---

## 🔮 3D Skills Animation System

The Skills section features a high-performance 3D interactive showcase offering three distinct spatial perspectives, replacing static marquee tickers with tactile 60fps animations.

### The 3 Interactive 3D Views:
1. **Ring (Default):** A rotating 3D carousel cylinder of glass cards tilted at `-8deg` with realistic depth shading, front/back opacity attenuation (`cos`-weighted), mouse parallax tilt, and momentum drag inertia.
2. **Orbit:** A central "K" monogram core surrounded by 3 concentric elliptical orbits with counter-rotating glass chips at alternating speeds and directions. Hovering lights up the ring in `var(--accent)` and expands the chip with proficiency metrics.
3. **Sphere:** A 3D tag-cloud globe distributed evenly via the **Fibonacci sphere algorithm**. Supports trackball drag inertia in any direction with depth-scaled items and idle auto-rotation.

---

### How to Add or Remove Skills

All skills are configured in [`src/data/site.ts`](src/data/site.ts) under `siteData.skills`. Each skill object contains:
```typescript
{
  id: "graphql",
  name: "REST & GraphQL",
  icon: "graphql", // maps to clean inline SVG in SkillIcons.tsx
  category: "Backend", // "Frontend" | "Backend" | "Design" | "Tools"
  level: 90, // 0 to 100 percentage
  years: 5,
  description: "Type-safe query schemas, RESTful best practices, and caching.",
}
```
To add a new skill, append a new object to `siteData.skills`. To add a custom icon, add a matching case in [`src/components/skills/SkillIcons.tsx`](src/components/skills/SkillIcons.tsx).

---

### How to Change the Default View

In [`src/data/site.ts`](src/data/site.ts), update `defaultSkillsView`:
```typescript
export const siteData: SiteData = {
  config: {
    // ...
    defaultSkillsView: "ring", // "ring" | "orbit" | "sphere"
  },
  // ...
};
```
You can also share direct deep-links that automatically activate a specific view:
- `https://kshitiz.dev/?skills=ring`
- `https://kshitiz.dev/?skills=orbit`
- `https://kshitiz.dev/?skills=sphere`

---

### How to Hide the View Switcher

If you want to lock the section into a single view (e.g., after the client selects "Ring"):
In [`src/data/site.ts`](src/data/site.ts), set:
```typescript
showSkillsViewSwitcher: false,
```
The pill switcher will be hidden, and the site will render the chosen `defaultSkillsView`.

---

### How to Adjust Rotation Speed & Radius

- **Ring Speed & Radius:**
  - Adjust base speed in [`src/components/skills/SkillRing3D.tsx`](src/components/skills/SkillRing3D.tsx) via `baseSpeed: 0.16` (degrees per frame).
  - Adjust cylinder radius in the responsive `updateRadius()` hook (defaults: `420px` desktop, `320px` tablet, `230px` mobile).
- **Orbit Speeds & Radii:**
  - Adjust individual orbit speeds in [`src/components/skills/SkillOrbit3D.tsx`](src/components/skills/SkillOrbit3D.tsx) (defaults: inner `0.28`, mid `-0.18`, outer `0.12`).
  - Adjust elliptical radii in `ringRadii` state.
- **Sphere Speed & Trackball Sensitivity:**
  - In [`src/components/skills/SkillSphere3D.tsx`](src/components/skills/SkillSphere3D.tsx), tweak `velRef.current` defaults and trackball inertia multiplier in `handlePointerMove`.

---

## 🛡️ Non-Negotiable Standards Verified

- **Name:** Exclusively **Kshitiz** across all code, metadata, alt text, and markup.
- **Theme:** Exclusively warm light cream & terracotta (no dark mode).
- **Responsive:** Mobile-first, fluid scaling from 360px up to 2560px.
- **Accessibility:** Semantic HTML5, WCAG AA contrast, visible focus rings, and skip-to-content link.
- **Performance:** 100% static page generation with zero warnings and next/image optimization.
# Kshitz_portfolio
