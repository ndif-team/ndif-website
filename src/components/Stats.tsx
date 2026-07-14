"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { researchPapers } from "data/research-papers";
import { githubRepos } from "data/github-repos";
import orgStats from "data/org-stats.json";

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
  // Mirror of displayValue so the animation effect can continue from the
  // current count (e.g. when a live-fetched value lands) without re-running
  // on every displayed frame.
  const displayRef = useRef(0);
  displayRef.current = displayValue;

  useEffect(() => {
    if (!isInView || numericValue === undefined) return;
    if (reducedMotion) {
      setDisplayValue(numericValue);
      return;
    }
    const start = displayRef.current;
    if (start === numericValue) return;
    const duration = 1500;
    const steps = 40;
    const increment = (numericValue - start) / steps;
    let current = start;
    const done = (v: number) =>
      increment >= 0 ? v >= numericValue : v <= numericValue;
    const interval = setInterval(() => {
      current += increment;
      if (done(current)) {
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

// Papers/repos stats are derived at build time from the pipeline output
// (research-papers.json and github-repos.json). Rounded *down* to avoid
// claiming a precision that ticks over between deploys.
const papersRounded = Math.floor(researchPapers.length / 10) * 10;
const reposRounded = Math.floor(githubRepos.length / 10) * 10;

// GPU count is intentionally static — matches the NCSA Delta allocation that
// powers NDIF today. Update here when the cluster footprint changes.
const STATIC_GPU_COUNT = 32;

const STARS_CACHE_KEY = "ndif:org-stars:v1";
const STARS_TTL_MS = 60 * 60 * 1000;

// Star count covers ndif-team's own repos (not the wider ecosystem catalog).
// The value baked in at build time by scripts/fetch-org-stats.mjs renders
// immediately; this hook then silently revalidates against GitHub so the
// number stays current between deploys. Failures keep the baked value.
function useLiveOrgStars(): number {
  const [stars, setStars] = useState(orgStats.totalStars);

  useEffect(() => {
    let cancelled = false;

    const apply = (total: number) => {
      if (!cancelled && Number.isFinite(total) && total > 0) setStars(total);
    };

    (async () => {
      try {
        const cached = JSON.parse(
          localStorage.getItem(STARS_CACHE_KEY) ?? "null"
        ) as { stars: number; at: number } | null;
        if (cached && Date.now() - cached.at < STARS_TTL_MS) {
          apply(cached.stars);
          return;
        }

        const repos: { stargazers_count?: number }[] = [];
        let url: string | null =
          "https://api.github.com/orgs/ndif-team/repos?per_page=100";
        for (let page = 0; url && page < 5; page++) {
          const res: Response = await fetch(url, {
            headers: { accept: "application/vnd.github+json" },
          });
          if (!res.ok) throw new Error(`GitHub API ${res.status}`);
          const batch = (await res.json()) as unknown;
          if (!Array.isArray(batch)) throw new Error("unexpected payload");
          repos.push(...batch);
          const link = res.headers.get("link") ?? "";
          url = /<([^>]+)>;\s*rel="next"/.exec(link)?.[1] ?? null;
        }

        const total = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);
        if (repos.length > 0 && total > 0) {
          localStorage.setItem(
            STARS_CACHE_KEY,
            JSON.stringify({ stars: total, at: Date.now() })
          );
          apply(total);
        }
      } catch {
        // Keep the baked value — freshness is a nice-to-have, never an error.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return stars;
}

export default function Stats() {
  const liveStars = useLiveOrgStars();
  const starsRounded = Math.floor(liveStars / 100) * 100;

  const stats: StatProps[] = [
    { value: `${papersRounded}+`, numericValue: papersRounded, label: "Research Papers Using our Tools", suffix: "+" },
    { value: `${reposRounded}+`, numericValue: reposRounded, label: "Ecosystem Repos Built on NNsight", suffix: "+" },
    { value: `${starsRounded}+`, numericValue: starsRounded, label: "GitHub Stars Across NDIF-Team Repos", suffix: "+" },
    { value: `${STATIC_GPU_COUNT}`, numericValue: STATIC_GPU_COUNT, label: "GPUs for Remote NDIF Execution" },
  ];

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
