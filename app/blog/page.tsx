export default function Blog() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="mb-6 flex items-baseline gap-2 font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
        <span className="terminal-prompt">&gt;</span>
        <span>Blog</span>
        <span className="terminal-cursor" aria-hidden />
      </h1>
      <p className="leading-7 text-[var(--muted)]">
        Blog and notes. Nothing here yet.
      </p>
    </div>
  );
}
