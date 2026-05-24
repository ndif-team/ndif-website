"use client";

import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { researchPapers } from "data/research-papers";
import { getAssetPath } from "../lib/assetPath";

const featured = researchPapers
  .filter((p) => (p.category === "uses_nnsight" || p.category === "uses_ndif") && p.image)
  .slice(0, 6);

// Rounded down to nearest 10 to avoid claiming a precision that drifts as the
// pipeline ingests new papers between deploys.
const totalPapersRounded = Math.floor(researchPapers.length / 10) * 10;

export default function FeaturedResearch() {
  return (
    <section
      id="research"
      className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-surface-950 dark:to-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
            Featured Research
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" aria-hidden="true" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Researchers worldwide use NDIF and NNsight to uncover how
            large-scale AI models work, with {totalPapersRounded}+ published
            papers at top venues including ICLR, NeurIPS, ICML, and EMNLP.
          </p>
        </AnimateOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {featured.map((paper) => (
            <StaggerItem key={paper.title}>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {paper.image && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={getAssetPath(paper.image)}
                      alt={paper.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 text-2xs font-semibold rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
                      {paper.venue}
                    </span>
                  </div>
                  <h3 className="font-display text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" style={{ letterSpacing: '-0.01em' }}>
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-1">
                    {paper.authors}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mt-auto">
                    {paper.description}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateOnScroll className="text-center mt-12" delay={0.3}>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:-translate-y-0.5"
          >
            View all research
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
