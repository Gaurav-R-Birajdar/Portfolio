/**
 * Carousel.jsx — Horizontal CSS scroll-snap portfolio carousel.
 *
 * Architecture fix (v1.2):
 *   The scroll container IS the root element. Using Tailwind-native
 *   `snap-x snap-mandatory overflow-x-auto` directly — no intermediate
 *   overflow-hidden wrapper that was blocking all scroll behavior.
 *
 * Each slide uses `min-w-full flex-shrink-0 snap-center h-screen`
 * to force 100vw width and lock into snap points.
 *
 * Navigation overlay (chevrons, dots, counter) is positioned fixed
 * and sits above the scroll layer without interfering with it.
 */
import { useState, useRef, useCallback, useEffect } from 'react'
import Hero             from './Hero'
import SlideProfile     from './SlideProfile'
import SlideProjects    from './SlideProjects'
import SlideConsulting  from './SlideConsulting'

// ─── Slide labels (for counter / dot aria) ───────────────────────────────────
const SLIDE_LABELS = ['Hero', 'Profile', 'Projects', 'Consulting']
const SLIDE_COUNT  = SLIDE_LABELS.length

// ─── Chevron SVG ──────────────────────────────────────────────────────────────
/** @param {{ direction: 'left'|'right' }} props */
const ChevronIcon = ({ direction }) => (
  <svg
    aria-hidden="true"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {direction === 'left'
      ? <polyline points="15 18 9 12 15 6" />
      : <polyline points="9 18 15 12 9 6" />}
  </svg>
)

// ─── Carousel ─────────────────────────────────────────────────────────────────

/**
 * Full-viewport horizontal snap carousel.
 *
 * Key implementation details:
 * - `overflow-x-auto snap-x snap-mandatory` on the scroll container
 *   is what drives snapping — no custom CSS class needed for the scroll itself.
 * - `min-w-full flex-shrink-0 snap-center` on each slide forces 100vw width.
 * - Navigation uses `el.scrollTo({ left: idx * el.clientWidth, behavior:'smooth' })`
 *   rather than re-rendering components, keeping state minimal.
 * - `onScroll` syncs the active index back for dot/counter display.
 * - Keyboard ← → support via window keydown listener.
 */
export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const containerRef  = useRef(null)
  const isScrolling   = useRef(false)

  /** Programmatically scroll to a slide index. */
  const scrollToSlide = useCallback((idx) => {
    const el = containerRef.current
    if (!el) return
    const target = Math.max(0, Math.min(idx, SLIDE_COUNT - 1))
    isScrolling.current = true
    el.scrollTo({ left: target * el.clientWidth, behavior: 'smooth' })
    setActiveSlide(target)
    // Release the scroll lock after the smooth animation (~600 ms)
    setTimeout(() => { isScrolling.current = false }, 650)
  }, [])

  /** Keep activeSlide in sync when the user swipes or snap settles. */
  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    setActiveSlide(Math.round(el.scrollLeft / el.clientWidth))
  }, [])

  /** Arrow-key navigation. */
  useEffect(() => {
    const onKey = (e) => {
      if (isScrolling.current) return
      if (e.key === 'ArrowRight') scrollToSlide(activeSlide + 1)
      if (e.key === 'ArrowLeft')  scrollToSlide(activeSlide - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeSlide, scrollToSlide])

  const atFirst = activeSlide === 0
  const atLast  = activeSlide === SLIDE_COUNT - 1

  return (
    <>
      {/*
       * ── Scroll container ────────────────────────────────────────────────────
       * This IS the snap root. No overflow-hidden wrapper above it —
       * that was the original bug that blocked all scrolling.
       *
       * Tailwind classes:
       *   flex               → row direction so slides sit side-by-side
       *   overflow-x-auto    → enables horizontal scroll
       *   snap-x             → scroll-snap-type: x
       *   snap-mandatory     → snap-type: mandatory (hard lock to snap points)
       *   h-screen w-full    → fills viewport
       *   hide-scrollbar     → CSS utility defined in index.css
       */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory h-screen w-full hide-scrollbar"
        role="region"
        aria-label="Portfolio carousel"
        aria-live="polite"
      >
        {/* ── SLIDE 1: Hero & Conversion ──────────────────────────────────── */}
        <section
          id="slide-hero"
          className="min-w-full flex-shrink-0 snap-center h-screen overflow-y-auto"
          role="group"
          aria-label="Slide: Hero"
        >
          <Hero />
        </section>

        {/* ── SLIDE 2: Engineer Profile (Bio + Stack) ─────────────────────── */}
        <section
          id="slide-profile"
          className="min-w-full flex-shrink-0 snap-center h-screen overflow-y-auto"
          role="group"
          aria-label="Slide: Profile"
        >
          <SlideProfile />
        </section>

        {/* ── SLIDE 3: Proof of Work (Architecture & Projects) ────────────── */}
        <section
          id="slide-projects"
          className="min-w-full flex-shrink-0 snap-center h-screen overflow-y-auto"
          role="group"
          aria-label="Slide: Projects"
        >
          <SlideProjects />
        </section>

        {/* ── SLIDE 4: Freelance Architecture & Consulting ─────────────────── */}
        <section
          id="slide-consulting"
          className="min-w-full flex-shrink-0 snap-center h-screen overflow-y-auto"
          role="group"
          aria-label="Slide: Consulting"
        >
          <SlideConsulting />
        </section>
      </div>

      {/*
       * ── Fixed navigation overlay ─────────────────────────────────────────
       * Rendered as siblings (via Fragment) so they are never inside the
       * scroll container — `position: fixed` keeps them viewport-relative
       * regardless of scroll position.
       */}

      {/* Left chevron */}
      <button
        id="carousel-prev-btn"
        onClick={() => scrollToSlide(activeSlide - 1)}
        disabled={atFirst}
        aria-label="Previous slide"
        className={`carousel-nav-btn left-4 transition-opacity duration-300 ${atFirst ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <ChevronIcon direction="left" />
      </button>

      {/* Right chevron */}
      <button
        id="carousel-next-btn"
        onClick={() => scrollToSlide(activeSlide + 1)}
        disabled={atLast}
        aria-label="Next slide"
        className={`carousel-nav-btn right-4 transition-opacity duration-300 ${atLast ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <ChevronIcon direction="right" />
      </button>

      {/* Dot indicators */}
      <nav
        aria-label="Slide navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50"
      >
        {SLIDE_LABELS.map((label, i) => (
          <button
            key={label}
            id={`carousel-dot-${i}`}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to slide: ${label}`}
            aria-current={activeSlide === i ? 'true' : undefined}
            className={`carousel-dot ${activeSlide === i ? 'carousel-dot-active' : ''}`}
          />
        ))}
      </nav>

      {/* Slide counter — bottom-left */}
      <div
        aria-hidden="true"
        className="fixed bottom-6 left-6 text-xs font-mono text-slate-600 tabular-nums z-50 select-none"
      >
        {String(activeSlide + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(SLIDE_COUNT).padStart(2, '0')}
      </div>

      {/* Slide label — bottom-right */}
      <div
        aria-hidden="true"
        className="fixed bottom-6 right-6 text-xs font-mono text-slate-600 uppercase tracking-widest z-50 select-none"
      >
        {SLIDE_LABELS[activeSlide]}
      </div>
    </>
  )
}
