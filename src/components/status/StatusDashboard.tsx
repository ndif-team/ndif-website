"use client";

import { useStatusData } from "./useStatusData";
import HealthBanner from "./HealthBanner";
import SummaryStats from "./SummaryStats";
import ClusterCards from "./ClusterCards";
import StatusHeatmap from "./StatusHeatmap";
import ModelList from "./ModelList";
import RecentFailures from "./RecentFailures";

export default function StatusDashboard() {
  const { health, models, cluster, monitor, error, loading, retry } =
    useStatusData();

  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            System <span className="text-gradient">Status</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Real-time overview of NDIF infrastructure and model availability.
          </p>
        </div>

        <div className="space-y-8">
          <HealthBanner health={health} error={error} onRetry={retry} />

          <SummaryStats
            models={models}
            monitor={monitor}
            loading={loading}
          />

          <ClusterCards cluster={cluster} loading={loading} />

          <StatusHeatmap monitor={monitor} />

          <div>
            <h2 className="font-display text-2xl font-bold mb-5 text-slate-900 dark:text-white">
              Model Deployments
            </h2>
            <ModelList models={models} loading={loading} />
          </div>

          {monitor && (
            <RecentFailures failures={monitor.failures} />
          )}
        </div>
      </div>
    </section>
  );
}
