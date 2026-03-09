export default function Blog() {
  return (
    <div className="mx-auto flex w-full max-w-[min(48rem,75vh)] flex-col px-6 py-12">
      <div className="aspect-square w-full overflow-auto rounded-xl border-2 border-[var(--border)] bg-black/60 p-8 sm:p-12 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <h1 className="mb-6 flex items-baseline gap-2 font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
          <span className="terminal-prompt">&gt;</span>
          <span>Blog</span>
          <span className="terminal-cursor" aria-hidden />
        </h1>
        <p className="leading-7 text-[var(--muted)]">
          Blog and notes. Nothing here yet.
        </p>
      </div>
    </div>
  );
}
