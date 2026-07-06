export type DeploymentLevel = "hot" | "warm" | "cold";

export interface Model {
  id: string;
  name: string;
  repoId: string;
  parameters?: string;
  level: DeploymentLevel;
  description?: string;
}

export const deploymentLevelMeta: Record<
  DeploymentLevel,
  { label: string; color: string; description: string }
> = {
  hot: {
    label: "Hot",
    color: "#10b981",
    description: "Always loaded, lowest latency",
  },
  warm: {
    label: "Warm",
    color: "#f59e0b",
    description: "Loaded on demand within minutes",
  },
  cold: {
    label: "Cold",
    color: "#6366f1",
    description: "Available on request, may take longer",
  },
};

export const featuredModels: Model[] = [
  {
    id: "llama-3.1-70b",
    name: "Llama 3.1 70B",
    repoId: "meta-llama/Llama-3.1-70B",
    parameters: "70B",
    level: "hot",
  },
  {
    id: "llama-3.1-8b",
    name: "Llama 3.1 8B",
    repoId: "meta-llama/Llama-3.1-8B",
    parameters: "8B",
    level: "hot",
  },
  {
    id: "llama-3.1-405b",
    name: "Llama 3.1 405B",
    repoId: "meta-llama/Llama-3.1-405B",
    parameters: "405B",
    level: "warm",
  },
  {
    id: "gpt-oss-120b",
    name: "GPT-OSS 120B",
    repoId: "openai/gpt-oss-120b",
    parameters: "120B",
    level: "warm",
  },
];
