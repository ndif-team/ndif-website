"use client";

import { FiCpu, FiServer, FiActivity } from "react-icons/fi";

interface ClusterSummary {
  totalGpus: number;
  availableGpus: number;
  totalNodes: number;
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof FiCpu;
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="card-glass rounded-xl p-5 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">
          {value}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        {sub && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ClusterCards({
  cluster,
  loading,
}: {
  cluster: ClusterSummary;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="card-glass rounded-xl p-5 h-24 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-2 flex-1">
                <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        icon={FiCpu}
        label="Total GPUs"
        value={cluster.totalGpus}
      />
      <StatCard
        icon={FiActivity}
        label="Available GPUs"
        value={cluster.availableGpus}
        sub={
          cluster.totalGpus > 0
            ? `${Math.round((cluster.availableGpus / cluster.totalGpus) * 100)}% free`
            : undefined
        }
      />
      <StatCard
        icon={FiServer}
        label="Cluster Nodes"
        value={cluster.totalNodes}
      />
    </div>
  );
}
