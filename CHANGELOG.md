# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows `v<major>.<prompt-iteration>` � every dev prompt increments the minor version.

---

## [v1.0] - 2026-08-18 🚀

### Added

#### `src/components/Footer.jsx` — Site Footer
- Rebuilt from placeholder into the final, production-ready page footer.
- Centered flexbox layout (`flex flex-col items-center justify-center gap-1`).
- **Brand monogram** — `<GRB />` in `text-brand-500 font-mono tracking-widest`; rendered via HTML entities to avoid JSX escaping issues.
- **Copyright line** — `© 2026 Gaurav R. Birajdar. Built with React & Tailwind.` in `text-slate-600 text-sm`.
- **Terminal exit line** — `sys.exit(0)` in `text-brand-700/50 text-xs font-mono`; acts as a subtle, on-brand closing statement.
- Wrapper: `<footer className="w-full border-t border-surface-800 py-8 mt-12">`.

### Milestone

- **Portfolio is now feature-complete** across all six sections: `Hero → About → Skills → Projects → Contact → Footer`.
- All components verified: `✓ built in 1.08s` — zero errors or warnings.

### Changed

#### `package.json` — GitHub Pages Deployment Wiring
- Added `"homepage": "https://Gaurav-R-Birajdar.github.io/Portfolio"` top-level field.
- Bumped `"version"` from `0.1.0` → `1.0.0` to match milestone.
- Added `"predeploy": "npm run build"` — auto-runs Vite production build before every deploy.
- Added `"deploy": "gh-pages -d dist"` — pushes `dist/` output to the `gh-pages` branch.

#### `vite.config.js` — Asset Base Path
- `base` updated from `'/'` → `'/Portfolio/'` so all asset paths resolve correctly under the GitHub Pages sub-path.

---

## [v0.5] - 2026-08-18

### Added

#### `src/components/About.jsx` — System Identity Section
- Rebuilt from placeholder into a production-ready 2-column desktop layout.
- **`AbstractVisual`** sub-component — decorative right-column panel: dual rotating ring borders (`spin` + `spin_reverse` keyframes), two `animate-float` ambient blobs, and a terminal `.terminal` card displaying `whoami`, `cat degree.txt`, `cat focus.txt` with a blinking cursor.
- **Left column** — `h2` heading (`System.out.println("Who am I?");`), two bio paragraphs (M.Tech identity, deterministic GenAI focus, Federated Learning research → production engineering bridge), and three quick-stat pills: `M.Tech`, `IEEE Published Researcher`, `Local LLM · Ollama`.
- **`IntersectionObserver`** — staggered `section-enter → visible` fade-in on text column and visual column (`transitionDelay` offset `0s` / `0.15s`).
- Section wrapper: `<section id="about" className="min-h-screen py-20 flex items-center border-t border-surface-800">`.

#### `src/components/Skills.jsx` — Tech Stack Section
- Rebuilt from placeholder with full data-driven card architecture.
- **`SKILL_GROUPS` data array** — JSDoc-typed; three entries: `Applied AI & ML` (Llama 3.1, Ollama, STT/TTS, Federated Learning, Differential Privacy, Pydantic), `Backend & Architecture` (Python, FastAPI, SQLite, Deterministic Data Flow, Docker, REST API Design), `Frontend & Tooling` (React, Tailwind CSS, Vite, Git, Linux, HPC Environments).
- **`CategoryIcon`** — three inline SVG variants: `brain`, `server`, `layers`.
- **`SkillCard`** — `article` using `.skill-card.glass-card` with ambient corner glow blob on `group-hover`, gradient horizontal divider, and skill list items with `.text-glow` and `▸` decorators.
- **`IntersectionObserver`** — staggered fade-in per card at `threshold: 0.1`.
- 3-column responsive grid: `grid-cols-1 md:grid-cols-3 gap-6`.
- Section comment footer: `// tools I deploy in production`.

#### `src/index.css` — `.skill-card` Design Token
- Added `.skill-card` / `.skill-card:hover` rules mirroring `.project-card` — `translateY(-4px)` lift, `brand-500/30` border glow, multi-layer `box-shadow`.

### Changed

#### `src/components/Contact.jsx` — CTA Relabel
- Form button label updated: `'Send a Message'` → `'Secure Contact Form'`.
- Swapped `FormIcon` to a shield-check SVG to visually reinforce the secure/private framing.
- File rewritten as clean UTF-8 to fix encoding artefact from v0.4 PowerShell write.

---

## [v0.4] - 2026-08-18

### Added

#### `src/components/Contact.jsx` — Privacy-First Contact Section
- Rebuilt from placeholder into a fully-featured, production-ready section.
- **`AvailabilityBadge`** — pill badge with `animate-ping` pulsing emerald dot and "available · open to roles" label.
- **`LinkedInIcon`, `GitHubIcon`, `FormIcon`** — inline SVG icon components for each social link button.
- **`LINKS` config array** — typed link objects (id, label, href, icon, className) for LinkedIn, GitHub, and Google Forms; all open `target="_blank" rel="noopener noreferrer"`.
- **Glass card** — `.glass-card max-w-md` with ambient radial-glow blob (`bg-brand-500/10 blur-3xl`), availability badge, tagline paragraph with inline `text-brand-300 font-mono` key-term highlights, flex-wrapped button row, and a mono footer disclaimer (`// no data collected`).
- **Button styles** — three distinct variants: brand-filled (LinkedIn), ghost/outline (GitHub), accent-outlined (Google Form).
- **`IntersectionObserver` scroll-trigger** — `section-enter → visible` fade-in on the card at `threshold: 0.15`.
- Section wrapper: `<section id="contact" className="min-h-screen py-20 flex flex-col items-center justify-center border-t border-surface-800">`.

### Fixed

#### `src/components/Projects.jsx` — External Link Hardening
- **Vyngo Voice Search** `href` updated from `'#'` → `'https://github.com/Gaurav-R-Birajdar/Vyngo-Voice-Based-Vehicle'`.
- **Federated Learning Privacy Allocation** `href` updated from `'#'` → `'https://ieeexplore.ieee.org/abstract/document/11330959'`.
- Removed conditional `target`/`rel` logic (`link.href !== '#'`); all anchor tags now unconditionally carry `target="_blank" rel="noopener noreferrer"` — eliminates SPA scroll-state reset risk.

---

## [v0.3] - 2026-08-18

### Added

#### `src/components/Projects.jsx` — Featured Architecture section
- Rebuilt component from placeholder into a fully-featured, production-ready section.
- **`PROJECTS` data array** — typed via JSDoc `@typedef`, holds two project entries:
  - *Vyngo Voice Search* (Deterministic GenAI) — Python, Llama 3.1, Ollama, SQLite, STT/TTS, Pydantic; GitHub Repository link.
  - *Federated Learning Privacy Allocation* (Distributed Systems Research) — Python, Federated Learning, Distributed Systems, Differential Privacy; Research Paper link.
- **`LinkIcon` component** — renders a GitHub SVG mark or a Document SVG icon depending on `type` prop.
- **`ProjectCard` component** — glassmorphism `article` element using the global `.glass-card` utility:
  - Hover lift via `.project-card` CSS rule (`-translate-y-1.5` + enhanced `box-shadow` border glow).
  - Ambient corner radial-glow blob revealed on `group-hover` (`opacity-0 -> opacity-100`).
  - Subtitle badge in `font-mono` small-caps, `<h3>` title, description paragraph.
  - Tech stack pills: `.text-glow` + `bg-brand-950/60 border border-brand-800/60` rounded-full tags with hover color shift.
  - Link buttons: monospace, branded border, hover shadow glow, `active:scale-95` press feedback.
- **`Projects` section** — `<section id="projects" className="min-h-screen py-20">` wrapper:
  - `<h2 className="text-4xl font-mono text-brand-400 mb-12">Featured Architecture</h2>` heading.
  - Responsive CSS Grid: `grid-cols-1 md:grid-cols-2 gap-8`.
  - `IntersectionObserver` scroll-trigger: staggered `.section-enter -> .visible` fade-in per card.

---
## [v0.1] � 2026-08-17

### Project Bootstrap

**Stack initialised**
- Scaffolded project with **Vite + React 19** (`npm create vite@latest`)
- Installed **Tailwind CSS v3** with PostCSS + Autoprefixer pipeline
- Configured `vite.config.js` with `@vitejs/plugin-react`
- Added ESLint (`@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)

### Design System (`tailwind.config.js` + `src/index.css`)

- Defined a custom **brand** colour ramp (teal-cyan, 50�950) centred on `#1eada0` as the primary accent
- Defined a **surface** colour ramp (near-black, 600�950) for the dark background hierarchy
- Extended font families: `Inter` (sans) and `JetBrains Mono` (mono) via Google Fonts
- Registered five custom **keyframe animations**: `fadeIn`, `slideUp`, `blink`, `gradientX`, `float`
- Added global utility classes in `@layer components`:
  - `.glass-card` � glassmorphism card with `backdrop-blur` + subtle inner border glow
  - `.terminal` � dark terminal-style code block with brand-tinted border shadow
  - `.text-glow` � teal text-shadow glow
  - `.gradient-text` � animated gradient clip-text (brand-400 ? brand-300 ? teal-200)
  - `.section-enter` / `.section-enter.visible` � scroll-triggered fade-in utility
- Global body background: dual radial-gradient teal ambient fog, `background-attachment: fixed`
- Custom scrollbar styling (6px width, brand-700 thumb)

### Components

#### `src/components/Navbar.jsx`
- Sticky top navigation with **glassmorphism blur** on scroll (`bg-surface-950/80 backdrop-blur-xl`)
- Logo rendered as a monogram `<GRB />` in font-mono with slate bracket decoration
- Desktop: horizontal link list with animated underline hover (width transition 0 ? 100%)
- Desktop: "Hire me" CTA button with brand border + hover fill
- Mobile: **hamburger menu** with CSS-only 3-bar ? X morphing animation
- Mobile: collapsible drawer with `max-h` transition for smooth open/close

#### `src/components/Hero.jsx`
- Full-viewport (`min-h-screen`) centred landing section
- **`useTypewriter` hook** � custom hook cycling through role strings with per-character typing / deleting / pause phases (configurable speeds)
- Roles cycled: `AI Engineer`, `ML Practitioner`, `Full-Stack Developer`, `LLM Systems Builder`, `Data Scientist`
- **`GridDots`** sub-component � radial-gradient dot grid background (`opacity-[0.03]`)
- Two ambient blob glows with `animate-float` and staggered `animationDelay`
- "Open to opportunities" availability badge � pill with pulsing dot
- `<h1>` name heading with gradient + glow on "Birajdar"
- Typewriter role display with blinking cursor
- Tagline paragraph with inline key-term highlights
- Two CTA buttons: **View My Work** (solid brand fill) and **Get in Touch** (ghost border), both with `-translate-y-0.5` lift on hover
- **Terminal status block** � `.terminal` styled `<pre>` block showing `whoami`, `skills --top`, `status` output
- Animated scroll indicator arrow (`animate-bounce`) at viewport bottom

### App Shell (`src/App.jsx`)

- Root component imports and composes all page sections in order:
  `Navbar ? Hero ? About ? Skills ? Projects ? Contact ? Footer`
- Note: `About`, `Skills`, `Projects`, `Contact`, `Footer` components are **declared but not yet created** (pending next prompts)

### Entry Point (`src/main.jsx`)

- Standard React 19 `createRoot` mount
- Imports `index.css` for global styles

---

> **Next up (v0.2+):** Build out `About`, `Skills`, `Projects`, `Contact`, and `Footer` sections.

