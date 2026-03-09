export default function Home() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 font-sans">
      <div className="rounded-xl border-2 border-[var(--border)] bg-black/60 p-8 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <h1 className="mb-6 flex items-baseline gap-2 font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
          <span className="terminal-prompt">&gt;</span>
          <span>Your Name</span>
          <span className="terminal-cursor" aria-hidden />
        </h1>

        <p className="mb-4 leading-7 text-[var(--foreground)]">
          I&apos;m a developer and writer. [Add a sentence about where you work or
          what you do.] I&apos;ve been coding for [X] years.
        </p>

        <p className="mb-8 leading-7 text-[var(--foreground)]">
          My life&apos;s work is to [add your mission or interests]. I&apos;m
          [personal detail]. I last [listened to / read / built] [something
          recent].
        </p>

        <p className="mb-3 font-mono text-sm font-medium tracking-wide text-[var(--muted)]">
          &gt; Some of my favorite writing includes:
        </p>
        <ul className="mb-8 list-disc space-y-1 pl-5 leading-7 text-[var(--foreground)]">
          <li>
            <a href="#">Post title one</a>
          </li>
          <li>
            <a href="#">Post title two</a>
          </li>
          <li>
            <a href="#">Post title three</a>
          </li>
        </ul>

        <p className="leading-7 text-[var(--foreground)]">
          You can <a href="/blog">read my writing</a> or <a href="#">code</a>, or{" "}
          <a href="#">follow me online</a>. I also [add other things you do].{" "}
          <a href="mailto:you@example.com">Reach out</a> if interested.
        </p>
      </div>
    </div>
  );
}
