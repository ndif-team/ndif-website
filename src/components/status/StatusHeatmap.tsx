"use client";

import { useMemo, useState } from "react";
import type { MonitorData } from "./types";

const STATUS_COLORS: Record<string, { light: string; dark: string }> = {
  OK: { light: "bg-emerald-500", dark: "bg-emerald-500" },
  SLOW: { light: "bg-amber-400", dark: "bg-amber-500" },
  FAILED: { light: "bg-red-500", dark: "bg-red-500" },
  UNAVAILABLE: { light: "bg-slate-400", dark: "bg-slate-500" },
  COLD: { light: "bg-slate-300", dark: "bg-slate-600" },
  DEGRADED: { light: "bg-orange-400", dark: "bg-orange-500" },
};

function worstStatus(statuses: string[]): string | null {
  if (statuses.length === 0) return null;
  if (statuses.includes("FAILED") || statuses.includes("UNAVAILABLE"))
    return "FAILED";
  if (statuses.includes("DEGRADED")) return "DEGRADED";
  if (statuses.includes("SLOW")) return "SLOW";
  if (statuses.every((s) => s === "COLD")) return "COLD";
  return "OK";
}

function formatTimeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

export default function StatusHeatmap({
  monitor,
}: {
  monitor: MonitorData | null;
}) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    status: string | null;
    x: number;
    y: number;
  } | null>(null);

  const calendarData = useMemo(() => {
    if (!monitor) return null;

    const last90 = monitor.dates.slice(-90);
    return last90.map((date) => {
      const dayData = monitor.daily[date];
      if (!dayData) return { date, status: null };

      const statuses = Object.values(dayData).map((m) => m.status);
      return { date, status: worstStatus(statuses) };
    });
  }, [monitor]);

  if (!monitor || !calendarData) return null;

  const weeks: (typeof calendarData)[] = [];
  let currentWeek: typeof calendarData = [];

  const firstDate = new Date(calendarData[0].date + "T00:00:00Z");
  const firstDay = firstDate.getUTCDay();
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push({ date: "", status: null });
  }

  for (const entry of calendarData) {
    const d = new Date(entry.date + "T00:00:00Z");
    if (d.getUTCDay() === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(entry);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider text-sm">
          Status History
        </h2>
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          {["OK", "SLOW", "FAILED", "COLD"].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div
                className={`w-2.5 h-2.5 rounded-sm ${STATUS_COLORS[s]?.light ?? "bg-slate-200"} dark:${STATUS_COLORS[s]?.dark ?? "bg-slate-700"}`}
              />
              <span>{s === "OK" ? "OK" : s.charAt(0) + s.slice(1).toLowerCase()}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-slate-100 dark:bg-slate-800" />
            <span>No data</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[3px] min-w-fit">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => {
                const colorClass = day.date
                  ? day.status
                    ? `${STATUS_COLORS[day.status]?.light ?? "bg-slate-100"} dark:${STATUS_COLORS[day.status]?.dark ?? "bg-slate-700"}`
                    : "bg-slate-100 dark:bg-slate-800"
                  : "opacity-0";

                return (
                  <div
                    key={di}
                    className={`w-3 h-3 rounded-sm cursor-default transition-transform hover:scale-150 ${colorClass}`}
                    onMouseEnter={(e) => {
                      if (day.date) {
                        setHoveredDay({
                          date: day.date,
                          status: day.status,
                          x: e.clientX,
                          y: e.clientY,
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {hoveredDay && (
        <div
          className="fixed z-50 px-3 py-2 rounded-lg bg-surface-900 dark:bg-black text-white text-xs shadow-xl border border-slate-700/50 pointer-events-none"
          style={{
            left: Math.min(hoveredDay.x + 12, window.innerWidth - 180),
            top: hoveredDay.y + 12,
          }}
        >
          <p className="font-semibold">{hoveredDay.date}</p>
          <p className="text-slate-300">
            {hoveredDay.status ?? "No tests run"}
          </p>
        </div>
      )}

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
        Last 90 days &middot; Updated{" "}
        {formatTimeAgo(monitor.generated)}
      </p>
    </section>
  );
}
