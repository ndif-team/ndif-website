"use client";

import { FiRefreshCw, FiCheckCircle, FiAlertTriangle, FiLoader } from "react-icons/fi";
import type { SystemHealth } from "./types";

const config: Record<
  SystemHealth,
  { bg: string; border: string; icon: typeof FiCheckCircle; text: string; textColor: string }
> = {
  connecting: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-700/50",
    icon: FiLoader,
    text: "Connecting to NDIF API…",
    textColor: "text-amber-700 dark:text-amber-400",
  },
  healthy: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-700/50",
    icon: FiCheckCircle,
    text: "All systems operational",
    textColor: "text-emerald-700 dark:text-emerald-400",
  },
  error: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-700/50",
    icon: FiAlertTriangle,
    text: "Unable to reach the NDIF API",
    textColor: "text-red-700 dark:text-red-400",
  },
};

export default function HealthBanner({
  health,
  error,
  onRetry,
}: {
  health: SystemHealth;
  error: string | null;
  onRetry: () => void;
}) {
  const c = config[health];
  const Icon = c.icon;

  return (
    <div
      className={`rounded-xl border ${c.border} ${c.bg} px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 flex-1">
        <Icon
          size={20}
          className={`${c.textColor} ${health === "connecting" ? "animate-spin" : ""}`}
        />
        <span className={`font-medium ${c.textColor}`}>{c.text}</span>
        {error && health === "error" && (
          <span className="text-sm text-red-500 dark:text-red-400 hidden sm:inline">
            — {error}
          </span>
        )}
      </div>
      {health === "error" && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
          aria-label="Retry fetching status"
        >
          <FiRefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  );
}
