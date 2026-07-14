// Refreshes src/data/org-stats.json with live ndif-team GitHub numbers at
// build time (see "build" in package.json). Never fails the build: any error
// leaves the committed fallback JSON in place and exits 0.
//
// Env:
//   GITHUB_TOKEN    optional — lifts the API rate limit (5,000/hr vs 60/hr)
//   GITHUB_API_BASE optional — lets tests point at an unreachable host to
//                   exercise the fallback path
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ORG = "ndif-team";
const API_BASE = process.env.GITHUB_API_BASE ?? "https://api.github.com";
const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "org-stats.json"
);

async function fetchOrgRepos() {
  const headers = {
    accept: "application/vnd.github+json",
    // GitHub rejects requests without a User-Agent.
    "user-agent": "ndif-website-build",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const repos = [];
  let url = `${API_BASE}/orgs/${ORG}/repos?per_page=100`;
  for (let page = 0; url && page < 5; page++) {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
    const batch = await res.json();
    if (!Array.isArray(batch)) throw new Error("unexpected payload shape");
    repos.push(...batch);
    const link = res.headers.get("link") ?? "";
    url = /<([^>]+)>;\s*rel="next"/.exec(link)?.[1] ?? null;
  }
  return repos;
}

try {
  const repos = await fetchOrgRepos();
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);
  if (repos.length === 0 || !Number.isFinite(totalStars) || totalStars <= 0) {
    throw new Error(`implausible stats (${repos.length} repos, ${totalStars} stars)`);
  }

  const previous = JSON.parse(await readFile(OUT, "utf8"));
  const nnsightStars =
    repos.find((r) => r.name === "nnsight")?.stargazers_count ??
    previous.nnsightStars;

  // Only rewrite when the numbers moved — keeps builds byte-identical when
  // nothing changed, so CI's "commit if changed" step stays a no-op.
  if (
    previous.totalStars === totalStars &&
    previous.repoCount === repos.length &&
    previous.nnsightStars === nnsightStars
  ) {
    console.log(`org-stats: unchanged (${repos.length} repos, ${totalStars} stars)`);
  } else {
    const stats = {
      totalStars,
      repoCount: repos.length,
      nnsightStars,
      fetchedAt: new Date().toISOString().slice(0, 10),
    };
    await writeFile(OUT, `${JSON.stringify(stats, null, 2)}\n`);
    console.log(
      `org-stats: updated — ${stats.repoCount} repos, ${stats.totalStars} stars (nnsight ${stats.nnsightStars})`
    );
  }
} catch (err) {
  console.warn(
    `org-stats: fetch failed (${err instanceof Error ? err.message : err}) — keeping committed fallback`
  );
}
