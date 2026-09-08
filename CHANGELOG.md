# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows `v<major>.<prompt-iteration>` � every dev prompt increments the minor version.

---

## [v1.4] - 2026-09-08

### Added

#### `.github/workflows/deploy.yml` — GitHub Actions CI/CD [NEW]
- Workflow triggers on every push to `main` branch.
- **Build job**: Checks out repo → sets up Node 20 with `npm` cache → runs `npm ci` → runs `npm run build` (Vite outputs to `docs/`) → uploads `docs/` as a Pages artifact.
- **Deploy job**: Receives the artifact from the build job and deploys to GitHub Pages via `actions/deploy-pages@v4`.
- Permissions scoped to minimum required: `pages: write`, `id-token: write`.
- Concurrency group `pages` with `cancel-in-progress: true` — only one live deployment at a time.
- Result: **pushing to `main` now automatically updates the live site** at `https://Gaurav-R-Birajdar.github.io/Portfolio` with no manual `npm run deploy` step needed.

### Changed

#### `package.json` — Deploy Script
- `"deploy": "gh-pages -d dist"` → `"deploy": "gh-pages -d docs"` — aligns the manual deploy fallback with the actual Vite `outDir`.

### Removed

#### `dist/` — Stale Build Output Directory
- Deleted the `dist/` folder; it was a leftover from before `vite.config.js` set `outDir: 'docs'`.
- All production builds now output exclusively to `docs/`.

### Milestone
- **Push to `main` = live site update.** GitHub Actions handles build + deploy automatically.

---

## [v1.3] - 2026-09-04

### Changed

#### `src/components/SlideProjects.jsx` — Project Grid (Slide 3)
- **Replaced** `personal-ai-workspace` card with `traceflow-proxy` in the bottom-right grid slot.
  - Removed: *Personal AI Workspace* (generic Ollama/Prompt Engineering entry — low signal for technical evaluators)
  - Added: **TraceFlow Proxy** — subtitle `ZERO-CLOUD OBSERVABILITY`, description highlights deterministic Pydantic schema enforcement, hallucination drift detection, and async SQLite WAL writes for sub-millisecond latency. Tags: `Python · FastAPI · SQLite WAL · Pydantic`. Link: `github.com/Gaurav-R-Birajdar/TraceFlow-Prox`.
- **Removed** the dashed TraceFlow coming-soon placeholder strip — no longer needed since the real card fills the slot.
- Grid is now a clean 2×2: AsyncFlow Engine · Vyngo Voice Search · Federated Learning · TraceFlow Proxy.

---

## [v1.2] - 2026-09-04 🔧 Hotfix

### Fixed

#### `src/components/Carousel.jsx` — Scroll Container Architecture
- **Root cause**: Custom `.snap-container` CSS class lacked `overflow-x: scroll`, so slides were rendered as a standard flex row with no horizontal scroll axis. Compound issue: outer `div.overflow-hidden` would have suppressed scrolling even if the inner rule existed.
- **Fix**: Removed the `overflow-hidden` outer wrapper entirely. The scroll container is now the **root element** of the component using Tailwind-native classes: `flex overflow-x-auto snap-x snap-mandatory h-screen w-full hide-scrollbar`. No intermediate wrapper.
- Each slide now uses `min-w-full flex-shrink-0 snap-center h-screen overflow-y-auto` — forcing exactly 100vw width per snap point.
- Navigation overlay (chevrons, dots, counter/label) rendered via `<>...</>` React Fragment as siblings of the scroll container; `position: fixed` keeps them viewport-relative regardless of scroll offset.

#### `src/index.css` — CSS Cleanup
- Removed `overflow: hidden` from `html, body` — no longer needed since the carousel is the root scroller (not a nested element inside an `overflow-hidden` shell).
- Added `.hide-scrollbar` utility: `scrollbar-width: none` (Firefox), `-ms-overflow-style: none` (IE/Edge), `::-webkit-scrollbar { display: none }` (Chrome/Safari).
- `.snap-container` CSS class retained (stripped to `scroll-snap-type + -webkit-overflow-scrolling`) for reference; `overflow-x` now driven by Tailwind directly.

---

## [v1.1] - 2026-09-04 🎠

### Added

#### `src/components/Carousel.jsx` — Horizontal Carousel Shell [NEW]
- Full-viewport scroll-snap carousel (`scroll-snap-type: x mandatory`) with 3 slide slots.
- State: `activeSlide` (0–2) synced bidirectionally via `onScroll` handler (Math.round rounding).
- **Left / right chevron buttons** — glassmorphism style, hidden at boundary slides via `opacity-0 pointer-events-none`.
- **Dot indicator nav** — active dot expands width (`w-5`) with brand glow (`box-shadow: 0 0 8px rgba(30,173,160,0.6)`); all dots clickable.
- **Slide counter** (bottom-left): `01 / 03` format; **slide label** (bottom-right): `Hero / Profile / Projects`.
- **Keyboard navigation**: `ArrowLeft` / `ArrowRight` key listeners via `useEffect`; debounced with `isScrollingRef` to prevent rapid-fire during animation.
- `scrollToSlide` uses `element.scrollTo({ left: idx * clientWidth, behavior: 'smooth' })`.

#### `src/components/SlideProfile.jsx` — Slide 2: Engineer Profile [NEW]
- **Left column**: Python REPL terminal bio (`engineer_profile.py`) — condensed from `About.jsx`.
- **Right column**: Compact 3-category tech stack grid (Applied AI · Backend · Frontend & Tooling) in a glassmorphism panel — condensed from `Skills.jsx`.
- Stat pills (M.Tech / IEEE / Local LLM) retained from `About.jsx`.
- `IntersectionObserver` removed; replaced with CSS mount animations (`animate-fade-in` + staggered `animation-delay`).

#### `src/components/SlideProjects.jsx` — Slide 3: Proof of Work [NEW]
- 2×2 project card grid (compact `ProjectCard` variant, `p-5` instead of `p-7`, `text-xs` descriptions).
- **AsyncFlow Engine** — `phase` badge added: `"Phase 3 · DLQ Replay ✓"` in emerald, description updated with 3-phase architecture (Redis Queue → Pydantic schema enforcement → DLQ Replay).
- **TraceFlow Proxy** coming-soon slot: dashed-border placeholder strip at bottom of grid.
- Footer credit strip embedded at slide bottom (`<GRB /> · © 2026 · sys.exit(0)`).

### Changed

#### `src/components/Hero.jsx` — Slide 1: Hero & Conversion
- **Removed** `ROLES` array, `useTypewriter` hook, and rotating typewriter `<p>` entirely.
- **Replaced** with locked LinkedIn 100-day experiment headline: `"Backend & AI Engineer"` + sub-line `"Python · FastAPI · Redis · Local LLMs"`.
- **Moved** entire "Initiate Connection" block (previously in `Contact.jsx`) to center of Slide 1 — `AvailabilityBadge` + 3 contact buttons (`LinkedIn`, `GitHub`, `Secure Contact Form`) visible on first load.
- Scroll-down indicator replaced with subtle right-pointing chevron hint.
- `terminal` `system_status.sh` block updated: `skills --top` now reads `Python · FastAPI · Redis · Local LLMs`.

#### `src/App.jsx` — Root Application Shell
- Removed all section imports (`Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Contact`, `Footer`).
- Renders a single `<Carousel />` component; Carousel owns all slide composition.

#### `src/index.css` — Global Styles
- `html, body { overflow: hidden; height: 100%; }` — prevents document-level scroll bleed.
- `scroll-behavior: auto` on `html` — prevents global smooth-scroll from interfering with carousel `scrollTo`.
- Added `.snap-container` — `scroll-snap-type: x mandatory`, scrollbar hidden (all 3 browser vendors).
- Added `.snap-slide` — `scroll-snap-align: start; flex-shrink: 0`.
- Added `.carousel-nav-btn` — glassmorphism fixed-position chevron button with brand hover glow.
- Added `.carousel-dot` and `.carousel-dot-active` — expanding pill with `box-shadow` brand glow on active.

### Fixed

#### `src/components/SlideProfile.jsx` — Stack Data
- Removed `{ name: 'HPC / Cluster Environments' }` from `Frontend & Tooling` category per public dev log operating rules.
- Replaced with `{ name: 'Docker' }`.

#### `src/components/SlideProjects.jsx` — Project Descriptions
- **Federated Learning**: Removed `"on an HPC cluster"` reference; rewritten as `"across federated nodes"`.
- **AsyncFlow Engine**: Description now reflects the completed 3-phase architecture (Phase 3 DLQ Replay shipped).

### Removed
- `src/components/Navbar.jsx` — no longer rendered (replaced by inline slide counter + dot navigation).
- `src/components/About.jsx`, `Skills.jsx`, `Contact.jsx` — content absorbed into `SlideProfile.jsx` and `Hero.jsx`; original files retained but not imported.
- `src/components/Footer.jsx` — credit strip now embedded in `SlideProjects.jsx` footer.

### Milestone
- **Portfolio architecture transitioned from vertical SPA (6 sections) to horizontal 3-slide carousel.**
- Build verified: `✓ 33 modules transformed · built in 1.14s` — zero errors or warnings.

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

