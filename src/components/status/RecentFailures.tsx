"use client";

import { useState } from "react";
import type { MonitorFailure } from "./types";
import { FiExternalLink, FiChevronDown } from "react-icons/fi";

const GITHUB_REPO = "davidbau/ndif-monitor";

function getColabUrl(model: string, scenario: string): string {
  const folder = model.replace("/", "--");
  return `https://colab.research.google.com/github/${GITHUB_REPO}/blob/main/notebooks/colab/${folder}/${scenario}.ipynb`;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-US", { timeZone: "America/New_York" }) +
    " " +
    d.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

function FailureRow({ failure: f }: { failure: MonitorFailure }) {
  const [expanded, setExpanded] = useState(false);
  const colabUrl = getColabUrl(f.model, f.scenario);
  const shortModel = f.model.includes("/")
    ? f.model.split("/").pop()!
    : f.model;

  const errorLines = (f.details || "").split("\n").filter((l) => l.trim());
  const preview =
    errorLines.length > 0
      ? errorLines[errorLines.length - 1].substring(0, 80)
      : f.error_category || f.status;

  return (
    <>
      <tr
        className={`text-sm ${f.details ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50" : ""}`}
        onClick={() => f.details && setExpanded(!expanded)}
      >
        <td className="py-3 pr-4 text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">
          {formatTime(f.timestamp)}
        </td>
        <td className="py-3 pr-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">
          {shortModel}
        </td>
        <td className="py-3 pr-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
          {f.scenario}
        </td>
        <td className="py-3 pr-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">
              {f.error_category || "ERROR"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-[200px]">
              {preview}
              {preview.length >= 80 ? "…" : ""}
            </span>
            {f.details && (
              <FiChevronDown
                size={14}
                className={`text-slate-400 transition-transform shrink-0 ${expanded ? "rotate-180" : ""}`}
              />
            )}
          </div>
        </td>
        <td className="py-3 text-right">
          <a
            href={colabUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline underline-offset-2"
            onClick={(e) => e.stopPropagation()}
          >
            Reproduce
            <FiExternalLink size={11} />
          </a>
        </td>
      </tr>
      {expanded && f.details && (
        <tr>
          <td colSpan={5} className="p-0">
            <pre className="text-[11px] font-mono text-slate-400 dark:text-slate-300 bg-slate-50 dark:bg-black/50 p-4 whitespace-pre-wrap break-words max-h-60 overflow-y-auto border-t border-b border-slate-200 dark:border-slate-800">
              {f.details}
            </pre>
          </td>
        </tr>
      )}
    </>
  );
}

export default function RecentFailures({
  failures,
}: {
  failures: MonitorFailure[];
}) {
  if (!failures || failures.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-xl font-bold mb-4 text-slate-900 dark:text-white uppercase tracking-wider text-sm">
        Recent Failures
      </h2>
      <div className="overflow-x-auto card-glass rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold py-3 px-4">
                Time
              </th>
              <th className="text-left text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold py-3 px-4">
                Model
              </th>
              <th className="text-left text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold py-3 px-4">
                Test
              </th>
              <th className="text-left text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold py-3 px-4">
                Error
              </th>
              <th className="text-right text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold py-3 px-4">
                &nbsp;
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {failures.map((f, i) => (
              <FailureRow key={`${f.model}-${f.scenario}-${i}`} failure={f} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
