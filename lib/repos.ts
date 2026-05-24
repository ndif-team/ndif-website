import type { GitHubRepo } from "../data/github-repos";

export type RepoBadge = "paper" | "popular" | "active" | "coursework";

const SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

export function isLowSignal(r: GitHubRepo): boolean {
  return r.stars === 0 && !r.description && !r.linked_paper_url;
}

export function isActive(r: GitHubRepo, now: Date = new Date()): boolean {
  const last = new Date(r.last_commit + "T00:00:00Z").getTime();
  if (Number.isNaN(last)) return false;
  return now.getTime() - last < SIX_MONTHS_MS;
}

export function isPopular(r: GitHubRepo): boolean {
  return r.stars >= 10;
}

export function hasPaper(r: GitHubRepo): boolean {
  return r.linked_paper_url !== null && r.repo_type !== "course";
}

export function isCoursework(r: GitHubRepo): boolean {
  return r.repo_type === "course";
}

/**
 * Returns up to 3 badges. Coursework is dropped first if more than 3 qualify.
 */
export function selectBadges(r: GitHubRepo): RepoBadge[] {
  const all: RepoBadge[] = [];
  if (hasPaper(r)) all.push("paper");
  if (isPopular(r)) all.push("popular");
  if (isActive(r)) all.push("active");
  if (isCoursework(r)) all.push("coursework");
  if (all.length <= 3) return all;
  return all.filter((b) => b !== "coursework").slice(0, 3);
}

const RELATIVE_UNITS: [number, Intl.RelativeTimeFormatUnit][] = [
  [60, "second"],
  [60, "minute"],
  [24, "hour"],
  [7, "day"],
  [4.345, "week"],
  [12, "month"],
  [Infinity, "year"],
];

export function relativeFromNow(iso: string, now: Date = new Date()): string {
  const then = new Date(iso + "T00:00:00Z").getTime();
  if (Number.isNaN(then)) return "unknown";
  let diff = (now.getTime() - then) / 1000;
  const fmt = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  let unit: Intl.RelativeTimeFormatUnit = "second";
  for (const [step, u] of RELATIVE_UNITS) {
    if (Math.abs(diff) < step) {
      unit = u;
      break;
    }
    diff /= step;
    unit = u;
  }
  return fmt.format(-Math.round(diff), unit);
}
