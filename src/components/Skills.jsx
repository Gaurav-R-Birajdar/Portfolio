import { useEffect, useRef } from 'react';

// --- Skill Data ----------------------------------------------------------------

/**
 * @typedef {{ name: string }} Skill
 * @typedef {{ id: string, category: string, icon: string, skills: Skill[] }} SkillGroup
 */

/** @type {SkillGroup[]} */
const SKILL_GROUPS = [
  {
    id: 'applied-ai',
    category: 'Applied AI & ML',
    icon: 'brain',
    skills: [
      { name: 'Llama 3.1' },
      { name: 'Ollama' },
      { name: 'STT / TTS Pipelines' },
      { name: 'Federated Learning' },
      { name: 'Differential Privacy' },
      { name: 'Pydantic (schema-strict LLM I/O)' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Architecture',
    icon: 'server',
    skills: [
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'SQLite' },
      { name: 'Deterministic Data Flow' },
      { name: 'Docker' },
      { name: 'REST API Design' },
    ],
  },
  {
    id: 'frontend',
    category: 'Frontend & Tooling',
    icon: 'layers',
    skills: [
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'Vite' },
      { name: 'Git' },
      { name: 'Linux' },
      { name: 'HPC / Cluster Environments' },
    ],
  },
];

// --- Category Icon Components --------------------------------------------------

/** @param {{ type: string }} props */
const CategoryIcon = ({ type }) => {
  if (type === 'brain') {
    return (
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 017 4.5v1A2.5 2.5 0 014.5 8H4a2 2 0 000 4h.5A2.5 2.5 0 017 14.5v1A2.5 2.5 0 009.5 18h1" />
        <path d="M14.5 2A2.5 2.5 0 0117 4.5v1A2.5 2.5 0 0019.5 8H20a2 2 0 010 4h-.5A2.5 2.5 0 0117 14.5v1A2.5 2.5 0 0114.5 18h-1" />
        <path d="M12 18v4M9 22h6" />
      </svg>
    );
  }
  if (type === 'server') {
    return (
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
};

// --- SkillCard ----------------------------------------------------------------

/**
 * Single glassmorphism skill category card with staggered scroll-fade.
 * @param {{ group: SkillGroup, index: number }} props
 */
const SkillCard = ({ group, index }) => (
  <article
    id={`skill-card-${group.id}`}
    className="skill-card glass-card group flex flex-col gap-5 p-6 relative overflow-hidden"
    style={{ animationDelay: `${index * 0.12}s` }}
    aria-labelledby={`skill-heading-${group.id}`}
  >
    {/* Ambient corner glow on hover */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full bg-brand-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />

    {/* Card header */}
    <header className="flex items-center gap-3">
      <span className="text-brand-400 group-hover:text-brand-300 transition-colors duration-200">
        <CategoryIcon type={group.icon} />
      </span>
      <h3
        id={`skill-heading-${group.id}`}
        className="text-base font-mono font-semibold text-slate-200"
      >
        {group.category}
      </h3>
    </header>

    {/* Divider */}
    <div className="h-px bg-gradient-to-r from-brand-700/40 via-brand-600/20 to-transparent" />

    {/* Skill list */}
    <ul className="flex flex-col gap-2" aria-label={`${group.category} skills`}>
      {group.skills.map((skill) => (
        <li
          key={skill.name}
          className="text-glow flex items-center gap-2 text-sm font-mono text-brand-300/80 hover:text-brand-300 transition-colors duration-150"
        >
          <span aria-hidden="true" className="text-brand-600 text-xs">▸</span>
          {skill.name}
        </li>
      ))}
    </ul>
  </article>
);

// --- Skills Section ------------------------------------------------------------

/**
 * Tech Stack section.
 * IntersectionObserver triggers staggered section-enter fade-in per card.
 */
const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.skill-card');
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
      { threshold: 0.1 }
    );

    cards.forEach((card) => {
      card.classList.add('section-enter');
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-20 border-t border-surface-800"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-4xl font-mono text-brand-400 mb-3">Tech Stack</h2>
          <p className="text-slate-500 text-sm font-mono">// tools I deploy in production</p>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
