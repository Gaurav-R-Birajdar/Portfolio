/**
 * Hero.jsx — Slide 1: Hero & Conversion.
 *
 * Design intent:
 *   • Locked headline: Backend & AI Architect (architect-level positioning)
 *   • "Initiate Connection" contact module is front-and-center — visible on landing
 *   • Terminal system_status.sh block preserved as identity anchor
 *   • Fiverr consulting CTA added to contact module
 *
 * Headline lock:
 *   Backend & AI Architect | Asynchronous Pipelines | Deterministic LLM Orchestration
 */
import { useState } from 'react'

// ─── Contact Link Data ────────────────────────────────────────────────────────

/** @typedef {{ id: string, label: string, href: string, icon: string }} ContactLink */

/** @type {ContactLink[]} */
const CONTACT_LINKS = [
  {
    id: 'hero-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gaurav-r-birajdar/',
    icon: 'linkedin',
  },
  {
    id: 'hero-github',
    label: 'GitHub',
    href: 'https://github.com/Gaurav-R-Birajdar',
    icon: 'github',
  },
  {
    id: 'hero-fiverr',
    label: 'Hire on Fiverr',
    href: 'https://www.fiverr.com/s/YLR8bBz',
    icon: 'fiverr',
  },
  {
    id: 'hero-contact-form',
    label: 'Secure Contact Form',
    href: 'https://forms.gle/KDPfEN8tS2L5fbvU7',
    icon: 'form',
  },
]

// ─── Icon Components ──────────────────────────────────────────────────────────

/** LinkedIn wordmark icon */
const LinkedInIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/** GitHub mark icon */
const GitHubIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z" />
  </svg>
)

/** Shield-check / form icon */
const FormIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

/** Fiverr wordmark icon (simplified "F" badge) */
const FiverrIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.8 17.6H9.6v-6.4H8V9.6h1.6V8.8c0-1.76.72-2.8 2.8-2.8h1.68v1.6H13c-.8 0-.8.3-.8.88v.12h1.84l-.24 1.6H12.2v6.4z" />
  </svg>
)

/** @param {{ type: string }} props */
const ContactIcon = ({ type }) => {
  if (type === 'linkedin') return <LinkedInIcon />
  if (type === 'github')   return <GitHubIcon />
  if (type === 'fiverr')   return <FiverrIcon />
  return <FormIcon />
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Animated dot-grid background. */
const GridDots = () => (
  <div
    aria-hidden
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: 'radial-gradient(circle, #38c7ba 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }}
  />
)

/** Pulsing availability indicator. */
const AvailabilityBadge = () => (
  <div
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-emerald-400 text-xs font-mono"
    aria-label="Currently available for consulting and new roles"
  >
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
    available &middot; open to consulting & roles
  </div>
)

// ─── Hero (Slide 1) ────────────────────────────────────────────────────────────

/**
 * Slide 1 — Hero & Conversion.
 * Locked headline + contact module is the primary above-the-fold CTA.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero and contact"
    >
      {/* ── Ambient background ─────────────────────────────────────────────── */}
      <GridDots />
      <div aria-hidden className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-float" />
      <div aria-hidden className="absolute bottom-1/4 -right-32 w-80 h-80 bg-brand-700/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-6">

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white animate-slide-up">
          Gaurav R.{' '}
          <span className="gradient-text text-glow">Birajdar</span>
        </h1>

        {/* Locked headline — architect-level positioning */}
        <div className="flex flex-col items-center gap-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-2xl sm:text-3xl font-mono font-semibold text-brand-300 tracking-tight">
            Backend &amp; AI Architect
          </p>
          <p className="text-sm sm:text-base font-mono text-slate-500">
            Async Pipelines &nbsp;·&nbsp; FastAPI &nbsp;·&nbsp; Redis/ARQ &nbsp;·&nbsp; Local LLMs
          </p>
        </div>

        {/* ── Contact Module — Initiate Connection ───────────────────────── */}
        <div
          className="glass-card w-full max-w-md flex flex-col items-center gap-5 p-7 relative overflow-hidden animate-fade-in"
          style={{ animationDelay: '0.35s' }}
          aria-label="Contact information"
        >
          {/* Ambient glow inside card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-brand-500/10 blur-3xl"
          />

          <AvailabilityBadge />

          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-lg font-mono font-semibold text-brand-400">
              Initiate Connection
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Struggling with{' '}
              <span className="text-brand-300 font-mono">brittle LLM wrappers</span>,{' '}
              <span className="text-brand-300 font-mono">API quota exhaustion</span>, or migrating to{' '}
              <span className="text-brand-300 font-mono">deterministic local pipelines</span>? I can help.
            </p>
          </div>

          {/* Contact buttons */}
          <div className="flex flex-wrap justify-center gap-2.5 w-full relative z-10">
            <a
              id="hero-linkedin"
              href="https://www.linkedin.com/in/gaurav-r-birajdar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono font-medium px-4 py-2 rounded-lg
                         bg-brand-500/20 border border-brand-500/60 text-brand-300
                         hover:bg-brand-500/30 hover:border-brand-400 hover:text-brand-200
                         hover:shadow-[0_0_20px_rgba(30,173,160,0.25)] active:scale-95 transition-all duration-200"
              aria-label="Visit LinkedIn profile"
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <a
              id="hero-github"
              href="https://github.com/Gaurav-R-Birajdar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono font-medium px-4 py-2 rounded-lg
                         border border-white/10 text-slate-400
                         hover:border-white/25 hover:text-slate-200 hover:bg-white/5
                         active:scale-95 transition-all duration-200"
              aria-label="Visit GitHub profile"
            >
              <GitHubIcon /> GitHub
            </a>
            <a
              id="hero-fiverr"
              href="https://www.fiverr.com/s/YLR8bBz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono font-medium px-4 py-2 rounded-lg
                         bg-emerald-950/60 border border-emerald-700/50 text-emerald-400
                         hover:bg-emerald-900/40 hover:border-emerald-500/70 hover:text-emerald-300
                         hover:shadow-[0_0_18px_rgba(52,211,153,0.2)] active:scale-95 transition-all duration-200"
              aria-label="Hire on Fiverr for backend/AI consulting"
            >
              <FiverrIcon /> Hire on Fiverr
            </a>
            <a
              id="hero-contact-form"
              href="https://forms.gle/KDPfEN8tS2L5fbvU7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono font-medium px-4 py-2 rounded-lg
                         border border-brand-700/40 text-brand-400
                         hover:bg-brand-900/40 hover:border-brand-500/60 hover:text-brand-300
                         hover:shadow-[0_0_14px_rgba(30,173,160,0.15)] active:scale-95 transition-all duration-200"
              aria-label="Open secure contact form"
            >
              <FormIcon /> Secure Contact Form
            </a>
          </div>

          <p className="text-[10px] text-slate-600 font-mono relative z-10">
            // no data collected &middot; links open externally
          </p>
        </div>

        {/* Terminal system status */}
        <div className="terminal p-4 text-left w-full max-w-sm animate-fade-in" style={{ animationDelay: '0.55s' }}>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-slate-500 text-xs">system_status.sh</span>
          </div>
          <pre className="text-xs leading-relaxed">
            <span className="text-brand-400">$</span>
            <span className="text-slate-300"> whoami</span>{'\n'}
            <span className="text-slate-400">  → Backend &amp; AI Architect @ Navi Mumbai, India</span>{'\n'}
            <span className="text-brand-400">$</span>
            <span className="text-slate-300"> stack --top</span>{'\n'}
            <span className="text-slate-400">  → FastAPI · Redis/ARQ · Ollama · Pydantic</span>{'\n'}
            <span className="text-brand-400">$</span>
            <span className="text-slate-300"> consulting --status</span>{'\n'}
            <span className="text-green-400">  ✓ Open for architecture consulting</span>
          </pre>
        </div>

      </div>

      {/* Right-chevron hint (subtle) */}
      <div
        aria-hidden="true"
        className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-700 animate-pulse"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </section>
  )
}
