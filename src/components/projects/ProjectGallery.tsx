import Image from "next/image";
import type { ProjectScreenshot } from "@/types/content";

type ProjectGalleryProps = {
  screenshots: readonly ProjectScreenshot[];
};

export default function ProjectGallery({ screenshots }: ProjectGalleryProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {screenshots.map((screenshot, index) => (
        <figure
          key={screenshot.src}
          className={`overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-3 ${
            index === 0 ? "md:col-span-2" : ""
          }`}
        >
          <a
            href={screenshot.src}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-xl border border-white/[0.08] bg-white"
            aria-label={`Open full-size screenshot: ${screenshot.caption}`}
          >
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              sizes={
                index === 0
                  ? "(max-width: 1024px) 100vw, 72rem"
                  : "(max-width: 768px) 100vw, 36rem"
              }
              className={`w-full object-cover object-top transition duration-500 group-hover:scale-[1.01] ${
                screenshot.height / screenshot.width < 0.3
                  ? "min-h-52 bg-zinc-950 object-contain"
                  : "aspect-[16/10]"
              }`}
            />
          </a>
          <figcaption className="px-2 pb-1 pt-3 text-sm leading-6 text-stone-400">
            {screenshot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
