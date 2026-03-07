const projects = [
  { name: "AI Hackathon Guide", url: "https://aihackathonguide.dev/" },
  { name: "DALL·E Wars", url: "https://dalle-versus-aremucolea.replit.app/" },
  { name: "Spend Insight", url: "https://spend-insight--aremucolea.replit.app/" },
  { name: "Finance Flow", url: "https://finance-flow--aremucolea.replit.app/" },
];

export default function Projects() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 flex items-baseline gap-2 font-mono text-2xl font-bold tracking-tight text-[#e5e5e5]">
        <span className="text-[#d97706]">&gt;</span>
        Projects
      </h1>
      <div className="space-y-10">
        {projects.map((project) => (
          <section key={project.url}>
            <h2 className="mb-2 font-mono text-sm font-medium text-[#737373]">
              &gt; {project.name}
            </h2>
            <iframe
              src={project.url}
              title={project.name}
              className="h-[420px] w-full rounded border border-zinc-800 bg-[#0d0d0d]"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>
        ))}
      </div>
    </div>
  );
}
