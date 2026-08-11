import type { Project } from "@/types/content";

type ProjectArchitectureProps = {
  architecture: Project["architecture"];
  compact?: boolean;
};

export default function ProjectArchitecture({
  architecture,
  compact = false,
}: ProjectArchitectureProps) {
  return (
    <figure
      className={`rounded-2xl border border-stone-800 bg-stone-950/80 ${
        compact ? "p-5" : "p-6 sm:p-8"
      }`}
    >
      <ol
        className={`grid gap-3 ${
          compact ? "sm:grid-cols-3" : "md:grid-cols-3"
        }`}
        aria-label="Project architecture flow"
      >
        {architecture.steps.map((step, index) => (
          <li
            key={step.label}
            className="relative min-w-0 rounded-xl border border-stone-700 bg-stone-900 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
              Step {index + 1}
            </p>
            <p className="mt-2 font-semibold text-stone-100">{step.label}</p>
            {!compact ? (
              <p className="mt-2 text-sm leading-6 text-stone-400">
                {step.detail}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      {!compact ? (
        <figcaption className="mt-5 max-w-4xl text-sm leading-7 text-stone-400">
          {architecture.summary}
        </figcaption>
      ) : null}
    </figure>
  );
}
