import { useEffect, useRef } from 'react';

// --- Abstract Visual Sub-component ---------------------------------------------

/**
 * Abstract terminal-style "system card" rendered on the right column.
 * Pure decorative SVG grid + animated brand-glow orbs — no images needed.
 */
const AbstractVisual = () => (
  <div
    aria-hidden="true"
    className="relative w-full h-72 md:h-full min-h-[340px] flex items-center justify-center select-none"
  >
    {/* Outer glow ring */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-56 h-56 rounded-full border border-brand-700/20 animate-[spin_20s_linear_infinite]" />
      <div className="absolute w-40 h-40 rounded-full border border-brand-600/15 animate-[spin_14s_linear_infinite_reverse]" />
    </div>

    {/* Ambient blobs */}
    <div className="absolute top-8 right-8 w-28 h-28 rounded-full bg-brand-500/10 blur-2xl animate-[float_6s_ease-in-out_infinite]" />
    <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-teal-400/8 blur-2xl animate-[float_8s_ease-in-out_infinite_1.5s]" />

    {/* Terminal card */}
    <div className="terminal relative z-10 px-5 py-4 w-64 text-xs leading-relaxed">
      <div className="flex gap-1.5 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
      </div>
      <p className="text-brand-500 font-mono">$ whoami</p>
      <p className="text-slate-300 mt-1">Gaurav R. Birajdar</p>
      <p className="text-brand-500 font-mono mt-2">$ cat degree.txt</p>
      <p className="text-slate-300 mt-1">M.Tech · Computer Engineering</p>
      <p className="text-brand-500 font-mono mt-2">$ cat focus.txt</p>
      <p className="text-slate-300 mt-1">Deterministic GenAI</p>
      <p className="text-slate-300">Federated Learning</p>
      <p className="text-slate-300">Scalable Backends</p>
      <p className="text-brand-400 mt-2 animate-[blink_1s_step-end_infinite]">█</p>
    </div>
  </div>
);

// --- About Section -------------------------------------------------------------

/**
 * About section — 2-col desktop layout, scroll-triggered fade-in on content.
 */
const About = () => {
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const targets = [contentRef.current, visualRef.current].filter(Boolean);
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
    targets.forEach((el, i) => {
      el.classList.add('section-enter');
      el.style.transitionDelay = `${i * 0.15}s`;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="min-h-screen py-20 flex items-center border-t border-surface-800"
    >
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div ref={contentRef} className="flex flex-col gap-6">
            <h2 className="text-4xl font-mono text-brand-400 mb-6">
              System.out.println("Who am I?");
            </h2>

            <p className="text-slate-300 leading-relaxed text-[0.95rem]">
              I&apos;m <span className="text-brand-300 font-mono font-medium">Gaurav R. Birajdar</span> — an
              M.Tech graduate in Computer Engineering with a bias toward systems that are
              provably correct, not just{' '}
              <span className="text-brand-300 font-mono">probabilistically useful</span>.
              My primary focus is on{' '}
              <span className="text-brand-300 font-mono">deterministic GenAI architectures</span> —
              building voice and language pipelines where every database state is governed
              by rules, not hallucinations. I deploy and fine-tune large language models
              locally via Ollama, keeping inference private and latency minimal.
            </p>

            <p className="text-slate-400 leading-relaxed text-[0.95rem]">
              On the research side, I bridge the gap between heavy academic work —
              publishing on{' '}
              <span className="text-brand-300 font-mono">Federated Learning</span> and
              dynamic differential-privacy budget allocation — and production-grade
              backend engineering with Python, FastAPI, and SQLite. I believe the most
              dangerous engineer is one who can read a research paper on Monday and ship
              a working system by Friday.
            </p>

            {/* Quick-stat pills */}
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { label: 'M.Tech', sub: 'Computer Engineering' },
                { label: 'IEEE', sub: 'Published Researcher' },
                { label: 'Local LLM', sub: 'Ollama · Llama 3.1' },
              ].map(({ label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col px-4 py-2 rounded-xl bg-brand-950/60 border border-brand-800/50 hover:border-brand-600/50 transition-colors duration-200"
                >
                  <span className="text-brand-300 font-mono text-xs font-semibold">{label}</span>
                  <span className="text-slate-500 text-[0.7rem]">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Abstract Visual ── */}
          <div ref={visualRef}>
            <AbstractVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
