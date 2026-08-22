/**
 * Navbar.jsx — Sticky top navigation with glassmorphism blur effect.
 * Collapses to a mobile hamburger menu below md breakpoint.
 */
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-950/80 backdrop-blur-xl border-b border-white/[0.05] shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / monogram */}
        <a
          href="#hero"
          className="font-sans text-brand-400 font-bold text-lg tracking-tight hover:text-brand-300 transition-colors"
        >
          <span style={{ fontWeight: 800, letterSpacing: '-0.01em' }}>Gaurav R. Birajdar</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-sm text-slate-400 hover:text-brand-300 transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-brand-500/40 text-brand-400 text-sm font-medium
                     hover:bg-brand-500/10 hover:border-brand-400 transition-all duration-200"
        >
          Hire me
        </a>

        {/* Mobile burger */}
        <button
          id="navbar-menu-btn"
          aria-label="Toggle menu"
          className="md:hidden text-slate-400 hover:text-brand-300 transition-colors p-1"
          onClick={() => setOpen(o => !o)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" style={{ transform: open ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-current transition-all" style={{ transform: open ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-60' : 'max-h-0'}`}
      >
        <ul className="flex flex-col px-6 pb-4 gap-4 bg-surface-900/95 backdrop-blur-xl border-b border-white/[0.05]">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-slate-300 hover:text-brand-300 transition-colors text-sm"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
