"use client";

import { useState, useCallback, useRef } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import AnimateOnScroll from "../AnimateOnScroll";
import { citation } from "data/research-papers";

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
        <h3 className="font-semibold text-slate-900 dark:text-white">{label}</h3>
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

export default function FabricCitation() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-slate-900 dark:text-white">
            Citing NDIF
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            If you use NNsight or NDIF resources in your research, please cite
            the following:
          </p>

          <SelectableBlock
            label="Citation"
            text={`${citation.text} Available at ${citation.url}.`}
          />

          <SelectableBlock label="BibTeX" text={citation.bibtex} />

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            In addition, when you publish work using NNsight or NDIF resources,
            we&apos;d love you to email us directly at{" "}
            <a
              href="mailto:info@ndif.us"
              className="text-brand-600 dark:text-brand-400 hover:underline"
            >
              info@ndif.us
            </a>{" "}
            to tell us about your work. This helps us track our impact and
            supports our continued efforts to provide open-source resources for
            reproducible and transparent research on large-scale AI systems.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
