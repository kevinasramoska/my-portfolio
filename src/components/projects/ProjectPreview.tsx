import Image from "next/image";
import type { Project } from "@/types/content";

type ProjectPreviewProps = {
  project: Project;
  compact?: boolean;
};

export default function ProjectPreview({
  project,
  compact = false,
}: ProjectPreviewProps) {
  const screenshot = project.screenshots[0];

  return (
    <figure
      className={`group/preview overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-zinc-950 shadow-2xl shadow-black/30 ${
        compact ? "p-3" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-2 pb-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
          Real application
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/[0.08] bg-white">
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          loading={compact ? "lazy" : "eager"}
          sizes={
            compact
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 1024px) 100vw, 42vw"
          }
          className="object-cover object-top transition duration-500 group-hover/preview:scale-[1.015]"
        />
      </div>

      {!compact ? (
        <figcaption className="px-2 pb-1 pt-3 text-sm leading-6 text-stone-400">
          {screenshot.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
