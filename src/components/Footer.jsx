// --- Footer -------------------------------------------------------------------

/**
 * Site footer — minimal brand signature, copyright, and terminal exit line.
 * Intentionally lightweight; acts as a visual period at the end of the page.
 */
const Footer = () => (
  <footer className="w-full border-t border-surface-800 py-8 mt-12">
    <div className="flex flex-col items-center justify-center gap-1">
      {/* Brand monogram */}
      <span className="text-brand-500 font-mono mb-2 text-sm tracking-widest">
        &lt;GRB /&gt;
      </span>

      {/* Copyright */}
      <p className="text-slate-600 text-sm">
        &copy; 2026 Gaurav R. Birajdar. Built with React &amp; Tailwind.
      </p>

      {/* Terminal exit line */}
      <p className="text-brand-700/50 text-xs font-mono mt-2">
        sys.exit(0)
      </p>
    </div>
  </footer>
);

export default Footer;
