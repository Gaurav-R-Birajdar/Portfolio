/**
 * SlideConsulting.jsx — Slide 4: Freelance Architecture & Consulting.
 *
 * Premium consulting CTA section. Framed as senior architectural consulting,
 * not entry-level gig work. Services are scoped to high-leverage engagements:
 * local LLM pipeline integration, backend hardening, and agentic HITL design.
 */

// ─── Service Offerings ────────────────────────────────────────────────────────

/**
 * @typedef {{ id: string, title: string, description: string, tags: string[] }} Service
 */

/** @type {Service[]} */
const SERVICES = [
  {
    id: 'local-llm-pipeline',
    title: 'Local LLM Pipeline Integration',
    description:
      'Deploying Ollama/llama3 securely behind FastAPI and Redis/ARQ. Eliminate external API quota exhaustion and latency cliffs with a zero-cloud, private inference stack.',
    tags: ['Ollama', 'FastAPI', 'Redis/ARQ', 'Pydantic'],
  },
  {
    id: 'backend-optimization',
    title: 'Backend Hardening & Optimization',
    description:
      'Eliminating race conditions, reducing network I/O latency, and hardening API security. Async-safe caching, thundering-herd protection, and stateful recovery engineering.',
    tags: ['Python', 'Async', 'SQLite WAL', 'Caddy'],
  },
  {
    id: 'agentic-workflow',
    title: 'Agentic Workflow Design',
    description:
      'Building LangGraph-style checkpointing and Human-in-the-Loop (HITL) approval gates. Stateful SQLite mid-flight resume — production-grade, not prototype.',
    tags: ['LangGraph', 'HITL', 'SQLite', 'FastMCP'],
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────

/** External link arrow icon */
const ExternalLinkIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

/** Bolt / lightning icon for service headers */
const BoltIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

// ─── ServiceCard ──────────────────────────────────────────────────────────────

/**
 * Individual consulting service card.
 * @param {{ service: Service, index: number }} props
 */
const ServiceCard = ({ service, index }) => (
  <article
    id={`consulting-service-${service.id}`}
    className="glass-card group relative flex flex-col gap-3 p-5 overflow-hidden"
    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    aria-labelledby={`service-title-${service.id}`}
  >
    {/* Hover glow */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />

    {/* Header */}
    <header className="flex items-start gap-2">
      <span className="mt-0.5 text-brand-400 flex-shrink-0"><BoltIcon /></span>
      <h3
        id={`service-title-${service.id}`}
        className="text-sm font-semibold text-slate-100 leading-snug"
      >
        {service.title}
      </h3>
    </header>

    {/* Description */}
    <p className="text-xs text-slate-400 leading-relaxed flex-1">
      {service.description}
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {service.tags.map((tag) => (
        <span
          key={tag}
          className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full
                     bg-brand-950/60 border border-brand-800/60 text-brand-300
                     hover:border-brand-500/70 hover:bg-brand-900/50 transition-colors duration-150"
        >
          {tag}
        </span>
      ))}
    </div>
  </article>
)

// ─── SlideConsulting ──────────────────────────────────────────────────────────

/**
 * Slide 4 — Freelance Architecture & Consulting.
 * High-leverage CTA for senior architecture consulting via Fiverr.
 */
export default function SlideConsulting() {
  return (
    <section
      id="consulting"
      className="min-h-screen flex flex-col justify-between px-6 py-14 relative overflow-hidden"
      aria-label="Freelance Consulting"
    >
      {/* Ambient glow blobs */}
      <div aria-hidden className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-500/8 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-1/3 -right-24 w-64 h-64 rounded-full bg-emerald-700/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-8 flex-1">

        {/* Section header */}
        <div className="animate-fade-in">
          <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">// Slide 4 · Consulting</p>
          <h2 className="text-3xl lg:text-4xl font-mono text-brand-400">
            Freelance Architecture
          </h2>
          <p className="text-slate-400 text-sm font-mono mt-2 max-w-2xl leading-relaxed">
            Transitioning from an AI prototype to a production environment requires{' '}
            <span className="text-brand-300">strict data governance</span>,{' '}
            <span className="text-brand-300">asynchronous queuing</span>, and{' '}
            <span className="text-brand-300">rigorous failure-state engineering</span>.
            I offer specialized consulting for teams that cannot afford to guess.
          </p>
        </div>

        {/* Service cards — 3-column on lg */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in"
          style={{ animationDelay: '0.15s' }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* CTA block */}
        <div
          className="glass-card relative overflow-hidden p-7 flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in"
          style={{ animationDelay: '0.35s' }}
          aria-label="Book a consulting engagement"
        >
          {/* Ambient glow inside CTA block */}
          <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-emerald-500/8 blur-3xl" />

          <div className="flex flex-col gap-1.5 relative z-10">
            <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest">// Ready to engage</p>
            <h3 className="text-xl font-mono font-semibold text-slate-100">
              Book a Consulting Engagement
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              High-leverage architecture reviews, pipeline migrations, and async backend hardening.
              Fixed-scope, senior-level execution.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 relative z-10 flex-shrink-0">
            <a
              id="consulting-fiverr-cta"
              href="https://www.fiverr.com/s/YLR8bBz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-sm font-mono font-semibold px-6 py-3 rounded-xl
                         bg-emerald-950/70 border border-emerald-600/60 text-emerald-300
                         hover:bg-emerald-900/60 hover:border-emerald-400/80 hover:text-emerald-200
                         hover:shadow-[0_0_28px_rgba(52,211,153,0.25)] active:scale-95 transition-all duration-200"
              aria-label="Book a consulting engagement via Fiverr"
            >
              <ExternalLinkIcon />
              Engage via Fiverr
            </a>
            <span className="text-[10px] font-mono text-slate-600">
              // response within 24h · scoped engagements
            </span>
          </div>
        </div>

        {/* Metric strip */}
        <div
          className="grid grid-cols-3 gap-4 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
          aria-label="Key engineering metrics"
        >
          {[
            { metric: '12ms', label: 'Task queue isolation latency (StreamerIQ)' },
            { metric: '99%', label: 'API quota reduction via async-safe TTL cache' },
            { metric: '8,000+', label: 'Property-based fuzz tests — zero worker crashes' },
          ].map(({ metric, label }) => (
            <div
              key={metric}
              className="flex flex-col gap-1 p-4 rounded-xl bg-brand-950/40 border border-brand-900/60
                         hover:border-brand-700/60 transition-colors duration-200"
            >
              <span className="text-2xl font-mono font-bold text-brand-300">{metric}</span>
              <span className="text-[10px] font-mono text-slate-500 leading-snug">{label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Footer credit strip */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto pt-4 mt-4 border-t border-surface-800 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-700">
          &lt;<span className="text-brand-800">GRB</span> /&gt;
        </span>
        <span className="text-xs font-mono text-slate-700">
          2026 Gaurav R. Birajdar · Built with React &amp; Tailwind
        </span>
        <span className="text-xs font-mono text-brand-800/60">
          sys.exit(0)
        </span>
      </footer>
    </section>
  )
}
