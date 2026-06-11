export interface GitHubRepo {
  owner: string;
  repo: string;
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  last_commit: string | null; // ISO "YYYY-MM-DD"; null until GitHub enrichment runs
  language: string | null;
  license: string | null;
  topics: string[];
  archived: boolean;
  category: "uses_ndif" | "uses_nnsight";
  linked_paper_url: string | null;
  linked_paper_tier: number | null;
  repo_type: "research" | "course" | "experiment";
  parent_full_name: string | null;
  // ISO "YYYY-MM-DD" — when the pipeline first observed the repo. The whole
  // pre-2026-06-10 catalog shares one backfilled date; new repos get real ones.
  first_seen: string | null;
  // Optional: upstream pipeline has not yet shipped emission of this field.
  // FeaturedCode component will fall back to top-stars among repos with a
  // linked paper and non-course repo_type when this is absent.
  is_featured?: boolean;
}

import githubReposRaw from "../public/data/github-repos.json";
export const githubRepos: GitHubRepo[] = githubReposRaw as GitHubRepo[];
