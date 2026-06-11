// ── Live API types (api.ndif.us/status) ──────────────────────────

export type DeploymentLevel = "HOT" | "WARM" | "COLD";

export type ApplicationState =
  | "RUNNING"
  | "NOT_STARTED"
  | "DEPLOYING"
  | "UNHEALTHY"
  | "DEPLOY_FAILED"
  | "UNKNOWN";

export interface Schedule {
  start_time?: string | null;
  end_time?: string | null;
}

export interface Deployment {
  model_key: string;
  repo_id: string;
  n_params: number;
  revision: string | null;
  deployment_level: DeploymentLevel;
  application_state?: ApplicationState | string | null;
  dedicated: boolean;
  schedule?: Schedule | null;
}

export interface GpuDetail {
  index: number;
  memory_bytes: number;
  available_memory_bytes: number;
}

export interface NodeResources {
  total_gpus?: number;
  available_gpus?: number[];
  gpu_memory_bytes?: number;
  gpu_details?: GpuDetail[];
}

export interface ClusterNode {
  resources?: NodeResources;
  deployments?: Record<string, unknown>;
}

export interface StatusResponse {
  deployments: Record<string, Deployment>;
  cluster: {
    nodes: Record<string, ClusterNode>;
  };
  calendar_id?: string;
}

export type SystemHealth = "connecting" | "healthy" | "error";

// ── Monitor types (baukit.org ndif-monitor) ──────────────────────

export interface MonitorScenario {
  status: string;
  duration_ms: number | null;
  last_checked: string | null;
  last_success: string | null;
  error_category: string | null;
  details: string | null;
}

export interface MonitorModel {
  model: string;
  last_updated: string;
  nnsight_version?: string;
  overall_status: string;
  last_all_ok: string | null;
  scenarios: Record<string, MonitorScenario>;
}

export interface MonitorFailure {
  timestamp: string;
  model: string;
  scenario: string;
  status: string;
  error_category: string;
  details: string;
}

export interface DailyModelEntry {
  status: string;
  scenarios?: Record<string, string>;
  hours?: Record<string, string>;
}

export interface MonitorData {
  generated: string;
  days: number;
  dates: string[];
  models: string[];
  daily: Record<string, Record<string, DailyModelEntry>>;
  current: MonitorModel[];
  failures: MonitorFailure[];
  github_repo: string;
}

// ── Combined data passed to components ───────────────────────────

export interface ClusterSummary {
  totalGpus: number;
  availableGpus: number;
  totalNodes: number;
}

export interface CombinedModel extends Deployment {
  monitor?: MonitorModel;
}
