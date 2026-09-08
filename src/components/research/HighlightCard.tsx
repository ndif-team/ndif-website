import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { ResearchHighlight } from "data/research-highlights";
import { getAssetPath } from "../../lib/assetPath";

export default function HighlightCard({
  highlight,
}: {
  highlight: ResearchHighlight;
}) {
  const { figure } = highlight;

  return (
    <Link
      href={`/research/highlights/${highlight.slug}`}
      className="group card-glass rounded-2xl overflow-hidden h-full flex flex-col"
    >
      {figure && (
        // White ground in both themes: these are line-art paper figures that
        // become illegible on a dark surface. Decorative here — the figure is
        // captioned and credited on the highlight page itself.
        <div className="h-40 flex items-center justify-center p-4 bg-white border-b border-slate-200 dark:border-slate-700/50">
          <Image
            src={getAssetPath(figure.src)}
            alt=""
            width={figure.width}
            height={figure.height}
            className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
            Built with NNsight
          </span>
          <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            {highlight.topic}
          </span>
        </div>

        <h3
          className="font-display text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
          style={{ textWrap: "balance" }}
        >
          {highlight.headline.lead} {highlight.headline.accent}
        </h3>

        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-5 flex-1">
          {highlight.blurb}
        </p>

        <p className="text-xs text-slate-500 dark:text-slate-500 mb-4 leading-relaxed">
          {highlight.venue}
        </p>

        <span className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm self-start">
          Read the highlight
          <FiArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
