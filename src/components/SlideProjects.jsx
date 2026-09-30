/**
 * SlideProjects.jsx — Slide 3: Proof of Work.
 *
 * Renders the engineering artifact grid.
 * AsyncFlow Engine description updated with Phase 3 DLQ Replay.
 * Federated Learning description cleaned of HPC cluster reference
 * per public dev log operating rules.
 *
 * TraceFlow Proxy slot is ready — add as a 5th PROJECTS entry when ready.
 */

// ─── Project Data ─────────────────────────────────────────────────────────────

/**
 * @typedef {{ label: string }} Tag
 * @typedef {{ id: string, title: string, subtitle: string, description: string, phase?: string, tags: Tag[], links: { label: string, href: string, icon: string }[] }} Project
 */

/** @type {Project[]} */
const PROJECTS = [
  {
    id: 'streameriq',
    title: 'StreamerIQ',
    subtitle: 'Production Architecture Case Study',
    phase: 'Open Architecture · Public ADRs',
    description:
      'Zero-cloud streaming analytics backend engineered for fault-tolerance under real-world failure modes. The Problem: local LLM inference blocks web threads, exhausts external API quotas, and crashes on hallucinated JSON. The Architecture: Redis/ARQ task queue (12ms isolation latency), async-safe TTL cache layer (99% quota reduction), and 8,000+ property-based fuzz tests guaranteeing zero worker crashes on malformed JSON. 25/25 stateful recovery tests passing.',
    tags: [
      { label: 'Python' },
      { label: 'FastAPI' },
      { label: 'Redis/ARQ' },
      { label: 'Ollama · llama3.1:8b' },
      { label: 'SQLite WAL' },
      { label: 'Pydantic' },
      { label: 'Property-Based Fuzzing' },
    ],
    links: [
      { label: 'View ADRs on GitHub', href: 'https://github.com/Gaurav-R-Birajdar/StreamerIQ-Architecture', icon: 'github' },
    ],
  },
  {
    id: 'asyncflow-engine',
    title: 'AsyncFlow Engine',
    subtitle: 'Enterprise AI Middleware · Proprietary',
    phase: 'Phase 3 · DLQ Replay ✓',
    description:
      'Local AI middleware pipeline built for enterprise compliance and deterministic execution. Governance Interceptor: FastMCP-style interception layer detecting PII via strict Pydantic schemas, mutating payloads in real-time with strict JSON-RPC custody. HITL: Stateful SQLite checkpointing allows ARQ jobs to pause for human approval and resume exact mid-flight states via FastAPI endpoints.',
    tags: [
      { label: 'Python' },
      { label: 'FastAPI' },
      { label: 'Redis/ARQ' },
      { label: 'Llama 3.1' },
      { label: 'Pydantic' },
      { label: 'SQLite' },
      { label: 'DLQ Replay' },
    ],
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/Gaurav-R-Birajdar/AsyncFlow-Engine', icon: 'github' },
    ],
  },
  {
    id: 'vyngo-voice-search',
    title: 'Vyngo Voice Search',
    subtitle: 'Deterministic GenAI',
    description:
      "Hallucination-proof voice-based vehicle search using a strict 'Filters, not Vibes' architecture. Separates probabilistic LLM reasoning from deterministic SQLite database states — every query schema-validated before hitting the DB. Zero invalid SQL execution on 1,000+ test utterances.",
    tags: [
      { label: 'Python' },
      { label: 'Llama 3.1' },
      { label: 'Ollama' },
      { label: 'SQLite' },
      { label: 'STT/TTS' },
      { label: 'Pydantic' },
    ],
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/Gaurav-R-Birajdar/Vyngo-Voice-Based-Vehicle', icon: 'github' },
    ],
  },
  {
    id: 'federated-learning-privacy',
    title: 'Federated Learning Privacy Allocation',
    subtitle: 'Distributed Systems Research · IEEE Published',
    description:
      'Dynamic differential-privacy budget allocation framework for distributed medical image analysis across federated nodes. Balances model utility with strict privacy constraints. Demonstrates applied formal-methods thinking to guarantee privacy bounds — published IEEE proceedings.',
    tags: [
      { label: 'Python' },
      { label: 'Federated Learning' },
      { label: 'Distributed Systems' },
      { label: 'Differential Privacy' },
    ],
    links: [
      { label: 'IEEE Paper', href: 'https://ieeexplore.ieee.org/abstract/document/11330959', icon: 'paper' },
    ],
  },
]

// ─── Icon Components ──────────────────────────────────────────────────────────

/** @param {{ type: string }} props */
const LinkIcon = ({ type }) => {
  if (type === 'github') {
    return (
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  }
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────

/**
 * Compact project card optimised for the slide grid layout.
 * @param {{ project: Project, index: number }} props
 */
const ProjectCard = ({ project, index }) => (
  <article
    id={`project-card-${project.id}`}
    className="project-card glass-card group relative flex flex-col gap-3 p-5 overflow-hidden"
    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    aria-labelledby={`project-title-${project.id}`}
  >
    {/* Ambient corner glow on hover */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-brand-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />

    {/* Header */}
    <header className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-mono text-brand-500 tracking-widest uppercase flex-1">
          {project.subtitle}
        </span>
        {project.phase && (
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full whitespace-nowrap">
            {project.phase}
          </span>
        )}
      </div>
      <h3
        id={`project-title-${project.id}`}
        className="text-base font-semibold text-slate-100 leading-snug"
      >
        {project.title}
      </h3>
    </header>

    {/* Description */}
    <p className="text-xs text-slate-400 leading-relaxed flex-1">
      {project.description}
    </p>

    {/* Tech Stack Pills */}
    <div className="flex flex-wrap gap-1.5" aria-label="Tech stack">
      {project.tags.map((tag) => (
        <span
          key={tag.label}
          className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full
                     bg-brand-950/60 border border-brand-800/60 text-brand-300
                     hover:border-brand-500/70 hover:bg-brand-900/50 transition-colors duration-150"
        >
          {tag.label}
        </span>
      ))}
    </div>

    {/* Links */}
    <footer className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.05]">
      {project.links.map((link) => (
        <a
          key={link.label}
          id={`project-link-${project.id}-${link.icon}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-400
                     border border-brand-700/50 rounded-lg px-3 py-1.5
                     hover:bg-brand-500/10 hover:border-brand-400
                     hover:text-brand-300 hover:shadow-[0_0_16px_rgba(30,173,160,0.2)]
                     active:scale-95 transition-all duration-200"
          aria-label={`${link.label} for ${project.title}`}
        >
          <LinkIcon type={link.icon} />
          {link.label}
        </a>
      ))}
    </footer>
  </article>
)

// ─── SlideProjects ────────────────────────────────────────────────────────────

/**
 * Slide 3 component — Proof of Work.
 * Displays the engineering artifact grid with a minimal footer credit strip.
 */
export default function SlideProjects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-between px-6 py-14 relative overflow-hidden"
      aria-label="Proof of Work"
    >
      {/* Ambient glow blobs */}
      <div aria-hidden className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-brand-500/8 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-1/3 -left-24 w-64 h-64 rounded-full bg-brand-700/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-6 flex-1">

        {/* Section header */}
        <div className="animate-fade-in">
          <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">// Slide 3 · Proof of Work</p>
          <h2 className="text-3xl lg:text-4xl font-mono text-brand-400">
            Featured Architecture
          </h2>
          <p className="text-slate-500 text-sm font-mono mt-1">// selected systems &amp; research</p>
        </div>

        {/* 2×2 project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>


      </div>

      {/* Footer credit strip */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto pt-4 mt-4 border-t border-surface-800 flex items-center justify-between">
        <span className="text-xs font-mono text-slate-700">
          &lt;<span className="text-brand-800">GRB</span> /&gt;
        </span>
        <span className="text-xs font-mono text-slate-700">
          © 2026 Gaurav R. Birajdar · Built with React &amp; Tailwind
        </span>
        <span className="text-xs font-mono text-brand-800/60">
          sys.exit(0)
        </span>
      </footer>
    </section>
  )
}
