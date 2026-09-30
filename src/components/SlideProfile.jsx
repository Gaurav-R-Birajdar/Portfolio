/**
 * SlideProfile.jsx — Slide 2: Engineer Profile.
 *
 * Layout (desktop): 50/50 horizontal split
 *   Left  → Python REPL terminal bio (condensed from About)
 *   Right → Compact 3-category tech stack grid (condensed from Skills)
 *
 * @note HPC / Cluster Environments removed per operating rules.
 *       Replaced with Docker in Frontend & Tooling.
 */

// ─── Stack Data ───────────────────────────────────────────────────────────────

/**
 * @typedef {{ name: string }} StackItem
 * @typedef {{ id: string, category: string, items: StackItem[] }} StackCategory
 */

/** @type {StackCategory[]} */
const STACK = [
  {
    id: 'applied-ai',
    category: 'Applied AI',
    items: [
      { name: 'Llama 3.1 (Ollama)' },
      { name: 'LiteLLM' },
      { name: 'LangGraph paradigms' },
      { name: 'Federated Learning' },
      { name: 'Differential Privacy' },
      { name: 'Pydantic Schemas' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Infra',
    items: [
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Redis + ARQ' },
      { name: 'SQLite WAL' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend & Tooling',
    items: [
      { name: 'React + Vite' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Git' },
      { name: 'Linux' },
      { name: 'Caddy' },
    ],
  },
]

// ─── Stack Column ─────────────────────────────────────────────────────────────

/**
 * Single stack category column.
 * @param {{ category: StackCategory, index: number }} props
 */
const StackColumn = ({ category, index }) => (
  <div
    className="flex flex-col gap-2"
    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
  >
    <h3 className="text-xs font-mono font-semibold text-brand-400 uppercase tracking-widest mb-1 border-b border-brand-900/60 pb-1">
      {category.category}
    </h3>
    <ul className="flex flex-col gap-1.5" aria-label={`${category.category} skills`}>
      {category.items.map((item) => (
        <li
          key={item.name}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-brand-300 transition-colors duration-150"
        >
          <span aria-hidden="true" className="text-brand-700 text-[10px]">▸</span>
          {item.name}
        </li>
      ))}
    </ul>
  </div>
)

// ─── Stat Pills ───────────────────────────────────────────────────────────────

const STATS = [
  { label: 'M.Tech', sub: 'Computer Engineering' },
  { label: 'IEEE',   sub: 'Published Researcher' },
  { label: 'ARQ/Redis', sub: 'Async Orchestration' },
]

// ─── SlideProfile ─────────────────────────────────────────────────────────────

/**
 * Slide 2 component — Engineer Profile.
 * Renders the condensed bio + compact tech stack in a 50/50 split.
 */
export default function SlideProfile() {
  return (
    <section
      id="profile"
      className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden"
      aria-label="Engineer Profile"
    >
      {/* Ambient glow blobs */}
      <div aria-hidden className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-brand-500/8 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-1/4 -right-24 w-64 h-64 rounded-full bg-brand-700/8 blur-3xl pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* ── Left: Terminal Bio ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 animate-fade-in">
          <div>
            <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">// Slide 2 · Engineer Profile</p>
            <h2 className="text-3xl lg:text-4xl font-mono text-brand-400 leading-tight">
              System.out.println(<br />
              <span className="pl-4 text-slate-300">&quot;Who am I?&quot;</span><br />
              );
            </h2>
          </div>

          {/* Terminal card */}
          <div className="terminal p-5 text-left w-full">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-2 text-slate-500 text-xs font-mono">engineer_profile.py</span>
            </div>
            <pre className="text-xs leading-relaxed overflow-x-auto">
              <span className="text-brand-500">{'>>> '}</span>
              <span className="text-slate-300">engineer = Profile(name=</span>
              <span className="text-emerald-400">&quot;Gaurav R. Birajdar&quot;</span>
              <span className="text-slate-300">){`\n`}</span>

              <span className="text-brand-500">{'>>> '}</span>
              <span className="text-slate-300">engineer.title{`\n`}</span>
              <span className="text-slate-400">{'  '}</span>
              <span className="text-amber-300">&quot;Backend &amp; AI Architect&quot;</span>
              <span className="text-slate-400">{`\n\n`}</span>

              <span className="text-brand-500">{'>>> '}</span>
              <span className="text-slate-300">engineer.focus{`\n`}</span>
              <span className="text-slate-400">{'  '}[</span>
              <span className="text-amber-300">&quot;Fault-Tolerant AI Pipelines&quot;</span>
              <span className="text-slate-400">, </span>
              <span className="text-amber-300">&quot;Async Orchestration&quot;</span>
              <span className="text-slate-400">,{`\n`}</span>
              <span className="text-slate-400">{'   '}</span>
              <span className="text-amber-300">&quot;Deterministic LLM Systems&quot;</span>
              <span className="text-slate-400">]{`\n\n`}</span>

              <span className="text-brand-500">{'>>> '}</span>
              <span className="text-slate-300">engineer.education{`\n`}</span>
              <span className="text-slate-400">{'  '}&quot;M.Tech · Computer Engineering (2026)&quot;{`\n\n`}</span>

              <span className="text-brand-500">{'>>> '}</span>
              <span className="text-slate-300">engineer.consulting_open{`\n`}</span>
              <span className="text-emerald-400">{'  '}True</span>
              <span className="text-slate-500">  # Local LLM pipelines, async backends, agentic HITL{`\n`}</span>

              <span className="text-brand-400 animate-blink">█</span>
            </pre>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            {STATS.map(({ label, sub }) => (
              <div
                key={label}
                className="flex flex-col px-4 py-2 rounded-xl bg-brand-950/60 border border-brand-800/50 hover:border-brand-600/50 transition-colors duration-200"
              >
                <span className="text-brand-300 font-mono text-xs font-semibold">{label}</span>
                <span className="text-slate-500 text-[0.65rem]">{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Compact Stack Grid ──────────────────────────────────── */}
        <div className="flex flex-col gap-5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div>
            <p className="text-xs font-mono text-brand-500 uppercase tracking-widest mb-1">// tools I deploy in production</p>
            <h3 className="text-2xl font-mono text-slate-200">Tech Stack</h3>
          </div>

          {/* Glassmorphism stack panel */}
          <div className="glass-card p-6 relative overflow-hidden">
            {/* Ambient glow inside card */}
            <div aria-hidden className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full bg-brand-500/10 blur-2xl" />

            <div className="grid grid-cols-3 gap-6 relative z-10">
              {STACK.map((category, i) => (
                <StackColumn key={category.id} category={category} index={i} />
              ))}
            </div>
          </div>

          {/* Condensed tagline */}
          <p className="text-slate-500 text-sm leading-relaxed font-mono">
            // M.Tech graduate · zero-cloud architect ·<br />
            // engineers systems that are{' '}
            <span className="text-brand-400">mathematically fault-tolerant</span>
            {', not '}
            <span className="text-brand-400">probabilistically hopeful</span>
          </p>
        </div>

      </div>
    </section>
  )
}
