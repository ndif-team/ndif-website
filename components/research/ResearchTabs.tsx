"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { researchPapers } from "../../data/research-papers";
import { githubRepos } from "../../data/github-repos";
import { isLowSignal } from "../../lib/repos";
import ResearchPaperList from "./ResearchPaperList";
import GitHubRepoList from "./GitHubRepoList";

type Tab = "papers" | "code";

export default function ResearchTabs() {
  const router = useRouter();
  const search = useSearchParams();
  const initial = (search.get("tab") === "code" ? "code" : "papers") as Tab;
  const [tab, setTab] = useState<Tab>(initial);
  const tablistRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Sync to URL on tab change (preserves other params)
  useEffect(() => {
    const params = new URLSearchParams(Array.from(search.entries()));
    if (tab === "papers") params.delete("tab");
    else params.set("tab", "code");
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  // Counter values — match the Code tab's default visibility (coursework now shown by default).
  const papersCount = researchPapers.length;
  const codeCount = githubRepos.filter((r) => !isLowSignal(r)).length;

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next: Tab = tab === "papers" ? "code" : "papers";
      setTab(next);
      // ARIA tablist pattern: move keyboard focus to the newly active tab.
      // RAF waits for React to apply tabIndex updates before focusing.
      requestAnimationFrame(() => {
        tablistRef.current?.querySelector<HTMLButtonElement>(`#tab-${next}`)?.focus();
      });
    }
  }

  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-10">
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Research content"
            onKeyDown={handleKeyDown}
            className="relative inline-flex items-end gap-8 border-b border-slate-200 dark:border-slate-800"
          >
            <TabButton active={tab === "papers"} onClick={() => setTab("papers")} controls="panel-papers" reduce={!!reduce} label="Papers" count={papersCount} />
            <TabButton active={tab === "code"} onClick={() => setTab("code")} controls="panel-code" reduce={!!reduce} label="Code" count={codeCount} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
          >
            {tab === "papers" ? <ResearchPaperList /> : <GitHubRepoList />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  controls,
  label,
  count,
  reduce,
}: {
  active: boolean;
  onClick: () => void;
  controls: string;
  label: string;
  count: number;
  reduce: boolean;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      id={controls.replace("panel", "tab")}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      className={`relative px-1 pb-3 pt-1 text-base font-semibold tracking-tight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 rounded-sm ${
        active
          ? "text-slate-900 dark:text-white"
          : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
      }`}
    >
      <span>{label}</span>
      <span className={`ml-1.5 text-xs font-medium tabular-nums ${active ? "text-slate-500 dark:text-slate-400" : "text-slate-400 dark:text-slate-500"}`}>
        {count}
      </span>
      {active && (
        <motion.span
          layoutId="research-tab-indicator"
          className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand-600 dark:bg-brand-400 rounded-full"
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
    </button>
  );
}
