"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { CombinedModel, DeploymentLevel, MonitorScenario } from "./types";
import {
  FiSearch,
  FiCopy,
  FiCheck,
  FiExternalLink,
} from "react-icons/fi";

const LEVEL_ORDER: DeploymentLevel[] = ["HOT", "WARM", "COLD"];
const GITHUB_REPO = "davidbau/ndif-monitor";

const levelColors: Record<
  DeploymentLevel,
  { bg: string; text: string; dot: string }
> = {
  HOT: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  WARM: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  COLD: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-700 dark:text-indigo-400",
    dot: "bg-indigo-500",
  },
};

const testStatusDot: Record<string, string> = {
  OK: "bg-emerald-500",
  SLOW: "bg-amber-500",
  FAILED: "bg-red-500",
  UNAVAILABLE: "bg-slate-400",
  COLD: "bg-slate-500",
  DEGRADED: "bg-orange-500",
};

function formatParams(n: number): string {
  if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M`;
  return n.toLocaleString();
}

function formatAppState(state: string): string {
  if (!state || state === "UNKNOWN") return "Unknown";
  return state
    .split("_")
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(" ");
}

function formatDuration(ms: number | null): string {
  if (!ms) return "";
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatTimeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

function getScheduleLabel(d: CombinedModel): string | null {
  if (!d.schedule) return null;
  if (d.schedule.start_time) {
    return new Date(d.schedule.start_time) > new Date()
      ? "Scheduled"
      : "Pinned";
  }
  return null;
}

function isPilotOnly(d: CombinedModel): boolean {
  return !!(d.schedule && !d.schedule.start_time);
}

function nnsightSnippet(repoId: string): string {
  return `from nnsight import LanguageModel\n\nmodel = LanguageModel("${repoId}", dispatch=True)`;
}

function getColabUrl(model: string, scenario: string): string {
  const folder = model.replace("/", "--");
  return `https://colab.research.google.com/github/${GITHUB_REPO}/blob/main/notebooks/colab/${folder}/${scenario}.ipynb`;
}

type SortKey = "level" | "name" | "params";

// ── NNsight snippet with portal-style positioning ────────────────

function NNsightSnippet({ repoId }: { repoId: string }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(nnsightSnippet(repoId));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
          open
            ? "bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-400"
            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
        }`}
        aria-label="Show NNsight code snippet"
        aria-expanded={open}
      >
        <FiCopy size={12} />
        NNsight
        <svg
          width={10}
          height={10}
          viewBox="0 0 10 10"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full mt-2 z-50 w-80 rounded-xl bg-surface-900 dark:bg-black border border-slate-700/50 shadow-2xl p-4"
        >
          <pre className="snippet-scrollbar text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed mb-3">
            {nnsightSnippet(repoId)}
          </pre>
          <button
            onClick={handleCopy}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 hover:text-white transition-colors"
          >
            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
      )}
    </>
  );
}

// ── Scenario row with error tooltip ──────────────────────────────

function ScenarioRow({
  name,
  scenario,
  model,
}: {
  name: string;
  scenario: MonitorScenario;
  model: string;
}) {
  const [showError, setShowError] = useState(false);
  const hasFailed = scenario.status === "FAILED" && scenario.details;
  const dotColor = testStatusDot[scenario.status] ?? "bg-slate-400";
  const colabUrl = getColabUrl(model, name);

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between py-1.5 text-xs border-t border-slate-100 dark:border-slate-800 ${hasFailed ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded" : ""}`}
        onMouseEnter={() => hasFailed && setShowError(true)}
        onMouseLeave={() => setShowError(false)}
      >
        <div className="flex items-center gap-2">
          <span className="text-slate-600 dark:text-slate-400 font-mono">
            {name}
          </span>
          {hasFailed && (
            <span className="text-red-500 text-[10px]" title="Click for details">
              &#9432;
            </span>
          )}
          <a
            href={colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-1.5 py-0.5 text-[10px] border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            colab
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500 tabular-nums">
            {formatDuration(scenario.duration_ms)}
          </span>
          <span className={`w-2 h-2 rounded-full ${dotColor}`} />
        </div>
      </div>

      {showError && scenario.details && (
        <div className="absolute left-0 bottom-full mb-2 z-50 w-96 max-h-64 overflow-y-auto rounded-xl bg-surface-900 dark:bg-black border border-slate-700/50 shadow-2xl p-4 pointer-events-auto">
          <p className="font-semibold text-white text-sm mb-1">
            {model.split("/").pop()} / {name}
          </p>
          {scenario.error_category && (
            <p className="text-red-400 text-xs font-semibold mb-2">
              {scenario.error_category}
            </p>
          )}
          <pre className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap break-words leading-relaxed max-h-40 overflow-y-auto bg-black/50 rounded-lg p-3">
            {scenario.details}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Model card ───────────────────────────────────────────────────

function ModelCard({ model: m }: { model: CombinedModel }) {
  const lc = levelColors[m.deployment_level];
  const schedule = getScheduleLabel(m);
  const pilot = isPilotOnly(m);
  const mon = m.monitor;
  const appState = formatAppState(
    typeof m.application_state === "string" ? m.application_state : "UNKNOWN"
  );

  const appStateColor =
    m.application_state === "RUNNING"
      ? "text-emerald-600 dark:text-emerald-400"
      : m.application_state === "DEPLOYING" ||
          m.application_state === "NOT_STARTED"
        ? "text-amber-600 dark:text-amber-400"
        : m.application_state === "DEPLOY_FAILED" ||
            m.application_state === "UNHEALTHY"
          ? "text-red-600 dark:text-red-400"
          : "text-slate-500 dark:text-slate-400";

  return (
    <div className="card-glass rounded-xl p-5 flex flex-col gap-3 relative overflow-visible">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 relative">
        <div className="min-w-0 flex-1">
          <a
            href={`https://huggingface.co/${m.repo_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-semibold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors break-all"
          >
            {m.repo_id}
            <FiExternalLink
              className="inline ml-1.5 mb-0.5 opacity-50"
              size={12}
            />
          </a>
        </div>
        <div className="flex items-center gap-2 shrink-0 relative">
          <NNsightSnippet repoId={m.repo_id} />
        </div>
      </div>

      {/* Badges row */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${lc.bg} ${lc.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${lc.dot}`} />
          {m.deployment_level}
        </span>

        {appState !== "Running" && (
          <span className={`text-xs font-medium ${appStateColor}`}>
            {appState}
          </span>
        )}

        {m.n_params > 0 && (
          <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {formatParams(m.n_params)} params
          </span>
        )}

        {schedule && (
          <span className="text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30 px-2 py-0.5 rounded-full">
            {schedule}
          </span>
        )}

        {pilot && (
          <span className="text-xs font-medium text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-900/30 px-2 py-0.5 rounded-full">
            Pilot Only
          </span>
        )}
      </div>

      {/* Test scenarios from monitor */}
      {mon && Object.keys(mon.scenarios).length > 0 && (
        <div className="mt-1">
          {Object.entries(mon.scenarios).map(([name, scenario]) => (
            <ScenarioRow
              key={name}
              name={name}
              scenario={scenario}
              model={m.repo_id}
            />
          ))}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">
            Updated {formatTimeAgo(mon.last_updated)}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Model list with filters ──────────────────────────────────────

export default function ModelList({
  models,
  loading,
}: {
  models: CombinedModel[];
  loading: boolean;
}) {
  const [filter, setFilter] = useState<DeploymentLevel | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("level");

  const filtered = useMemo(() => {
    let list = [...models];

    if (filter !== "ALL") {
      list = list.filter((d) => d.deployment_level === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((d) => d.repo_id.toLowerCase().includes(q));
    }

    list.sort((a, b) => {
      if (sortBy === "level")
        return (
          LEVEL_ORDER.indexOf(a.deployment_level) -
          LEVEL_ORDER.indexOf(b.deployment_level)
        );
      if (sortBy === "name") return a.repo_id.localeCompare(b.repo_id);
      return b.n_params - a.n_params;
    });

    return list;
  }, [models, filter, search, sortBy]);

  const counts = useMemo(() => {
    const c = { ALL: models.length, HOT: 0, WARM: 0, COLD: 0 };
    for (const d of models) c[d.deployment_level]++;
    return c;
  }, [models]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-9 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="card-glass rounded-xl p-5 h-36 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by deployment level"
        >
          {(["ALL", ...LEVEL_ORDER] as const).map((level) => {
            const active = filter === level;
            let chipStyle: string;
            if (active) {
              if (level === "ALL")
                chipStyle =
                  "bg-slate-900 dark:bg-white text-white dark:text-slate-900";
              else if (level === "HOT") chipStyle = "bg-emerald-500 text-white";
              else if (level === "WARM") chipStyle = "bg-amber-500 text-white";
              else chipStyle = "bg-indigo-500 text-white";
            } else {
              chipStyle =
                "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700";
            }
            return (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full transition-colors ${chipStyle}`}
                aria-pressed={active}
              >
                {level}
                <span className="opacity-70">{counts[level]}</span>
              </button>
            );
          })}
        </div>

        <div className="relative flex-1 max-w-sm ml-auto">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search models…"
            aria-label="Search models by name"
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          aria-label="Sort models"
          className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-900 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-colors"
        >
          <option value="level">Sort: Level</option>
          <option value="name">Sort: Name</option>
          <option value="params">Sort: Params</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          <p className="text-lg font-medium">No models found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((m) => (
            <ModelCard key={m.model_key} model={m} />
          ))}
        </div>
      )}
    </div>
  );
}
