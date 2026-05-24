"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";
import AnimateOnScroll from "../AnimateOnScroll";
import { citation } from "data/research-papers";
import { getAssetPath } from "../../lib/assetPath";

function SelectableBlock({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleSelect = useCallback(() => {
    if (!preRef.current) return;
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(preRef.current);
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 overflow-hidden mb-6">
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900 dark:text-white">{label}</h2>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          aria-label={`Copy ${label} to clipboard`}
        >
          {copied ? <><FiCheck size={14} /> Copied!</> : <><FiCopy size={14} /> Copy</>}
        </button>
      </div>
      <div className="p-6">
        <pre
          ref={preRef}
          onClick={handleSelect}
          title="Click to select all"
          className="text-sm font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words leading-relaxed cursor-pointer select-all hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-lg p-2 -m-2 transition-colors"
        >
          {text}
        </pre>
      </div>
    </div>
  );
}

export default function ResearchCitation() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero — minimal glass blur on subtitle only */}
        <div className="text-center mb-12">
          <AnimateOnScroll>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
              Citing <span className="text-gradient">NDIF</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full" />
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll delay={0.1}>
          {/* Paper card */}
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:-translate-y-1 hover:shadow-lg mb-8"
          >
            <div className="relative aspect-[16/7] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image
                src={getAssetPath("/images/NDIF_system.png")}
                alt="NDIF and NNsight system architecture diagram"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
                  ICLR 2025
                </span>
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  Conference Paper
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                NNsight and NDIF: Democratizing Access to Foundation Model Internals
              </h2>
              <span className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-medium text-sm">
                View on OpenReview <FiExternalLink size={14} />
              </span>
            </div>
          </a>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            If you use NNsight or NDIF resources in your research, please cite
            the following:
          </p>

          {/* BibTeX — click to select */}
          <SelectableBlock label="BibTeX" text={citation.bibtex} />

          <div className="rounded-xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/40 p-5">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              When you publish work using NNsight or NDIF resources, we&apos;d
              love you to email us directly at{" "}
              <a
                href="mailto:info@ndif.us"
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                info@ndif.us
              </a>{" "}
              to tell us about your work. This helps us track our impact and
              supports our continued efforts to provide open-source resources for
              reproducible and transparent research on large-scale AI systems.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
