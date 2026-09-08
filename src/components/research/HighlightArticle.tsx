import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import AnimateOnScroll from "../AnimateOnScroll";
import type { HighlightFigure, ResearchHighlight } from "data/research-highlights";
import { getAssetPath } from "../../lib/assetPath";

/**
 * Paper figure with its caption and credit. The credit line is a CC BY 4.0
 * attribution requirement, so it renders unconditionally.
 */
function Figure({
  figure,
  priority = false,
}: {
  figure: HighlightFigure;
  priority?: boolean;
}) {
  return (
    <figure className="rounded-2xl overflow-hidden surface-glass border border-slate-200 dark:border-slate-700/50">
      <div
        className={
          figure.lightGround
            ? "bg-white px-4 py-5 sm:px-6"
            : "bg-slate-100 dark:bg-slate-800"
        }
      >
        <Image
          src={getAssetPath(figure.src)}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          className="mx-auto w-full h-auto max-h-[32rem] object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
          priority={priority}
        />
      </div>
      <figcaption className="px-5 py-4 border-t border-slate-200 dark:border-slate-700/50">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {figure.caption}
        </p>
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
          {figure.credit} ·{" "}
          <a
            href={figure.licenseHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            CC BY 4.0
          </a>
        </p>
      </figcaption>
    </figure>
  );
}

/** Shared across the series — every highlight closes on the same NDIF note. */
function SeriesClosing() {
  return (
    <div className="rounded-2xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/40 p-6">
      <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        Projects in this series ran on the authors&apos; own hardware. For work at
        scales where that isn&apos;t practical, NNsight connects to the{" "}
        <Link
          href="/about"
          className="text-brand-600 dark:text-brand-400 font-semibold hover:underline underline-offset-4"
        >
          National Deep Inference Fabric
        </Link>{" "}
        — the same code, with{" "}
        <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-800/70 text-brand-700 dark:text-brand-300">
          remote=True
        </code>
        .
      </p>
    </div>
  );
}

export default function HighlightArticle({
  highlight,
}: {
  highlight: ResearchHighlight;
}) {
  const { topic, headline, subhead, authors, venue, figure, sections, links } =
    highlight;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <Link
              href="/research/highlights"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-8"
            >
              <FiArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Research Highlights
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
                Built with NNsight
              </span>
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {topic}
              </span>
            </div>

            <h1
              className="font-display text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight"
              style={{ textWrap: "balance" }}
            >
              {headline.lead}{" "}
              <span className="text-gradient">{headline.accent}</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-brand rounded-full mb-8" aria-hidden="true" />
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              {subhead}
            </p>

            <div className="rounded-xl surface-glass border border-slate-200 dark:border-slate-700/50 px-5 py-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {authors}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {venue}
              </p>
            </div>
          </AnimateOnScroll>

          {figure && (
            <AnimateOnScroll delay={0.15}>
              <div className="mt-8">
                <Figure figure={figure} priority />
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* Body */}
      {sections.map((section, i) => (
        <section
          key={section.heading}
          className="py-12 border-t border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="flex items-baseline gap-3 mb-6">
                <span
                  className="font-mono text-sm text-brand-600 dark:text-brand-400 tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {section.heading}
                </h2>
              </div>

              {section.lede && (
                <p className="text-lg md:text-xl text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
                  {section.lede}
                </p>
              )}

              <div className="space-y-5">
                {section.blocks.map((block, j) =>
                  block.kind === "para" ? (
                    <p
                      key={j}
                      className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                    >
                      {block.text}
                    </p>
                  ) : (
                    <p
                      key={j}
                      className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-brand-200 dark:border-brand-800/60 pl-5"
                    >
                      <strong className="font-semibold text-slate-900 dark:text-white">
                        {block.lead}
                      </strong>{" "}
                      {block.text}
                    </p>
                  )
                )}
              </div>

              {section.figure && (
                <div className="mt-8">
                  <Figure figure={section.figure} />
                </div>
              )}
            </AnimateOnScroll>
          </div>
        </section>
      ))}

      {/* Explore it */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="font-mono text-sm text-brand-600 dark:text-brand-400 tabular-nums"
                aria-hidden="true"
              >
                {String(sections.length + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Explore it
              </h2>
            </div>

            <ul className="rounded-2xl surface-glass border border-slate-200 dark:border-slate-700/50 divide-y divide-slate-200 dark:divide-slate-700/50 mb-10">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 px-5 py-4 text-sm md:text-base text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white/50 dark:hover:bg-slate-800/40 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    <span>{link.label}</span>
                    <FiExternalLink
                      size={16}
                      className="flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <SeriesClosing />
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
