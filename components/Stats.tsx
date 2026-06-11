"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { researchPapers } from "data/research-papers";
import { githubRepos } from "data/github-repos";

interface StatProps {
  value: string;
  numericValue?: number;
  label: string;
  suffix?: string;
  prefix?: string;
  attribution?: string;
}

function AnimatedStat({ value, numericValue, label, suffix = "", prefix = "" }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || numericValue === undefined) return;
    if (reducedMotion) {
      setDisplayValue(numericValue);
      return;
    }
    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, numericValue, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center px-4"
    >
      <div className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-2 tabular-nums" style={{ letterSpacing: '-0.02em' }}>
        {numericValue !== undefined ? (
          <>
            {prefix}
            {displayValue.toLocaleString()}
            {suffix}
          </>
        ) : (
          <span className="text-gradient">{value}</span>
        )}
      </div>
      <div className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

// All three "+" stats are derived at build time from the pipeline output
// (research-papers.json and github-repos.json). Rounded *down* to avoid
// claiming a precision that ticks over between deploys.
const papersRounded = Math.floor(researchPapers.length / 10) * 10;
const reposRounded = Math.floor(githubRepos.length / 10) * 10;
const totalStars = githubRepos.reduce((sum, r) => sum + r.stars, 0);
const starsRounded = Math.floor(totalStars / 100) * 100;

// GPU count is intentionally static — matches the NCSA Delta allocation that
// powers NDIF today. Update here when the cluster footprint changes.
const STATIC_GPU_COUNT = 32;

const stats: StatProps[] = [
  { value: `${papersRounded}+`, numericValue: papersRounded, label: "Research Papers", suffix: "+" },
  { value: `${reposRounded}+`, numericValue: reposRounded, label: "Open-source Repos", suffix: "+" },
  { value: `${starsRounded}+`, numericValue: starsRounded, label: "GitHub Stars", suffix: "+" },
  { value: `${STATIC_GPU_COUNT}`, numericValue: STATIC_GPU_COUNT, label: "GPUs" },
];

export default function Stats() {
  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x divide-slate-200 dark:divide-slate-800">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
        <p className="text-center mt-10 text-xs text-slate-400 dark:text-slate-500">
          Data sourced from NDIF internal metrics and public GitHub repository statistics.
        </p>
      </div>
    </section>
  );
}
