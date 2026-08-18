import { useEffect, useRef } from 'react';

// --- Icon Components ------------------------------------------------------------

/** LinkedIn wordmark icon */
const LinkedInIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/** GitHub mark icon */
const GitHubIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.021C22 6.484 17.522 2 12 2z" />
  </svg>
);

/** Secure form / shield-check icon */
const FormIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

// --- Pulsing availability badge ------------------------------------------------
const AvailabilityBadge = () => (
  <div
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-emerald-400 text-xs font-mono mb-6"
    aria-label="Currently available for new roles"
  >
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
    available &middot; open to roles
  </div>
);

// --- Link configs --------------------------------------------------------------

/**
 * @typedef {{ id: string, label: string, href: string, icon: string, className: string }} ContactLink
 * @type {ContactLink[]}
 */
const LINKS = [
  {
    id: 'contact-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gaurav-r-birajdar/',
    icon: 'linkedin',
    className:
      'inline-flex items-center gap-2 text-sm font-mono font-medium px-5 py-2.5 rounded-lg ' +
      'bg-brand-500/20 border border-brand-500/60 text-brand-300 ' +
      'hover:bg-brand-500/30 hover:border-brand-400 hover:text-brand-200 ' +
      'hover:shadow-[0_0_20px_rgba(30,173,160,0.25)] active:scale-95 transition-all duration-200',
  },
  {
    id: 'contact-github',
    label: 'GitHub',
    href: 'https://github.com/Gaurav-R-Birajdar',
    icon: 'github',
    className:
      'inline-flex items-center gap-2 text-sm font-mono font-medium px-5 py-2.5 rounded-lg ' +
      'border border-white/10 text-slate-400 ' +
      'hover:border-white/25 hover:text-slate-200 hover:bg-white/5 ' +
      'active:scale-95 transition-all duration-200',
  },
  {
    id: 'contact-form',
    label: 'Secure Contact Form',
    href: 'https://forms.gle/KDPfEN8tS2L5fbvU7',
    icon: 'form',
    className:
      'inline-flex items-center gap-2 text-sm font-mono font-medium px-5 py-2.5 rounded-lg ' +
      'border border-brand-700/40 text-brand-400 ' +
      'hover:bg-brand-900/40 hover:border-brand-500/60 hover:text-brand-300 ' +
      'hover:shadow-[0_0_14px_rgba(30,173,160,0.15)] active:scale-95 transition-all duration-200',
  },
];

/** @param {{ type: string }} props */
const IconFor = ({ type }) => {
  if (type === 'linkedin') return <LinkedInIcon />;
  if (type === 'github') return <GitHubIcon />;
  return <FormIcon />;
};

// --- Contact Section -----------------------------------------------------------

/**
 * Privacy-first Contact section.
 * No client-side form rendering — all outbound links, no data collected.
 * Uses IntersectionObserver for scroll-triggered card fade-in.
 */
const Contact = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.classList.add('visible');
          observer.unobserve(card);
        }
      },
      { threshold: 0.15 }
    );

    card.classList.add('section-enter');
    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen py-20 flex flex-col items-center justify-center border-t border-surface-800"
    >
      <div className="max-w-5xl mx-auto px-6 w-full flex flex-col items-center">
        <h2 className="text-4xl font-mono text-brand-400 mb-8 text-center">
          Initiate Connection
        </h2>

        <div
          ref={cardRef}
          className="glass-card max-w-md w-full text-center flex flex-col items-center gap-6 p-8 relative overflow-hidden"
          aria-label="Contact information"
        >
          {/* Ambient glow blob */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-brand-500/10 blur-3xl"
          />

          <AvailabilityBadge />

          <p className="text-slate-400 text-sm leading-relaxed">
            Currently open for roles in{' '}
            <span className="text-brand-300 font-mono">Applied AI</span> and{' '}
            <span className="text-brand-300 font-mono">Backend Engineering</span>.
            Reach out via the platforms below.
          </p>

          {/* Social / contact buttons */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {LINKS.map((link) => (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={link.className}
                aria-label={`Visit ${link.label}`}
              >
                <IconFor type={link.icon} />
                {link.label}
              </a>
            ))}
          </div>

          <p className="text-xs text-slate-600 font-mono">
            // no data collected &middot; links open externally
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
