import { CollapsibleProject } from "../components/CollapsibleProject";

const projects = [
  { name: "AI Hackathon Guide", url: "https://aihackathonguide.dev/" },
  { name: "DALL·E Wars", url: "https://dalle-versus-aremucolea.replit.app/" },
  { name: "Spend Insight", url: "https://spend-insight--aremucolea.replit.app/" },
  { name: "Finance Flow", url: "https://finance-flow--aremucolea.replit.app/" },
];

export default function Projects() {
  return (
    <div className="mx-auto w-full max-w-[calc(100vw-2rem)] px-4 py-12 sm:px-6">
      <h1 className="mb-8 flex items-baseline gap-2 font-mono text-2xl font-bold tracking-tight text-[var(--foreground)]">
        <span className="terminal-prompt">&gt;</span>
        <span>Projects</span>
        <span className="terminal-cursor" aria-hidden />
      </h1>
      <div className="space-y-3">
        {projects.map((project, index) => (
          <CollapsibleProject
            key={project.url}
            name={project.name}
            url={project.url}
            defaultOpen={false}
          />
        ))}
      </div>
    </div>
  );
}
