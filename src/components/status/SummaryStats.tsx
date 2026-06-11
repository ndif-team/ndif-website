"use client";

import type { CombinedModel, MonitorData } from "./types";

function Stat({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={`text-3xl md:text-4xl font-display font-bold ${color}`}>
        {value}
      </span>
      <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
        {label}
      </span>
    </div>
  );
}

export default function SummaryStats({
  models,
  monitor,
  loading,
}: {
  models: CombinedModel[];
  monitor: MonitorData | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-6 md:gap-10 py-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-baseline gap-2">
            <div className="h-9 w-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-14 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const total = models.length;
  const hot = models.filter((m) => m.deployment_level === "HOT").length;

  const monitorCurrent = monitor?.current ?? [];
  const ok = monitorCurrent.filter((m) => m.overall_status === "OK").length;
  const slow = monitorCurrent.filter(
    (m) => m.overall_status === "SLOW"
  ).length;
  const failed = monitorCurrent.filter(
    (m) =>
      m.overall_status === "FAILED" || m.overall_status === "UNAVAILABLE"
  ).length;

  return (
    <div className="flex flex-wrap gap-6 md:gap-10 py-4 border-b border-slate-200 dark:border-slate-800">
      <Stat
        value={total}
        label="Models"
        color="text-slate-600 dark:text-slate-300"
      />
      {monitor ? (
        <>
          <Stat value={ok} label="OK" color="text-status-success" />
          <Stat value={slow} label="Slow" color="text-status-warning" />
          <Stat value={failed} label="Failed" color="text-status-danger" />
        </>
      ) : (
        <Stat
          value={hot}
          label="Hot"
          color="text-status-hot"
        />
      )}
    </div>
  );
}
