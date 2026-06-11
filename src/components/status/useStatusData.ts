"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  StatusResponse,
  Deployment,
  SystemHealth,
  ClusterNode,
  ClusterSummary,
  MonitorData,
  CombinedModel,
} from "./types";

export interface StatusData {
  health: SystemHealth;
  models: CombinedModel[];
  cluster: ClusterSummary;
  monitor: MonitorData | null;
  error: string | null;
  loading: boolean;
  retry: () => void;
}

function summariseCluster(
  nodes: Record<string, ClusterNode>
): ClusterSummary {
  let totalGpus = 0;
  let availableGpus = 0;
  const nodeEntries = Object.values(nodes);

  for (const node of nodeEntries) {
    const res = node.resources;
    const gpuDetails = res?.gpu_details ?? [];
    const nodeTotalGpus =
      typeof res?.total_gpus === "number" ? res.total_gpus : gpuDetails.length;
    totalGpus += nodeTotalGpus;

    if (Array.isArray(res?.available_gpus)) {
      availableGpus += res.available_gpus.length;
    } else {
      availableGpus += gpuDetails.filter(
        (g) => (g.available_memory_bytes ?? 0) > 0
      ).length;
    }
  }

  return { totalGpus, availableGpus, totalNodes: nodeEntries.length };
}

function normalizeDeployment(
  key: string,
  raw: Record<string, unknown>
): Deployment | null {
  const repoId =
    typeof raw.repo_id === "string" && raw.repo_id.trim() ? raw.repo_id : "";
  if (!repoId) return null;

  const level =
    raw.deployment_level === "HOT" ||
    raw.deployment_level === "WARM" ||
    raw.deployment_level === "COLD"
      ? raw.deployment_level
      : "COLD";

  const appState =
    typeof raw.application_state === "string" && raw.application_state
      ? raw.application_state
      : "UNKNOWN";

  const nParams =
    typeof raw.n_params === "number" && Number.isFinite(raw.n_params)
      ? raw.n_params
      : 0;

  return {
    model_key:
      typeof raw.model_key === "string" && raw.model_key
        ? raw.model_key
        : key,
    repo_id: repoId,
    n_params: nParams,
    revision:
      typeof raw.revision === "string" || raw.revision === null
        ? (raw.revision as string | null)
        : null,
    deployment_level: level,
    application_state: appState,
    dedicated: Boolean(raw.dedicated),
    schedule:
      raw.schedule && typeof raw.schedule === "object"
        ? (raw.schedule as Deployment["schedule"])
        : null,
  };
}

function withTimeout(url: string, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(id));
}

async function fetchMonitorData(): Promise<MonitorData | null> {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const candidates = [
    "/api/monitor",
    `${basePath}/data/monitor-status.json`,
    "/data/monitor-status.json",
  ];

  for (const url of candidates) {
    try {
      const res = await withTimeout(url, 12_000);
      if (res.ok) {
        return (await res.json()) as MonitorData;
      }
    } catch {
      // Try next candidate
    }
  }

  return null;
}

export function useStatusData(): StatusData {
  const [health, setHealth] = useState<SystemHealth>("connecting");
  const [models, setModels] = useState<CombinedModel[]>([]);
  const [cluster, setCluster] = useState<ClusterSummary>({
    totalGpus: 0,
    availableGpus: 0,
    totalNodes: 0,
  });
  const [monitor, setMonitor] = useState<MonitorData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setHealth("connecting");
    setError(null);

    try {
      const pingRes = await withTimeout("https://api.ndif.us/ping", 10_000);
      if (!pingRes.ok) throw new Error("API unreachable");

      const [statusRes, monitorDataResult] = await Promise.allSettled([
        withTimeout("https://api.ndif.us/status", 15_000),
        fetchMonitorData(),
      ]);

      if (statusRes.status === "rejected" || !statusRes.value.ok) {
        throw new Error("Failed to fetch status data");
      }

      const data: StatusResponse = await statusRes.value.json();

      let monitorData: MonitorData | null = null;
      if (monitorDataResult.status === "fulfilled") {
        monitorData = monitorDataResult.value;
      }
      setMonitor(monitorData);

      const monitorByRepo = new Map(
        (monitorData?.current ?? []).map((m) => [m.model, m])
      );

      const normalized = Object.entries(data.deployments ?? {})
        .map(([key, raw]) =>
          normalizeDeployment(key, raw as unknown as Record<string, unknown>)
        )
        .filter((d): d is Deployment => d !== null);

      const combined: CombinedModel[] = normalized.map((d) => ({
        ...d,
        monitor: monitorByRepo.get(d.repo_id) ?? undefined,
      }));

      setModels(combined);
      setCluster(summariseCluster(data.cluster?.nodes ?? {}));
      setHealth("healthy");
    } catch (err) {
      setHealth("error");
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { health, models, cluster, monitor, error, loading, retry: fetchData };
}
