# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows `v<major>.<prompt-iteration>` — every dev prompt increments the minor version.

---

## [v0.1] — 2026-08-17

### Project Bootstrap

**Stack initialised**
- Scaffolded project with **Vite + React 19** (`npm create vite@latest`)
- Installed **Tailwind CSS v3** with PostCSS + Autoprefixer pipeline
- Configured `vite.config.js` with `@vitejs/plugin-react`
- Added ESLint (`@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)

### Design System (`tailwind.config.js` + `src/index.css`)

- Defined a custom **brand** colour ramp (teal-cyan, 50–950) centred on `#1eada0` as the primary accent
- Defined a **surface** colour ramp (near-black, 600–950) for the dark background hierarchy
- Extended font families: `Inter` (sans) and `JetBrains Mono` (mono) via Google Fonts
- Registered five custom **keyframe animations**: `fadeIn`, `slideUp`, `blink`, `gradientX`, `float`
- Added global utility classes in `@layer components`:
  - `.glass-card` — glassmorphism card with `backdrop-blur` + subtle inner border glow
  - `.terminal` — dark terminal-style code block with brand-tinted border shadow
  - `.text-glow` — teal text-shadow glow
  - `.gradient-text` — animated gradient clip-text (brand-400 ? brand-300 ? teal-200)
  - `.section-enter` / `.section-enter.visible` — scroll-triggered fade-in utility
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
- **`useTypewriter` hook** — custom hook cycling through role strings with per-character typing / deleting / pause phases (configurable speeds)
- Roles cycled: `AI Engineer`, `ML Practitioner`, `Full-Stack Developer`, `LLM Systems Builder`, `Data Scientist`
- **`GridDots`** sub-component — radial-gradient dot grid background (`opacity-[0.03]`)
- Two ambient blob glows with `animate-float` and staggered `animationDelay`
- "Open to opportunities" availability badge — pill with pulsing dot
- `<h1>` name heading with gradient + glow on "Birajdar"
- Typewriter role display with blinking cursor
- Tagline paragraph with inline key-term highlights
- Two CTA buttons: **View My Work** (solid brand fill) and **Get in Touch** (ghost border), both with `-translate-y-0.5` lift on hover
- **Terminal status block** — `.terminal` styled `<pre>` block showing `whoami`, `skills --top`, `status` output
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
