import { useEffect, useRef } from 'react';

// ─── Project Data ──────────────────────────────────────────────────────────────

/** @typedef {{ label: string }} Tag */
/** @typedef {{ id: string, title: string, subtitle: string, description: string, tags: Tag[], links: { label: string, href: string, icon: string }[] }} Project */

/** @type {Project[]} */
const PROJECTS = [
  {
    id: 'vyngo-voice-search',
    title: 'Vyngo Voice Search',
    subtitle: 'Deterministic GenAI',
    description:
      "A hallucination-proof, voice-based vehicle search system utilizing a strict 'Filters, not Vibes' architecture. Separates probabilistic LLM reasoning from deterministic SQLite database states.",
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
    subtitle: 'Distributed Systems Research',
    description:
      'Designed a dynamic privacy budget allocation framework for distributed medical image analysis on an HPC cluster, balancing model utility with strict differential privacy constraints.',
    tags: [
      { label: 'Python' },
      { label: 'Federated Learning' },
      { label: 'Distributed Systems' },
      { label: 'Differential Privacy' },
    ],
    links: [
      { label: 'Research Paper / Proceeding', href: 'https://ieeexplore.ieee.org/abstract/document/11330959', icon: 'paper' },
    ],
  },
];

// ─── Icon Components ───────────────────────────────────────────────────────────

/**
 * Renders a link icon — GitHub mark or document icon.
 * @param {{ type: string }} props
 */
const LinkIcon = ({ type }) => {
  if (type === 'github') {
    return (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
};

// ─── ProjectCard ───────────────────────────────────────────────────────────────

/**
 * Individual project card with glassmorphism, hover lift and border glow.
 * @param {{ project: Project, index: number }} props
 */
const ProjectCard = ({ project, index }) => {
  return (
    <article
      id={`project-card-${project.id}`}
      className="project-card glass-card group relative flex flex-col gap-5 p-7 overflow-hidden"
      style={{ animationDelay: `${index * 0.15}s` }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Ambient corner glow – appears on hover via group */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-brand-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Header */}
      <header className="flex flex-col gap-1">
        <span className="text-xs font-mono text-brand-500 tracking-widest uppercase">
          {project.subtitle}
        </span>
        <h3
          id={`project-title-${project.id}`}
          className="text-xl font-semibold text-slate-100 leading-snug"
        >
          {project.title}
        </h3>
      </header>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2" aria-label="Tech stack">
        {project.tags.map((tag) => (
          <span
            key={tag.label}
            className="text-glow inline-block text-xs font-mono px-3 py-1 rounded-full
                       bg-brand-950/60 border border-brand-800/60 text-brand-300
                       hover:border-brand-500/70 hover:bg-brand-900/50 transition-colors duration-200"
          >
            {tag.label}
          </span>
        ))}
      </div>

      {/* Links */}
      <footer className="flex flex-wrap gap-3 pt-1 border-t border-white/[0.05]">
        {project.links.map((link) => (
          <a
            key={link.label}
            id={`project-link-${project.id}-${link.icon}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-brand-400
                       border border-brand-700/50 rounded-lg px-4 py-2
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
  );
};

// ─── Projects Section ──────────────────────────────────────────────────────────

/**
 * Featured Architecture section.
 * Uses IntersectionObserver to trigger `.section-enter.visible` on each card.
 */
const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    if (!cards?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card) => {
      card.classList.add('section-enter');
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 border-t border-surface-800"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-mono text-brand-400 mb-3">
            Featured Architecture
          </h2>
          <p className="text-slate-500 text-sm font-mono">
            // selected systems & research
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
