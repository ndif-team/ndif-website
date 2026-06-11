"use client";

import { FiActivity, FiBookOpen, FiFileText, FiStar, FiGitBranch } from "react-icons/fi";
import type { GitHubRepo } from "../../data/github-repos";
import { selectBadges, relativeFromNow } from "../../lib/repos";
import { languageColor } from "../../lib/languageColors";

const BADGE_META = {
  paper:      { Icon: FiFileText, label: "Paper",   classes: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" },
  popular:    { Icon: FiStar,     label: "Popular", classes: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  active:     { Icon: FiActivity, label: "Active",  classes: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
  coursework: { Icon: FiBookOpen, label: "Course",  classes: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300" },
} as const;

export default function GitHubRepoCard({ repo }: { repo: GitHubRepo }) {
  const badges = selectBadges(repo);
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-spotlight group flex flex-col h-full rounded-2xl surface-glass border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:-translate-y-1 hover:shadow-lg p-5"
    >
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {badges.map((b) => {
            const { Icon, label, classes } = BADGE_META[b];
            return (
              <span key={b} className={`inline-flex items-center gap-1 px-2 py-0.5 text-2xs font-semibold rounded-full ${classes}`}>
                <Icon size={11} aria-hidden="true" />
                {label}
              </span>
            );
          })}
        </div>
      )}

      <h3 className="font-display text-slate-900 dark:text-white leading-snug line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" style={{ letterSpacing: "-0.01em" }}>
        <span className="text-slate-500 dark:text-slate-400">{repo.owner}/</span>
        {repo.repo}
      </h3>

      <p className={`text-sm leading-relaxed line-clamp-2 mt-2 ${repo.description ? "text-slate-600 dark:text-slate-400" : "italic text-slate-400 dark:text-slate-500"}`}>
        {repo.description ?? "No description"}
      </p>

      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-4 tabular-nums">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColor(repo.language) }} aria-hidden="true" />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <FiStar size={12} aria-hidden="true" />
          {repo.stars.toLocaleString()}
        </span>
        <span className="inline-flex items-center gap-1">
          <FiGitBranch size={12} aria-hidden="true" />
          {repo.forks.toLocaleString()}
        </span>
      </div>

      <div className="text-2xs text-slate-400 dark:text-slate-500 mt-1.5">
        {repo.last_commit && <span>Active {relativeFromNow(repo.last_commit)}</span>}
        {repo.last_commit && repo.license && <span> · </span>}
        {repo.license && <span>{repo.license}</span>}
      </div>
    </a>
  );
}
