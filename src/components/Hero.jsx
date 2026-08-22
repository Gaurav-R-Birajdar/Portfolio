/**
 * Hero.jsx — Full-viewport landing section.
 * Features a typewriter role animation, ambient glow background,
 * and a terminal-style "system status" block.
 */
import { useState, useEffect } from 'react'

const ROLES = [
  'AI Engineer',
  'ML Practitioner',
  'Full-Stack Developer',
  'LLM Systems Builder',
  'Data Scientist',
]

/**
 * Typewriter hook — cycles through an array of strings.
 * @param {string[]} words
 * @param {number} typingSpeed   ms per char while typing
 * @param {number} deletingSpeed ms per char while deleting
 * @param {number} pauseTime     ms to pause at full word
 */
function useTypewriter(words, typingSpeed = 80, deletingSpeed = 45, pauseTime = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx,   setWordIdx]   = useState(0)
  const [phase,     setPhase]     = useState('typing') // 'typing' | 'pausing' | 'deleting'

  useEffect(() => {
    const current = words[wordIdx]

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), pauseTime)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setWordIdx(i => (i + 1) % words.length)
        setPhase('typing')
      }
    }
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseTime])

  return displayed
}

/** Animated background grid dots */
function GridDots() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'radial-gradient(circle, #38c7ba 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  )
}

export default function Hero() {
  const role = useTypewriter(ROLES)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Ambient background elements */}
      <GridDots />
      <div aria-hidden className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-float" />
      <div aria-hidden className="absolute bottom-1/4 -right-32 w-80 h-80 bg-brand-700/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-mono mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          Open to opportunities
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 animate-slide-up">
          Gaurav R.{' '}
          <span className="gradient-text text-glow">Birajdar</span>
        </h1>

        {/* Typewriter role */}
        <div className="h-10 flex items-center justify-center mb-6">
          <p className="text-2xl sm:text-3xl font-mono font-medium text-brand-300">
            {role}
            <span className="animate-blink text-brand-400 ml-0.5">|</span>
          </p>
        </div>

        {/* Tagline */}
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Building intelligent systems at the intersection of{' '}
          <span className="text-slate-200 font-medium">machine learning</span>,{' '}
          <span className="text-slate-200 font-medium">LLMs</span>, and{' '}
          <span className="text-slate-200 font-medium">scalable backend engineering</span>.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <a
            id="hero-view-work-btn"
            href="#projects"
            className="px-6 py-3 rounded-xl bg-brand-500 text-surface-950 font-semibold text-sm
                       hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-200 hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            id="hero-contact-btn"
            href="#contact"
            className="px-6 py-3 rounded-xl border border-white/10 text-slate-200 text-sm font-medium
                       hover:bg-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>

        {/* Terminal status block */}
        <div className="terminal p-4 text-left max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-2 text-slate-500 text-xs">system_status.sh</span>
          </div>
          <pre className="text-xs leading-relaxed">
            <span className="text-brand-400">$</span>
            <span className="text-slate-300"> whoami</span>{'\n'}
            <span className="text-slate-400">  → AI Engineer @ Navi Mumbai, India</span>{'\n'}
            <span className="text-brand-400">$</span>
            <span className="text-slate-300"> skills --top</span>{'\n'}
            <span className="text-slate-400">  → PyTorch · LangChain · FastAPI · React</span>{'\n'}
            <span className="text-brand-400">$</span>
            <span className="text-slate-300"> status</span>{'\n'}
            <span className="text-green-400">  ✓ Available for hire</span>
          </pre>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
